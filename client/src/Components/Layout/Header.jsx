// src/Components/Header.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for routing

const Header = () => (
  <Box
    sx={{
      textAlign: 'center',
      mt: 3, // Add margin at the top
      mb: 3, // Add margin at the bottom for spacing
    }}
  >
    <Link to="/" style={{ textDecoration: 'none' }}> {/* Ensure the header redirects to the homepage */}
      <Typography
        variant="h1"
        sx={{
          fontSize: '6.5rem',
          fontWeight: 'bold', // Bold text
          color: '#2a9d8f', // Optional color matching the theme
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow
          cursor: 'pointer', // Change cursor to pointer
        }}
      >
        FinTrackPro
      </Typography>
    </Link>
  </Box>
);

export default Header;
