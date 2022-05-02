import { useLocation, Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/Auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
//   let { user } = useAuth();
  const location = useLocation();

//   return !user ? <Navigate to="/" state={{ from: location }} replace /> : children;
}