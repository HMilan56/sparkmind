import { useCallback, useEffect, useState } from "react";
import { useSignalR } from "~/contexts/SignalRContext";

export function useHost() {
    const [players, setPlayers] = useState<string[]>([]);
    const [code, setCode] = useState<string>("");

    const { gameService, isConnected } = useSignalR();

    useEffect(() => {
        if (!isConnected) return;

        const createLobby = async() => {
            const code = await gameService.createLobby();
            setCode(code);
        }

        createLobby();

        const unsubscribe = gameService.onPlayerJoined(playerName => {
            setPlayers(prev => [...prev, playerName]);
        });

        return () => unsubscribe();
    }, [gameService, isConnected]);
    
    const startGame = useCallback(() => {
        
    }, []);

    return { code, players, startGame };
}