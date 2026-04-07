import type { QuestionPreviewDto } from "./global";

// --- Host types
export type AnswerStat = {
    answer: string;
    count: number;
}

export type HostUpdateDto =
    | { state: "WaitingForStart"; payload: null }
    | { state: "QuestionPreview"; payload: QuestionPreviewDto; deadline: number }
    | { state: "QuestionActive"; payload: QuestionActiveDto; deadline: number }
    | { state: "QuestionFinished"; payload: QuestionFinishedDto; }
    | { state: "GameOver"; payload: null }

export type QuestionActiveDto = {
    text: string;
    answers: AnswerOptionDto[];
}

export type AnswerOptionDto = {
    id: number;
    text: string;
};

export type QuestionFinishedDto = QuestionActiveDto & {
    correctAnswer: string;
    answerStatistics: AnswerStat[];
}