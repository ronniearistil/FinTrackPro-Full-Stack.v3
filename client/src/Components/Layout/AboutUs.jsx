import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ padding: '2rem 0', textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                About FinTrackPro
            </Typography>
            <Typography variant="h5" paragraph>
                FinTrackPro is a real-time, interactive platform designed to transform how businesses manage 
                project budgets, forecast expenses, and analyze profitability. It goes beyond basic tracking by 
                offering advanced analytics, goal-setting tools, and data-driven insights, empowering users to make 
                strategic financial decisions.
            </Typography>
            
            <Typography variant="h2" sx={{ marginTop: '2rem', fontWeight: 'bold' }}>
                For Businesses
            </Typography>
            <Typography variant="h6" paragraph>
                - Forecast project budgets with precision.
                - Track expenses and monitor cash flow in real time.
                - Analyze profitability and generate reports.
                - Set financial goals and monitor progress.
                - Collaborate with teams through shared dashboards.
                - Access insights for data-driven decision-making.
            </Typography>

            <Typography variant="h2" sx={{ marginTop: '2rem', fontWeight: 'bold' }}>
                About the Developer
            </Typography>
            <Typography variant="h6" paragraph>
                Ronnie Aristil is a software engineer with expertise in JavaScript, React, Python, Flask, SQL, and PostgreSQL.
                He specializes in building scalable web applications and APIs, leveraging SQLAlchemy for efficient database 
                modeling and data management. With a PMP certification and an MBA in Finance, he combines technical expertise 
                with business acumen to build software solutions that streamline workflows, improve performance, and drive 
                impact across diverse industries.
            </Typography>
            
            <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: '2rem' }}
                onClick={() => navigate('/')}
            >
                Back to Home
            </Button>
        </Container>
    );
};

export default AboutUs;



