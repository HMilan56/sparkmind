import apiClient from "../api-client";
import { GameService } from "../game/game.service";
import type { AuthResponse, IAuthService, LoginRequest, RegisterRequest } from "./auth.types";

export const authService: IAuthService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
        
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        
        return response.data;
    },

    register: async (userData: RegisterRequest): Promise<void> => {
        await apiClient.post("/auth/register", userData);
    },

    logout: (): void => {
        // Close existing SignalR connection when user logs out
        GameService.reset();
        localStorage.removeItem("token");
    },

    getToken: (): string | null => {
        return localStorage.getItem("token");
    },

    isAuthenticated: (): boolean => {
        const token = localStorage.getItem("token");
        return !!token;
    }
};