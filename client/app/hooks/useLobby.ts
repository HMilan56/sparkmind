import { useEffect, useState } from "react";
import { useSignalR } from "~/contexts/SignalRContext";

export function useLobby() {
    const [players, setPlayers] = useState<string[]>([]);
    const [code, setCode] = useState<string>("");

    const { connection, isConnected } = useSignalR();

    useEffect(() => {
        if (!isConnected || !connection) return;

        connection.invoke<string>("CreateLobby")
            .then(code => setCode(code))
            .catch(err => console.error("Lobby error:", err));

        connection.on("PlayerJoined", (playerName: string) => {
            setPlayers(prev => [...prev, playerName]);
        });

        return () => { connection.off("PlayerJoined"); };
    }, [isConnected, connection]);
    
    const startGame = async () => {
        console.log("Lobby: starting game");
    }

    return { code, players, startGame };
}