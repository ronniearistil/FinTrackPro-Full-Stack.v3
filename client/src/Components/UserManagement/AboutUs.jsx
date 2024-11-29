import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ padding: '2rem 0', textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                About Us
            </Typography>
            <Typography variant="body1" paragraph>
                At FinTrackPro, we specialize in building seamless project forecasting, budgeting,
                and expense management solutions. Our mission is to help professionals and businesses
                streamline financial management with easy-to-use tools that promote data-driven decisions.
            </Typography>
            <Typography variant="h4" sx={{ marginTop: '2rem', fontWeight: 'bold' }}>
                Meet Our Developer
            </Typography>
            <Typography variant="body1" paragraph>
            The developer behind FinTrackPro is a results-driven software engineer with expertise
            in Python, Flask, React, JavaScript, SQL, and RESTful APIs. With proven in
            program management, finance, and accounting—complemented by an MBA and PMP certification—
            they bring a unique ability to align scalable web applications with business objectives.
            </Typography>
            <Typography variant="body1" paragraph>
            His engineering approach emphasizes collaboration with cross-functional teams in agile
            environments to streamline workflows and deliver impactful results. Combining technical
            expertise with business acumen, he focuses on developing solutions that drive efficiency,
            enhance user experience, and achieve measurable outcomes for clients and organizations.
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
