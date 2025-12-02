import { Router, Request, Response, NextFunction } from 'express';
import predictionService from '../services/predictionService.js';
import gamificationService from '../services/gamificationService.js';
import { energyPredictionSchema } from '../utils/validation.js';
import { ValidationError } from '../utils/errors.js';

const router = Router();

// Calculate energy prediction
router.post('/calculate', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = energyPredictionSchema.parse(req.body);
        const result = await predictionService.calculatePrediction(validatedData);

        // Check for new badge achievements
        let newBadges = [];
        if (validatedData.userId) {
            newBadges = await gamificationService.checkAndAwardBadges(
                validatedData.userId,
                result.savingsPercentage
            );
        }

        res.json({
            status: 'success',
            data: {
                ...result,
                newBadges,
            },
        });
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            next(new ValidationError('Invalid input data'));
        } else {
            next(error);
        }
    }
});

// Get prediction history
router.get('/history', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.query.userId as string;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

        if (!userId) {
            throw new ValidationError('userId is required');
        }

        const history = await predictionService.getPredictionHistory(userId, limit);

        res.json({
            status: 'success',
            data: history,
        });
    } catch (error) {
        next(error);
    }
});

// Get specific prediction
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prediction = await predictionService.getPredictionById(req.params.id);

        res.json({
            status: 'success',
            data: prediction,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
