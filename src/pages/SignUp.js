import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  pageVariants, 
  slideInUp, 
  buttonHover 
} from '../utils/animations';
import { storeUserSignupData } from '../SignUp';

const SignUpContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 2rem 1rem;
`;

const SignUpCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  width: 100%;
  max-width: 500px;
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
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

const TermsAgreement = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 0.5rem;
  
  input {
    margin-top: 0.25rem;
    cursor: pointer;
  }
  
  label {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textSecondary};
    
    a {
      color: ${props => props.theme.colors.primary};
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
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

const LoginPrompt = styled.div`
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

const PasswordRequirements = styled.ul`
  margin-top: 0.25rem;
  padding-left: 1.25rem;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.textSecondary};
  
  li {
    margin-bottom: 0.25rem;
    
    &.valid {
      color: ${props => props.theme.colors.success};
    }
    
    &.invalid {
      color: ${props => props.theme.colors.error};
    }
  }
`;

const SignUp = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one lowercase letter';
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and privacy policy';
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
      
      // Store user data in localStorage
      storeUserSignupData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      });
      
      // Set user as logged in
      setIsLoggedIn(true);
      
      // Show welcome message
      alert(`Welcome to NutriFit, ${formData.firstName}! Please complete your profile details to get started.`);
      
      // Redirect to profile setup first
      navigate('/profile');
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({
        form: 'An error occurred during signup. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const passwordHasMinLength = formData.password.length >= 8;
  const passwordHasUppercase = /[A-Z]/.test(formData.password);
  const passwordHasLowercase = /[a-z]/.test(formData.password);
  const passwordHasNumber = /[0-9]/.test(formData.password);
  
  return (
    <SignUpContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <SignUpCard
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
          <Title>Create your account</Title>
          <Subtitle>Get started with NutriFit today</Subtitle>
        </CardHeader>
        
        <Form onSubmit={handleSubmit}>
          {errors.form && (
            <ErrorMessage>{errors.form}</ErrorMessage>
          )}
          
          <FormGrid>
            <FormGroup>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                hasError={errors.firstName}
              />
              {errors.firstName && (
                <ErrorMessage>{errors.firstName}</ErrorMessage>
              )}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                hasError={errors.lastName}
              />
              {errors.lastName && (
                <ErrorMessage>{errors.lastName}</ErrorMessage>
              )}
            </FormGroup>
          </FormGrid>
          
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
            {errors.password ? (
              <ErrorMessage>{errors.password}</ErrorMessage>
            ) : (
              formData.password && (
                <PasswordRequirements>
                  <li className={passwordHasMinLength ? 'valid' : 'invalid'}>
                    At least 8 characters
                  </li>
                  <li className={passwordHasUppercase ? 'valid' : 'invalid'}>
                    At least one uppercase letter
                  </li>
                  <li className={passwordHasLowercase ? 'valid' : 'invalid'}>
                    At least one lowercase letter
                  </li>
                  <li className={passwordHasNumber ? 'valid' : 'invalid'}>
                    At least one number
                  </li>
                </PasswordRequirements>
              )
            )}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              hasError={errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
            )}
          </FormGroup>
          
          <TermsAgreement>
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeTerms">
              I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
            </label>
          </TermsAgreement>
          
          {errors.agreeTerms && (
            <ErrorMessage>{errors.agreeTerms}</ErrorMessage>
          )}
          
          <motion.div {...buttonHover}>
            <SubmitButton
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </SubmitButton>
          </motion.div>
        </Form>
        
        <Divider>
          <span>OR</span>
        </Divider>
        
        <LoginPrompt>
          Already have an account? <Link to="/login">Sign in</Link>
        </LoginPrompt>
      </SignUpCard>
    </SignUpContainer>
  );
};

export default SignUp; 