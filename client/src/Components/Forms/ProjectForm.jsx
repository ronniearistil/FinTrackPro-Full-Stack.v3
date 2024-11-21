import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
    Button,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { ProjectContext } from '../../ProjectContext';
import InputField from './InputField';

const ProjectForm = () => {
    const { addProject, users } = useContext(ProjectContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            budgeted_cost: '',
            start_date: '',
            end_date: '',
            category: '',
            user_id: '',
            status: 'New',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Must be at least 3 characters')
                .required('Required'),
            budgeted_cost: Yup.number()
                .positive('Must be greater than zero')
                .required('Required'),
            start_date: Yup.date().required('Start Date is required'),
            end_date: Yup.date(),
            user_id: Yup.string().required('User is required'),
            status: Yup.string().required('Status is required'),
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
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
            <InputField formik={formik} name="name" label="Project Name" />
            <InputField
                formik={formik}
                name="budgeted_cost"
                label="Budgeted Cost"
                type="number"
            />
            <InputField
                formik={formik}
                name="start_date"
                label="Start Date"
                type="date"
            />
            <InputField formik={formik} name="end_date" label="End Date" type="date" />
            <InputField formik={formik} name="category" label="Category" />
            <FormControl fullWidth margin="normal">
                <InputLabel id="user-select-label">Assign User</InputLabel>
                <Select
                    labelId="user-select-label"
                    name="user_id"
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.user_id && Boolean(formik.errors.user_id)}
                >
                    <MenuItem value="">
                        <em>Select User</em>
                    </MenuItem>
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))}
                </Select>
                {formik.touched.user_id && formik.errors.user_id && (
                    <div style={{ color: 'red' }}>{formik.errors.user_id}</div>
                )}
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Add Project
            </Button>
        </Box>
    );
};

export default ProjectForm;
