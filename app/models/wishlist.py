from .db import db, environment, SCHEMA, add_prefix_for_prod

class Wishlist(db.Model):
    __tablename__ = 'wishlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('listings.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())

    user = db.relationship('User', back_populates='wishlist')
    listing = db.relationship('Listing')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'listing_id': self.listing_id,
            'created_at': self.created_at
        }