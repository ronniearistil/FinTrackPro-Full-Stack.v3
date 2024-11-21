import React, { useEffect, useState } from 'react';
import { ProjectProvider } from './ProjectContext.jsx';
import Header from './Components/Layout/Header.jsx';
import NavBar from './Components/Layout/NavBar.jsx';
import ProjectsContainer from './Components/Projects/ProjectsContainer.jsx';
import ExpensesContainer from './Components/Expenses/ExpensesContainer.jsx';
import UsersContainer from './Components/Users/UsersContainer.jsx';
import Footer from './Components/Layout/Footer.jsx';
import AboutUs from './Components/AboutUs.jsx'; // Import AboutUs component
import ProjectForm from './Components/Forms/ProjectForm.jsx'; // Import ProjectForm
import ExpenseForm from './Components/Forms/ExpenseForm.jsx'; // Import ExpenseForm
import SignUpForm from './Components/Forms/SignUpForm.jsx'; // Import SignUpForm
import { Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const showToast = (message, type = 'success') => {
    toast[type](message);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, expensesRes, usersRes] = await Promise.all([
          axios.get('http://localhost:5555/projects'),
          axios.get('http://localhost:5555/expenses'),
          axios.get('http://localhost:5555/users'),
        ]);
        setProjects(projectsRes.data);
        setExpenses(expensesRes.data);
        setUsers(usersRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (term) => setSearchTerm(term);
  const handleStatusFilter = (status) => setStatusFilter(status);
  const handleSort = (option) => setSortOption(option);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProjectProvider>
        <div className="App">
          <ToastContainer position="top-right" autoClose={3000} />
          <Header />
          <NavBar
            onSearch={handleSearch}
            onStatusFilter={handleStatusFilter}
            onSort={handleSort}
          />
          <Routes>
            <Route path="/" element={<Navigate to="/projects" />} />
            <Route
              path="/projects"
              element={
                <ProjectsContainer
                  projects={projects}
                  searchTerm={searchTerm}
                  statusFilter={statusFilter}
                  sortOption={sortOption}
                  showToast={showToast}
                />
              }
            />
            <Route
              path="/expenses"
              element={
                <ExpensesContainer
                  expenses={expenses}
                  searchTerm={searchTerm}
                  showToast={showToast}
                />
              }
            />
            <Route path="/users" element={<UsersContainer users={users} />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/expenses/new" element={<ExpenseForm />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
            <Route path="/" element={<Navigate to="/projects" />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
          <Footer />
        </div>
      </ProjectProvider>
    </ThemeProvider>
  );
};

export default App;






