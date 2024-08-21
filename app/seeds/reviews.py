from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    reviews = [
        # Reviews for Listing 1
        {
            'user_id': 1,
            'listing_id': 1,
            'rating': 5,
            'comment': 'Amazing product! Highly recommend.',
        },
        {
            'user_id': 2,
            'listing_id': 1,
            'rating': 4,
            'comment': 'Good quality but a bit pricey.',
        },

        # Reviews for Listing 2
        {
            'user_id': 1,
            'listing_id': 2,
            'rating': 5,
            'comment': 'Absolutely love this! Worth every penny.',
        },
        {
            'user_id': 3,
            'listing_id': 2,
            'rating': 3,
            'comment': 'Not bad, but I expected more.',
        },

        # Reviews for Listing 3
        {
            'user_id': 2,
            'listing_id': 3,
            'rating': 4,
            'comment': 'Very satisfied with the purchase.',
        },
        {
            'user_id': 3,
            'listing_id': 3,
            'rating': 5,
            'comment': 'Exceeded my expectations!',
        },

        # Reviews for Listing 4
        {
            'user_id': 1,
            'listing_id': 4,
            'rating': 4,
            'comment': 'Great product, will buy again.',
        },
        {
            'user_id': 2,
            'listing_id': 4,
            'rating': 3,
            'comment': 'It’s okay, not the best.',
        },

        # Reviews for Listing 5
        {
            'user_id': 3,
            'listing_id': 5,
            'rating': 5,
            'comment': 'Best product I’ve bought this year!',
        },
        {
            'user_id': 2,
            'listing_id': 5,
            'rating': 4,
            'comment': 'Very good, but shipping was slow.',
        },

        # Reviews for Listing 6
        {
            'user_id': 1,
            'listing_id': 6,
            'rating': 3,
            'comment': 'The product is average, expected more.',
        },
        {
            'user_id': 3,
            'listing_id': 6,
            'rating': 5,
            'comment': 'Perfect, just what I needed!',
        },

        # Reviews for Listing 7
        {
            'user_id': 2,
            'listing_id': 7,
            'rating': 5,
            'comment': 'Amazing value for the price!',
        },
        {
            'user_id': 1,
            'listing_id': 7,
            'rating': 4,
            'comment': 'Very good, but had minor issues.',
        },

        # Reviews for Listing 8
        {
            'user_id': 3,
            'listing_id': 8,
            'rating': 4,
            'comment': 'Good quality, but could be better.',
        },
        {
            'user_id': 2,
            'listing_id': 8,
            'rating': 5,
            'comment': 'Exceeded all my expectations!',
        },

        # Reviews for Listing 9
        {
            'user_id': 1,
            'listing_id': 9,
            'rating': 4,
            'comment': 'Solid product, would recommend.',
        },
        {
            'user_id': 3,
            'listing_id': 9,
            'rating': 3,
            'comment': 'It’s okay, but I’ve seen better.',
        },

        # Reviews for Listing 10
        {
            'user_id': 2,
            'listing_id': 10,
            'rating': 5,
            'comment': 'Incredible product, worth every cent!',
        },
        {
            'user_id': 1,
            'listing_id': 10,
            'rating': 4,
            'comment': 'Great product, but shipping was delayed.',
        },
    ]

    for review_data in reviews:
        review = Review(
            user_id=review_data['user_id'],
            listing_id=review_data['listing_id'],
            rating=review_data['rating'],
            comment=review_data['comment']
        )
        db.session.add(review)

    db.session.commit()

def undo_reviews():
    if environment == "production":
        # For production environments (PostgreSQL, etc.)
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        # For development environments (SQLite)
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
