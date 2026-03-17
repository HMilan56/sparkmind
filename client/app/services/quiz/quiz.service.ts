import apiClient from "../api-client";
import type { IQuizService, QuizData, QuizHeader } from "./quiz.types";

const userId = 1;

export const quizService: IQuizService = {
    getQuizById: async (id) => {
        let response = await apiClient.get<QuizData>(`/quiz/${id}`);
        return response.data;
    },

    getUserLibrary: async () => {
        let response = await apiClient.get<QuizHeader[]>("/quiz/library");
        return response.data;
    },

    deleteQuizById: async (quizId) => {
        await apiClient.delete(`/quiz/${quizId}`);
    },

    createQuiz: async () => {
        const response = await apiClient.post("/quiz/create");
        return response.data;
    },

    saveQuiz: async (quizData) => {
        // TODO: remove form submission log
        console.log(quizData);
        await apiClient.put("/quiz/update", quizData);
    }
};