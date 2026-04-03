import { useCallback, useEffect, useState } from "react";
import { useSignalR } from "~/contexts/SignalRContext";
import type { StateUpdateDto } from "~/services/game/game.types";

export function useLobby(quizId: number) {
    const [players, setPlayers] = useState<string[]>([]);
    const [code, setCode] = useState<string>("");
    const [stateUpdateDto, setStateUpdateDto] = useState<StateUpdateDto>({
        state: "WaitingForStart",
        payload: null
    });

    const { gameService, isConnected } = useSignalR();

    useEffect(() => {
        if (!isConnected) return;

        const createLobby = async () => {
            const code = await gameService.createLobby(quizId);
            setCode(code);
        }

        createLobby();

        const unsubscribes = [
            gameService.onPlayersUpdated(setPlayers),
            gameService.onStateUpdated(stateUpdateDto => {
                setStateUpdateDto(stateUpdateDto);
                console.log(stateUpdateDto.state);
            })
        ];

        return () => unsubscribes.forEach(unsub => unsub());
    }, [isConnected]);

    const requestNextStep = useCallback(() => {
        gameService.requestNextStep();
    }, [gameService]);

    return { code, players, stateUpdateDto, requestNextStep };
}