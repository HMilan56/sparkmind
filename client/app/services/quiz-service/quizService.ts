import type { IQuizService, QuizData } from "./types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const quizService: IQuizService = {
    getQuizById: async (id) => {
        let result = await fetch(`${BASE_URL}/quiz/${id}`);
        let data = await result.json();
        return data as QuizData;
    }
};