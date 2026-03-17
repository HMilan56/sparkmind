import { Navigate, Outlet } from "react-router";
import { ServiceFactory } from "~/services/service-factory";

export default function GuestLayout() {
    const authService = ServiceFactory.getAuthService();

    if (authService.isAuthenticated())
        return <Navigate to="/library" replace />;

    return <Outlet />;
}