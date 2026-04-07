import { useCallback, useEffect, useState } from "react";
import { useSignalR } from "~/contexts/SignalRContext";
import { useSnackbar } from "~/contexts/SnackbarContext";
import type { PlayerUpdateDto } from "~/services/game/types/player";

export type Player = {
    lobbyCode: string;
    nickName: string;
}

export function usePlayer() {
    const [stateUpdateDto, setStateUpdateDto] = useState<PlayerUpdateDto>({state: "WaitingForStart", payload: null});
    const [data, setData] = useState<Player | null>(null);

    const { gameService, isConnected } = useSignalR();
    const snackbar = useSnackbar();

    const joinLobby = useCallback(async (lobbyCode: string, nickName: string) => {
        if (!isConnected) return;
        try {
            await gameService.joinLobby(lobbyCode, nickName);
        } catch(err) {
            snackbar.showSnackbar("Network error: " + err, "error");
        }
        setData({lobbyCode, nickName});
    }, [gameService, isConnected]);

    const submitAnswer = useCallback(async (answer: number) => {
        if (!isConnected) return;
        await gameService.submitAnswer(answer);
    }, [gameService, isConnected]);

    useEffect(() => {
        if (!isConnected) return;

        const unsubscribes = [
            gameService.onPlayerUpdate(dto => {
                console.log("recieved update: " + dto);
                setStateUpdateDto(dto);
            })
        ];

        return () => unsubscribes.forEach(unsub => unsub());
    }, [gameService, isConnected]);

    return { data, stateUpdateDto, joinLobby, submitAnswer };
}