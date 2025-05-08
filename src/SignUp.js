// User context for handling user information across the application
export const storeUserSignupData = (userData) => {
  localStorage.setItem('userFirstName', userData.firstName);
  localStorage.setItem('userLastName', userData.lastName);
  localStorage.setItem('userEmail', userData.email);
  localStorage.setItem('isNewUser', 'true');
  localStorage.setItem('isSetupComplete', 'false');
  
  // Clear any previous tour or setup dismissal flags for new signups
  localStorage.removeItem('tourCompleted');
  localStorage.removeItem('setupMessageDismissed');
};

export const getUserData = () => {
  return {
    firstName: localStorage.getItem('userFirstName') || 'User',
    lastName: localStorage.getItem('userLastName') || '',
    email: localStorage.getItem('userEmail') || '',
    gender: localStorage.getItem('userGender') || 'male',
    dateOfBirth: localStorage.getItem('userDateOfBirth') || '1990-06-15',
    height: localStorage.getItem('userHeight') || '175',
    weight: localStorage.getItem('userWeight') || '70',
    goalType: localStorage.getItem('userGoalType') || 'lose',
    activityLevel: localStorage.getItem('userActivityLevel') || 'moderate',
    isNewUser: localStorage.getItem('isNewUser') === 'true',
    isSetupComplete: localStorage.getItem('isSetupComplete') === 'true'
  };
};

export const completeUserSetup = () => {
  localStorage.setItem('isNewUser', 'false');
  localStorage.setItem('isSetupComplete', 'true');
};

// Calculate calorie and nutrient targets based on user data
export const calculateNutritionTargets = (userData) => {
  // Parse user data
  const weight = parseFloat(userData.weight);
  const height = parseFloat(userData.height);
  const age = calculateAge(userData.dateOfBirth);
  const isMale = userData.gender === 'male';
  
  // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
  let bmr;
  if (isMale) {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  // Apply activity multiplier
  const activityMultipliers = {
    sedentary: 1.2,    // Little or no exercise
    light: 1.375,      // Light exercise 1-3 days/week
    moderate: 1.55,    // Moderate exercise 3-5 days/week
    active: 1.725,     // Hard exercise 6-7 days/week
    very_active: 1.9   // Very hard exercise & physical job or 2x training
  };
  
  const multiplier = activityMultipliers[userData.activityLevel] || activityMultipliers.moderate;
  let maintenanceCalories = Math.round(bmr * multiplier);
  
  // Adjust based on goal type
  let goalCalories;
  switch (userData.goalType) {
    case 'lose':
      goalCalories = Math.round(maintenanceCalories * 0.8); // 20% deficit
      break;
    case 'gain':
      goalCalories = Math.round(maintenanceCalories * 1.15); // 15% surplus
      break;
    case 'maintain':
    default:
      goalCalories = maintenanceCalories;
  }
  
  // Calculate macronutrient targets based on goal
  let proteinTarget, carbsTarget, fatTarget;
  
  if (userData.goalType === 'lose') {
    // Higher protein for weight loss (30% protein, 35% carbs, 35% fat)
    proteinTarget = Math.round((goalCalories * 0.3) / 4); // 4 calories per gram of protein
    carbsTarget = Math.round((goalCalories * 0.35) / 4);  // 4 calories per gram of carbs
    fatTarget = Math.round((goalCalories * 0.35) / 9);    // 9 calories per gram of fat
  } else if (userData.goalType === 'gain') {
    // Higher carbs for muscle gain (25% protein, 50% carbs, 25% fat)
    proteinTarget = Math.round((goalCalories * 0.25) / 4);
    carbsTarget = Math.round((goalCalories * 0.5) / 4);
    fatTarget = Math.round((goalCalories * 0.25) / 9);
  } else {
    // Balanced for maintenance (25% protein, 45% carbs, 30% fat)
    proteinTarget = Math.round((goalCalories * 0.25) / 4);
    carbsTarget = Math.round((goalCalories * 0.45) / 4);
    fatTarget = Math.round((goalCalories * 0.3) / 9);
  }
  
  // Calculate water goal based on weight (ml)
  const waterGoal = Math.round(weight * 35); // 35ml per kg of body weight
  
  return {
    calorieTarget: goalCalories,
    proteinTarget,
    carbsTarget,
    fatTarget,
    waterGoal
  };
};

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirthStr) => {
  if (!dateOfBirthStr) return 30; // Default age
  
  const dob = new Date(dateOfBirthStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age;
}; 