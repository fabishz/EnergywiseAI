<div align="center">

# 🌱 EnergySaver AI

### Smart Energy Management Platform Powered by AI

[![Built for CodeCraze Hackathon](https://img.shields.io/badge/Hackathon-CodeCraze%202025-brightgreen)](https://github.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)

**Optimize your energy use, save money, and go green – powered by AI**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**EnergySaver AI** is a comprehensive energy management platform designed to help students and households reduce their electricity consumption and save money. By leveraging AI-powered predictions, interactive visualizations, and gamification, we make energy conservation engaging and rewarding.

### The Problem

Students in dorms and shared spaces struggle to understand and reduce their personal electricity consumption. With rising energy costs and increasing environmental concerns, accessible tools for tracking usage and making informed decisions are essential.

### Our Solution

EnergySaver AI provides:
- 🔮 **AI-Powered Predictions**: Accurate monthly bill forecasts based on usage patterns
- 💡 **Smart Recommendations**: Personalized energy-saving tips tailored to your habits
- 🏆 **Gamification**: Earn badges and track progress on your sustainability journey
- 📍 **Location-Based Insights**: Energy rates and renewable percentages by city
- 💬 **AI Chat Assistant**: Get instant answers to energy-saving questions

---

## ✨ Features

### 🎯 Core Functionality

- **Energy Usage Calculator**
  - Input daily appliance usage hours and count
  - Get instant predictions for monthly electricity bills
  - See potential savings with optimized usage (15-25% reduction)
  - Receive personalized recommendations

- **AI Chat Assistant**
  - Natural language conversation interface
  - Context-aware energy-saving tips
  - Instant responses to common questions
  - Conversation history tracking

- **Gamification System**
  - 5 achievement badges to unlock
  - Sustainability score (0-100)
  - Progress tracking toward next milestone
  - Real-time badge notifications

- **Location-Based Data**
  - 15+ US cities with real energy rates
  - Renewable energy percentage by location
  - Interactive map visualization
  - Regional energy statistics

### 🎨 User Experience

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS and shadcn/ui
- **Real-time Updates**: Instant feedback on all actions
- **Smooth Animations**: Engaging transitions and micro-interactions
- **Mobile Responsive**: Works seamlessly on all devices
- **Dark Mode Ready**: Prepared for theme switching

---

## 🎥 Demo

### Screenshots

*Coming soon: Add screenshots of your application*

### Live Demo

*Backend must be running locally for full functionality*

---

## 🚀 Installation

### Prerequisites

- **Node.js** 18+ and npm
- **Git**

### Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd energywise-ai

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Set up environment variables
cp .env.example .env

# Initialize database
npx prisma generate
npx prisma db push
npm run db:seed

# Start backend server (in backend directory)
npm run dev

# In a new terminal, start frontend (in root directory)
cd ..
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Routing**: React Router DOM 6.30
- **Charts**: Chart.js & Recharts
- **Forms**: React Hook Form with Zod validation

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 4.21
- **Database**: SQLite (development) / PostgreSQL (production ready)
- **ORM**: Prisma 5.22
- **Validation**: Zod
- **CORS**: Enabled for frontend integration

### Development Tools

- **TypeScript**: 5.8 for type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting (recommended)
- **Prisma Studio**: Database GUI

---

## 📁 Project Structure

```
energywise-ai/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   └── ui/                 # Reusable UI components (shadcn)
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities and API client
│   ├── pages/                   # Page components
│   └── App.tsx                  # Main app component
├── backend/                      # Backend source code
│   ├── src/
│   │   ├── routes/             # API route handlers
│   │   ├── services/           # Business logic
│   │   ├── middleware/         # Express middleware
│   │   ├── utils/              # Utility functions
│   │   ├── config/             # Configuration
│   │   └── server.ts           # Express server
│   └── prisma/
│       ├── schema.prisma       # Database schema
│       └── seed.ts             # Database seeding
├── public/                       # Static assets
└── README.md                     # This file
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:3001/api
```

### Endpoints

#### Predictions

```http
POST /predictions/calculate
Content-Type: application/json

{
  "usageHours": 5,
  "applianceCount": 3,
  "location": "New York",
  "userId": "optional-user-id"
}

Response:
{
  "status": "success",
  "data": {
    "id": "prediction-id",
    "predictedBill": 45.60,
    "potentialSavings": 9.12,
    "savingsPercentage": 20.0,
    "optimizedBill": 36.48,
    "monthlyKWh": 228.0,
    "recommendations": ["..."],
    "newBadges": [...]
  }
}
```

```http
GET /predictions/history?userId={id}&limit=10
```

#### Chat

```http
POST /chat/message
Content-Type: application/json

{
  "message": "How can I save energy?",
  "userId": "optional-user-id"
}

Response:
{
  "status": "success",
  "data": {
    "message": "Here are some tips...",
    "suggestions": ["...", "..."]
  }
}
```

```http
GET /chat/history?userId={id}
DELETE /chat/clear?userId={id}
```

#### Gamification

```http
GET /gamification/badges
GET /gamification/user-badges?userId={id}
GET /gamification/progress?userId={id}
POST /gamification/check-achievements
```

#### Locations

```http
GET /locations/search?q={query}
GET /locations/:id/energy-data
GET /locations/by-name/:name
```

For complete API documentation, see [backend/README.md](backend/README.md)

---

## 🎮 Usage Guide

### 1. Calculate Energy Prediction

1. Navigate to the Dashboard
2. Enter your daily appliance usage hours
3. Enter the number of appliances
4. Enter your city location
5. Click "Predict & Optimize"
6. View your results and recommendations

### 2. Chat with AI Assistant

1. Find the "AI Energy Tips" panel on the dashboard
2. Type your energy-related question
3. Press Enter or click Send
4. Receive instant, personalized advice

### 3. Track Your Progress

1. Check the "Your Achievements" panel
2. View your Sustainability Score (0-100)
3. See earned badges and progress to next milestone
4. Unlock new badges by achieving higher savings percentages

---

## 🔧 Configuration

### Environment Variables

#### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3001/api
```

#### Backend (`backend/.env`)

```env
PORT=3001
NODE_ENV=development
DATABASE_URL="file:./dev.db"
CORS_ORIGIN=http://localhost:5173

# Optional: AI API keys for production
# OPENAI_API_KEY=your_key_here
# HUGGINGFACE_API_KEY=your_key_here
```

---

## 🧪 Development

### Running Tests

```bash
# Frontend tests
npm run test

# Backend tests
cd backend
npm run test
```

### Database Management

```bash
cd backend

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Create new migration
npm run prisma:migrate

# Reset database
npx prisma migrate reset
```

### Building for Production

```bash
# Build frontend
npm run build

# Build backend
cd backend
npm run build

# Start production server
npm start
```

---

## 🌍 Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable: `VITE_API_URL=<your-backend-url>/api`

### Backend Deployment (Railway/Render/Heroku)

1. Update `DATABASE_URL` to PostgreSQL connection string
2. Run migrations: `npx prisma migrate deploy`
3. Seed database: `npm run db:seed`
4. Start server: `npm start`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

Built for **CodeCraze Hackathon 2025**

---

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Prisma** for excellent database tooling
- **Esri ArcGIS** for mapping capabilities
- **CodeCraze Hackathon** for the opportunity

---

## 📞 Support

For questions or support, please open an issue on GitHub.

---

<div align="center">

**Made with ❤️ and ⚡ for a sustainable future**

[⬆ Back to Top](#-energysaver-ai)

</div>
