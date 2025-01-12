import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
