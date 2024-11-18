import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch projects
    axios.get("http://localhost:5000/projects") // Replace with your backend URL
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });

    // Fetch expenses
    axios.get("http://localhost:5000/expenses") // Replace with your backend URL
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to FinTrackPro</h1>
      <p>This is the frontend for FinTrackPro.</p>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name} - {project.status}</li>
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

