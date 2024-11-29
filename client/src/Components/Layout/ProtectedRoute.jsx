import React from 'react';
import { Navigate } from 'react-router-dom';
import NavLink from './NavLink'; // Adjust path if necessary

const ProtectedRoute = ({ isAuthenticated }) => {
    return (
        <>
            <NavLink to="/projects" disabled={!isAuthenticated}>
                Projects
            </NavLink>
            <NavLink to="/projects/new" disabled={!isAuthenticated}>
                Add Project
            </NavLink>
            <NavLink to="/expenses" disabled={!isAuthenticated}>
                Expenses
            </NavLink>
            <NavLink to="/expenses/new" disabled={!isAuthenticated}>
                Add Expense
            </NavLink>
            <NavLink to="/about">About Us</NavLink>
            {!isAuthenticated && <Navigate to="/login" replace />}
        </>
    );
};

export default ProtectedRoute;

