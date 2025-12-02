import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { predictionAPI } from '@/lib/api';
import { useToast } from './use-toast';

export interface PredictionInput {
    usageHours: number;
    applianceCount: number;
    location: string;
    userId?: string;
}

export interface PredictionResult {
    id: string;
    predictedBill: number;
    potentialSavings: number;
    savingsPercentage: number;
    optimizedBill: number;
    monthlyKWh: number;
    recommendations: string[];
    newBadges?: Array<{
        id: string;
        name: string;
        description: string;
        icon: string;
        color: string;
    }>;
}

export function useEnergyPrediction() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: PredictionInput) => predictionAPI.calculate(data),
        onSuccess: (response: any) => {
            const data = response.data as PredictionResult;

            toast({
                title: 'Prediction Complete! 🎉',
                description: `You could save $${data.potentialSavings.toFixed(2)} per month!`,
            });

            // Show badge notifications
            if (data.newBadges && data.newBadges.length > 0) {
                data.newBadges.forEach((badge) => {
                    toast({
                        title: `New Badge Unlocked! ${badge.icon}`,
                        description: badge.name,
                    });
                });
            }

            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ['predictions'] });
            queryClient.invalidateQueries({ queryKey: ['gamification'] });
        },
        onError: (error: Error) => {
            toast({
                title: 'Prediction Failed',
                description: error.message,
                variant: 'destructive',
            });
        },
    });
}

export function usePredictionHistory(userId: string, limit = 10) {
    return useQuery({
        queryKey: ['predictions', 'history', userId, limit],
        queryFn: async () => {
            const response: any = await predictionAPI.getHistory(userId, limit);
            return response.data;
        },
        enabled: !!userId,
    });
}
