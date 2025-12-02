import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatAPI } from '@/lib/api';

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    createdAt: string;
}

export interface ChatResponse {
    message: string;
    suggestions?: string[];
}

export function useChat(userId?: string) {
    const queryClient = useQueryClient();

    const sendMessage = useMutation({
        mutationFn: (message: string) =>
            chatAPI.sendMessage({ message, userId }),
        onSuccess: () => {
            // Invalidate chat history to refetch
            queryClient.invalidateQueries({ queryKey: ['chat', 'history', userId] });
        },
    });

    const chatHistory = useQuery({
        queryKey: ['chat', 'history', userId],
        queryFn: async () => {
            if (!userId) return [];
            const response: any = await chatAPI.getHistory(userId);
            return response.data as ChatMessage[];
        },
        enabled: !!userId,
    });

    const clearHistory = useMutation({
        mutationFn: () => chatAPI.clearHistory(userId!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chat', 'history', userId] });
        },
    });

    return {
        sendMessage,
        chatHistory,
        clearHistory,
    };
}
