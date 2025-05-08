import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  name: 'light',
  colors: {
    primary: '#4CAF50',
    primaryLight: '#81C784',
    primaryDark: '#388E3C',
    secondary: '#FF5722',
    secondaryLight: '#FF8A65',
    secondaryDark: '#E64A19',
    accent: '#03A9F4',
    accentLight: '#4FC3F7',
    background: '#FFFFFF',
    backgroundAlt: '#F5F7FA',
    card: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#EF5350',
    info: '#2196F3',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.08)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.1)',
    large: '0 8px 24px rgba(0, 0, 0, 0.12)',
  },
  animation: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    full: '9999px',
  },
};

export const darkTheme = {
  name: 'dark',
  colors: {
    primary: '#81C784',
    primaryLight: '#A5D6A7',
    primaryDark: '#4CAF50',
    secondary: '#FF8A65',
    secondaryLight: '#FFAB91',
    secondaryDark: '#FF5722',
    accent: '#4FC3F7',
    accentLight: '#81D4FA',
    background: '#121212',
    backgroundAlt: '#1E1E1E',
    card: '#1E1E1E',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#2D3748',
    success: '#66BB6A',
    warning: '#FFD54F',
    error: '#EF5350',
    info: '#42A5F5',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.2)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.25)',
    large: '0 8px 24px rgba(0, 0, 0, 0.3)',
  },
  animation: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    full: '9999px',
  },
};

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: background-color ${props => props.theme.animation.normal} ease, color ${props => props.theme.animation.normal} ease;
    line-height: 1.5;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
  }
  
  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color ${props => props.theme.animation.fast} ease;
    
    &:hover {
      color: ${props => props.theme.colors.primaryDark};
    }
  }
  
  button, .btn {
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    transition: all ${props => props.theme.animation.fast} ease;
  }
  
  img {
    max-width: 100%;
  }
  
  input, textarea, select {
    font-family: 'Inter', sans-serif;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

export default { lightTheme, darkTheme, GlobalStyles }; 