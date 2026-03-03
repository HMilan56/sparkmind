export type QuizData = {
    id: number;
    title: string;
    desc: string;
    mode: string;
    settings: QuizSettings;
    questions: QuestionData[];
}

export type QuizSettings = {
    setting1: boolean;
    setting2: boolean;
    setting3: boolean;
    setting4: boolean;
}

export type QuestionData = {
    id: number;
    text: string;
    answers: AnswerData[];
    settings: QuestionSettings;
}

export type QuestionSettings = {
    setting1: string;
    setting2: string;
}

export type AnswerData = {
    id: number;
    answer: string;
    correct: boolean
};

export interface IQuizService {
    getQuizById: (quizId: number) => Promise<QuizData>;
}

export const mockQuizSerivce: IQuizService = {
    getQuizById: async (id) => {
        return {
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
        };
    }
};