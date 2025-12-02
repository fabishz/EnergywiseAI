import { z } from 'zod';

export const energyPredictionSchema = z.object({
    usageHours: z.number().positive('Usage hours must be positive'),
    applianceCount: z.number().int().positive('Appliance count must be a positive integer'),
    location: z.string().min(1, 'Location is required'),
    userId: z.string().optional(),
});

export const chatMessageSchema = z.object({
    message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message too long'),
    userId: z.string().optional(),
});

export const locationSearchSchema = z.object({
    query: z.string().min(1, 'Search query is required'),
});

export type EnergyPredictionInput = z.infer<typeof energyPredictionSchema>;
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type LocationSearchInput = z.infer<typeof locationSearchSchema>;
