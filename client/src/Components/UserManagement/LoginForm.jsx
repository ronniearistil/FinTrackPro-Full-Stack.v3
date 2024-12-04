
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555';

const LoginForm = ({ onLoginSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Toggle password visibility
    const toggleShowPassword = () => setShowPassword(!showPassword);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/login`, {
                email: formData.email,
                password: formData.password,
            });

            const { token, user } = response.data;

            // Save the token in localStorage for authenticated requests
            localStorage.setItem('authToken', token);

            // Notify success and greet the user by name
            // toast.success(`Welcome, ${user.name}!`);

            // Pass the token and user details to the parent component
            onLoginSuccess({ token, user });
        } catch (err) {
            console.error('Error logging in:', err);
            const errorMessage =
                err.response?.data?.error || 'Invalid email or password. Please try again.';
            toast.error(errorMessage);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
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
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={toggleShowPassword}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                required
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Login
            </Button>
        </Box>
    );
};

export default LoginForm;
