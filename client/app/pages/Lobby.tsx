import { Container, Typography } from "@mui/material";
import { QuestionView } from "~/components/lobby/QuestionView";
import { QuestionPreview } from "~/components/lobby/QuestionPreview";
import { Topbar } from "~/components/Topbar";
import { WaitingRoom } from "~/components/lobby/WaitingRoom";
import { useLobby } from "~/hooks/useLobby";
import { useParams } from "react-router";
import { mockQuestionActiveDto } from "~/services/game/game.mock";
import type { LobbyState, StateUpdateDto } from "~/services/game/game.types";

function tryGetDeadline(dto: StateUpdateDto) {
    const { state } = dto;
    return state === "QuestionPreview" || state === "QuestionActive" ? dto.deadline : undefined;
}

export default function Lobby() {
    const { quizId: quizIdParam } = useParams();

    const lobby = useLobby(Number(quizIdParam));

    const dto = lobby.stateUpdateDto;
    const { state, payload } = dto;
    const deadline = tryGetDeadline(dto);

    return (
        <>
            <Topbar title="Lobby" />
            {
                state === "WaitingForStart" ? (
                    <WaitingRoom players={lobby.players} code={lobby.code} onStartGame={() => lobby.requestNextStep()} />
                ) : state === "QuestionPreview" ? (
                    <QuestionPreview text={payload.text} number={payload.number} deadline={deadline}/>
                ) : state === "QuestionActive" || state === "QuestionFinished" ? (  
                    <QuestionView data={payload} onNextQuestion={() => lobby.requestNextStep()} deadline={deadline}/>
                )  : <UnhandledState stateName={state} />
            }
            {/* <QuestionView data={mockQuestionActiveDto} onNextQuestion={() => {}} deadline={Date.now() + 20000}/> */}
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