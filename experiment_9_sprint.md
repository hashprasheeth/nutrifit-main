# Experiment 9: Weekly Sprint Plan

## Sprint Goal
Enhance user profile management and implement nutrition goal calculation algorithms

## Duration
1 week (5 working days)

## Team Members
- Frontend Developer
- Backend Developer
- UI/UX Designer
- QA Tester

## User Stories

### User Profile Enhancement
- **Story**: As a user, I want to set my fitness goals and activity levels so that I can get personalized nutrition recommendations
- **Priority**: High
- **Points**: 8
- **Acceptance Criteria**:
  - User can select from 5 activity levels (sedentary, light, moderate, active, very active)
  - User can set goals (lose weight, maintain, gain weight, gain muscle)
  - Form includes validation for all fields
  - Profile updates are saved correctly to the database

### BMR Calculation Algorithm
- **Story**: As a user, I want my daily calorie needs calculated based on my profile so that I have accurate nutrition targets
- **Priority**: High
- **Points**: 5
- **Acceptance Criteria**:
  - Implement Mifflin-St Jeor Equation for BMR calculation
  - Apply activity level multipliers correctly
  - Adjust calorie needs based on user's goal
  - Ensure reasonable limits for calculated values

### Macronutrient Calculation
- **Story**: As a user, I want personalized macronutrient targets based on my goals so that I can balance my nutrition properly
- **Priority**: Medium
- **Points**: 5
- **Acceptance Criteria**:
  - Calculate protein requirements based on body weight and goals
  - Calculate fat and carbohydrate needs as percentage of total calories
  - Display macronutrient breakdown on dashboard
  - Allow manual adjustment of targets

## Tasks

### Frontend Tasks
1. Create profile form with activity and goal selection (3 points)
2. Implement form validation (2 points)
3. Design macronutrient display components (3 points)
4. Create profile page responsive layout (2 points)

### Backend Tasks
1. Implement BMR calculation function (3 points)
2. Develop activity level multiplier logic (2 points)
3. Create macronutrient calculation algorithms (3 points)
4. Extend profile model with new fields (1 point)
5. Add API endpoints for profile update (2 points)

### Testing Tasks
1. Write unit tests for calculation algorithms (2 points)
2. Test profile form validation (1 point)
3. Create test cases for profile updates (2 points)

## Sprint Review & Demo Items
- Demonstrate profile form with all options
- Show calorie/macro calculations for different user profiles
- Present database structure changes

## Sprint Retrospective Focus
- Evaluate accuracy of nutrition calculations
- Assess form usability and user experience
- Review database schema efficiency

## Implementation Details

### Database Schema Updates
```sql
ALTER TABLE user_profiles
ADD COLUMN activity_level VARCHAR(20),
ADD COLUMN fitness_goal VARCHAR(20),
ADD COLUMN daily_calorie_goal INTEGER,
ADD COLUMN daily_protein_goal INTEGER,
ADD COLUMN daily_carbs_goal INTEGER,
ADD COLUMN daily_fat_goal INTEGER,
ADD COLUMN daily_water_goal INTEGER;
```

### BMR Calculation Implementation
```python
def calculate_bmr(weight, height, age, gender):
    """Calculate BMR using Mifflin-St Jeor Equation"""
    if gender.lower() == "female":
        return (10 * weight) + (6.25 * height) - (5 * age) - 161
    else:
        return (10 * weight) + (6.25 * height) - (5 * age) + 5
        
def apply_activity_multiplier(bmr, activity_level):
    """Apply activity multiplier to BMR"""
    multipliers = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very_active": 1.9
    }
    return bmr * multipliers.get(activity_level.lower(), 1.55)
```

### UI Mockup Details
- Profile form will use a card-based layout with separate sections for personal details and goals
- Activity level selector will include descriptions for each level
- Goal selection will include explanatory tooltips
- Macro distribution will be displayed with both numeric values and percentage bars

## Risk Assessment

### Identified Risks
1. **BMR Calculation Accuracy**: 
   - Risk: Inaccurate BMR calculations leading to inappropriate nutrition recommendations
   - Mitigation: Implement double verification of calculations, include reasonable bounds checks
   - Severity: High
   - Probability: Medium

2. **Data Validation**:
   - Risk: Invalid user inputs causing calculation errors
   - Mitigation: Implement robust form validation on both client and server side
   - Severity: Medium
   - Probability: High

3. **User Experience**:
   - Risk: Complex nutrition concepts might confuse users
   - Mitigation: Include helpful tooltips and explanations for technical terms
   - Severity: Medium
   - Probability: Medium

## Daily Stand-up Notes

### Day 1
- Frontend developer started work on profile form components
- Backend developer completed database schema updates
- UI/UX designer finalized mockups for approval

### Day 2
- Frontend developer completed basic form structure
- Backend developer implemented BMR calculation functions
- Testing framework for algorithms established

### Day 3
- Frontend validation logic implemented
- Activity level and goal selection components completed
- Initial unit tests for BMR calculations passing

### Day 4
- Macronutrient display components development
- API endpoints for profile updates completed
- Integration testing started

### Day 5
- Final UI polishing and responsive design implementation
- Full end-to-end testing of profile update workflow
- Documentation of calculation algorithms completed

## Sprint Transition and Workflow

### Experiment 9 to Experiment 10 Transition

#### Deliverables for Next Sprint
The following outputs from Experiment 9 will serve as inputs for Experiment 10:
1. **User Profile Database Structure**: The enhanced profile schema with nutritional goals will be used to track progress against food intake
2. **Calculated BMR and Nutrition Targets**: These values will be referenced in the food tracking system to show daily progress
3. **Profile UI Components**: Will be reused and extended for the food tracking interface

#### Handover Process
1. **Code Repository**:
   - All code will be merged to the development branch by end of Experiment 9
   - Pull request reviews completed and documentation updated
   - API endpoints for nutritional goals fully tested and ready for consumption

2. **Knowledge Transfer**:
   - Documentation of calculation algorithms provided to Experiment 10 team
   - Walkthrough session scheduled for day 1 of Experiment 10
   - Unit tests available as reference for integration

3. **Dependencies and Prerequisites**:
   - Profile management functionality must be complete before food tracking can be implemented
   - Nutrition calculation accuracy validated by nutritionist consultant
   - Database schema migrations tested in staging environment

#### Key Integration Points
1. The food entry tracking in Experiment 10 will display the user's nutritional targets from Experiment 9
2. Progress tracking will be calculated as percentage of target goals defined in user profiles
3. Macronutrient ratios from profile will inform food recommendations in future sprints 