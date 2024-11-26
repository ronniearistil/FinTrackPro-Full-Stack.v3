import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const PROJECTS_URL = "http://localhost:5555/projects";
const EXPENSES_URL = "http://localhost:5555/expenses";
const USERS_URL = "http://localhost:5555/users";

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [users, setUsers] = useState([]);

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [projectsRes, expensesRes, usersRes] = await Promise.all([
                axios.get(PROJECTS_URL),
                axios.get(EXPENSES_URL),
                axios.get(USERS_URL),
            ]);
            setProjects(projectsRes.data || []);
            setExpenses(expensesRes.data || []);
            setUsers(usersRes.data.users || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Add a project
    const addProject = async (newProject) => {
        try {
            const response = await axios.post(PROJECTS_URL, newProject);
            setProjects((prev) => [...prev, response.data]);
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    // Edit a project
    const editProject = async (updatedProject) => {
        try {
            const response = await axios.patch(
                `${PROJECTS_URL}/${updatedProject.id}`,
                updatedProject
            );
            setProjects((prev) =>
                prev.map((project) =>
                    project.id === response.data.id ? response.data : project
                )
            );
        } catch (error) {
            console.error("Error editing project:", error);
        }
    };

    // Delete a project
    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`${PROJECTS_URL}/${projectId}`);
            setProjects((prev) => prev.filter((project) => project.id !== projectId));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    // Add an expense
    const addExpense = async (newExpense) => {
        try {
            const response = await axios.post(EXPENSES_URL, newExpense);
            setExpenses((prev) => [...prev, response.data]);
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    // Edit an expense
    const editExpense = async (updatedExpense) => {
        try {
            const response = await axios.patch(
                `${EXPENSES_URL}/${updatedExpense.id}`,
                updatedExpense
            );
            setExpenses((prev) =>
                prev.map((expense) =>
                    expense.id === response.data.id ? response.data : expense
                )
            );
        } catch (error) {
            console.error("Error editing expense:", error);
        }
    };

    // Delete an expense
    const deleteExpense = async (expenseId) => {
        try {
            await axios.delete(`${EXPENSES_URL}/${expenseId}`);
            setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    // Add a user
    const addUser = async (newUser) => {
        try {
            const response = await axios.post(USERS_URL, newUser);
            setUsers((prev) => [...prev, response.data]);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    // Edit a user
    const editUser = async (updatedUser) => {
        try {
            const response = await axios.patch(
                `${USERS_URL}/${updatedUser.id}`,
                updatedUser
            );
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === response.data.id ? response.data : user
                )
            );
        } catch (error) {
            console.error("Error editing user:", error);
        }
    };

    // Delete a user
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${USERS_URL}/${userId}`);
            setUsers((prev) => prev.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                projects,
                expenses,
                users,
                addProject,
                editProject,
                deleteProject,
                addExpense,
                editExpense,
                deleteExpense,
                addUser,
                editUser,
                deleteUser,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectContext);



