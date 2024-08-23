from app.models import Review, db
from flask import Blueprint, request
from flask_login import current_user, login_required
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

#?----------------CREATE  A REVIEW---------------------
@review_routes.route('/<int:listing_id>', methods=['POST'])
@login_required
def create_review(listing_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # Debugging statement to print received form data
    print("Form Data:", form.data)

    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            listing_id=listing_id,
            rating=form.data['rating'],
            comment=form.data['comment']
        )
        db.session.add(new_review)
        db.session.commit()

        # Debugging statement to confirm review creation
        print("Review Created:", new_review)

        return new_review.to_dict(), 201
    else:
        # Debugging statement to print errors
        print("Form Errors:", form.errors)

    return {'errors': form.errors}, 400

#?----------------------GET ALL LISTING REVIEWS----------------------------
@review_routes.route('/<int:listing_id>', methods=['GET'])
def get_reviews(listing_id):
    reviews = Review.query.filter_by(listing_id=listing_id).all()
    return {'reviews': [review.to_dict() for review in reviews]}, 200

#?---------------------UPADTE A REVIEW--------------------------------
@review_routes.route('/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return {'error': 'Review not found'}, 404
    
    if review.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # Debugging: print the form data and errors
    print("Form data received:", form.data)
    print("Form validation errors:", form.errors)

    if form.validate_on_submit():
        review.rating = form.data['rating']
        review.comment = form.data['comment']
        db.session.commit()
        return review.to_dict(), 200

    return {'errors': form.errors}, 400


#?--------------------------GET ALL USER REVIEWS---------------------------
@review_routes.route('/user/<int:user_id>')
def get_user_reviews(user_id):
    reviews = Review.query.filter_by(user_id=user_id).all()
    return {'reviews': [review.to_dict() for review in reviews]}

#?--------------------------DELETE REVIEW---------------------------
@review_routes.route('/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    review = Review.query.get(review_id)

    if not review:
        return {'error': 'Review not found'}, 404

    if review.user_id != current_user.id:
        return {'error': 'Unauthorized'}, 403

    db.session.delete(review)
    db.session.commit()
    return {'message': 'Review deleted'}, 200
