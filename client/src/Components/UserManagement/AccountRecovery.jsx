import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const AccountRecovery = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: Request, Step 2: Reset Password

    // Step 1: Request Token
    const handleRequestToken = async () => {
        try {
            await axios.post('http://localhost:5555/account/recovery', { email });
            toast.success('If the email exists, a recovery link has been sent.');
            setStep(2); // Move to Step 2
        } catch (error) {
            console.error('Error requesting recovery:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    // Step 2: Reset Password
    const handleResetPassword = async () => {
        try {
            await axios.post('http://localhost:5555/account/reset', { email, token, newPassword });
            toast.success('Password reset successfully. You can now log in.');
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('Invalid token or email. Please try again.');
        }
    };

    return (
        <Box
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
                {step === 1 ? 'Account Recovery' : 'Reset Password'}
            </Typography>
            {step === 1 && (
                <>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleRequestToken}
                        sx={{ mt: 2 }}
                    >
                        Send Recovery Link
                    </Button>
                </>
            )}
            {step === 2 && (
                <>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Recovery Token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleResetPassword}
                        sx={{ mt: 2 }}
                    >
                        Reset Password
                    </Button>
                </>
            )}
        </Box>
    );
};

export default AccountRecovery;
