import * as signalR from '@microsoft/signalr';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type SignalRContextType = {
    connection: signalR.HubConnection | null;
    isConnected: boolean
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;

let globalConnection: signalR.HubConnection | null = null;

export const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

export function SignalRProvider({ children }: { children: React.ReactNode }) {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        globalConnection ??= new signalR.HubConnectionBuilder()
                .withUrl(`${baseUrl}/game`, {
                    accessTokenFactory: () => localStorage.getItem("token") || ""
                })
                .withAutomaticReconnect()
                .configureLogging(signalR.LogLevel.Information)
                .build();

        setConnection(globalConnection);

        const startConnection = async () => {
            if (globalConnection?.state !== signalR.HubConnectionState.Disconnected)
                return;

            try {
                await globalConnection.start();
                console.log("SignalR connected");
                setIsConnected(true);
            } catch (err) {
                console.error(`SignalR Connection Error: ${err}`);
            }
        }

        startConnection();
    }, []);

    const contextValue = useMemo<SignalRContextType>(() => ({
        connection,
        isConnected
    }), [connection, isConnected]);

    return <SignalRContext.Provider value={contextValue}>
        {children}
    </SignalRContext.Provider>
}

export function useSignalR() {
    const context = useContext(SignalRContext);

    if (context === undefined)
        throw new Error("useSignalR must be used within a SignalRProvider");

    return context;
}