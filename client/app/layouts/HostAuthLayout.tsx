import { Navigate, Outlet } from "react-router";
import { ServiceFactory } from "~/services/service-factory";

export default function HostAuthLayout() {
  const authService = ServiceFactory.getAuthService();

  if (!authService.isAuthenticated())
    return <Navigate to="/host" replace />;

  return <Outlet />;
}