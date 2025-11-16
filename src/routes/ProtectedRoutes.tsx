import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../auth/Auth";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/member-login" replace />;
  }

  return children;
};

export default ProtectedRoute;






