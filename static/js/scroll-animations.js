/**
 * Scroll-triggered animations using IntersectionObserver
 * Adds 'show' class to elements with 'fade-up' class when they enter the viewport
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Function to initialize scroll animations
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-up');
        
        if (fadeElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        // Once the animation is triggered, we don't need to observe this element anymore
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null, // Use viewport as root
                threshold: 0.1, // Trigger when 10% of the element is visible
                rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element enters the viewport
            });
            
            // Observe each fade-up element
            fadeElements.forEach(element => {
                observer.observe(element);
            });
        }
    }
}); 