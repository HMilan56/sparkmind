import { simulateFetch } from "~/utils/mock-utils";
import type { AuthResponse, IAuthService, LoginRequest, RegisterRequest } from "./auth.types";

export const authMock: IAuthService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        await simulateFetch();

        if (credentials.password === "sparkmind") {
            const mockResponse: AuthResponse = {
                token: "mock-jwt-token"
            };

            localStorage.setItem("token", mockResponse.token);
            
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
    },

    getToken: (): string | null => {
        return localStorage.getItem("token");
    },

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
};