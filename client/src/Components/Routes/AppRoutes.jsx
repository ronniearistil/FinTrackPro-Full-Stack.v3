import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../Layout/HomePage.jsx';
import AboutUs from '../Layout/AboutUs.jsx';
import LoginForm from '../UserManagement/LoginForm.jsx';
import SignUpForm from '../UserManagement/UserSignUpForm.jsx';
import ProjectsContainer from '../Projects/ProjectsContainer.jsx';
import ExpensesContainer from '../Expenses/ExpensesContainer.jsx';
import ProjectForm from '../Forms/ProjectForm.jsx';
import ExpenseForm from '../Forms/ExpenseForm.jsx';
import AccountManagement from '../UserManagement/AccountManagement.jsx';
import AccountRecovery from '../UserManagement/AccountRecovery.jsx';
import ProtectedRoute from '../Layout/ProtectedRoute.jsx';

const AppRoutes = ({ isAuthenticated, currentUser }) => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/signup" element={<SignUpForm />} />
    <Route
      path="/projects"
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ProjectsContainer />
        </ProtectedRoute>
      }
    />
    <Route
      path="/expenses"
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ExpensesContainer />
        </ProtectedRoute>
      }
    />
    <Route
      path="/projects/new"
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ProjectForm />
        </ProtectedRoute>
      }
    />
    <Route
      path="/expenses/new"
      element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ExpenseForm />
        </ProtectedRoute>
      }
    />
    <Route path="/account" element={<AccountManagement />} />
    <Route path="/account/recovery" element={<AccountRecovery />} />
    <Route path="*" element={<h2>Page Not Found</h2>} />
  </Routes>
);

export default AppRoutes;
