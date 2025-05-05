// src/routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "@/utils/auth";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
