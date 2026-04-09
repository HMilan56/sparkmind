import { useCallback, useEffect, useState } from "react";
import type { HostUpdateDto } from "~/services/game/types/host";
import { useSignalR } from "./useSignalR";

export function useLobby(quizId: number) {
    const [players, setPlayers] = useState<string[]>([]);
    const [code, setCode] = useState<string>("");
    const [stateUpdateDto, setStateUpdateDto] = useState<HostUpdateDto>({
        state: "WaitingForStart",
        payload: null
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
                setStateUpdateDto(stateUpdateDto);
                console.log(stateUpdateDto.state);
                console.log(stateUpdateDto.payload);
                console.log(stateUpdateDto.state === "QuestionActive" && stateUpdateDto.deadline)
            })
        ];

        return () => unsubscribes.forEach(unsub => unsub());
    }, [gameService, isConnected]);

    const requestNextStep = useCallback(() => {
        gameService.requestNextStep();
    }, [gameService]);

    return { code, players, stateUpdateDto, requestNextStep };
}