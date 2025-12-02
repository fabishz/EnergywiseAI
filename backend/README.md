# EnergySaver AI Backend

Backend API for EnergySaver AI - A smart energy management platform that helps users optimize their electricity usage and save money through AI-powered predictions and recommendations.

## Features

- 🔮 **Energy Predictions**: Calculate monthly bills and potential savings based on usage patterns
- 💬 **AI Chat Assistant**: Get personalized energy-saving tips and recommendations
- 🏆 **Gamification**: Earn badges and track progress on your sustainability journey
- 📍 **Location-based Data**: Access energy rates and renewable energy percentages by city
- 📊 **Usage Analytics**: Track prediction history and savings over time

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: SQLite with Prisma ORM
- **Validation**: Zod
- **CORS**: Enabled for frontend integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Generate Prisma client
npm run prisma:generate

# Initialize database and run migrations
npm run db:push

# Seed the database with initial data
npm run db:seed
```

### Development

```bash
# Start development server with hot reload
npm run dev
```

The server will start on `http://localhost:3001`

### Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## API Endpoints

### Predictions

- `POST /api/predictions/calculate` - Calculate energy prediction
- `GET /api/predictions/history?userId={id}` - Get prediction history
- `GET /api/predictions/:id` - Get specific prediction

### Chat

- `POST /api/chat/message` - Send message to AI assistant
- `GET /api/chat/history?userId={id}` - Get chat history
- `DELETE /api/chat/clear?userId={id}` - Clear chat history

### Gamification

- `GET /api/gamification/badges` - Get all available badges
- `GET /api/gamification/user-badges?userId={id}` - Get user's badges
- `GET /api/gamification/progress?userId={id}` - Get user progress
- `POST /api/gamification/check-achievements` - Check for new achievements

### Locations

- `GET /api/locations/search?q={query}` - Search locations
- `GET /api/locations/:id/energy-data` - Get energy data for location
- `GET /api/locations/by-name/:name` - Get location by name

### Health Check

- `GET /health` - Server health status

## Database Schema

- **User**: User profiles and authentication
- **EnergyPrediction**: Stored energy calculations and recommendations
- **Badge**: Available achievement badges
- **UserBadge**: User's earned badges
- **ChatMessage**: Conversation history
- **Location**: Cities with energy rates and renewable percentages

## Environment Variables

```env
PORT=3001
NODE_ENV=development
DATABASE_URL="file:./dev.db"
CORS_ORIGIN=http://localhost:5173
```

## Development Tools

```bash
# Open Prisma Studio (database GUI)
npm run prisma:studio

# Create new migration
npm run prisma:migrate

# Reset database
npx prisma migrate reset
```

## License

MIT
