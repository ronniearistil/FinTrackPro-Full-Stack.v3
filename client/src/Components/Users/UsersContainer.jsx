import React, { useState, useEffect } from "react";
import axios from "axios"; // To fetch data from the backend

const UsersContainer = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from the backend
    useEffect(() => {
        axios
            .get("http://localhost:5555/users") // Ensure this matches your backend URL
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setError("Failed to fetch users.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading users...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Users</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} ({user.email}) - Projects: {user.project_count || 0}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default UsersContainer;
