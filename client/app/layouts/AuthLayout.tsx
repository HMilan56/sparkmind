import { Navigate, Outlet } from "react-router";
import { ServiceFactory } from "~/services/service-factory";

export default function AuthLayout() {
  const authService = ServiceFactory.getAuthService();

  if (!authService.isAuthenticated())
    return <Navigate to="/" replace />;

  return <Outlet />;
}