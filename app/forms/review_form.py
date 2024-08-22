from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length

class ReviewForm(FlaskForm):
    rating = IntegerField('Rating', validators=[
        DataRequired(message="Rating is required."),
        NumberRange(min=1, max=5, message="Rating must be between 1 and 5.")
    ])
    comment = TextAreaField('Comment', validators=[
        DataRequired(message="Comment is required."),
        Length(min=10, max=500, message="Comment must be between 10 and 500 characters.")
    ])
    submit = SubmitField('Submit Review')
