from app.models import db, listing_categories, environment, SCHEMA
from sqlalchemy.sql import text

def seed_listing_categories():
    # Sample data for listing_categories
    listing_categories_data = [
        {'listing_id': 1, 'category_id': 3},
        {'listing_id': 1, 'category_id': 7},
        {'listing_id': 2, 'category_id': 2},
        {'listing_id': 2, 'category_id': 7},
        {'listing_id': 3, 'category_id': 4},
        {'listing_id': 3, 'category_id': 7},
        {'listing_id': 4, 'category_id': 5},
        {'listing_id': 4, 'category_id': 6},
        {'listing_id': 5, 'category_id': 6},
        {'listing_id': 5, 'category_id': 2},
        {'listing_id': 6, 'category_id': 6},
        {'listing_id': 6, 'category_id': 5},
        {'listing_id': 7, 'category_id': 5},
        {'listing_id': 7, 'category_id': 7},
        {'listing_id': 8, 'category_id': 5},
        {'listing_id': 8, 'category_id': 6},
        {'listing_id': 9, 'category_id': 5},
        {'listing_id': 9, 'category_id': 6},
        {'listing_id': 10, 'category_id': 5},
        {'listing_id': 10, 'category_id': 6},
        # Add more as needed
    ]

    # Loop through the data and create ListingCategory instances
    for lc_data in listing_categories_data:
        stmt = listing_categories.insert().values(
            listing_id=lc_data['listing_id'],
            category_id=lc_data['category_id']
        )
        db.session.execute(stmt)

    # Commit the transaction to save the data in the database
    db.session.commit()

def undo_listing_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.listing_categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM listing_categories"))
    
    db.session.commit()