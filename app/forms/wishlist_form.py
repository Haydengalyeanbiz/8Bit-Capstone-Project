from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class WishlistForm(FlaskForm):
    listing_id = IntegerField('Listing ID', validators=[DataRequired()])
