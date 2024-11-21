import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Button, Box } from '@mui/material';
import InputField from './InputField';
import axios from 'axios';

const UserSignUpForm = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Must be at least 3 characters')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.post('http://localhost:5555/users', values);
                toast.success('User signed up successfully!');
                resetForm();
            } catch (error) {
                toast.error('Failed to sign up. Please try again.');
            }
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
            <InputField formik={formik} name="name" label="Full Name" />
            <InputField formik={formik} name="email" label="Email" type="email" />
            <InputField formik={formik} name="password" label="Password" type="password" />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Sign Up
            </Button>
        </Box>
    );
};

export default UserSignUpForm;
