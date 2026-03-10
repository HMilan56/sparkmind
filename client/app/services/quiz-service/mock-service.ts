import type { IQuizService, QuizData } from "./types";

let mockData: QuizData[] = [
    {
        header: {
            id: 10,
            title: "Test Quiz",
            desc: "This is a test quiz",
        },
        mode: "n/a",
        settings: {
            setting1: false,
            setting2: false,
            setting3: false,
            setting4: false,
        },
        questions: [
            {
                id: 10,
                text: "Hello world!",
                answers: [
                    { id: 1, answer: "Hi!", correct: false },
                    { id: 2, answer: "Hello!", correct: true },
                    { id: 3, answer: "Szia!", correct: false },
                ],
                settings: {
                    setting1: "n/a",
                    setting2: "n/a"
                }
            }
        ]
    }
];

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min; 

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const mockQuizSerivce: IQuizService = {
    getQuizById: async (id) => {
        await delay(getRandomNumber(0, 1500));
        return mockData[0];
    },

    getUserLibrary: async (userId: number) => {
        await delay(getRandomNumber(0, 1500));
        return mockData.map(data => data.header);
    },

    deleteQuizById: async (quizId: number) => {
        await delay(getRandomNumber(0, 1500));
        mockData = mockData.filter(data => data.header.id != quizId);
    }
}