import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default UserProtectedRoute;
