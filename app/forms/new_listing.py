from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField, DecimalField, IntegerField, SelectMultipleField
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS
from app.models import Category


class ListingForm(FlaskForm):
    title = StringField('Listing Title', validators=[DataRequired()])
    description = TextAreaField('Listing Description', validators=[DataRequired()])
    price = DecimalField('Price', places=2, validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    categories = SelectMultipleField('Categories', choices=[], coerce=int, validators=[DataRequired()])

    def __init__(self, *args, **kwargs):
        super(ListingForm, self).__init__(*args, **kwargs)
        self.categories.choices = [(category.id, category.name) for category in Category.query.all()]