import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { 
  pageVariants, 
  staggerContainer, 
  staggerItem, 
  fadeIn,
  slideInUp,
  buttonHover,
  cardHover
} from '../utils/animations';
import { 
  Line, 
  Bar, 
  Radar,
  Pie
} from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title as ChartTitle,
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { getUserData } from '../SignUp';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  ChartTitle,
  Tooltip, 
  Legend,
  Filler
);

const AnalyticsContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
  max-width: 750px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const DateFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.active ? `${props.theme.colors.primary}20` : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all ${props => props.theme.animation.fast} ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background-color: ${props => props.active ? `${props.theme.colors.primary}30` : `${props.theme.colors.primary}10`};
  }
`;

const ChartsGrid = styled.div`
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
  box-shadow: ${props => props.theme.shadows.small};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  height: 100%;
`;

const WideCard = styled(Card)`
  grid-column: span 12;
  
  @media (max-width: 992px) {
    grid-column: span 6;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const MediumCard = styled(Card)`
  grid-column: span 6;
  
  @media (max-width: 992px) {
    grid-column: span 6;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const SmallCard = styled(Card)`
  grid-column: span 4;
  
  @media (max-width: 992px) {
    grid-column: span 3;
  }
  
  @media (max-width: 576px) {
    grid-column: span 1;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const CardSubtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

const ChartContainer = styled.div`
  height: ${props => props.height || '300px'};
  position: relative;
`;

const StatCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: ${props => props.theme.shadows.small};
`;

const StatTitle = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  font-weight: 500;
`;

const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.color || props.theme.colors.text};
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: ${props => props.isPositive ? props.theme.colors.success : props.theme.colors.error};
`;

const NutrientTable = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Th = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const Tbody = styled.tbody``;

const Tr = styled(motion.tr)`
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${props => `${props.theme.colors.backgroundAlt}60`};
  }
`;

const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
`;

const CaloriesProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${props => props.theme.colors.backgroundAlt};
  border-radius: ${props => props.theme.borderRadius.full};
  overflow: hidden;
`;

const CaloriesProgressFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: ${props => {
    if (props.percentage > 100) return props.theme.colors.error;
    if (props.percentage > 85) return props.theme.colors.warning;
    return props.theme.colors.success;
  }};
  border-radius: ${props => props.theme.borderRadius.full};
`;

// New components for empty states
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

const ActionButton = styled(motion.button)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all ${props => props.theme.animation.fast} ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

// Add missing component definitions
const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    if (props.trend === 'positive') return `${props.theme.colors.success}20`;
    if (props.trend === 'negative') return `${props.theme.colors.error}20`;
    return `${props.theme.colors.primary}20`;
  }};
  color: ${props => {
    if (props.trend === 'positive') return props.theme.colors.success;
    if (props.trend === 'negative') return props.theme.colors.error;
    return props.theme.colors.primary;
  }};
  margin-bottom: 0.5rem;
`;

const StatDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.5rem;
  color: ${props => {
    if (props.trend === 'positive') return props.theme.colors.success;
    if (props.trend === 'negative') return props.theme.colors.error;
    return props.theme.colors.textSecondary;
  }};
`;

const Analytics = () => {
  const [period, setPeriod] = useState('week');
  const [hasData, setHasData] = useState(false);
  const [foodEntries, setFoodEntries] = useState([]);
  const [waterIntakeHistory, setWaterIntakeHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const statsControls = useAnimation();
  
  useEffect(() => {
    // Load user data from localStorage
    const loadUserData = () => {
      setUserData(getUserData());
      
      const savedFoodEntries = localStorage.getItem('userFoodEntries');
      const savedWaterIntake = localStorage.getItem('userWaterIntake');
      const savedWaterHistory = localStorage.getItem('userWaterHistory');
      
      if (savedFoodEntries) {
        const parsedEntries = JSON.parse(savedFoodEntries);
        setFoodEntries(parsedEntries);
        setHasData(parsedEntries.length > 0);
      }
      
      // Initialize water history if not exist
      if (savedWaterHistory) {
        setWaterIntakeHistory(JSON.parse(savedWaterHistory));
      } else {
        // Create empty water history for the last 7 days
        const emptyHistory = Array(7).fill(0);
        if (savedWaterIntake) {
          // Add today's water intake
          emptyHistory[6] = parseInt(savedWaterIntake);
        }
        setWaterIntakeHistory(emptyHistory);
        localStorage.setItem('userWaterHistory', JSON.stringify(emptyHistory));
      }
      
      setIsLoading(false);
      
      // Animate stats when they're loaded
      setTimeout(() => {
        statsControls.start({ opacity: 1, y: 0 });
      }, 300);
    };
    
    loadUserData();
  }, [statsControls]);
  
  // Generate actual data for charts based on user's food entries
  const generateCaloriesData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let caloriesPerDay = Array(7).fill(0);
    
    if (foodEntries.length > 0) {
      // Group food entries by day and sum calories
      foodEntries.forEach(entry => {
        const date = new Date(entry.timestamp || Date.now());
        const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
        caloriesPerDay[dayIndex] += entry.calories;
      });
    }
    
    // Get user's calorie goal if available, otherwise use 2000 as default
    const calorieGoal = userData?.calorieGoal || 2000;
    
    return {
      labels: days,
      datasets: [
        {
          label: 'Calories',
          data: caloriesPerDay,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Goal',
          data: Array(7).fill(calorieGoal),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0)',
          borderDash: [5, 5],
          tension: 0.1,
        },
      ],
    };
  };
  
  const generateMacroDistributionData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let proteinPerDay = Array(7).fill(0);
    let carbsPerDay = Array(7).fill(0);
    let fatPerDay = Array(7).fill(0);
    
    if (foodEntries.length > 0) {
      // Group food entries by day and calculate macros
      foodEntries.forEach(entry => {
        const date = new Date(entry.timestamp || Date.now());
        const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
        
        // Parse macros from strings like "30g" to numbers
        const protein = parseInt(entry.protein) || 0;
        const carbs = parseInt(entry.carbs) || 0;
        const fat = parseInt(entry.fat) || 0;
        
        proteinPerDay[dayIndex] += protein;
        carbsPerDay[dayIndex] += carbs;
        fatPerDay[dayIndex] += fat;
      });
    }
    
    return {
      labels: days,
      datasets: [
        {
          label: 'Protein (g)',
          data: proteinPerDay,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
          label: 'Carbs (g)',
          data: carbsPerDay,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Fat (g)',
          data: fatPerDay,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };
  };
  
  const generateNutritionQualityData = () => {
    // For nutrition quality, calculate based on user's actual food entries
    
    // Default values for a new user with no data
    let proteinScore = 0;
    let carbsScore = 0;
    let fatScore = 0;
    let fiberScore = 0;
    let vitaminsScore = 0;
    let mineralsScore = 0;
    let waterScore = waterIntakeHistory.some(intake => intake > 0) ? 30 : 0;
    
    if (foodEntries.length > 0) {
      // Calculate actual scores based on user's food entries
      const totalProtein = foodEntries.reduce((sum, entry) => sum + (parseInt(entry.protein) || 0), 0);
      const totalCarbs = foodEntries.reduce((sum, entry) => sum + (parseInt(entry.carbs) || 0), 0);
      const totalFat = foodEntries.reduce((sum, entry) => sum + (parseInt(entry.fat) || 0), 0);
      
      // Protein recommendation: ~0.8g per kg of body weight
      // Let's use 50g as a baseline goal if no user data
      const proteinGoal = userData?.weight ? userData.weight * 0.8 : 50;
      proteinScore = Math.min(100, (totalProtein / proteinGoal) * 100);
      
      // Carbs recommendation: ~45-65% of total calories, let's use 250g as baseline
      const carbsGoal = 250;
      carbsScore = Math.min(100, (totalCarbs / carbsGoal) * 100);
      
      // Fat recommendation: ~20-35% of total calories, let's use 65g as baseline
      const fatGoal = 65;
      fatScore = Math.min(100, (totalFat / fatGoal) * 100);
      
      // For fiber, vitamins, minerals - these would ideally come from actual nutrient data
      // For now, estimate based on food diversity and quantity
      const uniqueFoods = new Set(foodEntries.map(entry => entry.name)).size;
      const diversityFactor = Math.min(1, uniqueFoods / 10); // Max score when 10+ unique foods
      
      fiberScore = 40 + (diversityFactor * 40);
      vitaminsScore = 30 + (diversityFactor * 50);
      mineralsScore = 35 + (diversityFactor * 45);
      
      // Water score based on water intake history
      const avgWaterIntake = waterIntakeHistory.reduce((sum, val) => sum + val, 0) / 7;
      waterScore = Math.min(100, (avgWaterIntake / 2000) * 100);
    }
    
    return {
      labels: ['Protein', 'Carbs', 'Fat', 'Fiber', 'Vitamins', 'Minerals', 'Water'],
      datasets: [
        {
          label: 'Current Week',
          data: [
            proteinScore,
            carbsScore, 
            fatScore, 
            fiberScore,
            vitaminsScore,
            mineralsScore,
            waterScore
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
        {
          label: 'Recommended',
          data: [80, 75, 65, 80, 85, 75, 90],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
        },
      ],
    };
  };
  
  const generateMealDistributionData = () => {
    // Classify meals based on name patterns or timestamps
    let breakfastCalories = 0;
    let lunchCalories = 0;
    let dinnerCalories = 0;
    let snackCalories = 0;
    
    if (foodEntries.length > 0) {
      foodEntries.forEach(entry => {
        const name = entry.name.toLowerCase();
        const date = new Date(entry.timestamp || Date.now());
        const hour = date.getHours();
        
        // Classify by name keywords or time of day
        if (name.includes('breakfast') || hour >= 5 && hour < 11) {
          breakfastCalories += entry.calories;
        } else if (name.includes('lunch') || hour >= 11 && hour < 15) {
          lunchCalories += entry.calories;
        } else if (name.includes('dinner') || hour >= 17 && hour < 22) {
          dinnerCalories += entry.calories;
        } else {
          snackCalories += entry.calories;
        }
      });
    }
    
    const totalCalories = breakfastCalories + lunchCalories + dinnerCalories + snackCalories;
    
    if (totalCalories === 0) {
      // No data - return empty chart
      return {
        labels: ['No meal data yet'],
        datasets: [
          {
            data: [100],
            backgroundColor: ['rgba(200, 200, 200, 0.3)'],
            borderColor: ['rgba(200, 200, 200, 0.5)'],
            borderWidth: 1,
          },
        ],
      };
    }
    
    // Calculate percentages
    const breakfastPercent = Math.round((breakfastCalories / totalCalories) * 100);
    const lunchPercent = Math.round((lunchCalories / totalCalories) * 100);
    const dinnerPercent = Math.round((dinnerCalories / totalCalories) * 100);
    const snackPercent = Math.round((snackCalories / totalCalories) * 100);
    
    return {
      labels: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
      datasets: [
        {
          data: [breakfastPercent, lunchPercent, dinnerPercent, snackPercent],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };
  
  const generateWaterIntakeData = () => {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Water Intake (ml)',
          data: waterIntakeHistory,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Goal',
          data: Array(7).fill(2000),
          borderColor: 'rgba(255, 99, 132, 1)', 
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderDash: [5, 5],
          type: 'line'
        }
      ],
    };
  };
  
  // Generate all chart data
  const caloriesData = generateCaloriesData();
  const macroDistributionData = generateMacroDistributionData();
  const nutritionQualityData = generateNutritionQualityData();
  const mealDistributionData = generateMealDistributionData();
  const waterIntakeData = generateWaterIntakeData();
  
  // Redirect user to dashboard to add data
  const handleAddData = () => {
    window.location.href = '/dashboard';
  };
  
  // Chart options
  const chartOptions = {
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
  
  const barChartOptions = {
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
  
  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          showLabelBackdrop: false,
        },
      },
    },
  };
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };
  
  const waterIntakeOptions = {
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
  
  return (
    <AnalyticsContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header>
        <PageTitle>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"></path>
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
          </svg>
          Nutrition Analytics
        </PageTitle>
        <Subtitle>Gain insights into your nutrition patterns and track your progress over time.</Subtitle>
        
        <FilterGroup>
          <DateFilter>
            <FilterButton 
              active={period === 'week'} 
              onClick={() => setPeriod('week')}
              {...buttonHover}
            >
              Week
            </FilterButton>
            <FilterButton 
              active={period === 'month'} 
              onClick={() => setPeriod('month')}
              {...buttonHover}
            >
              Month
            </FilterButton>
            <FilterButton 
              active={period === 'year'} 
              onClick={() => setPeriod('year')}
              {...buttonHover}
            >
              Year
            </FilterButton>
          </DateFilter>
        </FilterGroup>
      </Header>
      
      {isLoading ? (
        <WideCard
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <EmptyStateContainer>
            <EmptyStateIcon
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              ⏳
            </EmptyStateIcon>
            <EmptyStateText>Loading your nutrition data...</EmptyStateText>
          </EmptyStateContainer>
        </WideCard>
      ) : !hasData ? (
        <WideCard
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <EmptyStateContainer>
            <EmptyStateIcon
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              📊
            </EmptyStateIcon>
            <EmptyStateText>You don't have any nutrition data yet. Start tracking your meals to see detailed analytics.</EmptyStateText>
            <motion.div {...buttonHover}>
              <ActionButton onClick={handleAddData}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Your First Meal
              </ActionButton>
            </motion.div>
          </EmptyStateContainer>
        </WideCard>
      ) : (
        <>
          <StatCards>
            <StatCard
              variants={staggerItem}
              initial={{ opacity: 0, y: 20 }}
              animate={statsControls}
              transition={{ delay: 0.1 }}
              {...cardHover}
            >
              <StatIcon trend="neutral">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10"></path>
                  <path d="M12 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
              </StatIcon>
              <StatDetails>
                <StatValue>
                  {foodEntries.reduce((sum, entry) => sum + entry.calories, 0)} kcal
                </StatValue>
                <StatLabel>Total Calories</StatLabel>
              </StatDetails>
              <StatTrend trend="neutral">Weekly</StatTrend>
            </StatCard>
            
            <StatCard
              variants={staggerItem}
              initial={{ opacity: 0, y: 20 }}
              animate={statsControls}
              transition={{ delay: 0.2 }}
              {...cardHover}
            >
              <StatIcon trend="positive">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </StatIcon>
              <StatDetails>
                <StatValue>
                  {foodEntries.reduce((sum, entry) => sum + (parseInt(entry.protein) || 0), 0)}g
                </StatValue>
                <StatLabel>Total Protein</StatLabel>
              </StatDetails>
              <StatTrend trend="positive">Weekly</StatTrend>
            </StatCard>
            
            <StatCard
              variants={staggerItem}
              initial={{ opacity: 0, y: 20 }}
              animate={statsControls}
              transition={{ delay: 0.3 }}
              {...cardHover}
            >
              <StatIcon trend="neutral">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v6"></path>
                  <path d="M12 22v-6"></path>
                  <path d="M4.93 10.93l4.24 4.24"></path>
                  <path d="M14.83 14.83l4.24-4.24"></path>
                  <path d="M14.83 9.17l4.24 4.24"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </StatIcon>
              <StatDetails>
                <StatValue>
                  {waterIntakeHistory.reduce((sum, intake) => sum + intake, 0)}ml
                </StatValue>
                <StatLabel>Total Water</StatLabel>
              </StatDetails>
              <StatTrend trend="neutral">Weekly</StatTrend>
            </StatCard>
            
            <StatCard
              variants={staggerItem}
              initial={{ opacity: 0, y: 20 }}
              animate={statsControls}
              transition={{ delay: 0.4 }}
              {...cardHover}
            >
              <StatIcon trend="neutral">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </StatIcon>
              <StatDetails>
                <StatValue>
                  {foodEntries.length}
                </StatValue>
                <StatLabel>Meals Logged</StatLabel>
              </StatDetails>
              <StatTrend trend="neutral">Weekly</StatTrend>
            </StatCard>
          </StatCards>
          
          <ChartsGrid>
            <WideCard
              variants={fadeIn}
              initial="initial"
              animate="animate"
              {...cardHover}
            >
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18"></path>
                  <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
                </svg>
                Calories Trend
              </CardTitle>
              <CardSubtitle>Track your daily calorie intake against your target goal</CardSubtitle>
              <ChartContainer height="300px">
                <Line 
                  data={caloriesData} 
                  options={chartOptions} 
                />
              </ChartContainer>
            </WideCard>
            
            <MediumCard
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 }}
              {...cardHover}
            >
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20V10"></path>
                  <path d="M12 20V4"></path>
                  <path d="M6 20v-6"></path>
                </svg>
                Macronutrient Distribution
              </CardTitle>
              <CardSubtitle>Daily breakdown of your protein, carbs, and fat intake</CardSubtitle>
              <ChartContainer>
                <Bar 
                  data={macroDistributionData} 
                  options={barChartOptions} 
                />
              </ChartContainer>
            </MediumCard>
            
            <MediumCard
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              {...cardHover}
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
              <CardSubtitle>Track your daily water consumption over time</CardSubtitle>
              <ChartContainer>
                <Bar 
                  data={waterIntakeData} 
                  options={waterIntakeOptions} 
                />
              </ChartContainer>
            </MediumCard>
            
            <SmallCard
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.3 }}
              {...cardHover}
            >
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
                Meal Distribution
              </CardTitle>
              <CardSubtitle>Calorie breakdown by meal type</CardSubtitle>
              <ChartContainer>
                <Pie 
                  data={mealDistributionData} 
                  options={pieOptions} 
                />
              </ChartContainer>
            </SmallCard>
            
            <SmallCard
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.4 }}
              {...cardHover}
            >
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
                Nutrition Quality
              </CardTitle>
              <CardSubtitle>Overall nutritional quality assessment</CardSubtitle>
              <ChartContainer>
                <Radar 
                  data={nutritionQualityData} 
                  options={radarOptions} 
                />
              </ChartContainer>
            </SmallCard>
          </ChartsGrid>
        </>
      )}
    </AnalyticsContainer>
  );
};

export default Analytics; 