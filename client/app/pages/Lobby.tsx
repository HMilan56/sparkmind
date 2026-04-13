import { Topbar } from "~/components/Topbar";
import { useLobby } from "~/hooks/useLobby";
import { useParams } from "react-router";
import type { HostUpdateDto } from "~/services/game/types/host";
import { LobbyContent } from "~/components/host/LobbyContent";

function tryGetDeadline(dto: HostUpdateDto) {
    const { type: state } = dto;
    return state === "QuestionPreview" || state === "QuestionActive" ? dto.deadline : undefined;
}

export default function Lobby() {
    const { quizId: quizIdParam } = useParams();

    const lobby = useLobby(Number(quizIdParam));

    return (
        <>
            <Topbar title="Lobby" />
            <LobbyContent lobby={lobby} />
        </>
    );
};

