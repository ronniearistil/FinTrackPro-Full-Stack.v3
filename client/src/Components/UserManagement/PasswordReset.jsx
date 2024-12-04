import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PasswordReset = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!password) {
            toast.error('Please enter your new password.');
            return;
        }

        setLoading(true);
        try {
            await axios.put('http://localhost:5555/account/recovery', { token, new_password: password });
            toast.success('Password reset successfully. You can now log in.');
        } catch (err) {
            console.error('Error resetting password:', err);
            toast.error('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, p: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h4" gutterBottom>
                Reset Password
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleReset}
                disabled={loading}
                sx={{ mt: 2 }}
            >
                {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
        </Box>
    );
};

export default PasswordReset;
