import React, { useEffect, useState } from 'react';
import { ProjectProvider } from './ProjectContext.jsx';
import Header from './Components/Layout/Header.jsx';
import NavBar from './Components/Layout/NavBar.jsx';
import ProjectsContainer from './Components/Projects/ProjectsContainer.jsx';
import ExpensesContainer from './Components/Expenses/ExpensesContainer.jsx';
import Footer from './Components/Layout/Footer.jsx';
import AboutUs from './Components/Layout/AboutUs.jsx';
import HomePage from './Components/Layout/HomePage.jsx';
import ProjectForm from './Components/Forms/ProjectForm.jsx';
import ExpenseForm from './Components/Forms/ExpenseForm.jsx';
import SignUpForm from './Components/UserManagement/UserSignUpForm.jsx';
import LoginForm from './Components/UserManagement/LoginForm.jsx';
import AccountManagement from './Components/UserManagement/AccountManagement.jsx';
import AccountRecovery from './Components/UserManagement/AccountRecovery.jsx';
import ProtectedRoute from './Components/Layout/ProtectedRoute.jsx';
import { Route, Routes, useNavigate } from 'react-router-dom';
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

    // Check for token and restore auth state on app load
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:5555/auth/validate-token', {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    // Restore auth state
                    setCurrentUser(response.data.user);
                    setIsAuthenticated(true);
                } catch (err) {
                    console.error('Token validation failed:', err);
                    localStorage.removeItem('authToken');
                    setIsAuthenticated(false);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    // Handle Search
    const handleSearch = (term) => setSearchTerm(term);
    const handleStatusFilter = (status) => setStatusFilter(status);
    const handleSort = (option) => setSortOption(option);

    // Handle Signup Success
    const handleSignUpSuccess = (user) => {
        setIsAuthenticated(true);
        setCurrentUser(user);
        showToast(`Welcome, ${user.name || 'User'}!`);
        navigate('/projects');
    };

    // Handle Login Success
    const handleLoginSuccess = ({ user }) => {
        setIsAuthenticated(true);
        setCurrentUser(user);
        // localStorage.setItem('authToken', token); // Store token for persistence
        showToast(`Welcome back, ${user.name || 'User'}!`);
        navigate('/projects');
    };

    // Handle Sign Out
    //     const handleSignOut = () => {
    //         setIsAuthenticated(false);
    //         fetch("http://localhost:5555/logout",{
    //             method: "Delete",
    //             headers:{credentials: "include"}
    //         })
    //         .then(res=>{
    //         if (res.ok){
    //             setCurrentUser(null);
    //             // localStorage.removeItem('authToken'); 
    //             showToast('You have been signed out.');
    //             navigate('/');
    // 
    //         }
    //         })
    //     };
    const handleSignOut = () => {
        fetch("http://localhost:5555/logout", {
            method: "DELETE",
            credentials: "include", // Ensures cookies are sent with the request
        })
        .then(async (res) => {
            setCurrentUser(null);
            setIsAuthenticated(false);
    
            if (res.ok) {
                showToast("You have been signed out successfully.");
                navigate("/");
            } else {
                const errorData = await res.json();
                console.warn("Logout error:", errorData);
                if (res.status === 401) {
                    showToast("Your session had already expired.");
                    navigate("/");
                } else {
                    showToast(
                        errorData.error || "An error occurred while signing out.",
                        "error"
                    );
                }
            }
        })
        .catch((err) => {
            console.error("Network error:", err);
            setCurrentUser(null);
            setIsAuthenticated(false);
            showToast(
                "Unable to connect to the server. You have been signed out.",
                "info"
            );
            navigate("/");
        });
    };
    
    // Render Loading and Error States
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
                        <Route path="*" element={<h2>Page Not Found</h2>} />
                    </Routes>
                    <Footer />
                </div>
            </ProjectProvider>
        </ThemeProvider>
    );
};

export default App;


//  V2

// import React, { useEffect, useState } from 'react';
// import { ProjectProvider } from './ProjectContext.jsx';
// import Header from './Components/Layout/Header.jsx';
// import NavBar from './Components/Layout/NavBar.jsx';
// import ProjectsContainer from './Components/Projects/ProjectsContainer.jsx';
// import ExpensesContainer from './Components/Expenses/ExpensesContainer.jsx';
// import Footer from './Components/Layout/Footer.jsx';
// import AboutUs from './Components/Layout/AboutUs.jsx';
// import HomePage from './Components/Layout/HomePage.jsx';
// import ProjectForm from './Components/Forms/ProjectForm.jsx';
// import ExpenseForm from './Components/Forms/ExpenseForm.jsx';
// import SignUpForm from './Components/UserManagement/UserSignUpForm.jsx';
// import LoginForm from './Components/UserManagement/LoginForm.jsx';
// import AccountManagement from './Components/UserManagement/AccountManagement.jsx';
// import AccountRecovery from './Components/UserManagement/AccountRecovery.jsx';
// import ProtectedRoute from './Components/Layout/ProtectedRoute.jsx';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import theme from './theme.jsx';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// 
// const App = () => {
//     const [projects, setProjects] = useState([]);
//     const [expenses, setExpenses] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [statusFilter, setStatusFilter] = useState('');
//     const [sortOption, setSortOption] = useState('');
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
// 
//     const navigate = useNavigate();
// 
//     // Toast notifications
//     const showToast = (message, type = 'success') => {
//         toast[type](message);
//     };
// 
//     // Check for token and restore auth state on app load
//     useEffect(() => {
//         const checkAuth = async () => {
//             const token = localStorage.getItem('authToken');
//             const storedUser = localStorage.getItem('currentUser');
//             if (token) {
//                 try {
//                     const response = await axios.get('http://localhost:5555/auth/validate-token', {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
// 
//                     // Restore auth state
//                     setCurrentUser(response.data.user || JSON.parse(storedUser));
//                     setIsAuthenticated(true);
//                 } catch (err) {
//                     if (err.response?.status === 401) {
//                         showToast('Your session has expired. Please log in again.', 'warning');
//                     }
//                     console.error('Token validation failed:', err);
//                     localStorage.removeItem('authToken');
//                     localStorage.removeItem('currentUser');
//                     setIsAuthenticated(false);
//                 }
//             }
//             setLoading(false);
//         };
// 
//         checkAuth();
//     }, []);
// 
//     // Handle Search
//     const handleSearch = (term) => setSearchTerm(term);
//     const handleStatusFilter = (status) => setStatusFilter(status);
//     const handleSort = (option) => setSortOption(option);
// 
//     // Handle Signup Success
//     const handleSignUpSuccess = (user) => {
//         setIsAuthenticated(true);
//         setCurrentUser(user);
//         localStorage.setItem('authToken', user.token); 
//         localStorage.setItem('currentUser', JSON.stringify(user)); 
//         showToast(`Welcome, ${user.name || 'User'}!`);
//         navigate('/projects');
//     };
// 
//     // Handle Login Success
//     const handleLoginSuccess = ({ token, user }) => {
//         setIsAuthenticated(true);
//         setCurrentUser(user);
//         localStorage.setItem('authToken', token); // Store token for persistence
//         localStorage.setItem('currentUser', JSON.stringify(user)); // Store user data
//         showToast(`Welcome back, ${user.name || 'User'}!`);
//         navigate('/projects');
//     };
// 
//     // Handle Sign Out
//     const handleSignOut = () => {
//         setIsAuthenticated(false);
//         setCurrentUser(null);
//         localStorage.removeItem('authToken'); // Clear token
//         localStorage.removeItem('currentUser'); // Clear user data
//         showToast('You have been signed out.');
//         navigate('/');
//     };
// 
//     // Render Loading and Error States
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;
// 
//     return (
//         <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <ProjectProvider>
//                 <div className="App">
//                     <ToastContainer position="top-right" autoClose={3000} />
//                     <Header />
//                     <NavBar
//                         onSearch={handleSearch}
//                         onStatusFilter={handleStatusFilter}
//                         onSort={handleSort}
//                         onSignOut={handleSignOut}
//                         onLogin={() => navigate('/login')}
//                         onSignUp={() => navigate('/signup')}
//                         isAuthenticated={isAuthenticated}
//                         currentUser={currentUser}
//                     />
//                     <Routes>
//                         <Route path="/" element={<HomePage />} />
//                         <Route path="/about" element={<AboutUs />} />
//                         <Route
//                             path="/login"
//                             element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
//                         />
//                         <Route
//                             path="/signup"
//                             element={<SignUpForm onSignUpSuccess={handleSignUpSuccess} />}
//                         />
//                         <Route
//                             path="/projects"
//                             element={
//                                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                                     <ProjectsContainer
//                                         projects={projects}
//                                         searchTerm={searchTerm}
//                                         statusFilter={statusFilter}
//                                         sortOption={sortOption}
//                                         showToast={showToast}
//                                     />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route
//                             path="/expenses"
//                             element={
//                                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                                     <ExpensesContainer
//                                         expenses={expenses}
//                                         searchTerm={searchTerm}
//                                         showToast={showToast}
//                                     />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route
//                             path="/projects/new"
//                             element={
//                                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                                     <ProjectForm users={users} />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route
//                             path="/expenses/new"
//                             element={
//                                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                                     <ExpenseForm projects={projects} />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route
//                             path="/account"
//                             element={
//                                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                                     <AccountManagement
//                                         userId={currentUser?.id}
//                                         onAccountUpdate={() => showToast('Account updated successfully!')}
//                                     />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route path="/account/recovery" element={<AccountRecovery />} />
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
