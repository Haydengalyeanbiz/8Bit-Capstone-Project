from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Cart, CartItem

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

    cart_item = CartItem.query.filter_by(cart_id=cart.id, listing_id=listing_id).first()

    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id=cart.id, listing_id=listing_id, quantity=quantity)
        db.session.add(cart_item)

    db.session.commit()

    return jsonify(cart.to_dict()), 201

# ?-------------------UPDATE CART ITEM------------------
@cart_routes.route('/<int:item_id>', methods=['PUT'])
@login_required
def update_cart_item(item_id):
    data = request.json
    quantity = data.get('quantity')

    cart_item = CartItem.query.get(item_id)

    if not cart_item:
        return {'error': 'Cart item not found'}, 404

    if cart_item.cart.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403

    if quantity <= 0:
        return {'error': 'Quantity must be greater than 0'}, 400

    cart_item.quantity = quantity
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

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({'message': 'Item removed from cart'}), 200
