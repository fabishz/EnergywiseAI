import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Add any auth tokens here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        console.error('API Error:', message);
        return Promise.reject(new Error(message));
    }
);

// API methods
export const predictionAPI = {
    calculate: (data: {
        usageHours: number;
        applianceCount: number;
        location: string;
        userId?: string;
    }) => api.post('/predictions/calculate', data),

    getHistory: (userId: string, limit = 10) =>
        api.get(`/predictions/history?userId=${userId}&limit=${limit}`),

    getById: (id: string) => api.get(`/predictions/${id}`),
};

export const chatAPI = {
    sendMessage: (data: { message: string; userId?: string }) =>
        api.post('/chat/message', data),

    getHistory: (userId: string, limit = 50) =>
        api.get(`/chat/history?userId=${userId}&limit=${limit}`),

    clearHistory: (userId: string) => api.delete(`/chat/clear?userId=${userId}`),
};

export const gamificationAPI = {
    getAllBadges: () => api.get('/gamification/badges'),

    getUserBadges: (userId: string) =>
        api.get(`/gamification/user-badges?userId=${userId}`),

    getProgress: (userId: string) =>
        api.get(`/gamification/progress?userId=${userId}`),

    checkAchievements: (data: { userId: string; savingsPercentage: number }) =>
        api.post('/gamification/check-achievements', data),
};

export const locationAPI = {
    search: (query: string) => api.get(`/locations/search?q=${query}`),

    getEnergyData: (id: string) => api.get(`/locations/${id}/energy-data`),

    getByName: (name: string) => api.get(`/locations/by-name/${name}`),
};

export default api;
