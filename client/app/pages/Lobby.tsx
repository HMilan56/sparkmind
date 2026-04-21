import { Topbar } from "~/components/Topbar";
import { useLobby } from "~/hooks/useLobby";
import { useParams } from "react-router";
import type { HostUpdateDto } from "~/services/game/types/host";
import { LobbyContent } from "~/components/host/LobbyContent";
import type { PlayerStatDto } from "~/services/game/types/player";

function tryGetDeadline(dto: HostUpdateDto) {
    const { type: state } = dto;
    return state === "QuestionPreview" || state === "QuestionActive" ? dto.deadline : undefined;
}

const examplePlayers: PlayerStatDto[] = [
    { id: "1",  name: "Kovács Péter",  score: 9800, delta: 1200, answeredCorrectly: true,  streak: 5 },
    { id: "2",  name: "Nagy Anna",     score: 8750, delta: 950,  answeredCorrectly: true,  streak: 3 },
    { id: "3",  name: "Szabó Gábor",   score: 7600, delta: 800,  answeredCorrectly: true,  streak: 2 },
    { id: "4",  name: "Tóth Eszter",   score: 6400, delta: 600,  answeredCorrectly: false, streak: 0 },
    { id: "5",  name: "Varga Balázs",  score: 5800, delta: 500,  answeredCorrectly: true,  streak: 1 },
    { id: "6",  name: "Horváth Réka",  score: 4900, delta: 400,  answeredCorrectly: false, streak: 0 },
    { id: "7",  name: "Kiss Tamás",    score: 4100, delta: 350,  answeredCorrectly: true,  streak: 2 },
    { id: "8",  name: "Fekete Dóra",   score: 3200, delta: 200,  answeredCorrectly: false, streak: 0 },
    { id: "9",  name: "Molnár Áron",   score: 2500, delta: 150,  answeredCorrectly: true,  streak: 1 },
    { id: "10", name: "Pap Luca",      score: 1800, delta: 100,  answeredCorrectly: false, streak: 0 },
];

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

