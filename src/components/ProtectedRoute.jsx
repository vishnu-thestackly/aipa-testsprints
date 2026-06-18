import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token");

  // If token not available redirect login
  console.log("ProtectedRoute token:", token);
  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}