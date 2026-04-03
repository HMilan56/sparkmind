export type LobbyState = "WaitingForStart" | "QuestionPreview" | "QuestionActive" | "QuestionFinished" | "GameOver"

export type AnswerStat = {
    answer: string;
    count: number;
}

export type StateUpdateDto = 
    | { state: "WaitingForStart"; payload: null }
    | { state: "QuestionPreview"; payload: QuestionPreviewDto; deadline: number }
    | { state: "QuestionActive"; payload: QuestionActiveDto; deadline: number }
    | { state: "QuestionFinished"; payload: QuestionFinishedDto; }
    | { state: "GameOver"; payload: null }

export type QuestionPreviewDto = {
    number: number;
    text: string;
}

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