import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  pageVariants, 
  staggerContainer, 
  staggerItem, 
  fadeIn, 
  slideInLeft, 
  slideInRight,
  float,
  buttonHover,
  revealUp,
  scaleUp
} from '../utils/animations';

const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-height: 70vh;
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }
`;

const HeroContent = styled(motion.div)`
  flex: 1;
  max-width: 600px;
  z-index: 10;
  
  @media (max-width: 992px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  background: linear-gradient(
    135deg, 
    ${props => props.theme.colors.primary} 0%, 
    ${props => props.theme.colors.accent} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const HeroImage = styled(motion.div)`
  flex: 1;
  max-width: 500px;
  position: relative;
  z-index: 5;
  
  img {
    width: 100%;
    height: auto;
    border-radius: ${props => props.theme.borderRadius.large};
    box-shadow: ${props => props.theme.shadows.large};
  }
  
  @media (max-width: 992px) {
    max-width: 400px;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const PrimaryButton = styled(motion(Link))`
  display: inline-block;
  background: linear-gradient(
    135deg, 
    ${props => props.theme.colors.primary} 0%, 
    ${props => props.theme.colors.primaryDark} 100%
  );
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  text-decoration: none;
  transition: all ${props => props.theme.animation.fast} ease;
  box-shadow: ${props => props.theme.shadows.small};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.medium};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(motion(Link))`
  display: inline-block;
  background: transparent;
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  text-decoration: none;
  transition: all ${props => props.theme.animation.fast} ease;
  border: 2px solid ${props => props.theme.colors.border};
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const FeatureSection = styled.section`
  padding: 6rem 0;
  background-color: ${props => props.theme.colors.backgroundAlt};
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FeatureCard = styled(motion.div)`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: 2rem;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all ${props => props.theme.animation.normal} ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.large};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${props => `${props.theme.colors.primary}15`};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const BenefitSection = styled.section`
  padding: 6rem 0;
`;

const BenefitContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BenefitRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 3rem;
  }
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    @media (max-width: 992px) {
      flex-direction: column;
    }
  }
`;

const BenefitContent = styled(motion.div)`
  flex: 1;
  padding: 0 2rem;
  
  @media (max-width: 992px) {
    padding: 0;
    text-align: center;
  }
`;

const BenefitImage = styled(motion.div)`
  flex: 1;
  
  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    border-radius: ${props => props.theme.borderRadius.large};
    box-shadow: ${props => props.theme.shadows.medium};
  }
  
  @media (max-width: 992px) {
    display: flex;
    justify-content: center;
  }
`;

const BenefitTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const BenefitDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 1.5rem;
`;

const BlobShape = styled(motion.div)`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 43% 57% 70% 30% / 45% 36% 64% 55%;
  background: linear-gradient(
    45deg,
    ${props => `${props.theme.colors.primary}10`} 0%,
    ${props => `${props.theme.colors.accent}15`} 100%
  );
  top: -200px;
  right: -200px;
  z-index: 1;
  
  @media (max-width: 992px) {
    width: 400px;
    height: 400px;
  }
`;

const BlobShape2 = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 63% 37% 30% 70% / 75% 30% 70% 25%;
  background: linear-gradient(
    135deg,
    ${props => `${props.theme.colors.secondary}10`} 0%,
    ${props => `${props.theme.colors.primary}15`} 100%
  );
  bottom: -200px;
  left: -200px;
  z-index: 1;
  
  @media (max-width: 992px) {
    width: 300px;
    height: 300px;
  }
`;

const CtaSection = styled.section`
  padding: 6rem 0;
  background: linear-gradient(
    -45deg,
    ${props => `${props.theme.colors.primary}40`} 0%,
    ${props => `${props.theme.colors.accent}40`} 100%
  );
  position: relative;
  overflow: hidden;
`;

const CtaContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  position: relative;
  z-index: 10;
`;

const CtaTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CtaDescription = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const LandingPage = () => {
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <HeroSection>
        <BlobShape
          animate={{
            borderRadius: ['43% 57% 70% 30% / 45% 36% 64% 55%', '63% 37% 40% 60% / 55% 46% 54% 45%'],
            rotate: [0, 15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
        <BlobShape2
          animate={{
            borderRadius: ['63% 37% 30% 70% / 75% 30% 70% 25%', '33% 67% 60% 40% / 45% 60% 40% 55%'],
            rotate: [0, -10],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
        
        <HeroContainer>
          <HeroContent variants={staggerContainer}>
            <HeroTitle
              variants={slideInLeft}
            >
              Track Your Nutrition Journey with NutriFit
            </HeroTitle>
            <HeroSubtitle
              variants={slideInLeft}
            >
              Your personal AI nutritionist helping you make smarter food choices 
              and reach your health goals with personalized recommendations.
            </HeroSubtitle>
            
            <ButtonGroup variants={staggerContainer}>
              <motion.div variants={staggerItem}>
                <PrimaryButton to="/signup" {...buttonHover}>
                  Get Started Free
                </PrimaryButton>
              </motion.div>
              <motion.div variants={staggerItem}>
                <SecondaryButton to="/login" {...buttonHover}>
                  Login
                </SecondaryButton>
              </motion.div>
            </ButtonGroup>
          </HeroContent>
          
          <HeroImage
            variants={slideInRight}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1470"
              alt="Nutritious meal"
              {...float}
            />
          </HeroImage>
        </HeroContainer>
      </HeroSection>
      
      <FeatureSection>
        <SectionTitle
          variants={revealUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          Smart Features for Your Health
        </SectionTitle>
        
        <FeatureGrid
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeatureCard variants={staggerItem} whileHover={{ y: -10 }}>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </FeatureIcon>
            <FeatureTitle>AI Meal Analysis</FeatureTitle>
            <FeatureDescription>
              Describe your meals and get instant nutritional breakdowns powered by advanced AI technology.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard variants={staggerItem} whileHover={{ y: -10 }}>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Progress Tracking</FeatureTitle>
            <FeatureDescription>
              Track your calories, macros, and water intake with beautiful visualizations to stay on top of your goals.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard variants={staggerItem} whileHover={{ y: -10 }}>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"></path>
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Personalized Recommendations</FeatureTitle>
            <FeatureDescription>
              Get customized nutrition advice based on your personal goals, dietary preferences, and health needs.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeatureSection>
      
      <BenefitSection>
        <BenefitContainer>
          <BenefitRow>
            <BenefitContent
              variants={slideInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <BenefitTitle>Track Your Food Intake Effortlessly</BenefitTitle>
              <BenefitDescription>
                No more manual logging of every ingredient. Simply describe your meal, and our AI technology will analyze and track all nutritional components automatically.
              </BenefitDescription>
              <PrimaryButton to="/signup" {...buttonHover}>Try It Now</PrimaryButton>
            </BenefitContent>
            
            <BenefitImage
              variants={slideInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1470" alt="Food tracking" />
            </BenefitImage>
          </BenefitRow>
          
          <BenefitRow>
            <BenefitContent
              variants={slideInRight}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <BenefitTitle>Visualize Your Progress</BenefitTitle>
              <BenefitDescription>
                See your nutrition journey come to life with interactive charts and graphs that make understanding your health trends simple and motivating.
              </BenefitDescription>
              <PrimaryButton to="/signup" {...buttonHover}>View Analytics</PrimaryButton>
            </BenefitContent>
            
            <BenefitImage
              variants={slideInLeft}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1470" alt="Progress analytics" />
            </BenefitImage>
          </BenefitRow>
        </BenefitContainer>
      </BenefitSection>
      
      <CtaSection>
        <CtaContainer>
          <CtaTitle
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Ready to Transform Your Nutrition?
          </CtaTitle>
          <CtaDescription
            variants={fadeIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Join thousands of users who have improved their health with personalized nutrition tracking and AI-powered insights.
          </CtaDescription>
          <motion.div
            variants={scaleUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <PrimaryButton to="/signup" {...buttonHover}>
              Get Started Today
            </PrimaryButton>
          </motion.div>
        </CtaContainer>
      </CtaSection>
    </motion.main>
  );
};

export default LandingPage;