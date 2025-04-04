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
        "chicken breast": {"calories": 165, "protein": 31, "carbs": 0, "fat": 3.6, "per_100g": True},
        "rice": {"calories": 130, "protein": 2.7, "carbs": 28, "fat": 0.3, "per_100g": True},
        "potato": {"calories": 77, "protein": 2, "carbs": 17, "fat": 0.1, "per_100g": True},
        "egg": {"calories": 72, "protein": 6.3, "carbs": 0.4, "fat": 5, "per_unit": True},
        "apple": {"calories": 52, "protein": 0.3, "carbs": 14, "fat": 0.2, "per_100g": True},
        "banana": {"calories": 89, "protein": 1.1, "carbs": 23, "fat": 0.3, "per_unit": True},
        "beef": {"calories": 250, "protein": 26, "carbs": 0, "fat": 17, "per_100g": True},
        "salmon": {"calories": 208, "protein": 20, "carbs": 0, "fat": 13, "per_100g": True},
        "pasta": {"calories": 131, "protein": 5, "carbs": 25, "fat": 1.1, "per_100g": True},
        "bread": {"calories": 265, "protein": 9, "carbs": 49, "fat": 3.2, "per_100g": True},
        "oatmeal": {"calories": 389, "protein": 16.9, "carbs": 66, "fat": 6.9, "per_100g": True},
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
    import re
    
    # Find all food items with quantities
    matches = re.findall(r'([a-zA-Z\s]+)\s*(\d+)\s*(g|grams?|oz|ounce|ml|cups?)?', description)
    
    if matches:
        # Process each food item found
        for food_name, quantity, unit in matches:
            food_name = food_name.strip().lower()
            quantity = float(quantity) if quantity else 100
            
            # Try to find the food in our database
            for db_food in food_db:
                if db_food in food_name:
                    # We found a match
                    food_data = food_db[db_food]
                    
                    # Default multiplier (assuming 100g if not specified)
                    multiplier = 1.0
                    
                    # Adjust for quantity
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
    
    # Only use Together AI if our local database didn't find anything
    if nutrition["calories"] == 0 and TOGETHER_API_KEY:
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

def get_default_needs(profile):
    """Return default nutrition needs based on weight and gender"""
    weight = profile.weight or 70
    
    # Basic defaults
    return {
        "daily_calorie_goal": int(weight * 30),
        "daily_protein_goal": int(weight * 1.6),
        "daily_carbs_goal": int(weight * 4),
        "daily_fat_goal": int(weight * 1),
        "daily_water_goal": 2000,
        "calorie_explanation": "Based on your weight and activity level",
        "macros_explanation": "Protein: 1.6g per kg of body weight, Carbs: 4g per kg, Fat: 1g per kg",
        "water_explanation": "Standard recommendation of 2 liters (2000ml) per day"
    } 