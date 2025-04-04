from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_login import LoginManager, login_user, login_required, logout_user, current_user
import os
from dotenv import load_dotenv
from database import db, init_db
from models import User, UserProfile, FoodEntry, WaterIntake
from datetime import datetime, date
from together_ai import get_nutrition_recommendation, analyze_food, analyze_user_needs

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'your-secret-key')

# Initialize database
init_db(app)

# Flask-Login setup
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template('index.html', current_year=datetime.now().year)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user)
            
            # Check if profile is complete
            if user.profile and user.profile.is_complete():
                return redirect(url_for('dashboard'))
            else:
                flash('Please complete your profile to continue', 'info')
                return redirect(url_for('profile'))
        else:
            flash('Invalid credentials', 'error')
    
    return render_template('login.html', current_year=datetime.now().year)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        if password != confirm_password:
            flash('Passwords do not match', 'error')
            return render_template('signup.html', error='Passwords do not match', current_year=datetime.now().year)
        
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already registered', 'error')
            return render_template('signup.html', error='Email already registered', current_year=datetime.now().year)
        
        new_user = User(email=email)
        new_user.set_password(password)
        
        db.session.add(new_user)
        db.session.commit()
        
        # Create default user profile
        default_profile = UserProfile(
            user_id=new_user.id,
            daily_calorie_goal=2000,
            daily_protein_goal=150,
            daily_carbs_goal=250,
            daily_fat_goal=70,
            daily_water_goal=2000,  # default 2L water goal
            is_profile_complete=False
        )
        
        db.session.add(default_profile)
        db.session.commit()
        
        # Log the user in
        login_user(new_user)
        
        # Redirect to profile page to complete setup
        flash('Registration successful! Please complete your profile to continue.', 'success')
        return redirect(url_for('profile'))
    
    return render_template('signup.html', current_year=datetime.now().year)

@app.route('/dashboard')
@login_required
def dashboard():
    # Check if profile is complete
    if not current_user.profile or not current_user.profile.is_complete():
        flash('Please complete your profile to continue', 'info')
        return redirect(url_for('profile'))
    
    # Get today's food entries
    today = date.today()
    food_entries = FoodEntry.query.filter_by(user_id=current_user.id, date=today).all()
    
    # Get user profile
    user_profile = current_user.profile
    
    # Get today's water intake
    water_intake = WaterIntake.query.filter_by(user_id=current_user.id, date=today).first()
    if not water_intake:
        water_intake = WaterIntake(
            user_id=current_user.id,
            amount=0,
            date=today
        )
        db.session.add(water_intake)
        db.session.commit()
    
    # Calculate total nutrition for today
    total_calories = sum(entry.calories for entry in food_entries)
    total_protein = sum(entry.protein for entry in food_entries)
    total_carbs = sum(entry.carbs for entry in food_entries)
    total_fat = sum(entry.fat for entry in food_entries)
    
    # Get AI recommendation if we have entries
    recommendation = None
    if food_entries and user_profile:
        recommendation = get_nutrition_recommendation(user_profile, food_entries[-3:])
    
    # Check if any nutrition goals are None and calculate them if needed
    calorie_goal = user_profile.daily_calorie_goal
    protein_goal = user_profile.daily_protein_goal
    carbs_goal = user_profile.daily_carbs_goal
    fat_goal = user_profile.daily_fat_goal
    water_goal = user_profile.daily_water_goal
    
    # If any goals are missing, calculate default goals
    if not all([calorie_goal, protein_goal, carbs_goal, fat_goal, water_goal]):
        default_goals = calculate_default_goals(user_profile)
        
        # Use defaults for any missing goals
        calorie_goal = calorie_goal or default_goals["daily_calorie_goal"]
        protein_goal = protein_goal or default_goals["daily_protein_goal"]
        carbs_goal = carbs_goal or default_goals["daily_carbs_goal"]
        fat_goal = fat_goal or default_goals["daily_fat_goal"]
        water_goal = water_goal or default_goals["daily_water_goal"]
        
        # Update the user profile with the calculated goals
        update_needed = False
        if not user_profile.daily_calorie_goal:
            user_profile.daily_calorie_goal = calorie_goal
            update_needed = True
        if not user_profile.daily_protein_goal:
            user_profile.daily_protein_goal = protein_goal
            update_needed = True
        if not user_profile.daily_carbs_goal:
            user_profile.daily_carbs_goal = carbs_goal
            update_needed = True
        if not user_profile.daily_fat_goal:
            user_profile.daily_fat_goal = fat_goal
            update_needed = True
        if not user_profile.daily_water_goal:
            user_profile.daily_water_goal = water_goal
            update_needed = True
            
        if update_needed:
            db.session.commit()
            flash('Your nutrition goals have been automatically set based on your profile information.', 'info')
    
    return render_template(
        'dashboard.html',
        total_calories=total_calories,
        total_protein=total_protein,
        total_carbs=total_carbs,
        total_fat=total_fat,
        calorie_goal=calorie_goal,
        protein_goal=protein_goal,
        carbs_goal=carbs_goal,
        fat_goal=fat_goal,
        water_amount=water_intake.amount,
        water_goal=water_goal,
        recommendation=recommendation,
        food_entries=food_entries,
        show_needs_dialog=session.pop('show_needs_dialog', False),
        current_year=datetime.now().year
    )

@app.route('/add_food', methods=['POST'])
@login_required
def add_food():
    name = request.form.get('food-name')
    calories = int(request.form.get('calories', 0))
    protein = float(request.form.get('protein', 0))
    carbs = float(request.form.get('carbs', 0))
    fat = float(request.form.get('fat', 0))
    
    new_entry = FoodEntry(
        user_id=current_user.id,
        name=name,
        calories=calories,
        protein=protein,
        carbs=carbs,
        fat=fat,
        date=date.today()
    )
    
    db.session.add(new_entry)
    db.session.commit()
    
    flash('Food added successfully!', 'success')
    return redirect(url_for('dashboard'))

@app.route('/add_water', methods=['POST'])
@login_required
def add_water():
    amount = int(request.form.get('water_amount', 0))
    
    today = date.today()
    water_intake = WaterIntake.query.filter_by(user_id=current_user.id, date=today).first()
    
    if water_intake:
        water_intake.amount += amount
    else:
        water_intake = WaterIntake(
            user_id=current_user.id,
            amount=amount,
            date=today
        )
        db.session.add(water_intake)
    
    db.session.commit()
    
    flash('Water intake updated!', 'success')
    return redirect(url_for('dashboard'))

@app.route('/analyze_food', methods=['POST'])
@login_required
def analyze_food_route():
    food_description = request.form.get('food_description')
    if not food_description:
        return jsonify({'error': 'No food description provided'}), 400
    
    # Use Together AI to analyze the food
    nutrition = analyze_food(food_description)
    
    return jsonify(nutrition)

@app.route('/analyze_user_needs', methods=['GET'])
@login_required
def analyze_user_needs_route():
    # Get user profile
    user_profile = current_user.profile
    
    if not user_profile:
        return jsonify({'error': 'Profile not found'}), 404
    
    # Use Together AI to analyze user needs
    needs = analyze_user_needs(user_profile)
    
    return jsonify(needs)

@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    user_profile = current_user.profile
    
    if not user_profile:
        user_profile = UserProfile(
            user_id=current_user.id,
            daily_calorie_goal=2000,
            daily_protein_goal=150,
            daily_carbs_goal=250,
            daily_fat_goal=70,
            daily_water_goal=2000,
            is_profile_complete=False
        )
        db.session.add(user_profile)
        db.session.commit()
    
    if request.method == 'POST':
        # Update profile
        user_profile.name = request.form.get('name')
        user_profile.age = request.form.get('age', type=int)
        user_profile.weight = request.form.get('weight', type=float)
        user_profile.height = request.form.get('height', type=float)
        user_profile.gender = request.form.get('gender')
        user_profile.activity_level = request.form.get('activity_level')
        user_profile.goal = request.form.get('goal')
        user_profile.daily_calorie_goal = request.form.get('daily_calorie_goal', type=int)
        user_profile.daily_protein_goal = request.form.get('daily_protein_goal', type=int)
        user_profile.daily_carbs_goal = request.form.get('daily_carbs_goal', type=int)
        user_profile.daily_fat_goal = request.form.get('daily_fat_goal', type=int)
        user_profile.daily_water_goal = request.form.get('daily_water_goal', type=int)
        
        # Check if profile is complete
        is_complete = bool(
            user_profile.name and
            user_profile.age and
            user_profile.weight and
            user_profile.height and
            user_profile.gender and
            user_profile.activity_level and
            user_profile.goal
        )
        
        was_incomplete = not user_profile.is_profile_complete
        user_profile.is_profile_complete = is_complete
        
        db.session.commit()
        
        if is_complete and was_incomplete:
            # Set session flag to show the needs dialog
            session['show_needs_dialog'] = True
            flash('Profile completed! Here are your personalized recommendations.', 'success')
        else:
            flash('Profile updated successfully!', 'success')
            
        return redirect(url_for('dashboard'))
    
    # Calculate BMI and category if height and weight are available
    bmi = None
    bmi_category = None
    bmi_message = None
    
    if user_profile.height and user_profile.weight:
        height_m = user_profile.height / 100  # Convert cm to m
        bmi = round(user_profile.weight / (height_m * height_m), 1)
        
        if bmi < 18.5:
            bmi_category = 'underweight'
            bmi_message = 'Underweight - Consider increasing calorie intake.'
        elif bmi < 25:
            bmi_category = 'normal'
            bmi_message = 'Normal weight - Maintain your healthy habits!'
        elif bmi < 30:
            bmi_category = 'overweight'
            bmi_message = 'Overweight - Consider a balanced diet and regular exercise.'
        else:
            bmi_category = 'obese'
            bmi_message = 'Obese - Consult with a healthcare professional for guidance.'
    
    return render_template('profile.html', user_profile=user_profile, bmi=bmi, bmi_category=bmi_category, bmi_message=bmi_message, current_year=datetime.now().year)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/analytics')
@login_required
def analytics():
    # In the future, this will fetch real data from the database
    # For now, we'll use dummy data for the charts
    return render_template('analytics.html', current_year=datetime.now().year)

# Helper function to calculate default nutrition goals
def calculate_default_goals(user_profile):
    """Calculate default nutrition goals based on user profile if not already set"""
    # Get user details
    weight = user_profile.weight or 70  # Default to 70kg if not set
    height = user_profile.height or 170  # Default to 170cm if not set
    age = user_profile.age or 30  # Default to 30 years if not set
    gender = user_profile.gender or "male"  # Default to male if not set
    activity_level = user_profile.activity_level or "moderate"  # Default to moderate if not set
    
    # Basic BMR calculation using Mifflin-St Jeor Equation
    if gender == "male":
        bmr = 10 * weight + 6.25 * height - 5 * age + 5
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
    
    # Activity multiplier
    activity_multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very_active": 1.9
    }
    
    multiplier = activity_multipliers.get(activity_level, 1.55)
    daily_calories = int(bmr * multiplier)
    
    # Calculate macros based on standard distribution (protein: 25%, carbs: 50%, fat: 25%)
    daily_protein = int(weight * 1.6)  # ~1.6g per kg of body weight
    daily_carbs = int((daily_calories * 0.5) / 4)  # 50% of calories from carbs, 4 calories per gram
    daily_fat = int((daily_calories * 0.25) / 9)  # 25% of calories from fat, 9 calories per gram
    
    # Water calculation (standard recommendation is 35ml per kg of body weight)
    daily_water = int(weight * 35)
    
    return {
        "daily_calorie_goal": daily_calories,
        "daily_protein_goal": daily_protein,
        "daily_carbs_goal": daily_carbs,
        "daily_fat_goal": daily_fat,
        "daily_water_goal": daily_water
    }

if __name__ == '__main__':
    app.run(debug=True) 