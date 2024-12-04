import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// API Endpoints
const BASE_URL = "http://localhost:5555";
const PROJECTS_URL = `${BASE_URL}/projects`;
const EXPENSES_URL = `${BASE_URL}/expenses`;
const USERS_URL = `${BASE_URL}/users`;

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
    // State variables
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

    // Project Operations
    const addProject = async (newProject) => {
        try {
            const response = await axios.post(PROJECTS_URL, newProject);
            setProjects((prev) => [...prev, response.data]);
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

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

    const deleteProject = async (projectId) => {
        try {
            await axios.delete(`${PROJECTS_URL}/${projectId}`);
            setProjects((prev) => prev.filter((project) => project.id !== projectId));
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const archiveProject = async (projectId) => {
        try {
            const response = await axios.patch(`${PROJECTS_URL}/${projectId}/archive`);
            setProjects((prev) =>
                prev.map((project) =>
                    project.id === projectId
                        ? { ...project, status: response.data.message.split(" ").pop() }
                        : project
                )
            );
        } catch (error) {
            console.error("Error archiving/unarchiving project:", error);
        }
    };

    // Expense Operations
    const addExpense = async (newExpense) => {
        try {
            const response = await axios.post(EXPENSES_URL, newExpense);
            setExpenses((prev) => [...prev, response.data]);
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

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

    const deleteExpense = async (expenseId) => {
        try {
            await axios.delete(`${EXPENSES_URL}/${expenseId}`);
            setExpenses((prev) => prev.filter((expense) => expense.id !== expenseId));
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    const archiveExpense = async (expenseId) => {
        try {
            const response = await axios.patch(`${EXPENSES_URL}/${expenseId}/archive`);
            setExpenses((prev) =>
                prev.map((expense) =>
                    expense.id === expenseId
                        ? { ...expense, archived: response.data.archived }
                        : expense
                )
            );
        } catch (error) {
            console.error("Error archiving/unarchiving expense:", error);
        }
    };

    // User Operations
    const addUser = async (newUser) => {
        try {
            const response = await axios.post(USERS_URL, newUser);
            setUsers((prev) => [...prev, response.data]);
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const editUser = async (updatedUser) => {
        try {
            const response = await axios.patch(`${USERS_URL}/${updatedUser.id}`, updatedUser);
            setUsers((prev) =>
                prev.map((user) => (user.id === response.data.id ? response.data : user))
            );
        } catch (error) {
            console.error("Error editing user:", error);
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${USERS_URL}/${userId}`);
            setUsers((prev) => prev.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Collaborator Operations
    const fetchCollaborators = async (projectId) => {
        try {
            const response = await axios.get(`${PROJECTS_URL}/${projectId}/collaborators`);
            return response.data.collaborators || [];
        } catch (error) {
            console.error("Error fetching collaborators:", error);
            return [];
        }
    };

    const addCollaborator = async (projectId, userId) => {
        try {
            const response = await axios.post(`${PROJECTS_URL}/${projectId}/collaborators`, {
                user_id: userId,
            });
            return response.data.collaborators || [];
        } catch (error) {
            console.error("Error adding collaborator:", error);
            throw error;
        }
    };

    const removeCollaborator = async (projectId, userId) => {
        try {
            const response = await axios.delete(
                `${PROJECTS_URL}/${projectId}/collaborators/${userId}`
            );
            return response.data.collaborators || [];
        } catch (error) {
            console.error("Error removing collaborator:", error);
            throw error;
        }
    };

    // Context Provider
    return (
        <ProjectContext.Provider
            value={{
                projects,
                expenses,
                users,
                // Project operations
                addProject,
                editProject,
                deleteProject,
                archiveProject,
                // Expense operations
                addExpense,
                editExpense,
                deleteExpense,
                archiveExpense,
                // User operations
                addUser,
                editUser,
                deleteUser,
                // Collaborator operations
                fetchCollaborators,
                addCollaborator,
                removeCollaborator,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectContext);
