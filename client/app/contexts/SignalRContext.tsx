import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { GameService } from '~/services/game/game.service';

type SignalRContextType = {
    isConnected: boolean;
    gameService: GameService;
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

export function SignalRProvider({ children, serverUrl, accessToken = null }: { children: React.ReactNode, serverUrl: string, accessToken?: string | null }) {
    const [isConnected, setIsConnected] = useState(false);

    const gameService = GameService.getInstance(serverUrl, accessToken);

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
    }, []);

    const value = useMemo(() => ({ isConnected, gameService }), [isConnected, gameService]);

    return (
        <SignalRContext.Provider value={value}>
            {children}
        </SignalRContext.Provider>
    );
}

export function useSignalR() {
    const context = useContext(SignalRContext);
    if (context === undefined)
        throw new Error("useSignalR must be used within a SignalRProvider");
    return context;
}