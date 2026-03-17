export type LoginRequest = {
    email: string;
    password: string;
}

export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
}

export type AuthResponse = {
    token: string;
    expiration: string;
    userId: number;
    username: string;
};

export interface IAuthService {
    login: (credentials: LoginRequest) => Promise<AuthResponse>;
    register: (userData: RegisterRequest) => Promise<void>;
    logout: () => void;
    getToken: () => string | null;
    isAuthenticated(): boolean;
}