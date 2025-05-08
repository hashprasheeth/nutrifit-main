# NutriFit - Modern Nutrition Tracking Web App

NutriFit is a modern, React-based nutrition tracking web application with beautiful UI, animations, and interactive charts.

## Features

- 🎨 **Beautiful UI & Animations**: Modern interface with smooth animations using Framer Motion
- 📊 **Interactive Charts**: Visualize your nutrition data with Chart.js
- 🌓 **Dark/Light Mode**: Switch between themes with a persistent preference
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- 👤 **User Accounts**: Complete authentication flow with form validation
- 📈 **Detailed Analytics**: Track your nutrition journey with comprehensive visualizations
- 💧 **Water Tracking**: Monitor your daily water intake

## Tech Stack

- React
- React Router
- Styled Components
- Framer Motion
- Chart.js
- React ChartJS 2

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or newer)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/nutrifit.git
cd nutrifit
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open http://localhost:3000 in your browser

## Project Structure

```
src/
├── components/      # Reusable UI components
│   ├── common/      # Shared components like buttons, inputs, etc.
│   └── layout/      # Layout components like Navbar, Footer, etc.
├── pages/           # Page components (screens)
├── styles/          # Global styles and theme configuration
├── utils/           # Utility functions and animations
├── App.js           # Main App component with routing
└── index.js         # Entry point
```

## Development

### Adding New Features

To add new features, create components in the appropriate directories and import them where needed.

### Styling

This project uses Styled Components for styling. The theme configuration is in `src/styles/theme.js`.

## Deployment

To build the app for production:

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `build` folder.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
