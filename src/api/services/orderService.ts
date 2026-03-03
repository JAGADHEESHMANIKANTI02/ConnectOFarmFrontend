import axiosInstance from '../axiosInstance';
import type { OrderDto } from '../../types';

const orderService = {
    /**
     * Place a new order — CONSUMER only
     * POST /api/v1/consumer/orders
     * Body: { postId, quantity }
     */
    placeOrder: async (data: Pick<OrderDto, 'postId' | 'quantity'>): Promise<OrderDto> => {
        const response = await axiosInstance.post<OrderDto>('/api/v1/consumer/orders', data);
        return response.data;
    },

    /**
     * Get all orders placed by the logged-in consumer — CONSUMER only
     * GET /api/v1/consumer/orders
     */
    getMyOrdersAsConsumer: async (): Promise<OrderDto[]> => {
        const response = await axiosInstance.get<OrderDto[]>('/api/v1/consumer/orders');
        return response.data;
    },

    /**
     * Get all orders for the logged-in farmer's posts — FARMER only
     * GET /api/v1/farmer/orders
     */
    getMyOrdersAsFarmer: async (): Promise<OrderDto[]> => {
        const response = await axiosInstance.get<OrderDto[]>('/api/v1/farmer/orders');
        return response.data;
    },

    /**
     * Confirm / complete a pending order — FARMER only
     * PUT /api/v1/farmer/orders/{id}/confirm
     */
    confirmOrder: async (id: number): Promise<OrderDto> => {
        const response = await axiosInstance.put<OrderDto>(`/api/v1/farmer/orders/${id}/confirm`);
        return response.data;
    },
};

export default orderService;
