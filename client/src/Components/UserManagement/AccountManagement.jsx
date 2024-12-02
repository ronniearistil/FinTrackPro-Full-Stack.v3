import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555';

const AccountManagement = ({ userId, onAccountUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        currentPassword: '',
        newPassword: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/${userId}`);
                setFormData({
                    name: response.data.name || '',
                    email: response.data.email || '',
                    username: response.data.username || '',
                    currentPassword: '',
                    newPassword: '',
                });
            } catch (err) {
                console.error('Error fetching user data:', err);
                toast.error('Failed to load account information.');
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.username) {
            toast.error('Please fill out all required fields.');
            return;
        }

        setLoading(true);
        try {
            await axios.patch(`${API_URL}/users/${userId}`, formData);
            toast.success('Account updated successfully!');
            onAccountUpdate();
        } catch (err) {
            console.error('Error updating account:', err);
            toast.error('Error updating account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${API_URL}/users/${userId}`);
            toast.success('Account deleted successfully.');
            navigate('/signup');
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
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </Button>
                <Button variant="outlined" color="error" onClick={handleDelete}>
                    Delete Account
                </Button>
            </Box>
        </Box>
    );
};

export default AccountManagement;

