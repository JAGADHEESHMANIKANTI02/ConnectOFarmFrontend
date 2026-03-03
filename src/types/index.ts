// ===================================
// ENUMS
// ===================================
export type Role = 'ADMIN' | 'FARMER' | 'CONSUMER';
export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

// ===================================
// DTOs — matching Java backend exactly
// ===================================

export interface UserDto {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    role: Role;
}

export interface PostDto {
    id: number;
    title: string;
    description: string;
    cropName: string;
    quantityAvailable: number;
    pricePerUnit: number;
    image: string | null; // base64-encoded byte[] from Spring
    createdAt: string;    // LocalDateTime serialized to ISO string
    userId: number;       // Farmer's ID
    farmerName: string;
    farmerPhone: string;
    farmerEmail: string;
}

export interface OrderDto {
    id: number;
    quantity: number;
    totalPrice: number;
    status: OrderStatus;
    postId: number;
    postTitle: string;
    userId: number;       // Consumer's ID
    consumerName: string;
    consumerPhone: string;
}

// ===================================
// AUTH MODELS
// ===================================

export interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface AuthenticationResponse {
    token: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    location: string;
    role: Role;
}

// ===================================
// JWT PAYLOAD (decoded)
// ===================================
export interface JwtPayload {
    sub: string;       // email
    roles?: string[];  // backend role format (array)
    role?: string;     // backend role format (singular)
    iat: number;
    exp: number;
    id?: number;       // custom claim
    name?: string;     // custom claim
}

// ===================================
// UI STATE HELPERS
// ===================================
export interface ApiError {
    message: string;
    status?: number;
}

export interface AuthUser {
    email: string;
    role: Role;
    exp: number;
    id?: number;
    name?: string;
}
