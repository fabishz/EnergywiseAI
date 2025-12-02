# EnergySaver AI - API Documentation

## Base URL

```
http://localhost:3001/api
```

## Response Format

All API responses follow this structure:

```json
{
  "status": "success" | "error",
  "data": { ... },
  "message": "Error message (only on error)"
}
```

---

## Predictions API

### Calculate Energy Prediction

Calculate monthly energy bill prediction with savings recommendations.

**Endpoint:** `POST /predictions/calculate`

**Request Body:**
```json
{
  "usageHours": 5.5,
  "applianceCount": 3,
  "location": "New York",
  "userId": "user-123" // Optional
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "pred_abc123",
    "predictedBill": 45.60,
    "potentialSavings": 9.12,
    "savingsPercentage": 20.0,
    "optimizedBill": 36.48,
    "monthlyKWh": 228.0,
    "recommendations": [
      "⏰ Reduce daily appliance usage by 2-3 hours to save up to 25% on your bill",
      "🔌 Unplug devices when not in use - phantom power can account for 10% of your bill"
    ],
    "newBadges": [
      {
        "id": "badge_123",
        "name": "Eco Warrior",
        "description": "Achieved 10% energy savings",
        "icon": "⚡",
        "color": "#3b82f6"
      }
    ]
  }
}
```

### Get Prediction History

Retrieve user's prediction history.

**Endpoint:** `GET /predictions/history`

**Query Parameters:**
- `userId` (required): User identifier
- `limit` (optional): Number of results (default: 10)

**Example:** `GET /predictions/history?userId=user-123&limit=5`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "pred_abc123",
      "usageHours": 5.5,
      "applianceCount": 3,
      "location": "New York",
      "predictedBill": 45.60,
      "potentialSavings": 9.12,
      "savingsPercentage": 20.0,
      "optimizedBill": 36.48,
      "monthlyKWh": 228.0,
      "createdAt": "2025-12-02T10:30:00.000Z"
    }
  ]
}
```

### Get Prediction by ID

Retrieve a specific prediction with recommendations.

**Endpoint:** `GET /predictions/:id`

**Example:** `GET /predictions/pred_abc123`

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "pred_abc123",
    "predictedBill": 45.60,
    "recommendations": ["...", "..."],
    // ... other fields
  }
}
```

---

## Chat API

### Send Message

Send a message to the AI energy assistant.

**Endpoint:** `POST /chat/message`

**Request Body:**
```json
{
  "message": "How can I reduce my electricity bill?",
  "userId": "user-123" // Optional
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "message": "To reduce your electricity bill, start by identifying your biggest energy consumers...",
    "suggestions": [
      "💡 LED bulbs use 75% less energy than traditional incandescent bulbs",
      "🌡️ Setting your thermostat 2°F lower in winter can save 5-10% on bills"
    ]
  }
}
```

### Get Chat History

Retrieve conversation history for a user.

**Endpoint:** `GET /chat/history`

**Query Parameters:**
- `userId` (required): User identifier
- `limit` (optional): Number of messages (default: 50)

**Example:** `GET /chat/history?userId=user-123&limit=20`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "msg_123",
      "role": "user",
      "content": "How can I save energy?",
      "createdAt": "2025-12-02T10:30:00.000Z"
    },
    {
      "id": "msg_124",
      "role": "assistant",
      "content": "Here are some tips...",
      "createdAt": "2025-12-02T10:30:01.000Z"
    }
  ]
}
```

### Clear Chat History

Delete all chat messages for a user.

**Endpoint:** `DELETE /chat/clear`

**Query Parameters:**
- `userId` (required): User identifier

**Example:** `DELETE /chat/clear?userId=user-123`

**Response:**
```json
{
  "status": "success",
  "data": {
    "success": true
  }
}
```

---

## Gamification API

### Get All Badges

Retrieve all available achievement badges.

**Endpoint:** `GET /gamification/badges`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "badge_1",
      "name": "Energy Novice",
      "description": "Started your energy-saving journey",
      "icon": "🌱",
      "requirement": 0,
      "color": "#10b981"
    },
    {
      "id": "badge_2",
      "name": "Eco Warrior",
      "description": "Achieved 10% energy savings",
      "icon": "⚡",
      "requirement": 10,
      "color": "#3b82f6"
    }
  ]
}
```

### Get User Badges

Retrieve badges earned by a specific user.

**Endpoint:** `GET /gamification/user-badges`

**Query Parameters:**
- `userId` (required): User identifier

**Example:** `GET /gamification/user-badges?userId=user-123`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "badge_1",
      "name": "Energy Novice",
      "description": "Started your energy-saving journey",
      "icon": "🌱",
      "requirement": 0,
      "color": "#10b981",
      "earnedAt": "2025-12-02T10:30:00.000Z"
    }
  ]
}
```

### Get User Progress

Retrieve user's progress toward next badge.

**Endpoint:** `GET /gamification/progress`

**Query Parameters:**
- `userId` (required): User identifier

**Example:** `GET /gamification/progress?userId=user-123`

**Response:**
```json
{
  "status": "success",
  "data": {
    "currentSavings": 15.5,
    "totalBadges": 2,
    "nextBadge": {
      "name": "Green Champion",
      "requirement": 20,
      "progress": 77.5
    }
  }
}
```

### Check Achievements

Check if user has earned new badges based on savings percentage.

**Endpoint:** `POST /gamification/check-achievements`

**Request Body:**
```json
{
  "userId": "user-123",
  "savingsPercentage": 15.5
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "newBadges": [
      {
        "id": "badge_2",
        "name": "Eco Warrior",
        "description": "Achieved 10% energy savings",
        "icon": "⚡",
        "requirement": 10,
        "color": "#3b82f6"
      }
    ],
    "count": 1
  }
}
```

---

## Locations API

### Search Locations

Search for cities by name or state.

**Endpoint:** `GET /locations/search`

**Query Parameters:**
- `q` (required): Search query

**Example:** `GET /locations/search?q=New York`

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "loc_123",
      "name": "New York",
      "state": "NY",
      "country": "USA",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "energyRate": 0.20,
      "renewablePercent": 28
    }
  ]
}
```

### Get Energy Data for Location

Retrieve detailed energy information for a specific location.

**Endpoint:** `GET /locations/:id/energy-data`

**Example:** `GET /locations/loc_123/energy-data`

**Response:**
```json
{
  "status": "success",
  "data": {
    "location": {
      "name": "New York",
      "state": "NY",
      "country": "USA"
    },
    "energyRate": 0.20,
    "renewablePercent": 28,
    "estimatedMonthlyCosts": {
      "small": "100.00",
      "medium": "180.00",
      "large": "240.00"
    },
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.0060
    }
  }
}
```

### Get Location by Name

Retrieve location data by exact city name.

**Endpoint:** `GET /locations/by-name/:name`

**Example:** `GET /locations/by-name/Seattle`

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "loc_456",
    "name": "Seattle",
    "state": "WA",
    "energyRate": 0.10,
    "renewablePercent": 85,
    // ... other fields
  }
}
```

---

## Health Check

### Server Health

Check if the server is running.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-02T10:30:00.000Z",
  "environment": "development"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

### Common Error Codes

- `400 Bad Request`: Invalid input data or missing required fields
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

### Example Error Response

```json
{
  "status": "error",
  "message": "userId is required"
}
```

---

## Rate Limiting

Currently, there are no rate limits in development. For production deployment, consider implementing rate limiting to prevent abuse.

---

## CORS

The API allows requests from `http://localhost:5173` by default. Update `CORS_ORIGIN` in `.env` for production deployment.

---

## Authentication

Currently, the API uses optional `userId` parameters for tracking. For production, implement proper authentication using JWT or session-based auth.

---

## Database

The API uses SQLite in development. For production, migrate to PostgreSQL by updating the `DATABASE_URL` in `.env`:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

Then run:
```bash
npx prisma migrate deploy
npm run db:seed
```
