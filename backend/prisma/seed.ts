import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Seed badges
    const badges = [
        {
            name: 'Energy Novice',
            description: 'Started your energy-saving journey',
            icon: '🌱',
            requirement: 0,
            color: '#10b981'
        },
        {
            name: 'Eco Warrior',
            description: 'Achieved 10% energy savings',
            icon: '⚡',
            requirement: 10,
            color: '#3b82f6'
        },
        {
            name: 'Green Champion',
            description: 'Achieved 15% energy savings',
            icon: '🏆',
            requirement: 15,
            color: '#8b5cf6'
        },
        {
            name: 'Sustainability Master',
            description: 'Achieved 20% energy savings',
            icon: '👑',
            requirement: 20,
            color: '#f59e0b'
        },
        {
            name: 'Planet Protector',
            description: 'Achieved 25% energy savings',
            icon: '🌍',
            requirement: 25,
            color: '#ef4444'
        }
    ];

    for (const badge of badges) {
        await prisma.badge.upsert({
            where: { name: badge.name },
            update: badge,
            create: badge
        });
    }

    console.log('✅ Created badges');

    // Seed locations with realistic energy rates
    const locations = [
        { name: 'New York', state: 'NY', energyRate: 0.20, renewablePercent: 28, latitude: 40.7128, longitude: -74.0060 },
        { name: 'Los Angeles', state: 'CA', energyRate: 0.22, renewablePercent: 45, latitude: 34.0522, longitude: -118.2437 },
        { name: 'Chicago', state: 'IL', energyRate: 0.13, renewablePercent: 15, latitude: 41.8781, longitude: -87.6298 },
        { name: 'Houston', state: 'TX', energyRate: 0.12, renewablePercent: 20, latitude: 29.7604, longitude: -95.3698 },
        { name: 'Phoenix', state: 'AZ', energyRate: 0.13, renewablePercent: 35, latitude: 33.4484, longitude: -112.0740 },
        { name: 'Philadelphia', state: 'PA', energyRate: 0.14, renewablePercent: 18, latitude: 39.9526, longitude: -75.1652 },
        { name: 'San Antonio', state: 'TX', energyRate: 0.11, renewablePercent: 22, latitude: 29.4241, longitude: -98.4936 },
        { name: 'San Diego', state: 'CA', energyRate: 0.24, renewablePercent: 50, latitude: 32.7157, longitude: -117.1611 },
        { name: 'Dallas', state: 'TX', energyRate: 0.12, renewablePercent: 19, latitude: 32.7767, longitude: -96.7970 },
        { name: 'San Jose', state: 'CA', energyRate: 0.21, renewablePercent: 48, latitude: 37.3382, longitude: -121.8863 },
        { name: 'Austin', state: 'TX', energyRate: 0.12, renewablePercent: 25, latitude: 30.2672, longitude: -97.7431 },
        { name: 'Seattle', state: 'WA', energyRate: 0.10, renewablePercent: 85, latitude: 47.6062, longitude: -122.3321 },
        { name: 'Denver', state: 'CO', energyRate: 0.13, renewablePercent: 30, latitude: 39.7392, longitude: -104.9903 },
        { name: 'Boston', state: 'MA', energyRate: 0.22, renewablePercent: 20, latitude: 42.3601, longitude: -71.0589 },
        { name: 'Miami', state: 'FL', energyRate: 0.12, renewablePercent: 12, latitude: 25.7617, longitude: -80.1918 }
    ];

    for (const location of locations) {
        await prisma.location.upsert({
            where: { name: location.name },
            update: location,
            create: location
        });
    }

    console.log('✅ Created locations');
    console.log('🎉 Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
