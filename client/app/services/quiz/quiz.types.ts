export type QuizHeader = {
    id: number;
    title: string;
    desc: string;
}

export type QuizData = QuizHeader & {
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
    previewTime: number;
    timeLimit: number;
}

export type AnswerData = {
    id: number;
    text: string;
    isCorrect: boolean
};

export interface IQuizService {
    getQuizById: (quizId: number) => Promise<QuizData | null>;
    getUserLibrary: () => Promise<QuizHeader[]>;
    deleteQuizById: (quizId: number) => Promise<void>;
    createQuiz: () => Promise<QuizData>;
    saveQuiz: (quizData: QuizData) => Promise<void>;
}