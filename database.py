from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
import os

# This will be imported in app.py
db = SQLAlchemy()

def init_db(app):
    # Configure SQLite database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///nutrifit.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize database with app
    db.init_app(app)
    
    # Import models
    from models import User, FoodEntry, UserProfile
    
    # Create tables
    with app.app_context():
        db.create_all() 