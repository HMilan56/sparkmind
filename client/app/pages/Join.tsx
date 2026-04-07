import { Box, Container, Typography } from "@mui/material";
import { JoinCard } from "~/components/JoinCard";
import { WaitingRoom } from "~/components/player-lobby/WaitingRoom";
import { QuestionView } from "~/components/player-lobby/QuestionView";
import { Topbar } from "~/components/Topbar";
import { usePlayer } from "~/hooks/usePlayer";
import { useEffect, useState } from "react";
import { QuestionResult } from "~/components/player-lobby/QuestionResult";

export default function Join() {
    const player = usePlayer();
    const { state, payload } = player.stateUpdateDto;

    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    async function onAnswer(answerId: number) {
        player.submitAnswer(answerId);
        setAnswered(true);
    }

    useEffect(() => {
        if (state === "QuestionFinished") {
            setAnswered(false);
            console.log(payload.leaderboard);
            console.log(payload.leaderboard.find(p => p.name === player.data?.nickName));
            setIsCorrect(payload.leaderboard.find(p => p.name === player.data?.nickName)?.answeredCorrectly || false);
        }
    }, [state]);

    return (
        <Box component={"main"} sx={{ display: 'flex', flexDirection: 'column', height: '100vh', flexGrow: 1 }}>
            <Topbar title="Play" />
            {
                player.data === null ? (
                    <JoinCard onJoinLobby={player.joinLobby} />
                ) : state === "WaitingForStart" ? (
                    <WaitingRoom title={"Waiting for host to start game"} subtitle="Sit tight, the game will begin shortly..."/>
                ) : state === "QuestionPreview" || (state === "QuestionActive" && !answered) ? (
                    <QuestionView enableAnswers={state === "QuestionActive"} deadline={player.stateUpdateDto.deadline} questionText={payload.text} onAnswer={onAnswer} />
                ) : state === "QuestionActive" && answered ? (
                    <WaitingRoom title="Answer sent, please wait" subtitle="Are you sure you answered correctly? Were you fast enough?"/>
                ) : state === "QuestionFinished" ? (
                    <QuestionResult isCorrect={isCorrect}/>
                ) : <UnhandledState stateName={state} />
            }
        </Box>
    )
}

function UnhandledState({ stateName }: { stateName: string }) {
    return (
        <Container maxWidth="lg">
            <Typography mt={4} variant="h3" textAlign={"center"}>Unhandled state: {stateName}</Typography>
        </Container >
    );
}