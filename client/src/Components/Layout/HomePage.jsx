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
            {/* Header Section in its own box */}
            <Paper
                elevation={3}
                sx={{
                    padding: 3,
                    textAlign: 'center',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    maxWidth: '800px',
                    width: '100%',
                }}
            >
                <Typography 
                    variant="h5" 
                    align="center" 
                    gutterBottom 
                    sx={{ fontWeight: 'bold', color: '#2a9d8f' }}
                >
                    Welcome to FinTrackPro
                </Typography>
                <Typography 
                    variant="h6" 
                    align="center" 
                    gutterBottom 
                    sx={{ color: '#5f6368', maxWidth: '600px', lineHeight: 1.5, margin: '0 auto' }}
                >
                    Explore project and expense data at a glance with insights designed to help you stay on top of your finances.
                </Typography>
            </Paper>

            {/* Charts Section */}
            <Grid 
                container 
                spacing={4} 
                justifyContent="center" 
                alignItems="stretch" 
                sx={{ maxWidth: '1200px' }}
            >
                {/* Project Distribution */}
                <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            padding: 3, 
                            textAlign: 'center', 
                            borderRadius: '8px', 
                            overflow: 'hidden',
                            height: '450px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography 
                            variant="h6" 
                            gutterBottom 
                            sx={{ fontWeight: 'bold', color: '#424242' }}
                        >
                            Project Distribution
                        </Typography>
                        <Box 
                            sx={{ 
                                flexGrow: 1, 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                paddingBottom: 2,
                            }}
                        >
                            <ProjectChart />
                        </Box>
                    </Paper>
                </Grid>

                {/* Expense Breakdown */}
                <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            padding: 3, 
                            textAlign: 'center', 
                            borderRadius: '8px', 
                            overflow: 'hidden',
                            height: '450px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography 
                            variant="h6" 
                            gutterBottom 
                            sx={{ fontWeight: 'bold', color: '#424242' }}
                        >
                            Expense Breakdown
                        </Typography>
                        <Box 
                            sx={{ 
                                flexGrow: 1, 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                paddingBottom: 2,
                            }}
                        >
                            <ExpenseChart />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;








