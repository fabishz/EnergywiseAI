import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class GamificationService {
    async checkAndAwardBadges(userId: string, savingsPercentage: number) {
        // Get all badges the user qualifies for
        const eligibleBadges = await prisma.badge.findMany({
            where: {
                requirement: {
                    lte: savingsPercentage,
                },
            },
        });

        // Get badges user already has
        const existingBadges = await prisma.userBadge.findMany({
            where: { userId },
            select: { badgeId: true },
        });

        const existingBadgeIds = new Set(existingBadges.map(b => b.badgeId));

        // Award new badges
        const newBadges = [];
        for (const badge of eligibleBadges) {
            if (!existingBadgeIds.has(badge.id)) {
                const userBadge = await prisma.userBadge.create({
                    data: {
                        userId,
                        badgeId: badge.id,
                    },
                    include: {
                        badge: true,
                    },
                });
                newBadges.push(userBadge.badge);
            }
        }

        return newBadges;
    }

    async getUserBadges(userId: string) {
        const userBadges = await prisma.userBadge.findMany({
            where: { userId },
            include: {
                badge: true,
            },
            orderBy: {
                earnedAt: 'desc',
            },
        });

        return userBadges.map(ub => ({
            ...ub.badge,
            earnedAt: ub.earnedAt,
        }));
    }

    async getAllBadges() {
        return prisma.badge.findMany({
            orderBy: {
                requirement: 'asc',
            },
        });
    }

    async getUserProgress(userId: string) {
        // Get user's best savings percentage
        const bestPrediction = await prisma.energyPrediction.findFirst({
            where: { userId },
            orderBy: { savingsPercentage: 'desc' },
        });

        const currentSavings = bestPrediction?.savingsPercentage || 0;

        // Get next badge to unlock
        const earnedBadges = await prisma.userBadge.findMany({
            where: { userId },
            select: { badgeId: true },
        });

        const earnedBadgeIds = new Set(earnedBadges.map(b => b.badgeId));

        const nextBadge = await prisma.badge.findFirst({
            where: {
                id: {
                    notIn: Array.from(earnedBadgeIds),
                },
                requirement: {
                    gt: currentSavings,
                },
            },
            orderBy: {
                requirement: 'asc',
            },
        });

        return {
            currentSavings,
            totalBadges: earnedBadges.length,
            nextBadge: nextBadge ? {
                name: nextBadge.name,
                requirement: nextBadge.requirement,
                progress: (currentSavings / nextBadge.requirement) * 100,
            } : null,
        };
    }
}

export default new GamificationService();
