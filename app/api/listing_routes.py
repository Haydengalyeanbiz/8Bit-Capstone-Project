from flask import Blueprint, request, jsonify
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
        image = request.files.get('image')
        if not image:
            return jsonify({"errors": "Image file is required"}), 400

        if not allowed_file(image.filename):
            return jsonify({"errors": "File type not permitted"}), 400

        image.filename = get_unique_filename(image.filename)
        upload_result = upload_file_to_s3(image)

        if 'url' not in upload_result:
            return jsonify({"errors": upload_result.get('errors', 'File upload failed')}), 400

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

        selected_categories = form.data['categories']
        for category_id in selected_categories:
            stmt = listing_categories.insert().values(
                listing_id=new_listing.id,
                category_id=category_id
            )
            db.session.execute(stmt)

        db.session.commit()

        return jsonify(new_listing.to_dict()), 201
    else:
        print("Form validation failed with errors:", form.errors)  # Log validation errors
        return jsonify({'errors': form.errors}), 400

# ?---------------------------------UPDATE A LISTING---------------------------------
@listing_routes.route('/<int:id>', methods=['PUT'])
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
        if 'image' in request.files:
            image = request.files['image']
            if allowed_file(image.filename):
                image.filename = get_unique_filename(image.filename)
                upload_result = upload_file_to_s3(image)
                if 'url' not in upload_result:
                    return jsonify({"errors": upload_result.get('errors', 'File upload failed')}), 400
                listing.image_url = upload_result['url']

        listing.title = form.data['title']
        listing.description = form.data['description']
        listing.price = form.data['price']
        listing.quantity = form.data['quantity']

        # Update categories
        db.session.execute(
            listing_categories.delete().where(listing_categories.c.listing_id == listing.id)
        )
        selected_categories = form.data['categories']
        for category_id in selected_categories:
            stmt = listing_categories.insert().values(
                listing_id=listing.id,
                category_id=category_id
            )
            db.session.execute(stmt)

        db.session.commit()
        return jsonify(listing.to_dict()), 200
    
    print("Form validation failed with errors:", form.errors)  # Log validation errors
    return jsonify({'errors': form.errors}), 400

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