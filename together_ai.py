import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Together AI API configuration
TOGETHER_API_KEY = os.getenv('TOGETHER_API_KEY')
API_URL = "https://api.together.xyz/v1/completions"

def get_nutrition_recommendation(user_profile, recent_foods=None):
    """
    Get personalized nutrition recommendations using Together AI API.
    
    Args:
        user_profile: The user profile with demographics and goals
        recent_foods: List of recent food entries (optional)
        
    Returns:
        A recommendation text
    """
    # Default parameters if not available
    age = user_profile.age or 30
    weight = user_profile.weight or 70
    height = user_profile.height or 170
    gender = user_profile.gender or "Not specified"
    goal = user_profile.goal or "maintain weight"
    
    # Build prompt
    prompt = f"""
    You are a nutrition expert and personal trainer. 
    Provide a personalized nutrition recommendation for a person with the following details:
    
    Age: {age}
    Weight: {weight} kg
    Height: {height} cm
    Gender: {gender}
    Goal: {goal}
    """
    
    if recent_foods:
        prompt += "\n\nRecent food intake:\n"
        for food in recent_foods:
            prompt += f"- {food.name}: {food.calories} calories, {food.protein}g protein, {food.carbs}g carbs, {food.fat}g fat\n"
    
    prompt += "\nProvide a short, personalized recommendation for what they should eat next based on their goals and current nutrition intake. Include specific food suggestions."
    
    try:
        # Make API request to Together AI
        headers = {
            "Authorization": f"Bearer {TOGETHER_API_KEY}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "mistralai/Mistral-7B-Instruct-v0.2",
            "prompt": prompt,
            "max_tokens": 300,
            "temperature": 0.7,
            "top_p": 0.9
        }
        
        response = requests.post(API_URL, headers=headers, json=data)
        
        if response.status_code == 200:
            result = response.json()
            return result.get('choices', [{}])[0].get('text', '').strip()
        else:
            return f"Error getting recommendation: {response.status_code}"
            
    except Exception as e:
        return f"Error connecting to AI service: {str(e)}"

def analyze_food(food_description):
    """
    Analyze a food item to get its nutritional information using Together AI API.
    If API is unavailable, use a fallback with common food values.
    
    Args:
        food_description: Description of the food
        
    Returns:
        Dictionary with nutritional values
    """
    # Fallback nutrition data for common foods
    food_db = {
        "chicken": {"calories": 165, "protein": 31, "carbs": 0, "fat": 3.6, "per_100g": True},
        "chicken breast": {"calories": 165, "protein": 31, "carbs": 0, "fat": 3.6, "per_100g": True},
        "tuna": {"calories": 132, "protein": 29, "carbs": 0, "fat": 1.0, "per_100g": True},
        "rice": {"calories": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "per_100g": True},
        "potato": {"calories": 77, "protein": 2, "carbs": 17, "fat": 0.1, "per_100g": True},
        "egg": {"calories": 72, "protein": 6.3, "carbs": 0.4, "fat": 5, "per_unit": True},
        "egg white": {"calories": 17, "protein": 3.6, "carbs": 0.2, "fat": 0.1, "per_unit": True},
        "oats": {"calories": 389, "protein": 16.9, "carbs": 66, "fat": 6.9, "per_100g": True},
        "oatmeal": {"calories": 389, "protein": 16.9, "carbs": 66, "fat": 6.9, "per_100g": True},
        "apple": {"calories": 52, "protein": 0.3, "carbs": 14, "fat": 0.2, "per_100g": True},
        "banana": {"calories": 89, "protein": 1.1, "carbs": 23, "fat": 0.3, "per_unit": True},
        "beef": {"calories": 250, "protein": 26, "carbs": 0, "fat": 17, "per_100g": True},
        "salmon": {"calories": 208, "protein": 20, "carbs": 0, "fat": 13, "per_100g": True},
        "pasta": {"calories": 131, "protein": 5, "carbs": 25, "fat": 1.1, "per_100g": True},
        "bread": {"calories": 265, "protein": 9, "carbs": 49, "fat": 3.2, "per_100g": True},
        "milk": {"calories": 42, "protein": 3.4, "carbs": 5, "fat": 1, "per_100ml": True},
        "yogurt": {"calories": 59, "protein": 3.6, "carbs": 5, "fat": 3.1, "per_100g": True},
        "orange": {"calories": 43, "protein": 1, "carbs": 8.3, "fat": 0.2, "per_100g": True},
        "broccoli": {"calories": 34, "protein": 2.8, "carbs": 7, "fat": 0.4, "per_100g": True},
        "carrot": {"calories": 41, "protein": 0.9, "carbs": 10, "fat": 0.2, "per_100g": True},
        "spinach": {"calories": 23, "protein": 2.9, "carbs": 3.6, "fat": 0.4, "per_100g": True},
        "avocado": {"calories": 160, "protein": 2, "carbs": 9, "fat": 15, "per_100g": True},
        "nuts": {"calories": 607, "protein": 21, "carbs": 20, "fat": 54, "per_100g": True},
        "cheese": {"calories": 350, "protein": 26, "carbs": 3.1, "fat": 26, "per_100g": True}
    }
    
    # Try to analyze food locally first
    description = food_description.lower().strip()
    nutrition = {"calories": 0, "protein": 0, "carbs": 0, "fat": 0}
    
    # Parse quantities from description (e.g., "chicken breast 100g, rice 200g")
    # Also handle formats like "6 egg whites, 50 grams of oats", "100 grams of tuna"
    import re
    
    # Handle complex food descriptions by splitting into parts
    food_items = re.split(r',\s*|and\s+', description)
    
    for item in food_items:
        item = item.strip()
        
        # Pattern 2: "100 grams of tuna" or "50 g of oats" (quantity + unit + optional "of" + food)
        match = re.search(r'(\d+)\s+(g|grams?|oz|ounce|ml|cups?)(?:\s+of)?\s+(.+)', item)
        if match:
            quantity = float(match.group(1))
            unit = match.group(2)
            food_name = match.group(3).strip().lower()
            
            # Look for this food in the database
            food_found = False
            for db_food in food_db:
                if db_food in food_name:
                    food_data = food_db[db_food]
                    food_found = True
                    
                    # Adjust for quantity
                    multiplier = 1.0
                    if food_data.get("per_100g") and unit in ["g", "grams", "gram"]:
                        multiplier = quantity / 100.0
                    elif food_data.get("per_100ml") and unit in ["ml"]:
                        multiplier = quantity / 100.0
                    
                    # Add nutrition values
                    nutrition["calories"] += int(food_data["calories"] * multiplier)
                    nutrition["protein"] += round(food_data["protein"] * multiplier, 1)
                    nutrition["carbs"] += round(food_data["carbs"] * multiplier, 1)
                    nutrition["fat"] += round(food_data["fat"] * multiplier, 1)
                    break
            
            if food_found:
                continue  # Continue to next item if we found a match with this pattern
        
        # Pattern 1: "6 egg whites" (quantity + food name)
        match = re.search(r'(\d+)\s+(.+)', item)
        if match:
            quantity = float(match.group(1))
            food_name = match.group(2).strip().lower()
            
            # Special case for egg whites
            if "egg white" in food_name:
                nutrition["calories"] += int(17 * quantity)  # 17 calories per egg white
                nutrition["protein"] += round(3.6 * quantity, 1)  # 3.6g protein per egg white
                nutrition["carbs"] += round(0.2 * quantity, 1)  # 0.2g carbs per egg white
                nutrition["fat"] += round(0.1 * quantity, 1)  # 0.1g fat per egg white
                continue
            
            # Look for this food in the database
            food_found = False
            for db_food in food_db:
                if db_food in food_name:
                    food_data = food_db[db_food]
                    food_found = True
                    if food_data.get("per_unit"):
                        multiplier = quantity
                        
                        # Add nutrition values
                        nutrition["calories"] += int(food_data["calories"] * multiplier)
                        nutrition["protein"] += round(food_data["protein"] * multiplier, 1)
                        nutrition["carbs"] += round(food_data["carbs"] * multiplier, 1)
                        nutrition["fat"] += round(food_data["fat"] * multiplier, 1)
                        break
            
            if food_found:
                continue  # Continue to next item if we found a match with this pattern
        
        # Pattern 3: "chicken breast 100g" (food name + quantity + unit)
        match = re.search(r'([a-zA-Z\s]+)\s*(\d+)\s*(g|grams?|oz|ounce|ml|cups?)?', item)
        if match:
            food_name = match.group(1).strip().lower()
            quantity = float(match.group(2)) if match.group(2) else 100
            unit = match.group(3) if match.group(3) else "g"
            
            # Look for this food in the database
            for db_food in food_db:
                if db_food in food_name:
                    food_data = food_db[db_food]
                    
                    # Adjust for quantity
                    multiplier = 1.0
                    if food_data.get("per_100g") and unit in ["g", "grams", "gram"]:
                        multiplier = quantity / 100.0
                    elif food_data.get("per_100ml") and unit in ["ml"]:
                        multiplier = quantity / 100.0
                    elif food_data.get("per_unit") and not unit:
                        multiplier = quantity
                    
                    # Add nutrition values
                    nutrition["calories"] += int(food_data["calories"] * multiplier)
                    nutrition["protein"] += round(food_data["protein"] * multiplier, 1)
                    nutrition["carbs"] += round(food_data["carbs"] * multiplier, 1)
                    nutrition["fat"] += round(food_data["fat"] * multiplier, 1)
                    break
    
    print(f"Final nutrition values: {nutrition}")  # Debug log
    
    # Only use Together AI if our local database didn't find anything or values are zero
    if nutrition["calories"] == 0 and nutrition["protein"] == 0 and TOGETHER_API_KEY:
        prompt = f"""
        You are a nutrition expert. Given this food description: "{food_description}", 
        estimate its nutritional content with these values:
        - calories (kcal)
        - protein (g)
        - carbs (g)
        - fat (g)
        
        Return ONLY a JSON object with these values, nothing else. Format:
        {{
            "calories": 000,
            "protein": 00.0,
            "carbs": 00.0,
            "fat": 00.0
        }}
        """
        
        try:
            # Make API request to Together AI
            headers = {
                "Authorization": f"Bearer {TOGETHER_API_KEY}",
                "Content-Type": "application/json"
            }
            
            data = {
                "model": "mistralai/Mistral-7B-Instruct-v0.2",
                "prompt": prompt,
                "max_tokens": 150,
                "temperature": 0.3,
                "top_p": 0.9
            }
            
            response = requests.post(API_URL, headers=headers, json=data)
            
            if response.status_code == 200:
                import json
                result = response.json()
                ai_response = result.get('choices', [{}])[0].get('text', '').strip()
                
                # Extract JSON from the response
                try:
                    # Find the JSON part in the response (it may have additional text)
                    start_idx = ai_response.find('{')
                    end_idx = ai_response.rfind('}') + 1
                    
                    if start_idx >= 0 and end_idx > start_idx:
                        json_str = ai_response[start_idx:end_idx]
                        api_nutrition = json.loads(json_str)
                        return api_nutrition
                    else:
                        return nutrition
                except json.JSONDecodeError:
                    return nutrition
            else:
                return nutrition
                
        except Exception as e:
            return nutrition
    
    # If we calculated some nutritional values, return them
    return nutrition

def analyze_user_needs(user_profile):
    """
    Analyze user profile to determine personalized nutrition and water needs.
    
    Args:
        user_profile: The user profile with demographics and goals
        
    Returns:
        Dictionary with personalized nutrition and water recommendations
    """
    # Get user details
    age = user_profile.age or 30
    weight = user_profile.weight or 70
    height = user_profile.height or 170
    gender = user_profile.gender or "Not specified"
    activity_level = user_profile.activity_level or "moderate"
    goal = user_profile.goal or "maintain"
    
    prompt = f"""
    You are a nutrition expert and personal trainer. 
    Given a user with the following profile, calculate their optimal daily calorie intake, macronutrient distribution, and water needs:
    
    Age: {age}
    Weight: {weight} kg
    Height: {height} cm
    Gender: {gender}
    Activity Level: {activity_level}
    Goal: {goal}
    
    Important guidelines:
    - Calorie recommendations should be between 1200-3500 calories per day
    - Water intake should be between 1500-4000ml per day (1.5-4 liters)
    - Protein should be between 1.2-2.2g per kg of body weight
    - Fat should be 25-35% of total calories
    - Remaining calories should come from carbohydrates
    
    Return ONLY a JSON object with these values and a brief explanation for each. Format:
    {{
        "daily_calorie_goal": 0000,
        "daily_protein_goal": 000,
        "daily_carbs_goal": 000,
        "daily_fat_goal": 000,
        "daily_water_goal": 0000,
        "calorie_explanation": "Brief explanation of calorie calculation",
        "macros_explanation": "Brief explanation of macronutrient distribution",
        "water_explanation": "Brief explanation of water intake recommendation"
    }}
    """
    
    try:
        # Make API request to Together AI
        headers = {
            "Authorization": f"Bearer {TOGETHER_API_KEY}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "mistralai/Mistral-7B-Instruct-v0.2",
            "prompt": prompt,
            "max_tokens": 500,
            "temperature": 0.3,
            "top_p": 0.9
        }
        
        response = requests.post(API_URL, headers=headers, json=data)
        
        if response.status_code == 200:
            result = response.json()
            ai_response = result.get('choices', [{}])[0].get('text', '').strip()
            
            # Extract JSON from the response
            try:
                # Find the JSON part in the response
                start_idx = ai_response.find('{')
                end_idx = ai_response.rfind('}') + 1
                
                if start_idx >= 0 and end_idx > start_idx:
                    json_str = ai_response[start_idx:end_idx]
                    needs = json.loads(json_str)
                    
                    # Validate and correct the values if needed
                    needs = validate_nutrition_values(needs, weight)
                    return needs
                else:
                    # Return reasonable defaults if JSON parsing fails
                    return get_default_needs(user_profile)
            except json.JSONDecodeError:
                return get_default_needs(user_profile)
        else:
            return get_default_needs(user_profile)
            
    except Exception as e:
        return get_default_needs(user_profile)

def validate_nutrition_values(needs, weight):
    """Validate nutrition values to ensure they're in a safe range"""
    # Ensure calorie range is reasonable (1200-3500 kcal)
    if "daily_calorie_goal" in needs:
        needs["daily_calorie_goal"] = max(1200, min(int(needs["daily_calorie_goal"]), 3500))
    
    # Ensure water intake is reasonable (1.5-4 liters)
    if "daily_water_goal" in needs:
        needs["daily_water_goal"] = max(1500, min(int(needs["daily_water_goal"]), 4000))
    
    # Ensure protein is reasonable (1.2-2.2g per kg)
    if "daily_protein_goal" in needs:
        max_protein = int(weight * 2.2)
        min_protein = int(weight * 1.2)
        needs["daily_protein_goal"] = max(min_protein, min(int(needs["daily_protein_goal"]), max_protein))
    
    # Ensure fat is reasonable (minimum 15% of calories)
    if "daily_calorie_goal" in needs and "daily_fat_goal" in needs:
        min_fat = int((needs["daily_calorie_goal"] * 0.15) / 9)  # 15% of calories, 9 cal per gram
        max_fat = int((needs["daily_calorie_goal"] * 0.35) / 9)  # 35% of calories
        needs["daily_fat_goal"] = max(min_fat, min(int(needs["daily_fat_goal"]), max_fat))
    
    # Ensure carbs are reasonable (minimum 20% of calories)
    if "daily_calorie_goal" in needs and "daily_carbs_goal" in needs:
        min_carbs = int((needs["daily_calorie_goal"] * 0.20) / 4)  # 20% of calories, 4 cal per gram
        max_carbs = int((needs["daily_calorie_goal"] * 0.65) / 4)  # 65% of calories
        needs["daily_carbs_goal"] = max(min_carbs, min(int(needs["daily_carbs_goal"]), max_carbs))
    
    return needs

def get_default_needs(profile):
    """Return default nutrition needs based on weight and gender"""
    weight = profile.weight or 70
    height = profile.height or 170
    gender = profile.gender or "Not specified"
    activity_level = profile.activity_level or "moderate"
    
    # Calculate BMR using Mifflin-St Jeor Equation
    # Men: BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5
    # Women: BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161
    age = profile.age or 30
    
    if gender.lower() == "female":
        bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161
    else:
        bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5
    
    # Apply activity multiplier
    activity_multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very active": 1.9
    }
    
    multiplier = activity_multipliers.get(activity_level.lower(), 1.55)
    maintenance_calories = int(bmr * multiplier)
    
    # Adjust based on goal
    goal = profile.goal or "maintain"
    if goal.lower() == "lose weight":
        daily_calories = int(maintenance_calories * 0.85)  # 15% deficit
    elif goal.lower() == "gain weight" or goal.lower() == "gain muscle":
        daily_calories = int(maintenance_calories * 1.1)  # 10% surplus
    else:
        daily_calories = maintenance_calories
    
    # Ensure calorie range is reasonable (1200-3500 kcal)
    daily_calories = max(1200, min(daily_calories, 3500))
    
    # Calculate macros based on body weight
    # Protein: 1.6-2.2g per kg for building muscle, 1.2-1.6g for maintenance
    if goal.lower() == "gain muscle":
        protein_per_kg = 2.0
    else:
        protein_per_kg = 1.5
    
    daily_protein = int(weight * protein_per_kg)
    
    # Fat minimum 0.5g per kg of bodyweight, target 25-30% of calories
    fat_calories = daily_calories * 0.3  # 30% of calories from fat
    daily_fat = int(fat_calories / 9)  # 9 calories per gram of fat
    
    # Remaining calories from carbs
    carb_calories = daily_calories - (daily_protein * 4) - (daily_fat * 9)
    daily_carbs = int(carb_calories / 4)  # 4 calories per gram of carbs
    
    # Water intake: Standard recommendation is 30-35ml per kg of body weight
    # but capped at reasonable limits
    daily_water = int(weight * 35)
    daily_water = max(1500, min(daily_water, 4000))  # Reasonable range: 1.5-4 liters
    
    return {
        "daily_calorie_goal": daily_calories,
        "daily_protein_goal": daily_protein,
        "daily_carbs_goal": daily_carbs,
        "daily_fat_goal": daily_fat,
        "daily_water_goal": daily_water,
        "calorie_explanation": f"Based on your BMR and activity level, adjusted for your goal to {goal}.",
        "macros_explanation": f"Protein: {protein_per_kg}g per kg of body weight, 30% of calories from fat, and remaining from carbs.",
        "water_explanation": f"35ml per kg of body weight, ensuring a healthy intake range."
    } 