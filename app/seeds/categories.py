from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():
    # Define categories to be added
    categories = [
        'Games', #1
        'Xbox', #2
        'PlayStation', #3
        'Nintendo', #4
        'PC', #5
        'Accessories', #6
        'Console' #7
    ]
    
    # Create Category instances and add them to the session
    for name in categories:
        category = Category(name=name)
        db.session.add(category)

    # Commit the transaction to save the categories in the database
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))
        
    db.session.commit()