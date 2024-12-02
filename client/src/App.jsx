// Orginal File 

// import React, { useEffect, useState } from 'react';
// import { ProjectProvider } from './ProjectContext.jsx';
// import Header from './Components/Layout/Header.jsx';
// import NavBar from './Components/Layout/NavBar.jsx';
// import ProjectsContainer from './Components/Projects/ProjectsContainer.jsx';
// import ExpensesContainer from './Components/Expenses/ExpensesContainer.jsx';
// import Footer from './Components/Layout/Footer.jsx';
// import AboutUs from './Components/UserManagement/AboutUs.jsx';
// // import HomePage from './Components/Layout/HomePage.jsx'; // Added HomePage
// import ProjectForm from './Components/Forms/ProjectForm.jsx';
// import ExpenseForm from './Components/Forms/ExpenseForm.jsx';
// import SignUpForm from './Components/UserManagement/UserSignUpForm.jsx';
// import LoginForm from './Components/UserManagement/LoginForm.jsx';
// import AccountManagement from './Components/UserManagement/AccountManagement.jsx';
// // import ProtectedRoute from './Components/Layout/ProtectedRoute.jsx'; // Added ProtectedRoute
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);
// 
//     const navigate = useNavigate();
// 
//     // Toast notifications
//     const showToast = (message, type = 'success') => {
//         toast[type](message);
//     };
// 
//     // Fetch all data on initial load
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [projectsRes, expensesRes, usersRes] = await Promise.all([
//                     axios.get('http://localhost:5555/projects'),
//                     axios.get('http://localhost:5555/expenses'),
//                     axios.get('http://localhost:5555/users'),
//                 ]);
//                 setProjects(projectsRes.data);
//                 setExpenses(expensesRes.data);
//                 setUsers(usersRes.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching data:', err);
//                 setError('Failed to fetch data. Please try again later.');
//                 setLoading(false);
//             }
//         };
// 
//         fetchData();
//     }, []);
// 
//     // Handlers for search, filter, and sort
//     const handleSearch = (term) => setSearchTerm(term);
//     const handleStatusFilter = (status) => setStatusFilter(status);
//     const handleSort = (option) => setSortOption(option);
// 
//     const handleSignUpSuccess = (user) => {
//         console.log('Signed-up user:', user); // Debugging
//         setIsAuthenticated(true);
//         setCurrentUser(user);
//         showToast(`Welcome back, ${user.name || 'User'}!`);
//         navigate('/projects');
//     };
// 
//     // // Authentication handlers
//     // const handleSignUpSuccess = (user) => {
//     //     setIsAuthenticated(true);
//     //     setCurrentUser(user);
//     //     showToast(`Welcome, ${user.name || 'User'}!`);
//     //     navigate('/projects');
//     // };
// 
//     const handleLoginSuccess = (response) => {
//         const user = response.data?.user || response.user || {}; // Adjust based on API structure
//         console.log('Logged-in user:', user); // Debugging
//         setIsAuthenticated(true);
//         setCurrentUser(user);
//         showToast(`Welcome back, ${user.name || 'User'}!`);
//         navigate('/projects');
//     };
// 
//     const handleSignOut = () => {
//         setIsAuthenticated(false);
//         setCurrentUser(null);
//         showToast('You have been signed out.');
//         navigate('/login');
//     };
// 
//     // Error state display
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
//                         greeting={isAuthenticated ? `Welcome back, ${currentUser?.name || 'User'}!` : 'Welcome to FinTrackPro, Please Login!'} 
//                     />
//                     <Routes>
//                         <Route path="/" element={<Navigate to="/projects" />} />
//                         <Route
//                             path="/projects"
//                             element={
//                                 <ProjectsContainer
//                                     projects={projects}
//                                     searchTerm={searchTerm}
//                                     statusFilter={statusFilter}
//                                     sortOption={sortOption}
//                                     showToast={showToast}
//                                 />
//                             }
//                         />
//                         <Route
//                             path="/expenses"
//                             element={
//                                 <ExpensesContainer
//                                     expenses={expenses}
//                                     searchTerm={searchTerm}
//                                     showToast={showToast}
//                                 />
//                             }
//                         />
//                         <Route
//                             path="/projects/new"
//                             element={<ProjectForm users={users} />}
//                         />
//                         <Route
//                             path="/expenses/new"
//                             element={<ExpenseForm projects={projects} />}
//                         />
//                         <Route path="/about" element={<AboutUs />} />
//                         <Route
//                             path="/signup"
//                             element={<SignUpForm onSignUpSuccess={handleSignUpSuccess} />}
//                         />
//                         <Route
//                             path="/login"
//                             element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
//                         />
//                         <Route
//                             path="/account"
//                             element={
//                                 isAuthenticated ? (
//                                     <AccountManagement
//                                         userId={currentUser?.id}
//                                         onAccountUpdate={() => showToast('Account updated successfully!')}
//                                     />
//                                 ) : (
//                                     <Navigate to="/login" />
//                                 )
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
// 



// Version 2
// import React, { useEffect, useState } from 'react';
// import { ProjectProvider } from './ProjectContext.jsx';
// import Header from './Components/Layout/Header.jsx';
// import NavBar from './Components/Layout/NavBar.jsx';
// import ProjectsContainer from './Components/Projects/ProjectsContainer.jsx';
// import ExpensesContainer from './Components/Expenses/ExpensesContainer.jsx';
// import Footer from './Components/Layout/Footer.jsx';
// import AboutUs from './Components/UserManagement/AboutUs.jsx';
// import HomePage from './Components/Layout/HomePage.jsx'; // Added HomePage
// import ProjectForm from './Components/Forms/ProjectForm.jsx';
// import ExpenseForm from './Components/Forms/ExpenseForm.jsx';
// import SignUpForm from './Components/UserManagement/UserSignUpForm.jsx';
// import LoginForm from './Components/UserManagement/LoginForm.jsx';
// import AccountManagement from './Components/UserManagement/AccountManagement.jsx';
// import ProtectedRoute from './Components/Layout/ProtectedRoute.jsx'; // Added ProtectedRoute
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
//     // Fetch all data on initial load
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [projectsRes, expensesRes, usersRes] = await Promise.all([
//                     axios.get('http://localhost:5555/projects'),
//                     axios.get('http://localhost:5555/expenses'),
//                     axios.get('http://localhost:5555/users'),
//                 ]);
//                 setProjects(projectsRes.data);
//                 setExpenses(expensesRes.data);
//                 setUsers(usersRes.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching data:', err);
//                 setError('Failed to fetch data. Please try again later.');
//                 setLoading(false);
//             }
//         };
// 
//         fetchData();
//     }, []);
// 
//     // Authentication handlers
//     const handleSignUpSuccess = (user) => {
//         setIsAuthenticated(true);
//         setCurrentUser(user);
//         showToast(`Welcome, ${user.name || 'User'}!`);
//         navigate('/projects');
//     };
// 
//     const handleLoginSuccess = (response) => {
//         const user = response.data?.user || response.user || {}; // Adjust based on API structure
//         setIsAuthenticated(true);
//         setCurrentUser(user);
//         showToast(`Welcome back, ${user.name || 'User'}!`);
//         navigate('/projects');
//     };
// 
//     const handleSignOut = () => {
//         setIsAuthenticated(false);
//         setCurrentUser(null);
//         showToast('You have been signed out.');
//         navigate('/');
//     };
// 
//     // Error state display
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
//                         onSignOut={handleSignOut}
//                         onLogin={() => navigate('/login')}
//                         onSignUp={() => navigate('/signup')}
//                         isAuthenticated={isAuthenticated}
//                         currentUser={currentUser}
//                     />
//                     <Routes>
//                         {/* Public Routes */}
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
// 
//                         {/* Protected Routes */}
//                         <Route
//                             path="/projects"
//                             element={
//                                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                                     <ProjectsContainer projects={projects} />
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
//                             path="/expenses"
//                             element={
//                                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                                     <ExpensesContainer expenses={expenses} />
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
// 
//                         {/* Fallback Route */}
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

// Version 3

// import React, { useEffect, useState } from 'react';
// import { ProjectProvider } from './ProjectContext.jsx';
// import Header from './Components/Layout/Header.jsx';
// import NavBar from './Components/Layout/NavBar.jsx';
// import ProjectsContainer from './Components/Projects/ProjectsContainer.jsx';
// import ExpensesContainer from './Components/Expenses/ExpensesContainer.jsx';
// import Footer from './Components/Layout/Footer.jsx';
// import AboutUs from './Components/UserManagement/AboutUs.jsx';
// import HomePage from './Components/Layout/HomePage.jsx';
// import ProjectForm from './Components/Forms/ProjectForm.jsx';
// import ExpenseForm from './Components/Forms/ExpenseForm.jsx';
// import SignUpForm from './Components/UserManagement/UserSignUpForm.jsx';
// import LoginForm from './Components/UserManagement/LoginForm.jsx';
// import AccountManagement from './Components/UserManagement/AccountManagement.jsx';
// import ProtectedRoute from './Components/Layout/ProtectedRoute.jsx';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
//     // Fetch all data on initial load
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 console.log("Fetching data..."); // Debugging log
//                 const [projectsRes, expensesRes, usersRes] = await Promise.all([
//                     axios.get('http://localhost:5555/projects'),
//                     axios.get('http://localhost:5555/expenses'),
//                     axios.get('http://localhost:5555/users'),
//                 ]);
//                 setProjects(projectsRes.data);
//                 setExpenses(expensesRes.data);
//                 setUsers(usersRes.data);
//                 console.log("Data fetched successfully:", { projectsRes, expensesRes, usersRes }); // Debugging log
//                 setLoading(false);
//             } catch (err) {
//                 console.error('Error fetching data:', err);
//                 setError('Failed to fetch data. Please try again later.');
//                 setLoading(false);
//             }
//         };
// 
//         fetchData();
//     }, []);
// 
//     // Authentication handlers
//     const handleSignUpSuccess = (user) => {
//         setIsAuthenticated(true);
//         setCurrentUser(user);
//         showToast(`Welcome, ${user.name || 'User'}!`);
//         navigate('/projects');
//     };
// 
//     const handleLoginSuccess = (response) => {
//         const user = response.data?.user || response.user || {}; // Adjust based on API structure
//         setIsAuthenticated(true);
//         setCurrentUser(user);
//         console.log("Login success:", user); // Debugging log
//         showToast(`Welcome back, ${user.name || 'User'}!`);
//         navigate('/projects');
//     };
// 
//     const handleSignOut = () => {
//         setIsAuthenticated(false);
//         setCurrentUser(null);
//         showToast('You have been signed out.');
//         navigate('/');
//     };
// 
//     // Error state display
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
//                         onSignOut={handleSignOut}
//                         onLogin={() => navigate('/login')}
//                         onSignUp={() => navigate('/signup')}
//                         isAuthenticated={isAuthenticated}
//                         currentUser={currentUser}
//                     />
//                     <Routes>
//                         {/* Public Routes */}
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
// 
//                         {/* Protected Routes */}
//                         <Route
//                             path="/projects"
//                             element={
//                                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                                     <ProjectsContainer projects={projects} />
//                                 </ProtectedRoute>
//                             }
//                         />
//                         <Route
//                             path="/expenses"
//                             element={
//                                 <ProtectedRoute isAuthenticated={isAuthenticated}>
//                                     <ExpensesContainer expenses={expenses} />
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
// 
//                         {/* Fallback Route */}
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

//Version 4 

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
