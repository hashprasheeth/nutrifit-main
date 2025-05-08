import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { slideInDown, buttonHover } from '../../utils/animations';
import { getUserData } from '../../SignUp';

const NavbarContainer = styled(motion.header)`
  background-color: ${props => props.theme.colors.card};
  padding: 1rem 0;
  box-shadow: ${props => props.theme.shadows.small};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color ${props => props.theme.animation.normal} ease,
    box-shadow ${props => props.theme.animation.normal} ease;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  
  svg {
    margin-right: 0.5rem;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    flex-direction: column;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.card};
    box-shadow: ${props => props.theme.shadows.medium};
    padding: 1rem;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

const NavItem = styled.li`
  margin-left: 1.5rem;
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
    margin-left: 0;
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color ${props => props.theme.animation.fast} ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: width ${props => props.theme.animation.normal} ease;
  }
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    
    &::after {
      width: 100%;
    }
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: 0.75rem 0;
  }
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius.medium};
  text-decoration: none;
  font-weight: 500;
  transition: background-color ${props => props.theme.animation.fast} ease, 
    transform ${props => props.theme.animation.fast} ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
  
  @media (max-width: 768px) {
    display: block;
    text-align: center;
  }
`;

const ThemeToggle = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 1rem;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const UserAvatar = styled(Link)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-left: 1rem;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = ({ isLoggedIn, toggleTheme, currentTheme }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const userData = getUserData();
  
  const getInitials = () => {
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`;
    } else if (userData.firstName) {
      return userData.firstName.charAt(0);
    } else {
      return 'U';
    }
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <NavbarContainer
      variants={slideInDown}
      initial="initial"
      animate="animate"
    >
      <NavContent>
        <Logo to="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 9L12 5 2 9l10 4 10-4v6"></path>
            <path d="M6 10.6V16c0 1 1.8 3 6 3s6-2 6-3v-5.4"></path>
          </svg>
          <span>NutriFit</span>
        </Logo>
        
        <MenuButton onClick={toggleMenu}>
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </MenuButton>
        
        <NavLinks isOpen={menuOpen}>
          <NavList>
            {isLoggedIn ? (
              <>
                <NavItem>
                  <NavLink to="/dashboard" isActive={location.pathname === '/dashboard'}>
                    Dashboard
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/analytics" isActive={location.pathname === '/analytics'}>
                    Analytics
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/profile" isActive={location.pathname === '/profile'}>
                    Profile
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink to="/login" isActive={location.pathname === '/login'}>
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <motion.div {...buttonHover}>
                    <ButtonLink to="/signup">
                      Sign Up
                    </ButtonLink>
                  </motion.div>
                </NavItem>
              </>
            )}
          </NavList>
          
          <ThemeToggle onClick={toggleTheme} {...buttonHover}>
            {currentTheme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </ThemeToggle>
          
          {isLoggedIn && (
            <UserAvatar to="/profile">
              {getInitials()}
            </UserAvatar>
          )}
        </NavLinks>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar; 