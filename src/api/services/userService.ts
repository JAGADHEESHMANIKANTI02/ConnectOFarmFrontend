import axiosInstance from '../axiosInstance';
import type { UserDto } from '../../types';

const userService = {
    /**
     * Get all users — ADMIN only
     * GET /api/v1/admin/users
     */
    getAllUsers: async (): Promise<UserDto[]> => {
        const response = await axiosInstance.get<UserDto[]>('/api/v1/admin/users');
        return response.data;
    },

    /**
     * Get all farmers — ADMIN only
     * GET /api/v1/admin/farmers
     */
    getFarmers: async (): Promise<UserDto[]> => {
        const response = await axiosInstance.get<UserDto[]>('/api/v1/admin/farmers');
        return response.data;
    },

    /**
     * Get all consumers — ADMIN only
     * GET /api/v1/admin/consumers
     */
    getConsumers: async (): Promise<UserDto[]> => {
        const response = await axiosInstance.get<UserDto[]>('/api/v1/admin/consumers');
        return response.data;
    },
};

export default userService;
