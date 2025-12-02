import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',

    // AI API keys (optional)
    openaiApiKey: process.env.OPENAI_API_KEY,
    huggingfaceApiKey: process.env.HUGGINGFACE_API_KEY,

    // Feature flags
    useRealAI: process.env.USE_REAL_AI === 'true',
};

export default config;
