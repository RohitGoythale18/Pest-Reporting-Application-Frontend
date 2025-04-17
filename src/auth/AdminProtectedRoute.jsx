import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ isAuthenticated, isAdmin, children }) => {
    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/admin/login" />;
    }
    return children;
};

export default AdminProtectedRoute;
