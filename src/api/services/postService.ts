import axiosInstance from '../axiosInstance';
import type { PostDto } from '../../types';

const postService = {
    /**
     * Get all posts (public)
     * GET /api/v1/posts
     */
    getAllPosts: async (): Promise<PostDto[]> => {
        const response = await axiosInstance.get<PostDto[]>('/api/v1/posts');
        return response.data;
    },

    /**
     * Get a single post by ID (public)
     * GET /api/v1/posts/{id}
     */
    getPostById: async (id: number): Promise<PostDto> => {
        const response = await axiosInstance.get<PostDto>(`/api/v1/posts/${id}`);
        return response.data;
    },

    /**
     * Create a new post (multipart/form-data) — FARMER only
     * POST /api/v1/farmer/posts
     */
    createPost: async (formData: FormData): Promise<PostDto> => {
        const response = await axiosInstance.post<PostDto>('/api/v1/farmer/posts', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    /**
     * Get posts belonging to the currently logged in farmer — FARMER only
     * GET /api/v1/farmer/posts/my-posts
     */
    getMyPosts: async (): Promise<PostDto[]> => {
        const response = await axiosInstance.get<PostDto[]>('/api/v1/farmer/posts/my-posts');
        return response.data;
    },

    /**
     * Delete a post — FARMER only (owner-check enforced by backend)
     * DELETE /api/v1/farmer/posts/{id}
     */
    deletePost: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/api/v1/farmer/posts/${id}`);
    },
};

export default postService;
