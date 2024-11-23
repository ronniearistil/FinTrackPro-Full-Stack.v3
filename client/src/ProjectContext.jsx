// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';
// 
// const PROJECTS_URL = 'http://localhost:5555/projects';
// const EXPENSES_URL = 'http://localhost:5555/expenses';
// const USERS_URL = 'http://localhost:5555/users';
// 
// export const ProjectContext = createContext();
// 
// export const ProjectProvider = ({ children }) => {
//   const [projects, setProjects] = useState([]);
//   const [expenses, setExpenses] = useState([]);
//   const [users, setUsers] = useState([]);
// 
//   // Fetch data on component mount
//   useEffect(() => {
//     fetchData();
//   }, []);
// 
//   const fetchData = async () => {
//     try {
//       const [projectsRes, expensesRes, usersRes] = await Promise.all([
//         axios.get(PROJECTS_URL),
//         axios.get(EXPENSES_URL),
//         axios.get(USERS_URL),
//       ]);
//       setProjects(projectsRes.data);
//       setExpenses(expensesRes.data);
//       setUsers(usersRes.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };
// 
//   // Add Project
//   const addProject = async (newProject) => {
//     try {
//       const response = await axios.post(PROJECTS_URL, newProject);
//       setProjects((prev) => [...prev, response.data]);
//     } catch (error) {
//       console.error('Error adding project:', error);
//     }
//   };
// 
//   // Edit Project
//   const editProject = async (updatedProject) => {
//     try {
//       const response = await axios.patch(`${PROJECTS_URL}/${updatedProject.id}`, updatedProject);
//       setProjects((prev) =>
//         prev.map((project) => (project.id === response.data.id ? response.data : project))
//       );
//     } catch (error) {
//       console.error('Error editing project:', error);
//     }
//   };
// 
//   // Add Expense
//   const addExpense = async (newExpense) => {
//     try {
//       const response = await axios.post(EXPENSES_URL, newExpense);
//       setExpenses((prev) => [...prev, response.data]);
//     } catch (error) {
//       console.error('Error adding expense:', error);
//     }
//   };
// 
//   // Edit Expense
//   const editExpense = async (updatedExpense) => {
//     try {
//       const response = await axios.patch(`${EXPENSES_URL}/${updatedExpense.id}`, updatedExpense);
//       setExpenses((prev) =>
//         prev.map((expense) => (expense.id === response.data.id ? response.data : expense))
//       );
//     } catch (error) {
//       console.error('Error editing expense:', error);
//     }
//   };
// // Add User
// const addUser = async (newUser) => {
//     try {
//       const response = await axios.post(USERS_URL, newUser);
//       if (response.status === 201) {
//         setUsers((prev) => [...prev, response.data]);
//         console.log('User added:', response.data);
//       } else {
//         console.error('Unexpected response:', response);
//       }
//     } catch (error) {
//       console.error('Error adding user:', error.response || error.message);
//     }
//   };
// 
//   return (
//     <ProjectContext.Provider
//       value={{
//         projects,
//         expenses,
//         users,
//         addProject,
//         editProject,
//         addExpense,
//         editExpense,
//       }}
//     >
//       {children}
//     </ProjectContext.Provider>
//   );
// };
// 
// export const useProjects = () => useContext(ProjectContext);



