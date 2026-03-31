import { useEffect, useState } from "react";
import { useSignalR } from "~/contexts/SignalRContext";

export function useLobby() {
    const [players, setPlayers] = useState<string[]>([]);
    const [code, setCode] = useState<string>("");

    const { gameService, isConnected } = useSignalR();

    useEffect(() => {
        if (!isConnected) return;

        const createLobby = async () => {
            const code = await gameService.createLobby(16);
            setCode(code);
        }

        createLobby();

        const unsubscribes = [
            gameService.onPlayersUpdated(setPlayers)
        ];

        return () => unsubscribes.forEach(unsub => unsub());
    }, [isConnected]);

    const startGame = async () => {
        console.log("Lobby: starting game");
    }

    return { code, players, startGame };
}