import { Router, Request, Response, NextFunction } from 'express';
import gamificationService from '../services/gamificationService.js';
import { ValidationError } from '../utils/errors.js';

const router = Router();

// Get all available badges
router.get('/badges', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const badges = await gamificationService.getAllBadges();

        res.json({
            status: 'success',
            data: badges,
        });
    } catch (error) {
        next(error);
    }
});

// Get user's earned badges
router.get('/user-badges', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.query.userId as string;

        if (!userId) {
            throw new ValidationError('userId is required');
        }

        const badges = await gamificationService.getUserBadges(userId);

        res.json({
            status: 'success',
            data: badges,
        });
    } catch (error) {
        next(error);
    }
});

// Get user progress
router.get('/progress', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.query.userId as string;

        if (!userId) {
            throw new ValidationError('userId is required');
        }

        const progress = await gamificationService.getUserProgress(userId);

        res.json({
            status: 'success',
            data: progress,
        });
    } catch (error) {
        next(error);
    }
});

// Check for new achievements
router.post('/check-achievements', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, savingsPercentage } = req.body;

        if (!userId || savingsPercentage === undefined) {
            throw new ValidationError('userId and savingsPercentage are required');
        }

        const newBadges = await gamificationService.checkAndAwardBadges(userId, savingsPercentage);

        res.json({
            status: 'success',
            data: {
                newBadges,
                count: newBadges.length,
            },
        });
    } catch (error) {
        next(error);
    }
});

export default router;
