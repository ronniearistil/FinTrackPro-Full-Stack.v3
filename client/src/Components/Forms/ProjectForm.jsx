import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import { ProjectContext } from "../../ProjectContext";

const ProjectForm = ({ projectToEdit, onClose }) => {
    const { addProject, editProject, users } = useContext(ProjectContext);
    const isEditing = Boolean(projectToEdit);

    const formik = useFormik({
        initialValues: {
            name: projectToEdit?.name || "",
            budgeted_cost: projectToEdit?.budgeted_cost || "",
            start_date: projectToEdit?.start_date || "",
            end_date: projectToEdit?.end_date || "",
            user_id: projectToEdit?.user_id || "",
            status: projectToEdit?.status || "In Progress",
            progress_percentage: projectToEdit?.progress_percentage || 0,
            category: projectToEdit?.category || "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Project name is required"),
            budgeted_cost: Yup.number()
                .positive("Budgeted cost must be a positive number")
                .required("Budgeted cost is required"),
            start_date: Yup.date().required("Start date is required"),
            end_date: Yup.date().nullable(),
            user_id: Yup.number()
                .integer("Project owner must be selected")
                .required("Project owner is required"),
            status: Yup.string().required("Project status is required"),
            progress_percentage: Yup.number()
                .min(0, "Progress cannot be negative")
                .max(100, "Progress cannot exceed 100")
                .required("Progress percentage is required"),
            category: Yup.string().required("Category is required"),
        }),
        onSubmit: async (values) => {
            try {
                if (isEditing) {
                    await editProject({ ...values, id: projectToEdit.id });
                    toast.success("Project updated successfully!");
                } else {
                    await addProject(values);
                    toast.success("Project added successfully!");
                }
                if (onClose) onClose();
            } catch (error) {
                toast.error(
                    `Failed to ${isEditing ? "update" : "add"} project. Please try again.`
                );
            }
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: "auto" }}>
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
                InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
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
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))}
                </Select>
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
            </FormControl>
            <TextField
                label="Progress Percentage"
                name="progress_percentage"
                type="number"
                value={formik.values.progress_percentage}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.progress_percentage && Boolean(formik.errors.progress_percentage)}
                helperText={formik.touched.progress_percentage && formik.errors.progress_percentage}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                {isEditing ? "Update Project" : "Add Project"}
            </Button>
        </Box>
    );
};

export default ProjectForm;

