from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demo', email='demo@aa.io',
        address='123 Demo Lane, Demo City, DC 12345', password='password')
    marnie = User(
        first_name='Marnie', last_name='Smith', username='marnie', email='marnie@aa.io',
        address='456 Marnie Street, Marnie Town, MT 67890', password='password')
    bobbie = User(
        first_name='Bobbie', last_name='Brown', username='bobbie', email='bobbie@aa.io',
        address='789 Bobbie Blvd, Bobbie City, BC 54321', password='password')

    # Additional users
    alice = User(
        first_name='Alice', last_name='Johnson', username='alice', email='alice@aa.io',
        address='101 Alice Road, Wonderland, WL 11111', password='password')
    john = User(
        first_name='John', last_name='Doe', username='john', email='john@aa.io',
        address='202 John Ave, Johnsville, JS 22222', password='password')
    claire = User(
        first_name='Claire', last_name='Redfield', username='claire', email='claire@aa.io',
        address='303 Claire St, Raccoon City, RC 33333', password='password')
    mike = User(
        first_name='Mike', last_name='Tyson', username='mike', email='mike@aa.io',
        address='404 Mike Lane, Tysonville, TV 44444', password='password')
    sophia = User(
        first_name='Sophia', last_name='Loren', username='sophia', email='sophia@aa.io',
        address='505 Sophia Pl, Loren Town, LT 55555', password='password')
    ethan = User(
        first_name='Ethan', last_name='Hunt', username='ethan', email='ethan@aa.io',
        address='606 Ethan Blvd, Mission City, MC 66666', password='password')
    olivia = User(
        first_name='Olivia', last_name='Benson', username='olivia', email='olivia@aa.io',
        address='707 Olivia St, Law City, LC 77777', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(alice)
    db.session.add(john)
    db.session.add(claire)
    db.session.add(mike)
    db.session.add(sophia)
    db.session.add(ethan)
    db.session.add(olivia)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
