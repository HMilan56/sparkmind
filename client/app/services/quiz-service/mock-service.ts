import type { IQuizService, QuizData, QuizHeader } from "./types";

let mockData: QuizData[] = [
    {
        id: 10,
        title: "Test Quiz",
        desc: "This is a test quiz",
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
                    { id: 1, text: "Hi!", isCorrect: false },
                    { id: 2, text: "Hello!", isCorrect: true },
                    { id: 3, text: "Szia!", isCorrect: false },
                ],
                settings: {
                    setting1: "n/a",
                    setting2: "n/a"
                }
            }
        ]
    }
];

for (let i = 0; i < 10; i++) {
    let prev = mockData.at(-1);
    if (prev) {
        let copy: QuizData = {
            ...prev,
            id: 100 + i
        };
        mockData = [copy, ...mockData];
    }
}

const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

function simulateFetch(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, getRandomNumber(0, 1500)));
}

function extractHeader(data: QuizData): QuizHeader {
    return {
        id: data.id,
        desc: data.desc,
        title: data.title
    };
}

export const mockService: IQuizService = {
    getQuizById: async (id) => {
        await simulateFetch();
        return mockData[0];
    },

    getUserLibrary: async (userId) => {
        await simulateFetch();
        return mockData.map(extractHeader);
    },

    deleteQuizById: async (quizId) => {
        await simulateFetch();
        mockData = mockData.filter(data => data.id != quizId);
    },

    createQuiz: async (userId) => {
        await simulateFetch();
        let newQuiz: QuizData = {
            id: 1005 + mockData.length,
            desc: "",
            title: "",
            mode: "",
            questions: [
                {
                    id: 1,
                    text: "",
                    answers: [
                        {
                            id: 1,
                            text: "",
                            isCorrect: false
                        }
                    ],
                    settings: {
                        setting1: "",
                        setting2: ""
                    },
                }
            ],
            settings: {
                setting1: false,
                setting2: false,
                setting3: false,
                setting4: false
            }
        };

        mockData = [newQuiz, ...mockData];
        return newQuiz;
    },

    saveQuiz: async (quizData) => {
        await simulateFetch();
        let i = mockData.findIndex(quiz => quiz.id = quizData.id);
        mockData.splice(i, 1, quizData);
    }
}