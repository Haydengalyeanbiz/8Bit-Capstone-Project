from flask import Blueprint, request
from app.models import Listing, db, Category, listing_categories
from flask_login import current_user, login_required
from app.forms.new_listing import ListingForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename, allowed_file

listing_routes = Blueprint('listings', __name__)

# ?---------------------------------GET ALL LISTINGS---------------------------------
@listing_routes.route('/')
def get_all_listings():
    listings = Listing.query.all()
    listing_list = [listing.to_dict() for listing in listings]
    return listing_list

# ?---------------------------GET ALL USER LISTINGS----------------------------
@listing_routes.route('/user/<int:user_id>')
def get_user_listings(user_id):
    listings = Listing.query.filter_by(user_id=user_id).all()
    return {'listings': [listing.to_dict() for listing in listings]}

# ?---------------------------------GET A LISTING---------------------------------
@listing_routes.route('/<int:id>')
def get_listing(id):
    listing = Listing.query.get(id)
    if listing:
        return listing.to_dict(), 200
    else:
        return {'error': 'Listing not found'}, 404
    
# ?---------------------------------CREATE NEW LISTING---------------------------------
@listing_routes.route('/new', methods=['POST'])
@login_required
def create_listing():
    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        try:
            image = request.files.get('image')
            if not image:
                return ({"errors": "Image file is required"}), 400

            if not allowed_file(image.filename):
                return ({"errors": "File type not permitted"}), 400

            image.filename = get_unique_filename(image.filename)
            upload_result = upload_file_to_s3(image)

            if 'url' not in upload_result:  
                return ({"errors": upload_result.get('errors', 'File upload failed')}), 400

            new_listing = Listing(
                user_id=current_user.id,
                title=form.data['title'],
                description=form.data['description'],
                price=form.data['price'],
                quantity=form.data['quantity'],
                image_url=upload_result['url']
            )

            db.session.add(new_listing)
            db.session.commit()

            # Handle category associations
            selected_categories = form.data.get('categories', [])
            if selected_categories:
                for category_id in selected_categories:
                    stmt = listing_categories.insert().values(
                        listing_id=new_listing.id,
                        category_id=category_id
                    )
                    db.session.execute(stmt)

            db.session.commit()

            return (new_listing.to_dict()), 201
        
        except Exception as e:
            db.session.rollback()  # Rollback in case of error
            return ({"errors": "An error occurred while creating the listing. Please try again."}), 500

    else:
        return ({'errors': form.errors}), 400

# ?---------------------------------UPDATE A LISTING---------------------------------
@listing_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def update_listing(id):
    listing = Listing.query.get(id)

    if not listing:
        return {'error': 'Listing not found'}, 404

    if listing.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403

    form = ListingForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.image_url.data:  
            image = form.image_url.data
            if allowed_file(image.filename):
                image.filename = get_unique_filename(image.filename)
                upload_result = upload_file_to_s3(image)
                if 'url' not in upload_result:
                    return {"errors": upload_result.get('errors', 'File upload failed')}, 400
                listing.image_url = upload_result['url']

        # Update listing details
        listing.title = form.title.data
        listing.description = form.description.data
        listing.price = form.price.data
        listing.quantity = form.quantity.data

        # Update categories
        selected_categories = form.categories.data
        if selected_categories:
            listing.categories.clear()  # Remove existing category associations
            for category_id in selected_categories:
                category = Category.query.get(category_id)
                if category:
                    listing.categories.append(category)

        # Commit changes
        db.session.commit()
        return listing.to_dict(), 200

    return {'errors': form.errors}, 400


# ?---------------------------------DELETE A LISTING---------------------------------
@listing_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_listing(id):
    listing = Listing.query.get(id)
    
    if not listing:
        return {'error': 'Listing not found'}, 404
    
    if listing.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403
    
    # Delete the listing categories
    db.session.execute(
        listing_categories.delete().where(listing_categories.c.listing_id == listing.id)
    )

    db.session.delete(listing)
    db.session.commit()
    return {'message': 'Listing deleted successfully'}, 200