import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  pageVariants, 
  staggerContainer, 
  staggerItem, 
  slideInUp, 
  slideInLeft,
  slideInRight,
  fadeIn,
  buttonHover,
  cardHover
} from '../utils/animations';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
} from 'chart.js';
import { getUserData, calculateNutritionTargets } from '../SignUp';

// Register ChartJS components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

const DashboardContainer = styled(motion.div)`
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeCard = styled(motion.div)`
  background: linear-gradient(
    135deg, 
    ${props => props.theme.colors.primary} 0%, 
    ${props => props.theme.colors.primaryDark} 100%
  );
  color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${props => props.theme.shadows.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

const WelcomeContent = styled.div`
  flex: 1;
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ActionButton = styled(motion.button)`
  background-color: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all ${props => props.theme.animation.fast} ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(6, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.small};
  height: 100%;
`;

const MacroCard = styled(Card)`
  grid-column: span 4;
  
  @media (max-width: 992px) {
    grid-column: span 6;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const WaterCard = styled(Card)`
  grid-column: span 4;
  
  @media (max-width: 992px) {
    grid-column: span 6;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const RecommendationCard = styled(Card)`
  grid-column: span 4;
  
  @media (max-width: 992px) {
    grid-column: span 6;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const MealHistoryCard = styled(Card)`
  grid-column: span 6;
  
  @media (max-width: 992px) {
    grid-column: span 6;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const CaloriesCard = styled(Card)`
  grid-column: span 6;
  
  @media (max-width: 992px) {
    grid-column: span 6;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const ChartContainer = styled.div`
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MacroInfo = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
`;

const MacroItem = styled.div`
  text-align: center;
`;

const MacroValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const MacroLabel = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const WaterProgress = styled.div`
  margin-top: 1rem;
`;

const ProgressBar = styled.div`
  height: 16px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.full};
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(
    90deg, 
    ${props => props.theme.colors.accent} 0%, 
    ${props => props.theme.colors.accentLight} 100%
  );
  border-radius: ${props => props.theme.borderRadius.full};
  width: ${props => props.progress}%;
`;

const WaterActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const WaterButton = styled(motion.button)`
  background-color: ${props => props.theme.colors.backgroundAlt};
  border: none;
  color: ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 0.5rem;
  cursor: pointer;
  flex: 1;
  transition: all ${props => props.theme.animation.fast} ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.accentLight};
    color: white;
  }
`;

const RecommendationContent = styled.div`
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-top: 1rem;
  position: relative;
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const RecommendationText = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.textSecondary};
`;

const MealList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.5rem;
  
  &::-webkit-scrollbar {
    width: 5px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.backgroundAlt};
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 10px;
  }
`;

const MealItem = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.medium};
  
  &:hover {
    background-color: ${props => `${props.theme.colors.backgroundAlt}80`};
  }
`;

const MealInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const MealIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => `${props.theme.colors.primary}30`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.primary};
`;

const MealDetails = styled.div``;

const MealName = styled.div`
  font-weight: 500;
`;

const MealMacros = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const MealCalories = styled.div`
  font-weight: 600;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled(motion.div)`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: ${props => props.theme.shadows.large};
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
  font-size: 1.5rem;
  
  &:hover {
    color: ${props => props.theme.colors.text};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 500;
  cursor: pointer;
  transition: all ${props => props.theme.animation.fast} ease;
`;

const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundAlt};
  }
`;

const SetupCompleteMessage = styled(motion.div)`
  background-color: ${props => props.theme.colors.success};
  color: white;
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    font-size: 2rem;
    flex-shrink: 0;
  }
  
  div {
    flex: 1;
  }
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1rem;
    opacity: 0.9;
  }
  
  button {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    opacity: 0.7;
    
    &:hover {
      opacity: 1;
    }
  }
`;

// Add new components for the tour feature
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TourPopup = styled(motion.div)`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 2rem;
  max-width: 480px;
  position: fixed;
  z-index: 1100;
  box-shadow: ${props => props.theme.shadows.large};
`;

const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const PopupTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;

const PopupContent = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const PopupButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TourHighlight = styled.div`
  position: absolute;
  border: 2px dashed ${props => props.theme.colors.primary};
  border-radius: 8px;
  z-index: 1050;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;

// Add animated statistic components
const StatValue = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: ${props => props.theme.colors.primary};
  margin: 1rem 0;
`;

const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  text-align: center;
`;

const AnimatedBar = styled(motion.div)`
  height: 8px;
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.primary} 0%,
    ${props => props.theme.colors.accent} 100%
  );
  border-radius: 4px;
  margin-top: 0.5rem;
  width: 100%;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  height: 100%;
  min-height: 200px;
`;

const EmptyStateIcon = styled(motion.div)`
  font-size: 3rem;
  color: ${props => props.theme.colors.border};
  margin-bottom: 1rem;
`;

const EmptyStateText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

// Animated counter component
const AnimatedCounter = ({ value, duration = 2, decimals = 0 }) => {
  const nodeRef = useRef(null);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const step = end / (duration * 60); // 60 frames per second for smooth animation
    
    if (start === end) return;
    
    const timer = setInterval(() => {
      start += step;
      setCounter(Math.min(start, end));
      if (start >= end) clearInterval(timer);
    }, 1000/60);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <span ref={nodeRef}>{counter.toFixed(decimals)}</span>;
};

// Add new styled components for progress bars
const NutrientProgressBar = styled.div`
  height: 8px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.full};
  margin: 0.5rem 0;
  position: relative;
  overflow: hidden;
`;

const NutrientProgressFill = styled(motion.div)`
  height: 100%;
  background: ${props => props.color || props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  width: ${props => Math.min(props.progress, 100)}%;
`;

const NutrientProgressContainer = styled.div`
  margin-top: 0.5rem;
`;

const NutrientProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  
  span:last-child {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const GoalSummary = styled.div`
  background-color: ${props => props.theme.colors.backgroundAlt};
  padding: 1rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-top: 1rem;
  border-left: 4px solid ${props => props.theme.colors.primary};
`;

const GoalSummaryText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Dashboard = () => {
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodEntries, setFoodEntries] = useState([]);
  const userData = getUserData();
  const [showSetupComplete, setShowSetupComplete] = useState(userData.isSetupComplete && !localStorage.getItem('setupMessageDismissed'));
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Animation controls
  const statsControls = useAnimation();
  
  const nutritionTargets = calculateNutritionTargets(userData);
  
  // Calculate total calories and macros from food entries
  const totalCalories = foodEntries.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = foodEntries.reduce((sum, food) => {
    // Handle both number values and string values with 'g' suffix
    const proteinValue = typeof food.protein === 'number' 
      ? food.protein 
      : parseFloat(food.protein?.replace('g', '') || '0');
    return sum + proteinValue;
  }, 0);
  
  const totalCarbs = foodEntries.reduce((sum, food) => {
    // Handle both number values and string values with 'g' suffix
    const carbsValue = typeof food.carbs === 'number' 
      ? food.carbs 
      : parseFloat(food.carbs?.replace('g', '') || '0');
    return sum + carbsValue;
  }, 0);
  
  const totalFat = foodEntries.reduce((sum, food) => {
    // Handle both number values and string values with 'g' suffix
    const fatValue = typeof food.fat === 'number' 
      ? food.fat 
      : parseFloat(food.fat?.replace('g', '') || '0');
    return sum + fatValue;
  }, 0);
  
  // Use the calculated water goal instead of hardcoded value
  const waterGoal = nutritionTargets.waterGoal;
  const waterPercentage = Math.min(Math.round((waterIntake / waterGoal) * 100), 100);
  
  // Calculate percentages for progress bars
  const caloriePercentage = Math.min(Math.round((totalCalories / nutritionTargets.calorieTarget) * 100), 100);
  const proteinPercentage = Math.min(Math.round((totalProtein / nutritionTargets.proteinTarget) * 100), 100);
  const carbsPercentage = Math.min(Math.round((totalCarbs / nutritionTargets.carbsTarget) * 100), 100);
  const fatPercentage = Math.min(Math.round((totalFat / nutritionTargets.fatTarget) * 100), 100);
  
  // For new users, we start with empty data
  // Sample data for charts will be based on user's entries
  const macroData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: foodEntries.length ? [totalProtein, totalCarbs, totalFat] : [0, 0, 0],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Initialize calories data based on user's entries using the calculated target
  const getCaloriesData = () => {
    // Create an array of the last 7 days
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const caloriesArray = foodEntries.length ? [totalCalories] : [0];
    
    // Fill the rest with zeros for new users
    while (caloriesArray.length < 7) {
      caloriesArray.push(0);
    }
    
    return {
      labels: days,
      datasets: [
        {
          label: 'Calories',
          data: caloriesArray,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Goal',
          data: new Array(7).fill(nutritionTargets.calorieTarget), // Use calculated target
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0)',
          borderDash: [5, 5],
          tension: 0.1,
        },
      ],
    };
  };
  
  const caloriesData = getCaloriesData();
  
  const caloriesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  useEffect(() => {
    // Load user data from localStorage
    const savedFoodEntries = localStorage.getItem('userFoodEntries');
    const savedWaterIntake = localStorage.getItem('userWaterIntake');
    
    if (savedFoodEntries) {
      try {
        setFoodEntries(JSON.parse(savedFoodEntries));
      } catch (error) {
        console.error("Error parsing food entries:", error);
        setFoodEntries([]);
      }
    }
    
    if (savedWaterIntake) {
      setWaterIntake(parseInt(savedWaterIntake) || 0);
    }
    
    // Check if this is a first-time user to show the tour
    const isFirstTimeUser = userData.isNewUser && !localStorage.getItem('tourCompleted');
    setShowTour(isFirstTimeUser);
    
    setIsInitialLoad(false);
  }, [userData.isNewUser]);
  
  useEffect(() => {
    // Save food entries to localStorage when they change (but not on initial load)
    if (!isInitialLoad && foodEntries.length > 0) {
      localStorage.setItem('userFoodEntries', JSON.stringify(foodEntries));
    }
  }, [foodEntries, isInitialLoad]);
  
  useEffect(() => {
    // Save water intake to localStorage when it changes (but not on initial load)
    if (!isInitialLoad) {
      localStorage.setItem('userWaterIntake', waterIntake.toString());
    }
  }, [waterIntake, isInitialLoad]);
  
  // Animate stats when they appear in viewport
  useEffect(() => {
    if (!isInitialLoad) {
      statsControls.start({ scale: 1, opacity: 1 });
    }
  }, [isInitialLoad, statsControls]);
  
  // Tour state
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [highlightRef, setHighlightRef] = useState({ top: 0, left: 0, width: 0, height: 0 });
  
  // Food database for suggestions
  const foodDatabase = [
    { name: 'Apple', calories: 95, protein: '0.5g', carbs: '25g', fat: '0.3g' },
    { name: 'Banana', calories: 105, protein: '1.3g', carbs: '27g', fat: '0.4g' },
    { name: 'Chicken Breast', calories: 165, protein: '31g', carbs: '0g', fat: '3.6g' },
    { name: 'Salmon', calories: 206, protein: '22g', carbs: '0g', fat: '13g' },
    { name: 'Brown Rice', calories: 216, protein: '5g', carbs: '45g', fat: '1.8g' },
    { name: 'Avocado', calories: 234, protein: '2.9g', carbs: '12g', fat: '21g' },
    { name: 'Spinach', calories: 23, protein: '2.9g', carbs: '3.6g', fat: '0.4g' },
    { name: 'Greek Yogurt', calories: 100, protein: '17g', carbs: '6g', fat: '0.4g' },
    { name: 'Oatmeal', calories: 158, protein: '6g', carbs: '27g', fat: '3.2g' },
    { name: 'Egg', calories: 78, protein: '6.3g', carbs: '0.6g', fat: '5.3g' },
  ];
  
  // Tour steps content
  const tourSteps = [
    {
      title: "Welcome to NutriFit!",
      content: (
        <div>
          <p>Thank you for joining NutriFit! Let's take a quick tour to help you get started with tracking your nutrition and health goals.</p>
          <p>We'll show you how to:</p>
          <ul>
            <li>Add meals and track your food intake</li>
            <li>Monitor your hydration</li>
            <li>View nutrition analytics</li>
            <li>Get personalized recommendations</li>
          </ul>
        </div>
      ),
      targetId: null
    },
    {
      title: "Add Your Meals",
      content: (
        <div>
          <p>Click the "Add Food" button to log your meals. You can:</p>
          <ul>
            <li>Enter the food name and description</li>
            <li>Our AI will analyze it and calculate the nutrition information</li>
            <li>All your meals will appear in the "Today's Meals" section</li>
          </ul>
        </div>
      ),
      targetId: "add-food-button"
    },
    {
      title: "Track Your Macros",
      content: (
        <div>
          <p>The Macronutrients chart shows your daily protein, carbs, and fat intake.</p>
          <p>This helps you understand the balance of your diet and make adjustments to meet your health goals.</p>
        </div>
      ),
      targetId: "macro-card"
    },
    {
      title: "Monitor Hydration",
      content: (
        <div>
          <p>Staying hydrated is crucial for your health!</p>
          <p>Track your water intake by using the +250ml and +500ml buttons each time you drink water.</p>
          <p>The progress bar shows how close you are to your daily goal.</p>
        </div>
      ),
      targetId: "water-card"
    },
    {
      title: "Get Smart Recommendations",
      content: (
        <div>
          <p>Based on your eating patterns and goals, our AI provides personalized nutrition recommendations.</p>
          <p>Check this section regularly for tips to improve your nutrition.</p>
        </div>
      ),
      targetId: "recommendation-card"
    },
    {
      title: "View Your Progress",
      content: (
        <div>
          <p>The Calories Trend chart shows your calorie intake over time.</p>
          <p>Use this to make sure you're staying consistent with your nutrition goals.</p>
        </div>
      ),
      targetId: "calories-card"
    },
    {
      title: "Your Meals History",
      content: (
        <div>
          <p>All the foods you've logged today appear here.</p>
          <p>You can see the calories and macronutrients breakdown for each item.</p>
        </div>
      ),
      targetId: "meals-card"
    },
    {
      title: "You're All Set!",
      content: (
        <div>
          <p>You're now ready to start using NutriFit to achieve your nutrition and health goals!</p>
          <p>If you need help, click on your profile picture and select "Help" from the menu.</p>
          <p>Happy tracking!</p>
        </div>
      ),
      targetId: null
    }
  ];

  useEffect(() => {
    // Position the highlight on the target element
    if (showTour && tourSteps[tourStep].targetId) {
      const element = document.getElementById(tourSteps[tourStep].targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightRef({
          top: rect.top - 10,
          left: rect.left - 10,
          width: rect.width + 20,
          height: rect.height + 20
        });
      }
    }
  }, [tourStep, showTour]);

  const nextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      endTour();
    }
  };

  const prevTourStep = () => {
    if (tourStep > 0) {
      setTourStep(tourStep - 1);
    }
  };

  const endTour = () => {
    setShowTour(false);
    setTourStep(0);
    // Mark tour as completed
    localStorage.setItem('tourCompleted', 'true');
  };

  const addWater = (amount) => {
    setWaterIntake(prev => Math.min(prev + amount, waterGoal));
  };
  
  const handleAnalyzeAndAdd = () => {
    // Ensure this function doesn't require authentication
    if (!foodName.trim()) {
      alert("Please enter a food name");
      return;
    }
    
    // Check if the entered food matches any in our database
    const matchedFood = foodDatabase.find(food => 
      food.name.toLowerCase() === foodName.toLowerCase() ||
      foodName.toLowerCase().includes(food.name.toLowerCase())
    );
    
    let newFood;
    let timestamp = new Date().toISOString();
    
    if (matchedFood) {
      // Use the matched food data
      newFood = {
        id: Date.now(),
        name: foodName,
        calories: matchedFood.calories,
        protein: matchedFood.protein,
        carbs: matchedFood.carbs,
        fat: matchedFood.fat,
        timestamp
      };
    } else {
      // Simulate AI analysis by generating reasonable macros based on food description
      const calories = Math.floor(Math.random() * 400) + 200; // Random calories between 200-600
      const protein = Math.floor(Math.random() * 30) + 10; // Random protein between 10-40g
      const carbs = Math.floor(Math.random() * 40) + 20; // Random carbs between 20-60g
      const fat = Math.floor(Math.random() * 20) + 5; // Random fat between 5-25g
      
      // Create new food entry
      newFood = {
        id: Date.now(),
        name: foodName,
        calories,
        protein: `${protein}g`,
        carbs: `${carbs}g`,
        fat: `${fat}g`,
        timestamp
      };
    }
    
    // Add to food entries
    const updatedEntries = [newFood, ...foodEntries];
    setFoodEntries(updatedEntries);
    
    // Save immediately to localStorage to prevent data loss
    localStorage.setItem('userFoodEntries', JSON.stringify(updatedEntries));
    
    // Show success message with more details about nutritional content
    alert(`Successfully added ${foodName}!\n\nCalories: ${newFood.calories}\nProtein: ${newFood.protein}\nCarbs: ${newFood.carbs}\nFat: ${newFood.fat}`);
    
    // Clear form and close modal
    setFoodName('');
    setFoodDescription('');
    setShowAddFoodModal(false);
  };
  
  const handleFoodSuggestion = (suggestedFood) => {
    setFoodName(suggestedFood.name);
  };
  
  const handleDismissComplete = () => {
    setShowSetupComplete(false);
    // Mark the setup message as dismissed so it doesn't show again
    localStorage.setItem('setupMessageDismissed', 'true');
  };
  
  return (
    <>
      <DashboardContainer
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {showSetupComplete && (
          <SetupCompleteMessage
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div>
              <h3>Profile setup complete!</h3>
              <p>Now you can start tracking your nutrition and health goals with NutriFit. Use the "Add Food" button to log your meals.</p>
            </div>
            <button onClick={handleDismissComplete}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </SetupCompleteMessage>
        )}
        
        <WelcomeCard
          variants={slideInUp}
          initial="initial"
          animate="animate"
        >
          <WelcomeContent>
            <WelcomeTitle>Welcome back, {userData.firstName}!</WelcomeTitle>
            <WelcomeSubtitle>
              Your daily goal: {nutritionTargets.calorieTarget} calories • {waterGoal}ml water
            </WelcomeSubtitle>
          </WelcomeContent>
          
          <QuickActions>
            <motion.div {...buttonHover}>
              <ActionButton 
                onClick={() => setShowAddFoodModal(true)}
                id="add-food-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Food
              </ActionButton>
            </motion.div>
          </QuickActions>
        </WelcomeCard>
        
        <DashboardGrid>
          <MacroCard
            variants={staggerItem}
            {...cardHover}
            id="macro-card"
          >
            <CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 20V10"></path>
                <path d="M12 20V4"></path>
                <path d="M6 20v-6"></path>
              </svg>
              Macronutrients
            </CardTitle>
            
            {foodEntries.length > 0 ? (
              <>
                <ChartContainer>
                  <Doughnut 
                    data={macroData} 
                    options={{ 
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '70%',
                      plugins: {
                        legend: {
                          position: 'bottom',
                        },
                      },
                    }} 
                  />
                </ChartContainer>
                
                <MacroInfo>
                  <MacroItem>
                    <MacroValue>
                      <AnimatedCounter value={totalProtein} />g
                    </MacroValue>
                    <MacroLabel>Protein</MacroLabel>
                    <NutrientProgressContainer>
                      <NutrientProgressLabel>
                        <span>{proteinPercentage}%</span>
                        <span>of {nutritionTargets.proteinTarget}g</span>
                      </NutrientProgressLabel>
                      <NutrientProgressBar>
                        <NutrientProgressFill 
                          progress={proteinPercentage}
                          color="rgba(54, 162, 235, 0.7)"
                          initial={{ width: 0 }}
                          animate={{ width: `${proteinPercentage}%` }}
                          transition={{ duration: 1, delay: 0.1 }}
                        />
                      </NutrientProgressBar>
                    </NutrientProgressContainer>
                  </MacroItem>
                  <MacroItem>
                    <MacroValue>
                      <AnimatedCounter value={totalCarbs} />g
                    </MacroValue>
                    <MacroLabel>Carbs</MacroLabel>
                    <NutrientProgressContainer>
                      <NutrientProgressLabel>
                        <span>{carbsPercentage}%</span>
                        <span>of {nutritionTargets.carbsTarget}g</span>
                      </NutrientProgressLabel>
                      <NutrientProgressBar>
                        <NutrientProgressFill 
                          progress={carbsPercentage}
                          color="rgba(75, 192, 192, 0.7)"
                          initial={{ width: 0 }}
                          animate={{ width: `${carbsPercentage}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </NutrientProgressBar>
                    </NutrientProgressContainer>
                  </MacroItem>
                  <MacroItem>
                    <MacroValue>
                      <AnimatedCounter value={totalFat} />g
                    </MacroValue>
                    <MacroLabel>Fat</MacroLabel>
                    <NutrientProgressContainer>
                      <NutrientProgressLabel>
                        <span>{fatPercentage}%</span>
                        <span>of {nutritionTargets.fatTarget}g</span>
                      </NutrientProgressLabel>
                      <NutrientProgressBar>
                        <NutrientProgressFill 
                          progress={fatPercentage}
                          color="rgba(255, 99, 132, 0.7)"
                          initial={{ width: 0 }}
                          animate={{ width: `${fatPercentage}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </NutrientProgressBar>
                    </NutrientProgressContainer>
                  </MacroItem>
                </MacroInfo>
              </>
            ) : (
              <EmptyStateContainer>
                <EmptyStateIcon
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  📊
                </EmptyStateIcon>
                <EmptyStateText>Add foods to see your macronutrient breakdown</EmptyStateText>
                <motion.div {...buttonHover}>
                  <ActionButton onClick={() => setShowAddFoodModal(true)}>
                    Add Your First Food
                  </ActionButton>
                </motion.div>
              </EmptyStateContainer>
            )}
          </MacroCard>
          
          <WaterCard
            variants={staggerItem}
            {...cardHover}
            id="water-card"
          >
            <CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v6"></path>
                <path d="M12 22v-6"></path>
                <path d="M4.93 10.93l4.24 4.24"></path>
                <path d="M14.83 14.83l4.24-4.24"></path>
                <path d="M14.83 9.17l4.24 4.24"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Water Intake
            </CardTitle>
            
            <StatContainer>
              <StatValue
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <AnimatedCounter value={waterIntake} duration={1.5} />ml
              </StatValue>
              <StatLabel>of {waterGoal}ml daily goal</StatLabel>
            </StatContainer>
            
            <WaterProgress>
              <ProgressBar>
                <ProgressFill 
                  progress={waterPercentage}
                  initial={{ width: 0 }}
                  animate={{ width: `${waterPercentage}%` }}
                  transition={{ duration: 1.5, delay: 0.4 }}
                />
              </ProgressBar>
              <div>{waterPercentage}% of daily goal</div>
            </WaterProgress>
            
            <WaterActions>
              <WaterButton {...buttonHover} onClick={() => addWater(250)}>+250ml</WaterButton>
              <WaterButton {...buttonHover} onClick={() => addWater(500)}>+500ml</WaterButton>
            </WaterActions>
          </WaterCard>
          
          <RecommendationCard
            variants={staggerItem}
            {...cardHover}
            id="recommendation-card"
          >
            <CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
              AI Recommendation
            </CardTitle>
            
            {foodEntries.length > 0 ? (
              <RecommendationContent>
                <RecommendationText>
                  {totalProtein < nutritionTargets.proteinTarget * 0.7 ? 
                    `Your protein intake is currently ${totalProtein}g, which is only ${Math.round((totalProtein/nutritionTargets.proteinTarget)*100)}% of your daily target (${nutritionTargets.proteinTarget}g). Consider adding more lean proteins like chicken, fish, or plant-based options.` :
                    `Great job on your protein intake! You've consumed ${totalProtein}g of your ${nutritionTargets.proteinTarget}g target. Keep balancing your meals with healthy fats and complex carbohydrates.`
                  }
                </RecommendationText>
                
                <GoalSummary>
                  <GoalSummaryText>
                    Based on your profile ({userData.weight}kg, {userData.height}cm, {userData.gender}, {userData.activityLevel} activity), 
                    your daily targets are: {nutritionTargets.calorieTarget} calories, {nutritionTargets.proteinTarget}g protein, {nutritionTargets.carbsTarget}g carbs, and {nutritionTargets.fatTarget}g fat.
                  </GoalSummaryText>
                </GoalSummary>
              </RecommendationContent>
            ) : (
              <EmptyStateContainer>
                <EmptyStateIcon
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  💡
                </EmptyStateIcon>
                <EmptyStateText>Add foods to receive personalized recommendations</EmptyStateText>
              </EmptyStateContainer>
            )}
          </RecommendationCard>
          
          <CaloriesCard
            variants={staggerItem}
            {...cardHover}
            id="calories-card"
          >
            <CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
              Calories Trend
            </CardTitle>
            
            {foodEntries.length > 0 ? (
              <>
                <StatContainer>
                  <StatValue
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <AnimatedCounter value={totalCalories} />
                  </StatValue>
                  <StatLabel>calories consumed today</StatLabel>
                  
                  <NutrientProgressContainer>
                    <NutrientProgressLabel>
                      <span>{caloriePercentage}%</span>
                      <span>of {nutritionTargets.calorieTarget} goal</span>
                    </NutrientProgressLabel>
                    <NutrientProgressBar>
                      <NutrientProgressFill 
                        progress={caloriePercentage}
                        color={
                          caloriePercentage > 105 ? 'rgba(255, 99, 132, 0.7)' :  // Over target
                          caloriePercentage > 90 ? 'rgba(75, 192, 192, 0.7)' :  // Near target
                          'rgba(54, 162, 235, 0.7)'  // Under target
                        }
                        initial={{ width: 0 }}
                        animate={{ width: `${caloriePercentage}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </NutrientProgressBar>
                  </NutrientProgressContainer>
                </StatContainer>
                
                <ChartContainer style={{ height: "180px" }}>
                  <Line data={caloriesData} options={caloriesOptions} />
                </ChartContainer>
              </>
            ) : (
              <EmptyStateContainer>
                <EmptyStateIcon
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                  📈
                </EmptyStateIcon>
                <EmptyStateText>Add foods to see your calorie trends over time</EmptyStateText>
              </EmptyStateContainer>
            )}
          </CaloriesCard>
          
          <MealHistoryCard
            variants={staggerItem}
            {...cardHover}
            id="meals-card"
          >
            <CardTitle>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3h18v18H3zM8 12h8"></path>
                <path d="M12 8v8"></path>
              </svg>
              Today's Meals
            </CardTitle>
            
            {foodEntries.length > 0 ? (
              <MealList>
                {foodEntries.map((food, index) => (
                  <MealItem
                    key={food.id}
                    variants={slideInLeft}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.1 }}
                    {...buttonHover}
                  >
                    <MealInfo>
                      <MealIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                          <line x1="6" y1="1" x2="6" y2="4"></line>
                          <line x1="10" y1="1" x2="10" y2="4"></line>
                          <line x1="14" y1="1" x2="14" y2="4"></line>
                        </svg>
                      </MealIcon>
                      <MealDetails>
                        <MealName>{food.name}</MealName>
                        <MealMacros>P: {food.protein} • C: {food.carbs} • F: {food.fat}</MealMacros>
                      </MealDetails>
                    </MealInfo>
                    <MealCalories>{food.calories} kcal</MealCalories>
                  </MealItem>
                ))}
              </MealList>
            ) : (
              <EmptyStateContainer>
                <EmptyStateIcon
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  🍽️
                </EmptyStateIcon>
                <EmptyStateText>No meals logged today. Start tracking your nutrition by adding your first meal.</EmptyStateText>
                <motion.div {...buttonHover}>
                  <ActionButton onClick={() => setShowAddFoodModal(true)}>
                    Add First Meal
                  </ActionButton>
                </motion.div>
              </EmptyStateContainer>
            )}
          </MealHistoryCard>
        </DashboardGrid>
        
        {/* Add Food Modal */}
        {showAddFoodModal && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <ModalTitle>
                Add Food
                <CloseButton onClick={() => setShowAddFoodModal(false)}>
                  ×
                </CloseButton>
              </ModalTitle>
              <Form>
                <FormGroup>
                  <Label htmlFor="foodName">Food Name</Label>
                  <Input 
                    id="foodName" 
                    type="text" 
                    placeholder="E.g., Chicken Salad" 
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                  />
                </FormGroup>
                
                {/* Add food suggestions */}
                {foodName.length > 2 && (
                  <div style={{ marginBottom: '1rem' }}>
                    <Label>Suggestions:</Label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {foodDatabase
                        .filter(food => food.name.toLowerCase().includes(foodName.toLowerCase()))
                        .slice(0, 3)
                        .map(food => (
                          <motion.button
                            key={food.name}
                            type="button"
                            onClick={() => handleFoodSuggestion(food)}
                            style={{
                              padding: '0.5rem',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              background: '#f5f5f5',
                              cursor: 'pointer'
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {food.name}
                          </motion.button>
                        ))}
                    </div>
                  </div>
                )}
                
                <FormGroup>
                  <Label htmlFor="foodDescription">Description</Label>
                  <TextArea 
                    id="foodDescription" 
                    placeholder="Describe your meal in detail for AI analysis (e.g., grilled chicken breast with mixed greens, tomatoes, cucumber, and olive oil dressing)"
                    value={foodDescription}
                    onChange={(e) => setFoodDescription(e.target.value)}
                  />
                </FormGroup>
                <ButtonGroup>
                  <SecondaryButton 
                    type="button" 
                    onClick={() => setShowAddFoodModal(false)}
                    {...buttonHover}
                  >
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton 
                    type="button"
                    onClick={handleAnalyzeAndAdd}
                    disabled={!foodName.trim()}
                    {...buttonHover}
                  >
                    Analyze & Add
                  </PrimaryButton>
                </ButtonGroup>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </DashboardContainer>
      
      {/* Interactive Tour */}
      <AnimatePresence>
        {showTour && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {tourSteps[tourStep].targetId && (
              <TourHighlight
                style={{
                  top: highlightRef.top,
                  left: highlightRef.left,
                  width: highlightRef.width,
                  height: highlightRef.height
                }}
              />
            )}
            
            <TourPopup
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{ 
                top: tourSteps[tourStep].targetId ? 
                  Math.min(highlightRef.top + highlightRef.height + 20, window.innerHeight - 300) : 
                  '50%',
                left: tourSteps[tourStep].targetId ? 
                  Math.min(highlightRef.left, window.innerWidth - 500) : 
                  '50%',
                transform: tourSteps[tourStep].targetId ? 
                  'none' : 
                  'translate(-50%, -50%)'
              }}
            >
              <PopupHeader>
                <PopupTitle>{tourSteps[tourStep].title}</PopupTitle>
                <CloseButton onClick={endTour}>×</CloseButton>
              </PopupHeader>
              
              <PopupContent>
                {tourSteps[tourStep].content}
              </PopupContent>
              
              <PopupButtons>
                {tourStep > 0 && (
                  <SecondaryButton type="button" onClick={prevTourStep}>
                    Previous
                  </SecondaryButton>
                )}
                
                <PrimaryButton
                  type="button"
                  onClick={nextTourStep}
                  style={{ marginLeft: 'auto' }}
                >
                  {tourStep < tourSteps.length - 1 ? 'Next' : 'Finish'}
                </PrimaryButton>
              </PopupButtons>
            </TourPopup>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard; 