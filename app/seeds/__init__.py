from flask.cli import AppGroup
from .users import seed_users, undo_users
from .listings import seed_listings, undo_listings
from .categories import seed_categories, undo_categories
from .listing_categories import seed_listing_categories, undo_listing_categories
from .reviews import seed_reviews, undo_reviews

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Only undo if we are in production, or adjust as needed for other environments
    if environment == 'production':
        undo_reviews()
        undo_listing_categories()
        undo_categories()
        undo_listings()
        undo_users()
    # Seed data after undoing old data
    seed_users()
    seed_listings()
    seed_categories()
    seed_listing_categories()
    seed_reviews()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_reviews()
    undo_listing_categories()
    undo_listings()
    undo_categories()
    undo_users()