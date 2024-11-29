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
  FormHelperText,
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
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(1, 'Must be at least 1 character')
        .required('Required'),
      amount: Yup.number()
        .positive('Must be greater than zero')
        .required('Required'),
      project_id: Yup.string().required('Project is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const formattedValues = { ...values, project_id: Number(values.project_id) };
        await addExpense(formattedValues);
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
      <FormControl
        fullWidth
        margin="normal"
        error={formik.touched.project_id && Boolean(formik.errors.project_id)}
      >
        <InputLabel id="project-select-label">Select Project</InputLabel>
        <Select
          labelId="project-select-label"
          name="project_id"
          value={formik.values.project_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
        <FormHelperText>{formik.touched.project_id && formik.errors.project_id}</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Add Expense
      </Button>
    </Box>
  );
};

export default ExpenseForm;


