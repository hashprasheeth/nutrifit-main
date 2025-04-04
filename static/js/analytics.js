/**
 * Analytics Charts
 * Uses Chart.js to create responsive, interactive nutrition data visualizations
 */
document.addEventListener('DOMContentLoaded', function() {
    // Sample data - this would be replaced with actual API data in production
    const nutritionData = {
        calories: [2200, 2000, 1950, 2100, 2300, 1800, 2050],
        dates: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        macronutrients: { protein: 120, carbs: 250, fat: 70 },
        water: [2.5, 3, 2.2, 2.8, 3.1, 2.7, 3.2],
        weight: [75.2, 75.0, 74.8, 74.9, 74.5, 74.3, 74.1]
    };

    // Get chart contexts
    const calorieChartCtx = document.getElementById('calorieChart').getContext('2d');
    const macroChartCtx = document.getElementById('macronutrientChart').getContext('2d');
    const waterChartCtx = document.getElementById('waterChart').getContext('2d');
    const weightChartCtx = document.getElementById('weightChart').getContext('2d');

    // Common chart colors
    const chartColors = {
        primary: '#E67E22',
        secondary: '#4A4A4A',
        accent: '#FF9F43',
        protein: '#D35400',
        carbs: '#F39C12',
        fat: '#E67E22',
        water: '#4A90E2',
        weight: '#9C27B0',
        gridLines: 'rgba(0, 0, 0, 0.05)',
        textColor: '#6c757d'
    };

    // Initialize charts when elements exist
    if (calorieChartCtx) {
        initCalorieChart(calorieChartCtx, nutritionData);
    }
    
    if (macroChartCtx) {
        initMacronutrientChart(macroChartCtx, nutritionData);
    }
    
    if (waterChartCtx) {
        initWaterChart(waterChartCtx, nutritionData);
    }
    
    if (weightChartCtx) {
        initWeightChart(weightChartCtx, nutritionData);
    }

    // Add fade-in animations to chart containers
    document.querySelectorAll('.chart-container').forEach(chartEl => {
        chartEl.classList.add('chart-animate');
    });

    // Initialize date range buttons
    initDateRangeButtons();
});

/**
 * Initialize Daily Calorie Chart
 */
function initCalorieChart(ctx, data) {
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.dates,
            datasets: [{
                label: 'Calories',
                data: data.calories,
                backgroundColor: 'rgba(230, 126, 34, 0.6)',
                borderColor: 'rgba(230, 126, 34, 1)',
                borderWidth: 1,
                borderRadius: 4,
                hoverBackgroundColor: 'rgba(230, 126, 34, 0.8)',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.raw + ' calories';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: '#6c757d'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: '#6c757d'
                    }
                }
            },
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * Initialize Macronutrient Breakdown Chart (Doughnut)
 */
function initMacronutrientChart(ctx, data) {
    const macros = data.macronutrients;
    const total = macros.protein + macros.carbs + macros.fat;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Protein', 'Carbs', 'Fat'],
            datasets: [{
                data: [macros.protein, macros.carbs, macros.fat],
                backgroundColor: [
                    'rgba(211, 84, 0, 0.7)',
                    'rgba(243, 156, 18, 0.7)',
                    'rgba(230, 126, 34, 0.7)'
                ],
                borderColor: [
                    'rgba(211, 84, 0, 1)',
                    'rgba(243, 156, 18, 1)',
                    'rgba(230, 126, 34, 1)'
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    'rgba(211, 84, 0, 0.9)',
                    'rgba(243, 156, 18, 0.9)',
                    'rgba(230, 126, 34, 0.9)'
                ],
                hoverOffset: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        font: {
                            size: 13
                        },
                        color: '#6c757d'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const percentage = Math.round((value / total) * 100);
                            return `${context.label}: ${value}g (${percentage}%)`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1000,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * Initialize Water Intake Chart (Area Chart)
 */
function initWaterChart(ctx, data) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.dates,
            datasets: [{
                label: 'Water Intake (liters)',
                data: data.water,
                backgroundColor: 'rgba(73, 144, 226, 0.2)',
                borderColor: 'rgba(73, 144, 226, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(73, 144, 226, 1)',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.3 // Curved lines
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    callbacks: {
                        label: function(context) {
                            return context.raw + ' liters';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: '#6c757d',
                        callback: function(value) {
                            return value + 'L';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: '#6c757d'
                    }
                }
            },
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * Initialize Weight Progress Chart
 */
function initWeightChart(ctx, data) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.dates,
            datasets: [{
                label: 'Weight (kg)',
                data: data.weight,
                backgroundColor: 'rgba(74, 74, 74, 0.1)',
                borderColor: 'rgba(74, 74, 74, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(74, 74, 74, 1)',
                pointBorderColor: '#fff',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    callbacks: {
                        label: function(context) {
                            return context.raw + ' kg';
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: '#6c757d',
                        callback: function(value) {
                            return value + ' kg';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: '#6c757d'
                    }
                }
            },
            animation: {
                duration: 1400,
                easing: 'easeOutQuart'
            }
        }
    });
}

/**
 * Initialize date range filter buttons
 */
function initDateRangeButtons() {
    const dateButtons = document.querySelectorAll('.date-range-btn');
    
    dateButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            dateButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real app, this would trigger data reload for the selected time period
            const range = this.dataset.range;
            console.log('Selected range:', range);
            
            // Here you would call a function to update chart data
            // updateChartsForDateRange(range);
        });
    });
}

/**
 * Update all charts with new data for the selected date range
 * This would fetch from the backend API in a real implementation
 */
function updateChartsForDateRange(range) {
    // Sample implementation placeholder
    // In a real app, this would make an API call to get data for the selected range
    console.log(`Updating charts for ${range} range`);
    
    // Here you would:
    // 1. Show loading state
    // 2. Fetch data from backend
    // 3. Update each chart with new data
    // 4. Remove loading state
} 