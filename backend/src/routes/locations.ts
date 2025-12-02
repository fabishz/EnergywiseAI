import { Router, Request, Response, NextFunction } from 'express';
import locationService from '../services/locationService.js';
import { locationSearchSchema } from '../utils/validation.js';
import { ValidationError } from '../utils/errors.js';

const router = Router();

// Search locations
router.get('/search', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query.q as string;

        if (!query) {
            throw new ValidationError('Search query (q) is required');
        }

        const validatedData = locationSearchSchema.parse({ query });
        const locations = await locationService.searchLocations(validatedData.query);

        res.json({
            status: 'success',
            data: locations,
        });
    } catch (error) {
        if (error instanceof Error && error.name === 'ZodError') {
            next(new ValidationError('Invalid search query'));
        } else {
            next(error);
        }
    }
});

// Get energy data for a location
router.get('/:id/energy-data', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const energyData = await locationService.getEnergyData(req.params.id);

        res.json({
            status: 'success',
            data: energyData,
        });
    } catch (error) {
        next(error);
    }
});

// Get location by name
router.get('/by-name/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const location = await locationService.getLocationByName(req.params.name);

        if (!location) {
            res.json({
                status: 'success',
                data: null,
            });
            return;
        }

        res.json({
            status: 'success',
            data: location,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
