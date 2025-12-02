import swaggerJsdoc from 'swagger-jsdoc';
import config from './index.js';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EnergySaver AI API',
            version: '1.0.0',
            description: `
# EnergySaver AI - Smart Energy Management Platform

A comprehensive REST API for energy usage predictions, AI-powered recommendations, gamification, and location-based energy data.

## Features

- 🔮 **Energy Predictions**: Calculate monthly bills and potential savings
- 💬 **AI Chat Assistant**: Get personalized energy-saving tips
- 🏆 **Gamification**: Earn badges and track sustainability progress
- 📍 **Location Data**: Access energy rates by city

## Authentication

Currently, the API uses optional \`userId\` parameters for user tracking. For production deployment, implement JWT or session-based authentication.

## Base URL

\`\`\`
${config.nodeEnv === 'production' ? 'https://your-api-domain.com' : 'http://localhost:3001'}/api
\`\`\`

## Response Format

All successful responses follow this structure:

\`\`\`json
{
  "status": "success",
  "data": { ... }
}
\`\`\`

Error responses:

\`\`\`json
{
  "status": "error",
  "message": "Error description"
}
\`\`\`
      `,
            contact: {
                name: 'EnergySaver AI Team',
                email: 'support@energysaver-ai.com',
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT',
            },
        },
        servers: [
            {
                url: config.nodeEnv === 'production'
                    ? 'https://your-api-domain.com/api'
                    : 'http://localhost:3001/api',
                description: config.nodeEnv === 'production' ? 'Production server' : 'Development server',
            },
        ],
        tags: [
            {
                name: 'Predictions',
                description: 'Energy usage predictions and savings calculations',
            },
            {
                name: 'Chat',
                description: 'AI-powered energy assistant chat interface',
            },
            {
                name: 'Gamification',
                description: 'Achievement badges and progress tracking',
            },
            {
                name: 'Locations',
                description: 'City-based energy rates and renewable data',
            },
            {
                name: 'Health',
                description: 'Server health and status endpoints',
            },
        ],
        components: {
            schemas: {
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            enum: ['success'],
                            example: 'success',
                        },
                        data: {
                            type: 'object',
                        },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            enum: ['error'],
                            example: 'error',
                        },
                        message: {
                            type: 'string',
                            example: 'An error occurred',
                        },
                    },
                },
                PredictionInput: {
                    type: 'object',
                    required: ['usageHours', 'applianceCount', 'location'],
                    properties: {
                        usageHours: {
                            type: 'number',
                            format: 'float',
                            minimum: 0.1,
                            description: 'Daily appliance usage hours',
                            example: 5.5,
                        },
                        applianceCount: {
                            type: 'integer',
                            minimum: 1,
                            description: 'Number of appliances',
                            example: 3,
                        },
                        location: {
                            type: 'string',
                            minLength: 1,
                            description: 'City name',
                            example: 'New York',
                        },
                        userId: {
                            type: 'string',
                            description: 'Optional user identifier',
                            example: 'user-123',
                        },
                    },
                },
                PredictionResult: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Prediction ID',
                            example: 'pred_abc123',
                        },
                        predictedBill: {
                            type: 'number',
                            format: 'float',
                            description: 'Predicted monthly bill in USD',
                            example: 45.60,
                        },
                        potentialSavings: {
                            type: 'number',
                            format: 'float',
                            description: 'Potential savings in USD',
                            example: 9.12,
                        },
                        savingsPercentage: {
                            type: 'number',
                            format: 'float',
                            description: 'Savings percentage',
                            example: 20.0,
                        },
                        optimizedBill: {
                            type: 'number',
                            format: 'float',
                            description: 'Optimized monthly bill in USD',
                            example: 36.48,
                        },
                        monthlyKWh: {
                            type: 'number',
                            format: 'float',
                            description: 'Monthly energy consumption in kWh',
                            example: 228.0,
                        },
                        recommendations: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            description: 'Personalized energy-saving recommendations',
                            example: [
                                '⏰ Reduce daily appliance usage by 2-3 hours to save up to 25% on your bill',
                                '🔌 Unplug devices when not in use - phantom power can account for 10% of your bill',
                            ],
                        },
                        newBadges: {
                            type: 'array',
                            items: {
                                $ref: '#/components/schemas/Badge',
                            },
                            description: 'Newly earned badges',
                        },
                    },
                },
                Badge: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: 'badge_123',
                        },
                        name: {
                            type: 'string',
                            example: 'Eco Warrior',
                        },
                        description: {
                            type: 'string',
                            example: 'Achieved 10% energy savings',
                        },
                        icon: {
                            type: 'string',
                            example: '⚡',
                        },
                        requirement: {
                            type: 'number',
                            format: 'float',
                            example: 10,
                        },
                        color: {
                            type: 'string',
                            example: '#3b82f6',
                        },
                        earnedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'When the badge was earned (only in user badges)',
                        },
                    },
                },
                ChatMessage: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: 'msg_123',
                        },
                        role: {
                            type: 'string',
                            enum: ['user', 'assistant'],
                            example: 'user',
                        },
                        content: {
                            type: 'string',
                            example: 'How can I save energy?',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                ChatInput: {
                    type: 'object',
                    required: ['message'],
                    properties: {
                        message: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 1000,
                            description: 'User message',
                            example: 'How can I reduce my electricity bill?',
                        },
                        userId: {
                            type: 'string',
                            description: 'Optional user identifier',
                            example: 'user-123',
                        },
                    },
                },
                ChatResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'To reduce your electricity bill, start by identifying your biggest energy consumers...',
                        },
                        suggestions: {
                            type: 'array',
                            items: {
                                type: 'string',
                            },
                            example: [
                                '💡 LED bulbs use 75% less energy than traditional incandescent bulbs',
                                '🌡️ Setting your thermostat 2°F lower in winter can save 5-10% on bills',
                            ],
                        },
                    },
                },
                Location: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            example: 'loc_123',
                        },
                        name: {
                            type: 'string',
                            example: 'New York',
                        },
                        state: {
                            type: 'string',
                            example: 'NY',
                        },
                        country: {
                            type: 'string',
                            example: 'USA',
                        },
                        latitude: {
                            type: 'number',
                            format: 'float',
                            example: 40.7128,
                        },
                        longitude: {
                            type: 'number',
                            format: 'float',
                            example: -74.0060,
                        },
                        energyRate: {
                            type: 'number',
                            format: 'float',
                            description: 'Energy rate in USD per kWh',
                            example: 0.20,
                        },
                        renewablePercent: {
                            type: 'number',
                            format: 'float',
                            description: 'Percentage of renewable energy',
                            example: 28,
                        },
                    },
                },
                UserProgress: {
                    type: 'object',
                    properties: {
                        currentSavings: {
                            type: 'number',
                            format: 'float',
                            description: 'Current best savings percentage',
                            example: 15.5,
                        },
                        totalBadges: {
                            type: 'number',
                            format: 'integer',
                            description: 'Total badges earned',
                            example: 2,
                        },
                        nextBadge: {
                            type: 'object',
                            nullable: true,
                            properties: {
                                name: {
                                    type: 'string',
                                    example: 'Green Champion',
                                },
                                requirement: {
                                    type: 'number',
                                    format: 'float',
                                    example: 20,
                                },
                                progress: {
                                    type: 'number',
                                    format: 'float',
                                    description: 'Progress percentage toward next badge',
                                    example: 77.5,
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.ts', './src/server.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
