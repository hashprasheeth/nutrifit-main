# Nutri AI Insight - Nutrition Tracking Application

A simple and intuitive nutrition tracking web application built with Flask, HTML, and CSS. Track your daily calories, macronutrients, and maintain a healthy lifestyle with personalized recommendations.

## Features

- **User Profile Management**
  - Create and manage personal profiles
  - Set fitness goals and activity levels
  - Calculate BMI and daily calorie requirements

- **Daily Nutrition Tracking**
  - Log meals and track daily calorie intake
  - Monitor macronutrients (protein, carbs, fat)
  - Visual progress bars for daily goals
  - Color-coded indicators for goal progress

- **Food Database**
  - Search common food items
  - Add custom food entries
  - Save favorite meals for quick logging

- **Dashboard**
  - Daily motivation messages
  - Real-time calorie tracking
  - Macronutrient breakdown
  - Progress visualization

## Tech Stack

- **Backend**
  - Flask (Python web framework)
  - SQLite database
  - Python for calculations and data processing

- **Frontend**
  - HTML5
  - CSS3 (with custom variables for theming)
  - Vanilla JavaScript for interactivity
  - Responsive design for mobile compatibility

## Project Structure

```
nutri-ai-insight/
├── static/
│   ├── css/
│   │   ├── style.css
│   │   ├── dashboard.css
│   │   └── profile.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── dashboard.html
│   ├── profile.html
│   └── food_diary.html
├── app.py
├── database.py
├── models.py
├── requirements.txt
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nutri-ai-insight.git
cd nutri-ai-insight
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install required packages:
```bash
pip install -r requirements.txt
```

4. Initialize the database:
```bash
python database.py
```

5. Run the application:
```bash
python app.py
```

6. Open your browser and navigate to `http://localhost:5000`

## Required Dependencies

```
Flask==3.0.0
Flask-SQLAlchemy==3.1.1
Flask-Login==0.6.3
Werkzeug==3.0.1
python-dotenv==1.0.0
```

## Usage

1. **Create Profile**
   - Fill in personal details
   - Set fitness goals
   - Choose activity level

2. **Track Daily Nutrition**
   - Add food entries from database
   - Log custom meals
   - Monitor daily progress

3. **View Dashboard**
   - Check remaining calories
   - Track macronutrient goals
   - View progress indicators

4. **Manage Food Diary**
   - Review past entries
   - Track eating patterns
   - Plan future meals

## Development

To contribute to this project:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## Customization

### Themes
Modify `static/css/style.css` to change the application's appearance:

```css
:root {
  --primary-color: #4CAF50;
  --secondary-color: #2196F3;
  --background-color: #ffffff;
  --text-color: #333333;
  /* Add more custom variables */
}
```

### Layout
Adjust the grid system in `static/css/dashboard.css` for different layouts:

```css
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Add meal planning feature
- [ ] Implement recipe suggestions
- [ ] Add social sharing capabilities
- [ ] Include nutrition charts and analytics
- [ ] Integrate with fitness tracking devices
- [ ] Add export functionality for nutrition data

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Nutrition data provided by [Food Database API]
- Icons from [Icon Library]
- Color scheme inspired by [Design System]

## Contact

For questions or suggestions, please contact:
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)

## Screenshots

(Add screenshots of your application here)

---

Made with ❤️ by [Your Name]
