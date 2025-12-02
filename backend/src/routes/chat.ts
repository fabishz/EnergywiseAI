import { Router, Request, Response, NextFunction } from 'express';
import chatService from '../services/chatService.js';
import { chatMessageSchema } from '../utils/validation.js';
import { ValidationError } from '../utils/errors.js';

const router = Router();

// Send message to AI assistant
router.post('/message', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = chatMessageSchema.parse(req.body);
        const response = await chatService.sendMessage(validatedData);

        res.json({
            status: 'success',
            data: response,
        });
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            next(new ValidationError('Invalid message data'));
        } else {
            next(error);
        }
    }
});

// Get chat history
router.get('/history', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.query.userId as string;
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

        if (!userId) {
            throw new ValidationError('userId is required');
        }

        const history = await chatService.getChatHistory(userId, limit);

        res.json({
            status: 'success',
            data: history,
        });
    } catch (error) {
        next(error);
    }
});

// Clear chat history
router.delete('/clear', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.query.userId as string;

        if (!userId) {
            throw new ValidationError('userId is required');
        }

        const result = await chatService.clearChatHistory(userId);

        res.json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
