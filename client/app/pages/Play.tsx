import { Box } from "@mui/material";
import { Topbar } from "~/components/Topbar";
import { usePlayer } from "~/hooks/usePlayer";
import { useEffect, useState } from "react";
import { PlayerContent } from "~/components/player/PlayerContent";

export default function Play() {
    const player = usePlayer();
    const { type, payload } = player.gameState;

    const [answered, setAnswered] = useState(false);

    async function onAnswer(answerId: number) {
        player.submitAnswer(answerId);
        setAnswered(true);
    }

    useEffect(() => {
        if (type === "QuestionPreview") {
            setAnswered(false);
        }
    }, [type]);

    const isCorrect = type === "QuestionFinished"
        ? payload.leaderboard.find(p => p.name === player.session?.nickName)?.answeredCorrectly ?? false
        : false;

    return (
        <Box component={"main"} sx={{ display: 'flex', flexDirection: 'column', height: '100vh', flexGrow: 1 }}>
            <Topbar title="Play" />
            <PlayerContent
                player={player}
                answered={answered}
                isCorrect={isCorrect}
                onAnswer={onAnswer}
            />
        </Box>
    )
}