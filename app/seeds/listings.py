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
        },
        {
            'user_id': 5,
            'title': 'Streaming Webcam',
            'description': 'HD webcam with built-in ring light, perfect for streaming.',
            'price': 99.99,
            'quantity': 22,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/StreamingWebcam.png',
        },
        {
            'user_id': 3,
            'title': 'The Last of Us Part II',
            'description': 'A gripping post-apocalyptic action-adventure game.',
            'price': 59.99,
            'quantity': 20,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/Lou2.png',
        },
        {
            'user_id': 2,
            'title': 'Cyberpunk 2077',
            'description': 'An open-world RPG set in a dystopian future.',
            'price': 49.99,
            'quantity': 30,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/Cyberpunk-2077.png',
        },
        {
            'user_id': 4,
            'title': 'Ghost of Tsushima',
            'description': 'An action-adventure game set in feudal Japan.',
            'price': 59.99,
            'quantity': 15,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/ghost-t.png',
        },
        {
            'user_id': 1,
            'title': 'Halo Infinite',
            'description': 'The latest installment in the iconic Halo series.',
            'price': 69.99,
            'quantity': 25,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/halo.png',
        },
        {
            'user_id': 5,
            'title': 'Red Dead Redemption 2',
            'description': 'An epic tale of life in America’s unforgiving heartland.',
            'price': 59.99,
            'quantity': 18,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/red_dead_redemption_2.png',
        },
        {
            'user_id': 2,
            'title': 'Gaming Mouse',
            'description': 'High-precision gaming mouse with adjustable DPI settings.',
            'price': 79.99,
            'quantity': 30,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/Gaming-Pc-Mouse.png',
        },
        {
            'user_id': 4,
            'title': 'Razer GamePad',
            'description': 'Large mouse pad with RGB lighting and non-slip base.',
            'price': 49.99,
            'quantity': 35,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/gamepad.png',
        },
        {
            'user_id': 3,
            'title': 'Ark Survival Ascended',
            'description': 'Survive and defeat dangerous dinosaurs and claim your ground in an open world map.',
            'price': 59.99,
            'quantity': 35,
            'image_url': 'https://capstonebitprojectbucket.s3.amazonaws.com/ArkSurvivalPS5.png',
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
