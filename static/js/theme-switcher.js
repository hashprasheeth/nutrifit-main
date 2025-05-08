/**
 * Theme Switcher for NutriFy
 * Handles dark/light mode preferences and toggles
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get the theme toggle element
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Function to set theme
    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            
            // Ensure hero section has dark background in dark mode
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.background = 'linear-gradient(135deg, #1e1e1e, #121212)';
            }
            
            // Update chart colors if Chart.js is available
            if (typeof Chart !== 'undefined') {
                Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
                Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
                
                // Update all charts on the page
                Chart.instances.forEach(chart => {
                    chart.update();
                });
            }
            
            // Update theme toggle icon if it exists
            if (themeToggle) {
                const themeIcon = themeToggle.querySelector('svg');
                if (themeIcon) {
                    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
                }
            }
        } else {
            document.body.classList.remove('dark-mode');
            
            // Ensure hero section still has dark background in light mode
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.background = 'linear-gradient(135deg, #1e1e1e, #121212)';
            }
            
            // Update chart colors if Chart.js is available
            if (typeof Chart !== 'undefined') {
                Chart.defaults.color = '#666';
                Chart.defaults.borderColor = 'rgba(0, 0, 0, 0.1)';
                
                // Update all charts on the page
                Chart.instances.forEach(chart => {
                    chart.update();
                });
            }
            
            // Update theme toggle icon if it exists
            if (themeToggle) {
                const themeIcon = themeToggle.querySelector('svg');
                if (themeIcon) {
                    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
                }
            }
        }
        
        // Save user preference
        localStorage.setItem('darkMode', isDark);
    }
    
    // Toggle theme on click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDarkMode = !document.body.classList.contains('dark-mode');
            setTheme(isDarkMode);
        });
    }
    
    // Set theme on page load based on user preference or system preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
        // Use saved preference
        setTheme(savedTheme === 'true');
    } else {
        // Default to dark mode (as requested in the redesign)
        setTheme(true);
        localStorage.setItem('darkMode', 'true');
    }
    
    // Apply additional dark mode styles to charts if they exist
    if (typeof Chart !== 'undefined' && document.body.classList.contains('dark-mode')) {
        Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
        Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
    
    // Ensure hero section background is set on page load
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.background = 'linear-gradient(135deg, #1e1e1e, #121212)';
    }
}); 