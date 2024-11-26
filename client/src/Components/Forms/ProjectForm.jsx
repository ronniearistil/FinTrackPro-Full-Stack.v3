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
    TextField,
} from '@mui/material';
import { ProjectContext } from '../../ProjectContext';

const ProjectForm = () => {
    const { addProject, users } = useContext(ProjectContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            budgeted_cost: '',
            start_date: '',
            end_date: '',
            user_id: '',
            status: 'In Progress',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Project name must be at least 3 characters')
                .required('Project name is required'),
            budgeted_cost: Yup.number()
                .positive('Budgeted cost must be greater than zero')
                .required('Budgeted cost is required'),
            start_date: Yup.date().required('Start date is required'),
            end_date: Yup.date(),
            user_id: Yup.string().required('Project owner is required'),
            status: Yup.string().required('Project status is required'),
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
            <TextField
                label="Project Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Budgeted Cost"
                name="budgeted_cost"
                type="number"
                value={formik.values.budgeted_cost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.budgeted_cost && Boolean(formik.errors.budgeted_cost)}
                helperText={formik.touched.budgeted_cost && formik.errors.budgeted_cost}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Start Date"
                name="start_date"
                type="date"
                value={formik.values.start_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                helperText={formik.touched.start_date && formik.errors.start_date}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="End Date"
                name="end_date"
                type="date"
                value={formik.values.end_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                helperText={formik.touched.end_date && formik.errors.end_date}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="user-select-label">Project Owner</InputLabel>
                <Select
                    labelId="user-select-label"
                    name="user_id"
                    value={formik.values.user_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.user_id && Boolean(formik.errors.user_id)}
                >
                    <MenuItem value="">
                        <em>Select Owner</em>
                    </MenuItem>
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.name}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No users available</MenuItem>
                    )}
                </Select>
                {formik.touched.user_id && formik.errors.user_id && (
                    <div style={{ color: 'red', marginTop: '8px' }}>
                        {formik.errors.user_id}
                    </div>
                )}
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                    labelId="status-select-label"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                >
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="At Risk">At Risk</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                    <div style={{ color: 'red', marginTop: '8px' }}>
                        {formik.errors.status}
                    </div>
                )}
            </FormControl>
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Add Project
            </Button>
        </Box>
    );
};

export default ProjectForm;
