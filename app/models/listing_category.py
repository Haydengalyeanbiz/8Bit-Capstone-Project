from .db import db, environment, SCHEMA, add_prefix_for_prod

class ListingCategory(db.Model):
    __tablename__ = add_prefix_for_prod('listing_categories')

    id = db.Column(db.Integer, primary_key=True)
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('listings.id')))
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')))
