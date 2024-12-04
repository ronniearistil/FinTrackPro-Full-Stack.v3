
import React, { useEffect, useState } from 'react';
import { ProjectProvider } from './ProjectContext.jsx';
import Header from './Components/Layout/Header.jsx';
import NavBar from './Components/Layout/NavBar.jsx';
import ProjectsContainer from './Components/Projects/ProjectsContainer.jsx';
import ExpensesContainer from './Components/Expenses/ExpensesContainer.jsx';
import Footer from './Components/Layout/Footer.jsx';
import AboutUs from './Components/UserManagement/AboutUs.jsx';
import HomePage from './Components/Layout/HomePage.jsx';
import ProjectForm from './Components/Forms/ProjectForm.jsx';
import ExpenseForm from './Components/Forms/ExpenseForm.jsx';
import SignUpForm from './Components/UserManagement/UserSignUpForm.jsx';
import LoginForm from './Components/UserManagement/LoginForm.jsx';
import AccountManagement from './Components/UserManagement/AccountManagement.jsx';
import AccountRecovery from './Components/UserManagement/AccountRecovery.jsx';
import ProtectedRoute from './Components/Layout/ProtectedRoute.jsx';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Toast notifications
    const showToast = (message, type = 'success') => {
        toast[type](message);
    };

    // Fetch all data on initial load
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

    const handleSignUpSuccess = (user) => {
        setIsAuthenticated(true);
        setCurrentUser(user);
        showToast(`Welcome, ${user.name || 'User'}!`);
        navigate('/projects');
    };

    const handleLoginSuccess = (response) => {
        const user = response.data?.user || response.user || {};
        setIsAuthenticated(true);
        setCurrentUser(user);
        showToast(`Welcome back, ${user.name || 'User'}!`);
        navigate('/projects');
    };

    const handleSignOut = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        showToast('You have been signed out.');
        navigate('/');
    };

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
                        onSignOut={handleSignOut}
                        onLogin={() => navigate('/login')}
                        onSignUp={() => navigate('/signup')}
                        isAuthenticated={isAuthenticated}
                        currentUser={currentUser}
                    />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route
                            path="/login"
                            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
                        />
                        <Route
                            path="/signup"
                            element={<SignUpForm onSignUpSuccess={handleSignUpSuccess} />}
                        />
                        <Route
                            path="/projects"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <ProjectsContainer
                                        projects={projects}
                                        searchTerm={searchTerm}
                                        statusFilter={statusFilter}
                                        sortOption={sortOption}
                                        showToast={showToast}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/expenses"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <ExpensesContainer
                                        expenses={expenses}
                                        searchTerm={searchTerm}
                                        showToast={showToast}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/projects/new"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <ProjectForm users={users} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/expenses/new"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <ExpenseForm projects={projects} />
                                </ProtectedRoute>
                            }
                        />

{/* Account management Route */}
                        <Route
    path="/account"
    element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AccountManagement
                userId={currentUser?.id}
                onAccountUpdate={() => showToast('Account updated successfully!')}
            />
        </ProtectedRoute>
    }
/>
<Route path="/account/recovery" element={<AccountRecovery />} />
                        <Route
                            path="/account"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AccountManagement
                                        userId={currentUser?.id}
                                        onAccountUpdate={() => showToast('Account updated successfully!')}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<h2>Page Not Found</h2>} />
                    </Routes>
                    <Footer />
                </div>
            </ProjectProvider>
        </ThemeProvider>
    );
}
export default App;

//  V2

// import React, { useEffect, useState } from 'react';
// import { ProjectProvider } from './ProjectContext.jsx';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import ProtectedRoute from './Components/Layout/ProtectedRoute.jsx';
// import Header from './Components/Layout/Header.jsx';
// import NavBar from './Components/Layout/NavBar.jsx';
// import Footer from './Components/Layout/Footer.jsx';
// import HomePage from './Components/Layout/HomePage.jsx';
// import ProjectsContainer from './Components/Projects/ProjectsContainer.jsx';
// import ExpensesContainer from './Components/Expenses/ExpensesContainer.jsx';
// import ProjectForm from './Components/Forms/ProjectForm.jsx';
// import ExpenseForm from './Components/Forms/ExpenseForm.jsx';
// import SignUpForm from './Components/UserManagement/UserSignUpForm.jsx';
// import LoginForm from './Components/UserManagement/LoginForm.jsx';
// import AccountManagement from './Components/UserManagement/AccountManagement.jsx';
// import AccountRecovery from './Components/UserManagement/AccountRecovery.jsx';
// import PasswordReset from './Components/UserManagement/PasswordReset.jsx'; // New component for password reset
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import theme from './theme.jsx';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// 
// const App = () => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);
//     const navigate = useNavigate();
// 
//     // Rehydrate the session on app load
//     useEffect(() => {
//         const fetchCurrentUser = async () => {
//             const token = localStorage.getItem('authToken');
//             if (!token) {
//                 setIsAuthenticated(false);
//                 setCurrentUser(null);
//                 return;
//             }
// 
//             try {
//                 const response = await axios.get('http://localhost:5555/current-user', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setIsAuthenticated(true);
//                 setCurrentUser(response.data);
//             } catch (err) {
//                 console.error('Error fetching current user:', err);
//                 setIsAuthenticated(false);
//                 setCurrentUser(null);
//                 localStorage.removeItem('authToken');
//             }
//         };
// 
//         fetchCurrentUser();
//     }, []);
// 
//     const handleLoginSuccess = (response) => {
//         const token = response.data.token;
//         localStorage.setItem('authToken', token);
//         setIsAuthenticated(true);
//         setCurrentUser(response.data.user);
//         toast.success(`Welcome back, ${response.data.user.name}!`);
//         navigate('/projects');
//     };
// 
//     const handleSignOut = () => {
//         setIsAuthenticated(false);
//         setCurrentUser(null);
//         localStorage.removeItem('authToken');
//         toast.success('You have been signed out.');
//         navigate('/');
//     };
// 
//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <ProjectProvider>
//                 <div className="App">
//                     <ToastContainer position="top-right" autoClose={3000} />
//                     <Header />
//                     <NavBar
//                         isAuthenticated={isAuthenticated}
//                         onSignOut={handleSignOut}
//                         onLogin={() => navigate('/login')}
//                         onSignUp={() => navigate('/signup')}
//                         currentUser={currentUser}
//                     />
//                     <Routes>
//                         <Route path="/" element={<HomePage />} />
//                         <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
//                         <Route path="/signup" element={<SignUpForm />} />
//                         <Route path="/account/recovery" element={<AccountRecovery />} />
//                         <Route path="/account/reset-password/:token" element={<PasswordReset />} />
//                         <Route
//                             path="/projects"
//                             element={
//                                 <ProtectedRoute>
//                                     <ProjectsContainer />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route
//                             path="/expenses"
//                             element={
//                                 <ProtectedRoute>
//                                     <ExpensesContainer />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route
//                             path="/account"
//                             element={
//                                 <ProtectedRoute>
//                                     <AccountManagement
//                                         userId={currentUser?.id}
//                                         onAccountUpdate={() => toast.success('Account updated successfully!')}
//                                     />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route path="*" element={<h2>Page Not Found</h2>} />
//                     </Routes>
//                     <Footer />
//                 </div>
//             </ProjectProvider>
//         </ThemeProvider>
//     );
// };
// 
// export default App;
