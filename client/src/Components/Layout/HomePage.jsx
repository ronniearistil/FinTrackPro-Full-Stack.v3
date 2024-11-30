import React from 'react';
import { Box, Typography } from '@mui/material';
import ProjectChart from '../../Charts/ProjectChart.jsx';
import ExpenseChart from '../../Charts/ExpensesChart.jsx';


const HomePage = () => {
    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome to FinTrackPro
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                Explore project and expense data at a glance
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 4 }}>
                <ProjectChart />
                <ExpenseChart />
            </Box>
        </Box>
    );
};

export default HomePage;





