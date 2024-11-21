// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#188f87', // Main green color for primary actions
            contrastText: '#fff', // White text on primary buttons
        },
        secondary: {
            main: '#1bc0ad', // Lighter green for hover and accents
        },
        background: {
            default: '#f0f4f8', // Background color for the app
            paper: '#ffffff', // Card and form background
        },
        text: {
            primary: '#333', // Default text color
            secondary: '#555', // Secondary text color
        },
        action: {
            hover: '#21867a', // Hover color for buttons and links
        },
    },
    typography: {
        fontFamily: "'Roboto', Arial, sans-serif",
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            letterSpacing: '1.5px',
        },
        h2: {
            fontSize: '1.8rem',
            fontWeight: 'bolder',
            color: '#188f87',
            textAlign: 'center',
        },
        button: {
            textTransform: 'none', // Prevent uppercase on buttons
            fontWeight: 'bold', // Bold button text
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '5px',
                    padding: '10px 15px',
                },
            },
        },
    },
});

export default theme;