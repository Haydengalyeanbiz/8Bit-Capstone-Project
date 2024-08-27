from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Cart, CartItem, Listing

cart_routes = Blueprint('carts', __name__)

# ?-------------------GET CART------------------
@cart_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_cart(id):
    cart = Cart.query.filter_by(user_id=id).first()

    if not cart:
        cart = Cart(user_id=current_user.id)
        db.session.add(cart)
        db.session.commit()

    return jsonify(cart.to_dict()), 200

# ?-------------------ADD TO CART------------------
@cart_routes.route('/add', methods=['POST'])
@login_required
def add_to_cart():
    data = request.json
    listing_id = data.get('listing_id')
    quantity = data.get('quantity', 1)

    cart = Cart.query.filter_by(user_id=current_user.id).first()

    if not cart:
        cart = Cart(user_id=current_user.id)
        db.session.add(cart)
        db.session.commit()

    listing = Listing.query.get(listing_id)

    if not listing:
        return {'error': 'Listing not found'}, 404

    if listing.quantity < quantity:
        return {'error': 'Not enough quantity available'}, 400

    cart_item = CartItem.query.filter_by(cart_id=cart.id, listing_id=listing_id).first()

    if cart_item:
        # Check if the new quantity would exceed available listing quantity
        if cart_item.quantity + quantity > listing.quantity:
            return {'error': 'Not enough quantity available'}, 400

        cart_item.quantity += quantity
    else:
        # Add the item to the cart
        cart_item = CartItem(cart_id=cart.id, listing_id=listing_id, quantity=quantity)
        db.session.add(cart_item)

    # Update the listing quantity
    listing.quantity -= quantity
    db.session.commit()

    return jsonify(cart.to_dict()), 201

# ?-------------------UPDATE CART ITEM------------------
@cart_routes.route('/<int:item_id>', methods=['PUT'])
@login_required
def update_cart_item(item_id):
    data = request.json
    new_quantity = data.get('quantity')

    cart_item = CartItem.query.get(item_id)

    if not cart_item:
        return {'error': 'Cart item not found'}, 404

    if cart_item.cart.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403

    if new_quantity <= 0:
        return {'error': 'Quantity must be greater than 0'}, 400

    listing = Listing.query.get(cart_item.listing_id)

    if not listing:
        return {'error': 'Listing not found'}, 404

    # Calculate the difference between the new quantity and the old quantity
    quantity_difference = new_quantity - cart_item.quantity

    # Check if there's enough stock for the update
    if listing.quantity < quantity_difference:
        return {'error': 'Not enough quantity available'}, 400

    # Update the listing quantity
    listing.quantity -= quantity_difference

    # Update the cart item quantity
    cart_item.quantity = new_quantity

    db.session.commit()

    return jsonify(cart_item.to_dict()), 200

# ?-------------------REMOVE FROM CART------------------
@cart_routes.route('/<int:item_id>', methods=['DELETE'])
@login_required
def remove_from_cart(item_id):
    cart_item = CartItem.query.get(item_id)

    if not cart_item:
        return {'error': 'Cart item not found'}, 404

    if cart_item.cart.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403

    listing = Listing.query.get(cart_item.listing_id)

    if listing:
        # Add the quantity back to the listing
        listing.quantity += cart_item.quantity

    db.session.delete(cart_item)
    db.session.commit()

    return {'message': 'Item removed from cart'}, 200

# ?-------------------CLEAR CART------------------
@cart_routes.route('/clear', methods=['DELETE'])
@login_required
def clear_cart():
    cart = Cart.query.filter_by(user_id=current_user.id).first()

    if not cart:
        return {'error': 'Cart not found'}, 404

    # Restore the quantity of each listing in the cart
    for item in cart.cart_items:
        listing = Listing.query.get(item.listing_id)
        if listing:
            listing.quantity += item.quantity

    # Remove all items from the cart
    cart.cart_items.clear()
    db.session.commit()

    return {'message': 'Cart cleared'}, 200