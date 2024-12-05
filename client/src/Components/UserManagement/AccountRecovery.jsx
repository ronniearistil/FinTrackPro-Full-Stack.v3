import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555';

const AccountRecovery = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [tokenValid, setTokenValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');

    useEffect(() => {
        // Auto-validate token if it's present in the URL
        if (token) {
            handleTokenValidation();
        }
    }, [token]);

    const handleEmailSubmit = async () => {
        setLoading(true);
        try {
            await axios.post(`${API_URL}/account/recovery`, { email });
            toast.success('Recovery email sent successfully!');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to send recovery email.');
        } finally {
            setLoading(false);
        }
    };

    const handleTokenValidation = async () => {
        if (!token) {
            toast.error('Token is missing from the URL.');
            return;
        }
        setLoading(true);
        try {
            await axios.get(`${API_URL}/account/recovery`, { params: { token } });
            toast.success('Token is valid. Please set a new password.');
            setTokenValid(true);
        } catch (err) {
            toast.error(err.response?.data?.error || 'Invalid or expired token.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (newPassword.length < 8) {
            toast.error('Password must be at least 8 characters long.');
            return;
        }

        setLoading(true);
        try {
            await axios.put(`${API_URL}/account/recovery`, { token, new_password: newPassword });
            toast.success('Password has been reset successfully!');
            setTokenValid(false);
            setNewPassword('');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h4" gutterBottom>
                {token ? 'Reset Password' : 'Account Recovery'}
            </Typography>

            {!token && (
                <>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button variant="contained" fullWidth onClick={handleEmailSubmit} disabled={loading}>
                        {loading ? 'Sending...' : 'Send Recovery Email'}
                    </Button>
                </>
            )}

            {token && tokenValid && (
                <>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <Button variant="contained" fullWidth onClick={handlePasswordReset} disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </>
            )}

            {token && !tokenValid && (
                <Typography variant="body2" color="error" align="center">
                    Token is invalid or expired. Please request a new recovery email.
                </Typography>
            )}
        </Box>
    );
};

export default AccountRecovery;


// V2 Update 12/4 @4:26pm

// import React, { useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// 
// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555';
// 
// const AccountRecovery = () => {
//     const [email, setEmail] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [tokenValid, setTokenValid] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [searchParams] = useSearchParams();
// 
//     const token = searchParams.get('token');
// 
//     const handleEmailSubmit = async () => {
//         setLoading(true);
//         try {
//             await axios.post(`${API_URL}/account/recovery`, { email });
//             toast.success('Recovery email sent successfully!');
//         } catch (err) {
//             toast.error(err.response?.data?.error || 'Failed to send recovery email.');
//         } finally {
//             setLoading(false);
//         }
//     };
// 
//     const handleTokenValidation = async () => {
//         if (!token) {
//             toast.error('Token is missing from the URL.');
//             return;
//         }
//         setLoading(true);
//         try {
//             const response = await axios.get(`${API_URL}/account/recovery`, { params: { token } });
//             toast.success('Token is valid. Please set a new password.');
//             setTokenValid(true);
//         } catch (err) {
//             toast.error(err.response?.data?.error || 'Invalid or expired token.');
//         } finally {
//             setLoading(false);
//         }
//     };
// 
//     const handlePasswordReset = async () => {
//         setLoading(true);
//         try {
//             await axios.put(`${API_URL}/account/recovery`, { token, new_password: newPassword });
//             toast.success('Password has been reset successfully!');
//         } catch (err) {
//             toast.error(err.response?.data?.error || 'Failed to reset password.');
//         } finally {
//             setLoading(false);
//         }
//     };
// 
//     return (
//         <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4, padding: 3, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
//             <Typography variant="h4" gutterBottom>
//                 {token ? 'Reset Password' : 'Account Recovery'}
//             </Typography>
// 
//             {!token && (
//                 <>
//                     <TextField
//                         fullWidth
//                         margin="normal"
//                         label="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <Button variant="contained" fullWidth onClick={handleEmailSubmit} disabled={loading}>
//                         {loading ? 'Sending...' : 'Send Recovery Email'}
//                     </Button>
//                 </>
//             )}
// 
//             {token && !tokenValid && (
//                 <Button variant="contained" fullWidth onClick={handleTokenValidation} disabled={loading}>
//                     {loading ? 'Validating...' : 'Validate Token'}
//                 </Button>
//             )}
// 
//             {token && tokenValid && (
//                 <>
//                     <TextField
//                         fullWidth
//                         margin="normal"
//                         label="New Password"
//                         type="password"
//                         value={newPassword}
//                         onChange={(e) => setNewPassword(e.target.value)}
//                         required
//                     />
//                     <Button variant="contained" fullWidth onClick={handlePasswordReset} disabled={loading}>
//                         {loading ? 'Resetting...' : 'Reset Password'}
//                     </Button>
//                 </>
//             )}
//         </Box>
//     );
// };
// 
// export default AccountRecovery;
