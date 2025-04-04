document.addEventListener('DOMContentLoaded', function() {
    // Handle food form submission
    const foodForm = document.getElementById('add-food-form');
    if (foodForm) {
        foodForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const foodName = document.getElementById('food-name').value;
            const calories = parseInt(document.getElementById('calories').value);
            
            // Here we would typically make an API call to save the food entry
            console.log('Adding food:', { foodName, calories });
            
            // Reset form
            foodForm.reset();
        });
    }

    // Update progress bars
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        // Get the width from the inline style (it's already set in the template)
        const width = bar.style.width;
        
        // Get the percentage value
        const percentage = parseFloat(width);
        
        // Set color based on percentage
        if (percentage < 25) {
            bar.style.backgroundColor = '#4CAF50'; // Green for low
        } else if (percentage < 75) {
            bar.style.backgroundColor = '#FFC107'; // Yellow for medium
        } else if (percentage < 100) {
            bar.style.backgroundColor = '#FF9800'; // Orange for high
        } else {
            bar.style.backgroundColor = '#F44336'; // Red for over
        }
    });

    // Flash message auto-dismiss
    setTimeout(() => {
        const alerts = document.querySelectorAll('.alert');
        alerts.forEach(alert => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.style.display = 'none';
            }, 500);
        });
    }, 3000);
}); 