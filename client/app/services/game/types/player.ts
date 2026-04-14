import type { BaseUpdate, QuestionPreviewDto, WithDeadline } from "./global";

export type PlayerStateDto = BaseUpdate & (
    | { type: "WaitingForStart", payload: null }
    | { type: "QuestionPreview", payload: QuestionPreviewDto } & WithDeadline
    | { type: "QuestionActive", payload: QuestionActiveDto } & WithDeadline
    | { type: "QuestionFinished", payload: QuestionFinishedDto }
    | { type: "GameOver", payload: null }
);

export type QuestionActiveDto = {
    text: string;
}

export type QuestionFinishedDto = {
    leaderboard: PlayerStatDto[];
}

export type PlayerStatDto = {
    id: string;
    name: string;
    answeredCorrectly: boolean;
    score: number;
    delta: number;
    streak: number;
}