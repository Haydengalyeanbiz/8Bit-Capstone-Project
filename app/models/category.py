from .db import db, environment, SCHEMA, add_prefix_for_prod
from .listing_category import listing_categories  # Import ListingCategory

class Category(db.Model):
    __tablename__ = 'categories'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)

    listings = db.relationship('Listing', secondary=listing_categories, back_populates='categories')
