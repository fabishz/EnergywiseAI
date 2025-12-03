import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../utils/errors.js';

const prisma = new PrismaClient();

export class LocationService {
    async searchLocations(query: string) {
        const locations = await prisma.location.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: query
                        },
                    },
                    {
                        state: {
                            contains: query
                        },
                    },
                ],
            },
            take: 10,
        });

        return locations;
    }

    async getLocationById(id: string) {
        const location = await prisma.location.findUnique({
            where: { id },
        });

        if (!location) {
            throw new NotFoundError('Location not found');
        }

        return location;
    }

    async getLocationByName(name: string) {
        const location = await prisma.location.findFirst({
            where: {
                name: {
                    equals: name
                },
            },
        });

        return location;
    }

    async getEnergyData(locationId: string) {
        const location = await this.getLocationById(locationId);

        // Calculate average monthly costs for different household sizes
        const averageUsageKWh = {
            small: 500,  // 1-2 people
            medium: 900, // 3-4 people
            large: 1200, // 5+ people
        };

        return {
            location: {
                name: location.name,
                state: location.state,
                country: location.country,
            },
            energyRate: location.energyRate,
            renewablePercent: location.renewablePercent,
            estimatedMonthlyCosts: {
                small: (averageUsageKWh.small * location.energyRate).toFixed(2),
                medium: (averageUsageKWh.medium * location.energyRate).toFixed(2),
                large: (averageUsageKWh.large * location.energyRate).toFixed(2),
            },
            coordinates: location.latitude && location.longitude ? {
                latitude: location.latitude,
                longitude: location.longitude,
            } : null,
        };
    }
}

export default new LocationService();
