// import React, { useState } from 'react';
// import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// 
// const SignupForm = ({ onSignUpSuccess }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
// 
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// 
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
// 
//     const toggleShowPassword = () => setShowPassword(!showPassword);
//     const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
// 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
// 
//         if (formData.password !== formData.confirmPassword) {
//             toast.error('Passwords do not match.');
//             return;
//         }
// 
//         try {
//             const response = await axios.post('http://localhost:5555/users', {
//                 name: formData.name,
//                 email: formData.email,
//                 password: formData.password,
//             });
//             toast.success('Sign up successful!');
//             onSignUpSuccess(response.data);
//         } catch (err) {
//             console.error('Error signing up:', err);
//             toast.error(err.response?.data?.error || 'Error signing up. Please try again.');
//         }
//     };
// 
//     return (
//         <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Sign Up
//             </Typography>
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//             />
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//             />
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.password}
//                 onChange={handleChange}
//                 InputProps={{
//                     endAdornment: (
//                         <InputAdornment position="end">
//                             <IconButton onClick={toggleShowPassword}>
//                                 {showPassword ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                         </InputAdornment>
//                     ),
//                 }}
//                 required
//             />
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 InputProps={{
//                     endAdornment: (
//                         <InputAdornment position="end">
//                             <IconButton onClick={toggleShowConfirmPassword}>
//                                 {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                             </IconButton>
//                         </InputAdornment>
//                     ),
//                 }}
//                 required
//             />
//             <Button type="submit" variant="contained" sx={{ mt: 2 }}>
//                 Sign Up
//             </Button>
//         </Box>
//     );
// };
// 
// export default SignupForm;