import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

function ProtectedRoute({ children }: { children?: ReactNode }) {
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/admin" />;
  }

  return children || <Outlet />;
}

export default ProtectedRoute;
