import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ProjectContext } from '../../ProjectContext';
import InputField from './InputField';

const ExpenseForm = () => {
    const { addExpense, projects } = useContext(ProjectContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: '',
            projectId: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3, 'Must be at least 3 characters').required('Required'),
            amount: Yup.number().positive('Must be greater than zero').required('Required'),
            projectId: Yup.string().required('Project is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await addExpense({ ...values, id: Date.now().toString() });
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
            <FormControl fullWidth margin="normal">
                <InputLabel id="project-select-label">Project</InputLabel>
                <Select
                    labelId="project-select-label"
                    name="projectId"
                    value={formik.values.projectId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.projectId && Boolean(formik.errors.projectId)}
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
                {formik.touched.projectId && formik.errors.projectId && (
                    <div style={{ color: 'red' }}>{formik.errors.projectId}</div>
                )}
            </FormControl>
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Add Expense
            </Button>
        </Box>
    );
};

export default ExpenseForm;
