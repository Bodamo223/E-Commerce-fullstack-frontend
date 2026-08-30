import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ children }) {
  const { isAuthenticated, authChecked } = useSelector((state) => state.Auth);
  if (!authChecked) {
    return null;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, authChecked } = useSelector(
    (state) => state.Auth,
  );
  if (!authChecked) {
    return null;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
