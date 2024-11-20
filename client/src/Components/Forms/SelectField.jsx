// components/SelectField.jsx
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

const SelectField = ({ formik, name, label, options }) => (
    <FormControl
        fullWidth
        margin="normal"
        error={formik.touched[name] && Boolean(formik.errors[name])}
    >
        <InputLabel>{label}</InputLabel>
        <Select
            name={name}
            value={formik.values[name]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        >
            <MenuItem value="">
                <em>Select {label}</em>
            </MenuItem>
            {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.name}
                </MenuItem>
            ))}
        </Select>
        {formik.touched[name] && formik.errors[name] && (
            <Typography sx={{ color: 'red', mt: 1 }}>{formik.errors[name]}</Typography>
        )}
    </FormControl>
);

export default SelectField;