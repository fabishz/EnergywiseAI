import { useQuery } from '@tanstack/react-query';
import { gamificationAPI } from '@/lib/api';

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    requirement: number;
    color: string;
    earnedAt?: string;
}

export interface UserProgress {
    currentSavings: number;
    totalBadges: number;
    nextBadge: {
        name: string;
        requirement: number;
        progress: number;
    } | null;
}

export function useGamification(userId?: string) {
    const allBadges = useQuery({
        queryKey: ['gamification', 'badges'],
        queryFn: async () => {
            const response: any = await gamificationAPI.getAllBadges();
            return response.data as Badge[];
        },
    });

    const userBadges = useQuery({
        queryKey: ['gamification', 'user-badges', userId],
        queryFn: async () => {
            if (!userId) return [];
            const response: any = await gamificationAPI.getUserBadges(userId);
            return response.data as Badge[];
        },
        enabled: !!userId,
    });

    const userProgress = useQuery({
        queryKey: ['gamification', 'progress', userId],
        queryFn: async () => {
            if (!userId) return null;
            const response: any = await gamificationAPI.getProgress(userId);
            return response.data as UserProgress;
        },
        enabled: !!userId,
    });

    return {
        allBadges,
        userBadges,
        userProgress,
    };
}
