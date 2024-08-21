from .db import db, environment, SCHEMA, add_prefix_for_prod
from .listing_category import ListingCategory  # Import ListingCategory

class Listing(db.Model):
    __tablename__ = 'listings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.now())

    user = db.relationship('User', back_populates='listings')
    reviews = db.relationship('Review', back_populates='listing', cascade='all, delete-orphan')
    cart_items = db.relationship('CartItem', back_populates='listing', cascade="all, delete-orphan")
    categories = db.relationship('Category', secondary=ListingCategory.__tablename__, back_populates='listings')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'price': str(self.price), 
            'quantity': self.quantity,
            'image_url': self.image_url,
            'categories': [category.name for category in self.categories],
        }