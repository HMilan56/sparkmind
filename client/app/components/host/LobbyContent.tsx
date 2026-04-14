import { Container, Typography } from "@mui/material";
import { QuestionView } from "~/components/host/QuestionView";
import { QuestionPreview } from "~/components/host/QuestionPreview";
import { WaitingRoom } from "~/components/host/WaitingRoom";
import { type UseLobbyReturn } from "~/hooks/useLobby";
import type { TimeContext } from "~/hooks/useCountdown";
import { useState } from "react";
import { Leaderboard } from "./Leaderboard";

export type LobbyContentProps = {
    lobby: UseLobbyReturn;
}

function toTimeContext(dto: { serverTime: number; deadline: number }): TimeContext {
  return { start: dto.serverTime, target: dto.deadline };
}

export function LobbyContent({ lobby }: LobbyContentProps) {
    const dto = lobby.gameState;
    const { type, payload } = dto;

    const [showLeaderboard, setShowLeaderboard] = useState(false);

    function nextQuestion() {
        setShowLeaderboard(false);
        lobby.requestNextStep();
    }

    if (type === "WaitingForStart") {
        return <WaitingRoom players={lobby.players} code={lobby.code} onStartGame={() => lobby.requestNextStep()} />;
    }

    if (type === "QuestionPreview") {
        return <QuestionPreview text={payload.text} number={payload.number} timeContext={toTimeContext(dto)} />;
    }

    if (type === "QuestionActive") {
        return <QuestionView data={payload} onClick={() => lobby.requestNextStep()} timeContext={toTimeContext(dto)} />;
    }

    if (type === "QuestionFinished" && !showLeaderboard) {
        return <QuestionView data={payload} onClick={() => setShowLeaderboard(true)} />;
    }

    if (type === "QuestionFinished" && showLeaderboard) {
        return <Leaderboard players={payload.leaderBoard} onClick={nextQuestion}/>
    }

    return <UnhandledState stateName={type} />;
}

function UnhandledState({ stateName }: { stateName: string }) {
    return (
        <Container maxWidth="lg">
            <Typography mt={4} variant="h3" textAlign="center">
                Unhandled state: {stateName}
            </Typography>
        </Container>
    );
}