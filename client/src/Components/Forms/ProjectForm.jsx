import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Button, Box } from '@mui/material';
import { ProjectContext } from '../../ProjectContext';
import InputField from './InputField';

const ProjectForm = () => {
    const { addProject } = useContext(ProjectContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            profit: '',
            cost: '',
            status: 'New',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
            profit: Yup.number().positive('Must be greater than zero').required('Required'),
            cost: Yup.number().positive('Must be greater than zero').required('Required'),
            status: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await addProject(values);
                toast.success('Project added successfully!');
                resetForm();
            } catch (error) {
                toast.error('Failed to add project. Please try again.');
            }
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <InputField formik={formik} name="name" label="Project Name" />
            <InputField formik={formik} name="profit" label="Profit" type="number" />
            <InputField formik={formik} name="cost" label="Cost" type="number" />
            <InputField formik={formik} name="status" label="Status" />
            <Button type="submit" variant="contained">
                Add Project
            </Button>
        </Box>
    );
};

export default ProjectForm;