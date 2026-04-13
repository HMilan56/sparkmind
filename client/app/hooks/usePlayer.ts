import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "~/contexts/SnackbarContext";
import type { PlayerStateDto } from "~/services/game/types/player";
import { useSignalR } from "./useSignalR";

export type SessionData = {
    lobbyCode: string;
    nickName: string;
}

export type UsePlayerReturn = {
    session: SessionData | null;
    gameState: PlayerStateDto;
    joinLobby: (lobbyCode: string, nickName: string) => Promise<void>;
    submitAnswer: (answer: number) => Promise<void>;
}

export function usePlayer(): UsePlayerReturn {
    const [gameState, setGameState] = useState<PlayerStateDto>({
        type: "WaitingForStart",
        payload: null,
        serverTime: Date.now()
    });

    const [session, setSession] = useState<SessionData | null>(null);

    const { gameService, isConnected } = useSignalR();
    const snackbar = useSnackbar();

    const joinLobby = useCallback(async (lobbyCode: string, nickName: string) => {
        if (!isConnected) return;
        try {
            await gameService.joinLobby(lobbyCode, nickName);
            setSession({ lobbyCode, nickName });
        } catch (err) {
            snackbar.showSnackbar("Network error: " + err, "error");
        }
    }, [gameService, isConnected]);

    const submitAnswer = useCallback(async (answer: number) => {
        if (!isConnected) return;
        await gameService.submitAnswer(answer);
    }, [gameService, isConnected]);

    useEffect(() => {
        if (!isConnected) return;

        const unsubscribes = [
            gameService.onPlayerUpdate(dto => {
                console.log("recieved update:");
                console.log(dto);
                setGameState(dto);
            })
        ];

        return () => unsubscribes.forEach(unsub => unsub());
    }, [gameService, isConnected]);

    return { session, gameState, joinLobby, submitAnswer };
}