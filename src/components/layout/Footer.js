import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { slideInUp, fadeIn } from '../../utils/animations';

const FooterContainer = styled(motion.footer)`
  background-color: ${props => props.theme.colors.card};
  padding: 2rem 0;
  margin-top: 3rem;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
  transition: background-color ${props => props.theme.animation.normal} ease;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const FooterBrand = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const FooterCopyright = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: 0;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.875rem;
  transition: color ${props => props.theme.animation.fast} ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const FooterDivider = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.colors.border};
  margin: 2rem 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1.25rem;
  transition: color ${props => props.theme.animation.fast} ease;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer
      variants={slideInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.1 }}
    >
      <FooterContent>
        <FooterRow>
          <motion.div variants={fadeIn}>
            <FooterBrand to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 9L12 5 2 9l10 4 10-4v6"></path>
                <path d="M6 10.6V16c0 1 1.8 3 6 3s6-2 6-3v-5.4"></path>
              </svg>
              <span>NutriFit</span>
            </FooterBrand>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <SocialLinks>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </SocialLink>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </SocialLink>
              <SocialLink href="#" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </SocialLink>
            </SocialLinks>
          </motion.div>
        </FooterRow>
        
        <FooterDivider />
        
        <FooterRow>
          <motion.div variants={fadeIn}>
            <FooterCopyright>
              &copy; {currentYear} NutriFit. All rights reserved.
            </FooterCopyright>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <FooterLinks>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
            </FooterLinks>
          </motion.div>
        </FooterRow>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 