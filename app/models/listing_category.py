from .db import db, environment, SCHEMA, add_prefix_for_prod

listing_categories = db.Table(
    'listing_categories',
    db.Model.metadata,
    db.Column('listing_id', db.Integer, db.ForeignKey(add_prefix_for_prod('listings.id')), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), primary_key=True)
)

if environment == "production":
    listing_categories.schema = SCHEMA
