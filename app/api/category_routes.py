from flask import Blueprint, jsonify
from app.models import Category



category_routes = Blueprint('categories', __name__)

@category_routes.route('/all')
def get_all_categories():
    categories = Category.query.all()
    category_list = [category.to_dict() for category in categories]
    return jsonify(category_list)