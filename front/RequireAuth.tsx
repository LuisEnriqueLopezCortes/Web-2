import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/Usercontext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Cargando...</div>; // o spinner si prefieres
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};