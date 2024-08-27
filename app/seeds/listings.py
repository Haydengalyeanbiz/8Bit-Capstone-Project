from app.models import db, Listing, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_listings():
    # Sample data for listings
    listings_data = [
        {
            'user_id': 1,  
            'title': 'PlayStation 5',
            'description': 'A brand new PlayStation 5 console.',
            'price': 499.99,
            'quantity': 5,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/playstation-5.png',
        },
        {
            'user_id': 1,
            'title': 'Xbox Series X',
            'description': 'A brand new Xbox Series X console.',
            'price': 499.99,
            'quantity': 5,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/xbox-white.png',
        },
        {
            'user_id': 2,
            'title': 'Nintendo Switch',
            'description': 'A brand new Nintendo Switch console.',
            'price': 299.99,
            'quantity': 10,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/nintendo-switch.png',
        },
         {
            'user_id': 2,
            'title': 'PC Gaming Setup',
            'description': 'A high-end PC gaming setup.',
            'price': 1499.99,
            'quantity': 3,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/gaming-setup.png',
        },
         {
            'user_id': 2,
            'title': 'Xbox Controller',
            'description': 'A brand new Xbox controller',
            'price': 59.99,
            'quantity': 10,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/xbox-controller.png',
        },
        {
            'user_id': 3,
            'title': 'Gaming Headset',
            'description': 'A top-quality gaming headset.',
            'price': 99.99,
            'quantity': 15,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/Gaming-Headset-Transparent.png',
        },
        {
            'user_id': 3,
            'title': 'Gaming Chair',
            'description': 'A comfortable gaming chair.',
            'price': 199.99,
            'quantity': 8,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/gaming-chair.png',
        },
        {
            'user_id': 4,
            'title': 'VR Headset',
            'description': 'An immersive VR headset.',
            'price': 399.99,
            'quantity': 7,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/vr-headset.png',
        },
         {
            'user_id': 4,
            'title': 'Gaming Monitor',
            'description': 'A 4K gaming monitor.',
            'price': 299.99,
            'quantity': 12,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/gmaing-monitor.png',
        },
         {
            'user_id': 5,
            'title': 'Gaming Keyboard',
            'description': 'A mechanical gaming keyboard.',
            'price': 129.99,
            'quantity': 10,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/gaming-keyboard.png',
        },
        {
            'user_id': 5,
            'title': 'Gaming Desk',
            'description': 'A sturdy pc gaming desk.',
            'price': 499.99,
            'quantity': 10,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/gaming-desk.png',
        }
    ]
    for listing_data in listings_data:
        listing = Listing(
            user_id=listing_data['user_id'],
            title=listing_data['title'],
            description=listing_data['description'],
            price=listing_data['price'],
            quantity=listing_data['quantity'],
            image_url=listing_data['image_url']
        )
        db.session.add(listing)
    db.session.commit()

def undo_listings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.listings RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.listing_categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM listings"))
        db.session.execute(text("DELETE FROM listing_categories"))
        
    db.session.commit()
