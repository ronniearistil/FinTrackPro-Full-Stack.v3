// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// 
// const SignupForm = ({ onSignUpSuccess }) => {
//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().required('Name is required'),
//             email: Yup.string()
//                 .email('Invalid email address')
//                 .required('Email is required'),
//             password: Yup.string()
//                 .min(6, 'Password must be at least 6 characters')
//                 .required('Password is required'),
//             confirmPassword: Yup.string()
//                 .oneOf([Yup.ref('password'), null], 'Passwords must match')
//                 .required('Confirm password is required'),
//         }),
//         onSubmit: async (values, { setSubmitting }) => {
//             const { confirmPassword, ...payload } = values; // Exclude confirmPassword
//             try {
//                 const response = await axios.post('http://localhost:5555/users', payload);
//                 toast.success('Signup successful!');
//                 onSignUpSuccess(response.data);
//             } catch (err) {
//                 const errorMessage =
//                     err.response?.data?.error || 'An error occurred. Please try again.';
//                 toast.error(errorMessage);
//             } finally {
//                 setSubmitting(false);
//             }
//         },
//     });
// 
//     return (
//         <Box
//             component="form"
//             onSubmit={formik.handleSubmit}
//             sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}
//         >
//             <Typography variant="h4" gutterBottom>
//                 Sign Up
//             </Typography>
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Name"
//                 name="name"
//                 value={formik.values.name}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.name && Boolean(formik.errors.name)}
//                 helperText={formik.touched.name && formik.errors.name}
//                 required
//             />
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.email && Boolean(formik.errors.email)}
//                 helperText={formik.touched.email && formik.errors.email}
//                 required
//             />
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Password"
//                 name="password"
//                 type="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.password && Boolean(formik.errors.password)}
//                 helperText={formik.touched.password && formik.errors.password}
//                 required
//             />
//             <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type="password"
//                 value={formik.values.confirmPassword}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
//                 helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
//                 required
//             />
//             <Button
//                 type="submit"
//                 variant="contained"
//                 sx={{ mt: 2 }}
//                 disabled={formik.isSubmitting}
//             >
//                 Sign Up
//             </Button>
//         </Box>
//     );
// };
// 
// export default SignupForm;



// ||

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5555';

const SignupForm = ({ onSignUpSuccess }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            const { confirmPassword, ...payload } = values; // Exclude confirmPassword
            try {
                const response = await axios.post(`${API_URL}/users`, payload);
                toast.success('Signup successful!');
                onSignUpSuccess(response.data); // Trigger callback with the user data
            } catch (err) {
                console.error('Error during signup:', err);
                const errorMessage =
                    err.response?.data?.error || 'An error occurred. Please try again.';
                toast.error(errorMessage);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}
        >
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>
            <TextField
                fullWidth
                margin="normal"
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                required
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2 }}
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
        </Box>
    );
};

export default SignupForm;
