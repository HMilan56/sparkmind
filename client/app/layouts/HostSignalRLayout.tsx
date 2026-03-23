import { Outlet } from "react-router";
import { SignalRProvider } from "~/contexts/SignalRContext";
import { ServiceFactory } from "~/services/service-factory";

export default function HostSignalRLayout() {
    const authService = ServiceFactory.getAuthService();
    const token = authService.getToken();
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    return (
        <SignalRProvider>
            <Outlet />
        </SignalRProvider>
    )
}