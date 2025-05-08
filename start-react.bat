@echo off
echo Starting NutriFit React App...
echo.
echo Make sure you have Node.js installed.
echo.

:: Check if node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it from https://nodejs.org/
    exit /b 1
)

:: Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    npm install
)

:: Start the development server
echo Starting development server...
npm start

pause 