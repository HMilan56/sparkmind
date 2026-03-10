import type { IQuizService, QuizData, QuizHeader } from "./types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const userId = 1;

export const apiService: IQuizService = {
    getQuizById: async (id) => {
        let response = await fetch(`${BASE_URL}/user/${userId}/quiz/${id}`);
        let data = await response.json();
        return data as QuizData;
    },

    getUserLibrary: async (userId) => {
        let response = await fetch(`${BASE_URL}/user/${userId}/library`);
        let data = await response.json();
        return data as QuizHeader[];
    },

    deleteQuizById: async (quizId) => {
        await fetch(`${BASE_URL}/user/${userId}/quiz/${quizId}`, {
            method: "DELETE"
        });
    },

    createQuiz: async (userId) => {
        const response = await fetch(`${BASE_URL}/user/${userId}/create`, {
            method: "POST"
        });
        const data = await response.json();
        return data as QuizData;
    },

    saveQuiz: async (quizData) => {
        console.log(quizData);
        await fetch(`${BASE_URL}/user/${userId}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quizData)
        });
    }
};