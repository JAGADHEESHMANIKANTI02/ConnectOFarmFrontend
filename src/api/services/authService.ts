import axiosInstance from '../axiosInstance';
import type { AuthenticationRequest, AuthenticationResponse, RegisterRequest } from '../../types';

const authService =   {
    /**
     * Register a new user (ADMIN / FARMER / CONSUMER)
     * POST /api/v1/auth/register
     */
    register: async (data: RegisterRequest): Promise<AuthenticationResponse> => {
        const response = await axiosInstance.post<AuthenticationResponse>('/api/v1/auth/register', data);
        return response.data;
    },

    /**
     * Authenticate an existing user
     * POST /api/v1/auth/authenticate
     */
    login: async (data: AuthenticationRequest): Promise<AuthenticationResponse> => {
        const response = await axiosInstance.post<AuthenticationResponse>('/api/v1/auth/authenticate', data);
        return response.data;
    },
};

export default authService;
