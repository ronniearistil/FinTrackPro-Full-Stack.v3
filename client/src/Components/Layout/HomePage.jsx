import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import ProjectChart from '../../Charts/ProjectChart.jsx';
import ExpenseChart from '../../Charts/ExpensesChart.jsx';

const HomePage = () => {
    return (
        <Box 
            sx={{ 
                padding: 4, 
                backgroundColor: '#f9f9f9', 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: 4 
            }}
        >
            {/* Header Section */}
            <Typography 
                variant="h4" 
                align="center" 
                gutterBottom 
                sx={{ fontWeight: 'bold', color: '#1a5a96' }} // Updated color for better contrast
            >
                Welcome to FinTrackPro
            </Typography>
            <Typography 
                variant="h6" 
                align="center" 
                gutterBottom 
                sx={{ color: '#5f6368', maxWidth: '600px', lineHeight: 1.5 }}
            >
                Explore project and expense data at a glance with insights designed to help you stay on top of your finances.
            </Typography>

            {/* Charts Section */}
            <Grid 
                container 
                spacing={4} 
                justifyContent="center" 
                alignItems="center" 
                sx={{ maxWidth: '1200px' }}
            >
                {/* Project Distribution */}
                <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={3} 
                        sx={{ padding: 3, textAlign: 'center', borderRadius: '8px', overflow: 'hidden' }}
                    >
                        <Typography 
                            variant="h6" 
                            gutterBottom 
                            sx={{ fontWeight: 'bold', color: '#424242' }}
                        >

                        </Typography>
                        <ProjectChart />
                    </Paper>
                </Grid>

                {/* Expense Breakdown */}
                <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={3} 
                        sx={{ padding: 3, textAlign: 'center', borderRadius: '8px', overflow: 'hidden' }}
                    >
                        <Typography 
                            variant="h6" 
                            gutterBottom 
                            sx={{ fontWeight: 'bold', color: '#424242' }}
                        >
                        </Typography>
                        <ExpenseChart />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;






