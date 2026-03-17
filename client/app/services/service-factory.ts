import { authMock } from "./auth/auth.mock";
import { authService } from "./auth/auth.service";
import { quizMock } from "./quiz/quiz.mock";
import { quizService } from "./quiz/quiz.service";

const useMocks = import.meta.env.VITE_API_USE_MOCKS === "true";

export const ServiceFactory = {
    getAuthService: () => useMocks ? authMock : authService,
    getQuizService: () => useMocks ? quizMock : quizService
}