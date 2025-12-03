import { PrismaClient } from '@prisma/client';
import { EnergyPredictionInput } from '../utils/validation.js';
import { NotFoundError } from '../utils/errors.js';

const prisma = new PrismaClient();

interface PredictionResult {
    predictedBill: number;
    potentialSavings: number;
    savingsPercentage: number;
    optimizedBill: number;
    monthlyKWh: number;
    recommendations: string[];
}

export class PredictionService {
    async calculatePrediction(input: EnergyPredictionInput): Promise<PredictionResult & { id: string }> {
        const { usageHours, applianceCount, location, userId } = input;

        // Get location-specific energy rate
        const locationData = await prisma.location.findFirst({
            where: {
                name: {
                    contains: location
                }
            }
        });

        const baseRate = locationData?.energyRate || 0.13; // Default rate if location not found
        const avgWattage = 100; // Average appliance wattage
        const daysInMonth = 30;

        // Calculate monthly energy consumption
        const monthlyKWh = (usageHours * applianceCount * avgWattage * daysInMonth) / 1000;
        const predictedBill = monthlyKWh * baseRate;

        // Calculate potential savings (15-25% based on usage patterns)
        const baseSavingsPercent = 15;
        const efficiencyBonus = Math.min(10, (applianceCount / 10) * 5); // More appliances = more optimization potential
        const savingsPercentage = baseSavingsPercent + efficiencyBonus;

        const potentialSavings = predictedBill * (savingsPercentage / 100);
        const optimizedBill = predictedBill - potentialSavings;

        // Generate recommendations
        const recommendations = this.generateRecommendations(
            usageHours,
            applianceCount,
            monthlyKWh,
            locationData?.renewablePercent
        );

        // Save to database
        const prediction = await prisma.energyPrediction.create({
            data: {
                userId,
                usageHours,
                applianceCount,
                location,
                predictedBill: parseFloat(predictedBill.toFixed(2)),
                potentialSavings: parseFloat(potentialSavings.toFixed(2)),
                savingsPercentage: parseFloat(savingsPercentage.toFixed(1)),
                optimizedBill: parseFloat(optimizedBill.toFixed(2)),
                monthlyKWh: parseFloat(monthlyKWh.toFixed(2)),
                recommendations: JSON.stringify(recommendations),
            },
        });

        return {
            id: prediction.id,
            predictedBill: prediction.predictedBill,
            potentialSavings: prediction.potentialSavings,
            savingsPercentage: prediction.savingsPercentage,
            optimizedBill: prediction.optimizedBill,
            monthlyKWh: prediction.monthlyKWh,
            recommendations,
        };
    }

    private generateRecommendations(
        usageHours: number,
        applianceCount: number,
        monthlyKWh: number,
        renewablePercent?: number | null
    ): string[] {
        const recommendations: string[] = [];

        if (usageHours > 8) {
            recommendations.push('⏰ Reduce daily appliance usage by 2-3 hours to save up to 25% on your bill');
        }

        if (applianceCount > 5) {
            recommendations.push('🔌 Unplug devices when not in use - phantom power can account for 10% of your bill');
        }

        if (monthlyKWh > 300) {
            recommendations.push('💡 Switch to LED bulbs - they use 75% less energy than incandescent bulbs');
            recommendations.push('🌡️ Adjust thermostat by 2°F to save 5-10% on heating/cooling costs');
        }

        recommendations.push('📊 Use power strips to easily turn off multiple devices at once');

        if (renewablePercent && renewablePercent < 30) {
            recommendations.push('☀️ Consider switching to a renewable energy plan in your area');
        }

        recommendations.push('🔋 Run major appliances during off-peak hours if you have time-of-use pricing');

        return recommendations.slice(0, 5); // Return top 5 recommendations
    }

    async getPredictionHistory(userId: string, limit = 10) {
        return prisma.energyPrediction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }

    async getPredictionById(id: string) {
        const prediction = await prisma.energyPrediction.findUnique({
            where: { id },
        });

        if (!prediction) {
            throw new NotFoundError('Prediction not found');
        }

        return {
            ...prediction,
            recommendations: prediction.recommendations
                ? JSON.parse(prediction.recommendations)
                : [],
        };
    }
}

export default new PredictionService();
