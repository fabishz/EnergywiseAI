import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors.js';
import config from '../config/index.js';

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    // Log unexpected errors
    console.error('❌ Unexpected error:', err);

    // Don't leak error details in production
    const message = config.nodeEnv === 'production'
        ? 'An unexpected error occurred'
        : err.message;

    res.status(500).json({
        status: 'error',
        message,
    });
};
