from flask import Blueprint, request, jsonify
from app.models import db, Category
from flask_login import current_user, login_required
from app.forms.new_listing import ListingForm
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename, allowed_file

category_routes = Blueprint('categories', __name__)
@category_routes.route('/')
def get_all_categories():
    categories = Category.query.all()
    category_list = [category for category in categories]
    return category_list