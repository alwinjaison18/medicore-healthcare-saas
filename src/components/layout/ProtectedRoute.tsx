import { Navigate, Outlet } from "react-router-dom";

import { Spinner } from "../common/Spinner";
import { useAuthStore } from "../../store/authStore";

export function ProtectedRoute() {
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);

  if (isLoading) {
    return <Spinner fullScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
