// import React, { useEffect, useState } from 'react';
// import { ProjectProvider } from './ProjectContext.jsx';
// import Header from './Components/Layout/Header.jsx';
// import NavBar from './Components/Layout/NavBar.jsx';
// import ProjectsContainer from './Components/Projects/ProjectsContainer.jsx';
// import ExpensesContainer from './Components/Expenses/ExpensesContainer.jsx';
// import Footer from './Components/Layout/Footer.jsx';
// import AboutUs from './Components/AboutUs.jsx';
// import ProjectForm from './Components/Forms/ProjectForm.jsx';
// import ExpenseForm from './Components/Forms/ExpenseForm.jsx';
// import SignUpForm from './Components/UserManagement/UserSignUpForm.jsx';
// import LoginForm from './Components/UserManagement/LoginForm.jsx';
// import AccountManagement from './Components/UserManagement/AccountManagement.jsx';
// import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import theme from './theme.jsx';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// 
// const App = () => {
//   const [projects, setProjects] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [sortOption, setSortOption] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
// 
//   const navigate = useNavigate();
// 
//   // Toast notifications
//   const showToast = (message, type = 'success') => {
//     toast[type](message);
//   };
// 
//   // Fetch all data on initial load
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [projectsRes, expensesRes] = await Promise.all([
//           axios.get('http://localhost:5555/projects'),
//           axios.get('http://localhost:5555/expenses'),
//         ]);
//         setProjects(projectsRes.data);
//         setExpenses(expensesRes.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError('Failed to fetch data. Please try again later.');
//         setLoading(false);
//       }
//     };
// 
//     fetchData();
//   }, []);
// 
//   // Handlers for search, filter, and sort
//   const handleSearch = (term) => setSearchTerm(term);
//   const handleStatusFilter = (status) => setStatusFilter(status);
//   const handleSort = (option) => setSortOption(option);
// 
//   // Authentication Handlers
//   const handleSignUpSuccess = (user) => {
//     setIsAuthenticated(true);
//     setCurrentUser(user);
//     showToast('Sign-up successful! Welcome!');
//     navigate('/projects');
//   };
// 
//   const handleLoginSuccess = (user) => {
//     setIsAuthenticated(true);
//     setCurrentUser(user);
//     showToast(`Welcome back, ${user.name}!`);
//     navigate('/projects');
//   };
// 
//   const handleSignOut = () => {
//     setIsAuthenticated(false);
//     setCurrentUser(null);
//     showToast('You have been signed out.');
//     navigate('/login');
//   };
// 
//   // Error state display
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;
// 
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <ProjectProvider>
//         <div className="App">
//           <ToastContainer position="top-right" autoClose={3000} />
//           <Header />
//           <NavBar
//             onSearch={handleSearch}
//             onStatusFilter={handleStatusFilter}
//             onSort={handleSort}
//             onSignOut={handleSignOut}
//             onLogin={() => navigate('/login')}
//             onSignUp={() => navigate('/signup')}
//             isAuthenticated={isAuthenticated}
//           />
//           <Routes>
//             <Route path="/" element={<Navigate to="/projects" />} />
//             <Route
//               path="/projects"
//               element={
//                 <ProjectsContainer
//                   projects={projects}
//                   searchTerm={searchTerm}
//                   statusFilter={statusFilter}
//                   sortOption={sortOption}
//                   showToast={showToast}
//                 />
//               }
//             />
//             <Route
//               path="/expenses"
//               element={
//                 <ExpensesContainer
//                   expenses={expenses}
//                   searchTerm={searchTerm}
//                   showToast={showToast}
//                 />
//               }
//             />
//             <Route path="/projects/new" element={<ProjectForm />} />
//             <Route path="/expenses/new" element={<ExpenseForm />} />
//             <Route path="/about" element={<AboutUs />} />
//             <Route
//               path="/signup"
//               element={<SignUpForm onSignUpSuccess={handleSignUpSuccess} />}
//             />
//             <Route
//               path="/login"
//               element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
//             />
//             <Route
//               path="/account"
//               element={
//                 isAuthenticated ? (
//                   <AccountManagement
//                     userId={currentUser?.id}
//                     onAccountUpdate={() => showToast('Account updated successfully!')}
//                   />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route path="*" element={<h2>Page Not Found</h2>} />
//           </Routes>
//           <Footer />
//         </div>
//       </ProjectProvider>
//     </ThemeProvider>
//   );
// };
// 
// export default App;






