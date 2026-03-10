import type { IQuizService, QuizData, QuizHeader } from "./types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const quizService: IQuizService = {
    getQuizById: async (id) => {
        let result = await fetch(`${BASE_URL}/quiz/${id}`);
        let data = await result.json();
        return data as QuizData;
    },

    getUserLibrary: function (userId: number): Promise<QuizHeader[]> {
        throw new Error("Function not implemented.");
    },

    deleteQuizById: function (quizId: number): Promise<void> {
        throw new Error("Function not implemented.");
    },

    createQuiz: function (userId: number): Promise<QuizData> {
        throw new Error("Function not implemented.");
    },

    saveQuiz: function (): Promise<void> {
        throw new Error("Function not implemented.");
    }
};