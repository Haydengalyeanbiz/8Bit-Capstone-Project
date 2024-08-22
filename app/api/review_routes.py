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

    if form.validate_on_submit():
        new_review = Review(
            user_id=current_user.id,
            listing_id=listing_id,
            rating=form.data['rating'],
            comment=form.data['comment']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
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

    if form.validate_on_submit():
        review.rating = form.data['rating']
        review.comment = form.data['comment']
        db.session.commit()
        return review.to_dict(), 200
    return {'errors': form.errors}, 400

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
