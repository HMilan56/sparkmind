import type { QuestionPreviewDto } from "./global";

export type PlayerStateDto =
    | { type: "WaitingForStart", payload: null }
    | { type: "QuestionPreview", payload: QuestionPreviewDto, deadline: number }
    | { type: "QuestionActive", payload: QuestionActiveDto, deadline: number }
    | { type: "QuestionFinished", payload: QuestionFinishedDto }
    | { type: "GameOver", payload: null }

export type QuestionActiveDto = {
    text: string;
}

export type QuestionFinishedDto = {
    leaderboard: PlayerStatDto[];
}

export type PlayerStatDto = {
    name: string;
    answeredCorrectly: boolean;
    score: number;
}