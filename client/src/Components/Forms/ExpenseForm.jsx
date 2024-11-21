import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import {
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { ProjectContext } from '../../ProjectContext';
import InputField from './InputField';

const ExpenseForm = () => {
    const { addExpense, projects } = useContext(ProjectContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: '',
            project_id: '',
            category: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Must be at least 3 characters')
                .required('Required'),
            amount: Yup.number()
                .positive('Must be greater than zero')
                .required('Required'),
            project_id: Yup.string().required('Project is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await addExpense(values);
                toast.success('Expense added successfully!');
                resetForm();
            } catch (error) {
                toast.error('Failed to add expense. Please try again.');
            }
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
            <InputField formik={formik} name="name" label="Expense Name" />
            <InputField formik={formik} name="amount" label="Amount" type="number" />
            <InputField formik={formik} name="category" label="Category" />
            <FormControl fullWidth margin="normal">
                <InputLabel id="project-select-label">Select Project</InputLabel>
                <Select
                    labelId="project-select-label"
                    name="project_id"
                    value={formik.values.project_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.project_id && Boolean(formik.errors.project_id)}
                >
                    <MenuItem value="">
                        <em>Select Project</em>
                    </MenuItem>
                    {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                            {project.name}
                        </MenuItem>
                    ))}
                </Select>
                {formik.touched.project_id && formik.errors.project_id && (
                    <div style={{ color: 'red' }}>{formik.errors.project_id}</div>
                )}
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Add Expense
            </Button>
        </Box>
    );
};

export default ExpenseForm;

