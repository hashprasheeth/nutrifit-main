@echo off
echo Starting NutriFit application...
echo.

:: Activate virtual environment
call venv\Scripts\activate

:: Run the Flask application
python app.py

:: If the application exits, keep the window open
echo.
echo Application stopped.
pause 