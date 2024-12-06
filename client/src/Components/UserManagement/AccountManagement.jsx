import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555';

const AccountManagement = ({ userId, onAccountUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/users/${userId}`);
                setFormData({
                    name: response.data.name || '',
                    email: response.data.email || '',
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
        if (!formData.name || !formData.email) {
            toast.error('Please fill out all required fields.');
            return;
        }

        setLoading(true);
        try {
            const { name, email } = formData;
            await axios.patch(`/users/${userId}`, { name, email });
            toast.success('Account updated successfully!');
            onAccountUpdate();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error updating account.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = window.confirm('Are you sure you want to delete your account?');
        if (!confirmed) return;

        setDeleteLoading(true);
        try {
            await axios.delete(`/users/${userId}`);
            toast.success('Account deleted successfully.');
            navigate('/');
        } catch (err) {
            console.error('Error deleting account:', err);
            toast.error('Error deleting account. Please try again.');
        } finally {
            setDeleteLoading(false);
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
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </Button>
                <Button variant="outlined" color="error" onClick={handleDelete} disabled={deleteLoading}>
                    {deleteLoading ? 'Deleting...' : 'Delete Account'}
                </Button>
            </Box>
        </Box>
    );
};

export default AccountManagement;
