import { Router, Request, Response, NextFunction } from 'express';
import predictionService from '../services/predictionService.js';
import gamificationService from '../services/gamificationService.js';
import { energyPredictionSchema } from '../utils/validation.js';
import { ValidationError } from '../utils/errors.js';

const router = Router();

/**
 * @swagger
 * /predictions/calculate:
 *   post:
 *     summary: Calculate energy prediction
 *     description: Calculate monthly energy bill prediction with personalized savings recommendations and potential badge achievements
 *     tags: [Predictions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PredictionInput'
 *     responses:
 *       200:
 *         description: Prediction calculated successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PredictionResult'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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

/**
 * @swagger
 * /predictions/history:
 *   get:
 *     summary: Get prediction history
 *     description: Retrieve user's prediction history with optional limit
 *     tags: [Predictions]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User identifier
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of results
 *     responses:
 *       200:
 *         description: Prediction history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/PredictionResult'
 *       400:
 *         description: Missing userId parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
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
