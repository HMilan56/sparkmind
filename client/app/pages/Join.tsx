import { Box, Container, Typography } from "@mui/material";
import { JoinCard } from "~/components/JoinCard";
import { WaitingRoom } from "~/components/player-lobby/WaitingRoom";
import { QuestionView } from "~/components/player-lobby/QuestionView";
import { Topbar } from "~/components/Topbar";
import { usePlayer } from "~/hooks/usePlayer";


export default function Join() {
    const player = usePlayer();
    const { state, payload } = player.stateUpdateDto;

    return (
        <Box component={"main"} sx={{ display: 'flex', flexDirection: 'column', height: '100vh', flexGrow: 1 }}>
            <Topbar title="Play" />
            {
                player.data === null ? (
                    <JoinCard onJoinLobby={player.joinLobby} />
                ) : state === "WaitingForStart" ? (
                    <WaitingRoom />
                ) : state === "QuestionPreview" || state === "QuestionActive" ? (
                    <QuestionView enableAnswers={state === "QuestionActive"} deadline={player.stateUpdateDto.deadline} questionText={payload.text} onAnswer={player.submitAnswer}/>
                ) :<UnhandledState stateName={state}/>
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