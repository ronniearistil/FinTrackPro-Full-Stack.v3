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
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().required('Name is required'),
//             email: Yup.string()
//                 .email('Invalid email address')
//                 .required('Email is required'),
//             password: Yup.string()
//                 .min(8, 'Password must be at least 8 characters long')
//                 .required('Password is required'),
//         }),
//         onSubmit: async (values, { setSubmitting }) => {
//             try {
//                 const response = await axios.post('http://127.0.0.1:5555/users', values);
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




