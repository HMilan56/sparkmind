import { Container, Typography } from "@mui/material";
import { QuestionView } from "~/components/lobby/QuestionView";
import { QuestionPreview } from "~/components/lobby/QuestionPreview";
import { Topbar } from "~/components/Topbar";
import { WaitingRoom } from "~/components/lobby/WaitingRoom";
import { useLobby } from "~/hooks/useLobby";

export default function HostLobby() {
    const lobby = useLobby();

    const { state, payload } = lobby.stateUpdateDto;

    return (
        <>
            <Topbar title="Lobby" />
            {
                state === "WaitingForStart" ? (
                    <WaitingRoom players={lobby.players} code={lobby.code} onStartGame={() => lobby.requestNextStep()} />
                ) : state === "QuestionPreview" ? (
                    <QuestionPreview text={payload.text} number={payload.number} />
                ) : state === "QuestionActive" || state === "QuestionFinished" ? (  
                    <QuestionView data={payload}/>
                )  : <UnhandledState stateName={state} />
            }
            {
                // <QuestionActive questionActiveDto={mockQuestionActiveDto} />
                
            }
        </>
    );
};

function UnhandledState({stateName}: {stateName: string}) {
    return (
        <Container maxWidth="lg">
            <Typography mt={4} variant="h3" textAlign={"center"}>Unhandled state: {stateName}</Typography>
        </Container >
    );
}