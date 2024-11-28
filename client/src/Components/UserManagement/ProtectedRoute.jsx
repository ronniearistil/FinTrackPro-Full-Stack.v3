import { Navigate } from "react-router-dom";
import { useProjects } from "../../ProjectContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useProjects();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
