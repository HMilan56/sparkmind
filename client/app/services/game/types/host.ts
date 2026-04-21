import type { BaseUpdate, QuestionPreviewDto, WithDeadline } from "./global";
import type { PlayerStatDto } from "./player";

// --- Host types
export type AnswerStat = {
    answer: string;
    count: number;
}

export type HostUpdateDto = BaseUpdate & (
  | { type: "WaitingForStart"; payload: null }
  | { type: "QuestionPreview"; payload: QuestionPreviewDto } & WithDeadline
  | { type: "QuestionActive"; payload: QuestionActiveDto } & WithDeadline
  | { type: "QuestionFinished"; payload: QuestionFinishedDto }
  | { type: "GameOver"; payload: GameOverDto }
);

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
    leaderboard: PlayerStatDto[];
}

export type GameOverDto = {
    leaderboard: PlayerStatDto[];
}