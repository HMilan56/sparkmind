import { useCallback, useEffect, useState } from "react";
import type { HostUpdateDto } from "~/services/game/types/host";
import { useSignalR } from "./useSignalR";

export type UseLobbyReturn = {
    code: string;
    players: string[];
    gameState: HostUpdateDto;
    requestNextStep: () => void;
}

export function useLobby(quizId: number): UseLobbyReturn {
    const [players, setPlayers] = useState<string[]>([]);
    const [code, setCode] = useState<string>("");
    const [gameState, setGameState] = useState<HostUpdateDto>({
        type: "WaitingForStart",
        payload: null,
        serverTime: Date.now()
    });

    const { gameService, isConnected } = useSignalR();

    useEffect(() => {
        if (!isConnected) return;

        const createLobby = async () => {
            console.log("createlobby invoked");
            const code = await gameService.createLobby(quizId);
            setCode(code);
        }

        createLobby();

        const unsubscribes = [
            gameService.onPlayerListUpdate(setPlayers),
            gameService.onHostUpdate(stateUpdateDto => {
                setGameState(stateUpdateDto);
                console.log(stateUpdateDto.type);
                console.log(stateUpdateDto.payload);
                console.log(stateUpdateDto.type === "QuestionActive" && stateUpdateDto.deadline)
            })
        ];

        return () => unsubscribes.forEach(unsub => unsub());
    }, [gameService, isConnected]);

    const requestNextStep = useCallback(() => {
        gameService.requestNextStep();
    }, [gameService]);

    return { code, players, gameState, requestNextStep };
}