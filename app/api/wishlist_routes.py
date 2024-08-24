from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Wishlist, db
from app.forms.wishlist_form import WishlistForm

wishlist_routes = Blueprint('wishlists', __name__)

# ?-------------------GET USER WISHLIST------------------
@wishlist_routes.route('/<int:user_id>', methods=['GET'])
@login_required
def get_user_wishlist(user_id):
    if user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    wishlist_items = Wishlist.query.filter_by(user_id=user_id).all()
    print("THIS IS THE QUERY", wishlist_items)
    # Check if wishlist_items is empty or contains data
    if not wishlist_items:
        return jsonify([]), 200  # Return an empty list if no items are found

    wishlist = [item.to_dict() for item in wishlist_items]
    print(wishlist)
    return jsonify(wishlist), 200

# ?-------------------ADD TO WISHLIST------------------
@wishlist_routes.route('/add', methods=['POST'])
@login_required
def add_to_wishlist():
    form = WishlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']  # Setting CSRF token

    if form.validate_on_submit():
        listing_id = form.data['listing_id']

        # Check if the item is already in the wishlist
        existing_item = Wishlist.query.filter_by(user_id=current_user.id, listing_id=listing_id).first()
        if existing_item:
            return jsonify({'error': 'Item already in wishlist'}), 400

        # Create a new wishlist entry
        new_wishlist_item = Wishlist(
            user_id=current_user.id,
            listing_id=listing_id
        )
        db.session.add(new_wishlist_item)
        db.session.commit()
        return jsonify(new_wishlist_item.to_dict()), 201
    else:
        # If the form validation fails
        return jsonify({'errors': form.errors}), 400


# ?-------------------DELETE FROM WISHLIST------------------
@wishlist_routes.route('/<int:item_id>/delete', methods=['DELETE'])
@login_required
def delete_from_wishlist(item_id):
    wishlist_item = Wishlist.query.get(item_id)

    if not wishlist_item:
        return {'error': 'Wishlist item not found'}, 404

    if wishlist_item.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403

    db.session.delete(wishlist_item)
    db.session.commit()
    return jsonify({'id': item_id, 'message': 'Item removed from wishlist'}), 200


