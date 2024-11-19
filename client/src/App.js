import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]); // State for users

  useEffect(() => {
    // Fetch projects
    axios.get("http://localhost:5555/projects") // Ensure this matches your backend URL and port
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });

    // Fetch expenses
    axios.get("http://localhost:5555/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });

    // Fetch users
    axios.get("http://localhost:5555/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to FinTrackPro</h1>
      <p>This is the frontend for FinTrackPro.</p>

      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email}) - Projects: {user.project_count}
          </li>
        ))}
      </ul>

      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            {project.name} - {project.status} - Budget: ${project.budgeted_cost}
          </li>
        ))}
      </ul>

      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name} - ${expense.amount} (Project ID: {expense.project_id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

