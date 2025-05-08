import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  pageVariants, 
  slideInUp, 
  fadeIn,
  buttonHover,
  cardHover 
} from '../utils/animations';
import { getUserData, completeUserSetup } from '../SignUp';

const ProfileContainer = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.125rem;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileSidebar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProfileMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Card = styled(motion.div)`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 1.5rem;
  box-shadow: ${props => props.theme.shadows.small};
`;

const ProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .edit-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${props => props.theme.colors.card};
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid ${props => props.theme.colors.primary};
    cursor: pointer;
    transition: all ${props => props.theme.animation.fast} ease;
    
    &:hover {
      background-color: ${props => props.theme.colors.backgroundAlt};
    }
    
    svg {
      width: 16px;
      height: 16px;
      color: ${props => props.theme.colors.primary};
    }
  }
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.95rem;
  margin-bottom: 1rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  transition: border-color ${props => props.theme.animation.fast} ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => `${props.theme.colors.primary}20`};
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  transition: border-color ${props => props.theme.animation.fast} ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => `${props.theme.colors.primary}20`};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    cursor: pointer;
  }
  
  label {
    font-size: 0.95rem;
    color: ${props => props.theme.colors.text};
    cursor: pointer;
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

const LogoutButton = styled(Button)`
  background-color: ${props => props.theme.colors.error};
  color: white;
  border: none;
  margin-top: 1rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.errorDark || props.theme.colors.error};
  }
`;

const WelcomeMessage = styled(motion.div)`
  background-color: ${props => props.theme.colors.success};
  color: white;
  padding: 1.5rem;
  border-radius: ${props => props.theme.borderRadius.large};
  margin-bottom: 1.5rem;
  position: relative;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 1rem;
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

const RequiredField = styled.span`
  color: ${props => props.theme.colors.error};
  margin-left: 5px;
`;

const SuccessMessage = styled(motion.div)`
  background-color: ${props => props.theme.colors.success};
  color: white;
  padding: 1.5rem;
  border-radius: ${props => props.theme.borderRadius.large};
  margin-bottom: 1.5rem;
  position: relative;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 1rem;
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

const ContinueButton = styled(motion.button)`
  background-color: ${props => props.theme.colors.success};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  transition: all ${props => props.theme.animation.fast} ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.successDark || props.theme.colors.success};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 0.8rem;
  margin-top: 5px;
`;

const Profile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const userData = getUserData();
  const [editMode, setEditMode] = useState(userData.isNewUser || !userData.firstName || userData.firstName === 'User');
  const [isNewUser, setIsNewUser] = useState(userData.isNewUser || !userData.firstName || userData.firstName === 'User');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [profileData, setProfileData] = useState({
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    gender: userData.gender || 'male',
    dateOfBirth: userData.dateOfBirth || '1990-06-15',
    height: userData.height || '',
    weight: userData.weight || '',
    goalType: userData.goalType || 'lose',
    activityLevel: userData.activityLevel || 'moderate',
  });
  
  useEffect(() => {
    // If user is new or has incomplete profile, let's enable edit mode automatically
    if ((userData.isNewUser || !userData.firstName || userData.firstName === 'User') && !editMode) {
      setEditMode(true);
    }
  }, [userData.isNewUser, userData.firstName, editMode]);
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
    
    // Clear validation errors for this field
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    // Required fields validation
    if (!profileData.height) {
      errors.height = 'Height is required';
    }
    if (!profileData.weight) {
      errors.weight = 'Weight is required';
    }
    if (!profileData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form for new users
    if (isNewUser && !validateForm()) {
      return;
    }
    
    // Save the user data to localStorage
    localStorage.setItem('userFirstName', profileData.firstName);
    localStorage.setItem('userLastName', profileData.lastName);
    localStorage.setItem('userEmail', profileData.email);
    
    // Also save profile-specific data
    localStorage.setItem('userGender', profileData.gender);
    localStorage.setItem('userDateOfBirth', profileData.dateOfBirth);
    localStorage.setItem('userHeight', profileData.height);
    localStorage.setItem('userWeight', profileData.weight);
    localStorage.setItem('userGoalType', profileData.goalType);
    localStorage.setItem('userActivityLevel', profileData.activityLevel);
    
    if (isNewUser) {
      // Mark user as not new and profile setup complete
      completeUserSetup();
      setIsNewUser(false);
      
      // Show success message
      setShowSuccessMessage(true);
    } else {
      // Just exit edit mode for existing users
      setEditMode(false);
    }
  };
  
  const handleContinueToDashboard = () => {
    navigate('/dashboard');
  };
  
  const handleDismissWelcome = () => {
    setIsNewUser(false);
  };
  
  const handleDismissSuccess = () => {
    setShowSuccessMessage(false);
  };
  
  const handleLogout = () => {
    // Clear user data and set as logged out
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <ProfileContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {isNewUser && (
        <WelcomeMessage
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <button onClick={handleDismissWelcome}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <h3>Welcome to NutriFit! 👋</h3>
          <p>Please complete your profile information to get started with tracking your nutrition journey. This will help us provide personalized recommendations for your health goals.</p>
          <p><strong>Fields marked with * are required.</strong></p>
        </WelcomeMessage>
      )}
      
      {showSuccessMessage && (
        <SuccessMessage
          variants={fadeIn}
          initial="initial"
          animate="animate"
        >
          <button onClick={handleDismissSuccess}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <h3>Profile Complete! 🎉</h3>
          <p>Your profile information has been saved successfully. Now you can continue to your personalized dashboard to start tracking your nutrition and health goals.</p>
          
          <ContinueButton
            onClick={handleContinueToDashboard}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue to Dashboard
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </ContinueButton>
        </SuccessMessage>
      )}
      
      <PageHeader>
        <Title>My Profile</Title>
        <Subtitle>Manage your personal information and preferences</Subtitle>
      </PageHeader>
      
      <ProfileGrid>
        <ProfileSidebar
          variants={slideInUp}
          initial="initial"
          animate="animate"
        >
          <ProfileCard {...cardHover}>
            <Avatar>
              <div className="edit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
            </Avatar>
            <UserName>{profileData.firstName} {profileData.lastName}</UserName>
            <UserEmail>{profileData.email}</UserEmail>
            <motion.div {...buttonHover}>
              <Button onClick={toggleEditMode}>
                Change Password
              </Button>
            </motion.div>
            <motion.div {...buttonHover}>
              <LogoutButton onClick={handleLogout}>
                Logout
              </LogoutButton>
            </motion.div>
          </ProfileCard>
        </ProfileSidebar>
        
        <ProfileMain>
          <Card
            variants={fadeIn}
            initial="initial"
            animate="animate"
            {...cardHover}
          >
            <CardHeader>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Personal Information
              </CardTitle>
              
              <EditButton onClick={toggleEditMode}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                {editMode ? 'Cancel' : 'Edit'}
              </EditButton>
            </CardHeader>
            
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </FormGroup>
              </FormRow>
              
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Gender</Label>
                <RadioGroup>
                  <RadioOption>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={profileData.gender === 'male'}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    <label htmlFor="male">Male</label>
                  </RadioOption>
                  
                  <RadioOption>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={profileData.gender === 'female'}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    <label htmlFor="female">Female</label>
                  </RadioOption>
                  
                  <RadioOption>
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="other"
                      checked={profileData.gender === 'other'}
                      onChange={handleChange}
                      disabled={!editMode}
                    />
                    <label htmlFor="other">Other</label>
                  </RadioOption>
                </RadioGroup>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={profileData.dateOfBirth}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </FormGroup>
              
              {editMode && (
                <ButtonGroup>
                  <motion.div {...buttonHover}>
                    <SecondaryButton 
                      type="button"
                      onClick={toggleEditMode}
                    >
                      Cancel
                    </SecondaryButton>
                  </motion.div>
                  
                  <motion.div {...buttonHover}>
                    <PrimaryButton type="submit">
                      Save Changes
                    </PrimaryButton>
                  </motion.div>
                </ButtonGroup>
              )}
            </Form>
          </Card>
          
          <Card
            variants={fadeIn}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
            {...cardHover}
          >
            <CardHeader>
              <CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                Health & Fitness
              </CardTitle>
              
              <EditButton onClick={toggleEditMode}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                {editMode ? 'Cancel' : 'Edit'}
              </EditButton>
            </CardHeader>
            
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label htmlFor="height">Height (cm)<RequiredField>*</RequiredField></Label>
                  <Input
                    type="number"
                    id="height"
                    name="height"
                    value={profileData.height}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                  {validationErrors.height && (
                    <ErrorMessage>{validationErrors.height}</ErrorMessage>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    type="number"
                    id="weight"
                    name="weight"
                    value={profileData.weight}
                    onChange={handleChange}
                    disabled={!editMode}
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <Label htmlFor="goalType">Goal</Label>
                  <Select
                    id="goalType"
                    name="goalType"
                    value={profileData.goalType}
                    onChange={handleChange}
                    disabled={!editMode}
                  >
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Gain Weight</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    id="activityLevel"
                    name="activityLevel"
                    value={profileData.activityLevel}
                    onChange={handleChange}
                    disabled={!editMode}
                  >
                    <option value="sedentary">Sedentary</option>
                    <option value="light">Lightly Active</option>
                    <option value="moderate">Moderately Active</option>
                    <option value="active">Active</option>
                    <option value="very">Very Active</option>
                  </Select>
                </FormGroup>
              </FormRow>
              
              {editMode && (
                <ButtonGroup>
                  <motion.div {...buttonHover}>
                    <SecondaryButton type="button" onClick={toggleEditMode}>
                      Cancel
                    </SecondaryButton>
                  </motion.div>
                  
                  <motion.div {...buttonHover}>
                    <PrimaryButton type="submit">
                      Save Changes
                    </PrimaryButton>
                  </motion.div>
                </ButtonGroup>
              )}
            </Form>
          </Card>
        </ProfileMain>
      </ProfileGrid>
    </ProfileContainer>
  );
};

export default Profile; 