import { Outlet } from "react-router";
import { SignalRProvider } from "~/contexts/SignalRContext";

export default function PlayerSignalRLayout() {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    
    return (
        <SignalRProvider serverUrl={`${baseUrl}/game`}>
            <Outlet />
        </SignalRProvider>
    )
}