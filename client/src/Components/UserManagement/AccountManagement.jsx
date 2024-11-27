import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const AccountManagement = ({ userId, onAccountUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        currentPassword: '',
        newPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(`http://localhost:5555/users/${userId}`, formData);
            toast.success('Account updated successfully!');
            onAccountUpdate(); // Refresh user info in context or UI
        } catch (err) {
            console.error('Error updating account:', err);
            toast.error('Error updating account. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5555/users/${userId}`);
            toast.success('Account deleted successfully.');
            // Redirect to signup/login or clear session
            window.location.href = '/signup'; // Example redirection after deletion
        } catch (err) {
            console.error('Error deleting account:', err);
            toast.error('Error deleting account. Please try again.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleUpdate}
            sx={{
                maxWidth: 500,
                mx: 'auto',
                mt: 4,
                padding: 3,
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                boxShadow: 2,
            }}
        >
            <Typography variant="h4" gutterBottom>
                Manage Account
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Current Password"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                margin="normal"
                label="New Password"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                    Update
                </Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                    Delete Account
                </Button>
            </Box>
        </Box>
    );
};

export default AccountManagement;