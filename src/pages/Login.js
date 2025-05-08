import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  pageVariants, 
  slideInUp, 
  buttonHover 
} from '../utils/animations';
import { storeUserSignupData } from '../SignUp';

const LoginContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 2rem 1rem;
`;

const LoginCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  
  @media (max-width: 576px) {
    padding: 2rem 1.5rem;
  }
`;

const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    width: 40px;
    height: 40px;
    color: ${props => props.theme.colors.primary};
  }
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  border: 1px solid ${props => props.hasError 
    ? props.theme.colors.error 
    : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  background-color: ${props => props.theme.colors.backgroundAlt};
  color: ${props => props.theme.colors.text};
  transition: border-color ${props => props.theme.animation.fast} ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError 
      ? props.theme.colors.error 
      : props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.hasError 
      ? `${props.theme.colors.error}20` 
      : `${props.theme.colors.primary}20`};
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -0.5rem;
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  label {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textSecondary};
    cursor: pointer;
  }
  
  input {
    cursor: pointer;
  }
`;

const ForgotPassword = styled(Link)`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(
    135deg, 
    ${props => props.theme.colors.primary} 0%, 
    ${props => props.theme.colors.primaryDark} 100%
  );
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${props => props.theme.animation.fast} ease;
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.small};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.border};
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${props => props.theme.colors.border};
  }
  
  span {
    padding: 0 1rem;
    color: ${props => props.theme.colors.textSecondary};
    font-size: 0.9rem;
  }
`;

const DemoLogin = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-top: 0.5rem;
  display: block;
  margin: 1rem auto;
  
  &:hover {
    color: ${props => props.theme.colors.primaryDark};
  }
`;

const SignupPrompt = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textSecondary};
  
  a {
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: val
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Instead of using browser prompts, get existing user data or use defaults
      // Check if user already exists in localStorage by email
      const existingEmail = localStorage.getItem('userEmail');
      const existingFirstName = localStorage.getItem('userFirstName');
      const existingLastName = localStorage.getItem('userLastName');
      
      // If user does not exist yet, create a new profile with email only
      if (!existingEmail || existingEmail !== formData.email) {
        const userData = {
          firstName: existingFirstName || 'User',
          lastName: existingLastName || '',
          email: formData.email
        };
        
        storeUserSignupData(userData);
        
        // Set user as logged in
        setIsLoggedIn(true);
        
        // Redirect to profile page to complete setup
        navigate('/profile', { replace: true });
      } else {
        // User exists, just log them in and set user data
        const userData = {
          firstName: existingFirstName,
          lastName: existingLastName,
          email: formData.email
        };
        
        storeUserSignupData(userData);
        
        // Set user as logged in
        setIsLoggedIn(true);
        
        // Redirect to dashboard or previous page
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        form: 'Invalid credentials. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set demo user data
      storeUserSignupData({
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@example.com'
      });
      
      // Mark the demo user as not new to avoid showing tours and popups
      localStorage.setItem('tourCompleted', 'true');
      localStorage.setItem('setupMessageDismissed', 'true');
      
      // Set user as logged in
      setIsLoggedIn(true);
      
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Demo login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <LoginContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <LoginCard
        variants={slideInUp}
        initial="initial"
        animate="animate"
      >
        <CardHeader>
          <Logo>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 9L12 5 2 9l10 4 10-4v6"></path>
              <path d="M6 10.6V16c0 1 1.8 3 6 3s6-2 6-3v-5.4"></path>
            </svg>
          </Logo>
          <Title>Welcome back</Title>
          <Subtitle>Sign in to continue to NutriFit</Subtitle>
        </CardHeader>
        
        <Form onSubmit={handleSubmit}>
          {errors.form && (
            <ErrorMessage>{errors.form}</ErrorMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              hasError={errors.email}
            />
            {errors.email && (
              <ErrorMessage>{errors.email}</ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              hasError={errors.password}
            />
            {errors.password && (
              <ErrorMessage>{errors.password}</ErrorMessage>
            )}
          </FormGroup>
          
          <RememberForgot>
            <RememberMe>
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </RememberMe>
            
            <ForgotPassword to="/forgot-password">
              Forgot password?
            </ForgotPassword>
          </RememberForgot>
          
          <motion.div {...buttonHover}>
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </SubmitButton>
          </motion.div>
        </Form>
        
        <Divider>
          <span>OR</span>
        </Divider>
        
        <DemoLogin onClick={handleDemoLogin} disabled={isSubmitting}>
          Try with demo account
        </DemoLogin>
        
        <SignupPrompt>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignupPrompt>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 