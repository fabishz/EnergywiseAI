import { PrismaClient } from '@prisma/client';
import { ChatMessageInput } from '../utils/validation.js';

const prisma = new PrismaClient();

interface ChatResponse {
    message: string;
    suggestions?: string[];
}

export class ChatService {
    private energyTips = [
        "💡 LED bulbs use 75% less energy than traditional incandescent bulbs and last 25 times longer!",
        "🌡️ Setting your thermostat 2°F lower in winter and 2°F higher in summer can save about 5-10% on energy bills.",
        "🔌 Phantom power from devices on standby can account for 5-10% of residential energy use. Use power strips!",
        "🌙 Running appliances like dishwashers and washing machines during off-peak hours can save money with time-of-use pricing.",
        "☀️ Natural lighting is free! Open curtains during the day instead of using artificial lights.",
        "❄️ Clean or replace HVAC filters monthly - dirty filters make systems work harder and use more energy.",
        "🚿 Shorter showers save both water and the energy needed to heat it. Try 5-minute showers!",
        "🖥️ Enable power-saving modes on computers and monitors - they can reduce energy use by 30-60%.",
    ];

    private contextualResponses: Record<string, string[]> = {
        'save': [
            "Great question about saving energy! Here are my top tips: Use LED bulbs, unplug devices when not in use, and adjust your thermostat by just 2°F.",
            "To maximize savings, focus on your biggest energy users: heating/cooling, water heating, and major appliances. Small changes in these areas make the biggest impact!"
        ],
        'bill': [
            "To reduce your electricity bill, start by identifying your biggest energy consumers. Typically, HVAC systems use 40-50% of home energy!",
            "Your bill depends on usage patterns and local rates. I can help you optimize both! Try using appliances during off-peak hours."
        ],
        'appliance': [
            "Smart appliance usage is key! Run dishwashers and washing machines with full loads, and use cold water when possible.",
            "Major appliances like refrigerators, washers, and dryers are big energy users. Look for ENERGY STAR certified models when replacing them."
        ],
        'solar': [
            "Solar panels can significantly reduce your electricity bills! The average payback period is 6-8 years, and they can last 25+ years.",
            "Before going solar, maximize your energy efficiency first. This reduces the system size you need, saving on installation costs!"
        ],
        'winter': [
            "Winter energy-saving tips: Lower your thermostat when sleeping, use a programmable thermostat, seal air leaks, and use ceiling fans in reverse.",
            "Heating accounts for about 45% of winter energy bills. Every degree you lower your thermostat saves about 3% on heating costs!"
        ],
        'summer': [
            "Summer cooling tips: Use fans to circulate air, close blinds during peak sun hours, and set AC to 78°F when home.",
            "Air conditioning can account for 50% of summer energy use. A programmable thermostat can save you up to 10% annually!"
        ],
    };

    async sendMessage(input: ChatMessageInput): Promise<ChatResponse> {
        const { message, userId } = input;

        // Save user message
        await prisma.chatMessage.create({
            data: {
                userId,
                role: 'user',
                content: message,
            },
        });

        // Generate contextual response
        const response = this.generateResponse(message);

        // Save assistant response
        await prisma.chatMessage.create({
            data: {
                userId,
                role: 'assistant',
                content: response.message,
            },
        });

        return response;
    }

    private generateResponse(userMessage: string): ChatResponse {
        const lowerMessage = userMessage.toLowerCase();

        // Check for contextual keywords
        for (const [keyword, responses] of Object.entries(this.contextualResponses)) {
            if (lowerMessage.includes(keyword)) {
                const response = responses[Math.floor(Math.random() * responses.length)];
                return {
                    message: response,
                    suggestions: this.getRandomTips(2),
                };
            }
        }

        // Default response with energy tips
        const greetings = ['hi', 'hello', 'hey'];
        if (greetings.some(g => lowerMessage.includes(g))) {
            return {
                message: "👋 Hello! I'm your AI energy advisor. I can help you reduce your electricity bill and make your home more energy-efficient. What would you like to know?",
                suggestions: [
                    "How can I save on my electricity bill?",
                    "What are the best energy-saving tips?",
                    "Tell me about solar panels"
                ],
            };
        }

        // Generic helpful response
        return {
            message: "That's a great question! Here's what I recommend: " + this.getRandomTips(1)[0],
            suggestions: this.getRandomTips(2),
        };
    }

    private getRandomTips(count: number): string[] {
        const shuffled = [...this.energyTips].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    async getChatHistory(userId: string, limit = 50) {
        return prisma.chatMessage.findMany({
            where: { userId },
            orderBy: { createdAt: 'asc' },
            take: limit,
        });
    }

    async clearChatHistory(userId: string) {
        await prisma.chatMessage.deleteMany({
            where: { userId },
        });
        return { success: true };
    }
}

export default new ChatService();
