// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const user = localStorage.getItem("user");
  const parsedUser = user && user !== "undefined" ? JSON.parse(user) : null;

  // If no user, redirect to login
  if (!parsedUser) return <Navigate to="/login" replace />;

  // If adminOnly and user is not admin, redirect to home
  if (adminOnly && parsedUser.role !== "admin") return <Navigate to="/" replace />;

  // Otherwise, allow access
  return children;
};

export default ProtectedRoute;
