import { Navigate, Outlet } from "react-router";
import { ServiceFactory } from "~/services/service-factory";

export default function HostGuestLayout() {
    const authService = ServiceFactory.getAuthService();

    if (authService.isAuthenticated()) {
        return <Navigate to="/host/library" replace />;
    }

    return <Outlet />;
}