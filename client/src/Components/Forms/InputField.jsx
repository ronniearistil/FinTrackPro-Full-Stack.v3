import React from 'react';
import { TextField } from '@mui/material';

const InputField = ({ formik, name, label, type = 'text' }) => (
    <TextField
        label={label}
        name={name}
        type={type}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        fullWidth
        margin="normal"
    />
);

export default InputField;