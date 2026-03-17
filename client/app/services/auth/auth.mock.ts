import { simulateFetch } from "~/utils/mock-utils";
import type { AuthResponse, IAuthService, LoginRequest, RegisterRequest } from "./auth.types";

export const authMock: IAuthService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        await simulateFetch();

        if (credentials.password === "sparkmind") {
            const mockResponse: AuthResponse = {
                token: "mock-jwt-token",
                expiration: new Date(Date.now() + 3600 * 1000).toISOString(),
                userId: 42,
                username: "TestUser"
            };

            localStorage.setItem("token", mockResponse.token);
            localStorage.setItem("username", mockResponse.username);
            
            return mockResponse;
        } else {
            throw new Error("Invalid email or password");
        }
    },

    register: async (userData: RegisterRequest): Promise<void> => {
        await simulateFetch();
        
        if (userData.email.includes("used"))
            throw new Error("This email is already taken.");
    },

    logout: (): void => {;
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    },

    getToken: (): string | null => {
        return localStorage.getItem("token");
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
};