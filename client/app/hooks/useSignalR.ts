import { useEffect, useState } from "react";
import { GameService } from "~/services/game/game.service";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function useSignalR() {
    const [isConnected, setIsConnected] = useState(false);
    const gameService = GameService.getInstance(`${baseUrl}/game`);

    useEffect(() => {
        const init = async () => {
            try {
                await gameService.start();
                gameService.onConnectionStateChange(setIsConnected);
            } catch (err) {
                console.error(err);
            }
        };

        init();

        return () => { gameService.stop(); };
    }, []);

    return { isConnected, gameService };
}