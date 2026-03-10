export type QuizHeader = {
    id: number;
    title: string;
    desc: string;
}

export type QuizData = {
    header: QuizHeader;
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
    getUserLibrary: (userId: number) => Promise<QuizHeader[]>;
    deleteQuizById: (quizId: number) => Promise<void>;
    createQuiz: (userId: number) => Promise<QuizData>;
    saveQuiz: (quizData: QuizData) => Promise<void>;
}