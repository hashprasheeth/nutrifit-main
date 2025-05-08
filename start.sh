#!/bin/bash
echo "Starting NutriFit application..."
echo ""

# Activate virtual environment
source venv/bin/activate

# Run the Flask application
python app.py

# If the application exits, keep the terminal open
echo ""
echo "Application stopped."
read -p "Press Enter to continue..." 