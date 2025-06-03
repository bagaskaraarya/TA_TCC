// src/auth/RequireAdmin.js
import { useAuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const { user } = useAuthContext();

  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RequireAdmin;
