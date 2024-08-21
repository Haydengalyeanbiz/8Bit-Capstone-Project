from flask import Blueprint, request, jsonify
from app.models import Listing, db, Category, ListingCategory
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
            category = Category.query.get(category_id)
            if category:
                listing_category = ListingCategory(listing_id=new_listing.id, category_id=category.id)
                db.session.add(listing_category)

        db.session.commit()

        return jsonify(new_listing.to_dict()), 201
    else:
        print("Form validation failed with errors:", form.errors)  # Log validation errors
        return jsonify({'errors': form.errors}), 400
