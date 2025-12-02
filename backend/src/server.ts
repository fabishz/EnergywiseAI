import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import { errorHandler } from './middleware/errorHandler.js';

// Import routes
import predictionsRouter from './routes/predictions.js';
import chatRouter from './routes/chat.js';
import gamificationRouter from './routes/gamification.js';
import locationsRouter from './routes/locations.js';

const app = express();

// Middleware
app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: config.nodeEnv,
    });
});

// API routes
app.use('/api/predictions', predictionsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/gamification', gamificationRouter);
app.use('/api/locations', locationsRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
    });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${config.nodeEnv}`);
    console.log(`🌐 CORS enabled for: ${config.corsOrigin}`);
    console.log(`\n✨ EnergySaver AI Backend is ready!`);
});

export default app;
