import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    // Redirect to login if the user is not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render the child component if authenticated
    return children;
};

export default ProtectedRoute;

// V2

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// 
// const ProtectedRoute = ({ children }) => {
//     // Check if the token exists in localStorage
//     const token = localStorage.getItem('authToken');
// 
//     // Redirect to login if the token is missing
//     if (!token) {
//         toast.error('You need to log in to access this page.');
//         return <Navigate to="/login" replace />;
//     }
// 
//     // Render the child components if token exists
//     return children;
// };
// 
// export default ProtectedRoute;
// 
// 
// 
