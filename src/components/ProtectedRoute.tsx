import { Navigate, useLocation, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  children?: JSX.Element; 
  allowedRoles?: string[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const location = useLocation();
  const session = localStorage.getItem("user_session");

  if (!session) {
    return <Navigate to="/entrar" state={{ from: location }} replace />;
  }

  const user = JSON.parse(session);

  if (!user || !user.role) {
    return <Navigate to="/entrar" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}
