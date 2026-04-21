import { Container, Typography } from "@mui/material";
import { JoinCard } from "./JoinCard";
import { QuestionResult } from "./QuestionResult";
import { QuestionView } from "./QuestionView";
import { WaitingRoom } from "./WaitingRoom";
import type { UsePlayerReturn } from "~/hooks/usePlayer";
import type { TimeContext } from "~/hooks/useCountdown";
import { GameOver } from "./GameOver";

export type PlayerContentProps = {
    player: UsePlayerReturn;
    answered: boolean;
    isCorrect: boolean;
    onAnswer: (id: number) => void;
}

export function PlayerContent({ player, answered, isCorrect, onAnswer }: PlayerContentProps) {
    const { type, payload } = player.gameState;

    if (player.session === null) {
        return <JoinCard onJoinLobby={player.joinLobby} />;
    }

    if (type === "WaitingForStart") {
        return <WaitingRoom title="Waiting for host to start game" subtitle="Sit tight..." />;
    }

    if (type === "QuestionPreview" || (type === "QuestionActive" && !answered)) {
        const { serverTime, deadline } = player.gameState;

        const timeContext: TimeContext = {
            start: serverTime,
            target: deadline
        }

        return (
            <QuestionView
                enableAnswers={type === "QuestionActive"}
                timeContext={timeContext}
                questionText={payload.text}
                onAnswer={onAnswer}
            />
        );
    }

    if (type === "QuestionActive" && answered) {
        return <WaitingRoom title="Answer sent, please wait" subtitle="Are you sure you answered correctly? Were you fast enough?" />;
    }

    if (type === "QuestionFinished") {
        return <QuestionResult isCorrect={isCorrect} />;
    }

    if (type === "GameOver") {
        const { leaderboard } = payload;
        const playerStat = leaderboard.find(s => s.name === player.session?.nickName);
        
        if (playerStat) {
            const rank = [...leaderboard].sort((a, b) => b.score - a.score).indexOf(playerStat) + 1;
            return <GameOver player={playerStat} totalPlayers={leaderboard.length} rank={rank} />
        }
    }

    return <UnhandledState stateName={type} />;
}

function UnhandledState({ stateName }: { stateName: string }) {
    return (
        <Container maxWidth="lg">
            <Typography mt={4} variant="h3" textAlign={"center"}>Unhandled state: {stateName}</Typography>
        </Container >
    );
}