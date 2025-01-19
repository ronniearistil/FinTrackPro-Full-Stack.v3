import React from 'react';
import { Typography, Container, Button, Box, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <Container
            maxWidth="md"
            sx={{
                padding: '2rem 1rem',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* About FinTrackPro Section in a Box */}
            <Paper
                elevation={3}
                sx={{
                    padding: '2rem',
                    textAlign: 'center',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    marginBottom: '2rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: '#2a9d8f',
                        fontSize: '2.5rem',
                    }}
                >
                    At a Glance
                </Typography>
                <Typography
                    variant="h6"
                    paragraph
                    sx={{
                        lineHeight: 1.8,
                        color: '#5f6368',
                        textAlign: 'left',
                        fontSize: '1.25rem',
                    }}
                >
                    FinTrackPro is a real-time, interactive platform designed to transform how businesses manage project
                    budgets, forecast expenses, and analyze profitability. It goes beyond basic tracking by offering
                    advanced analytics, goal-setting tools, and data-driven insights, empowering users to make strategic
                    financial decisions.
                </Typography>
            </Paper>

            {/* For Businesses Section */}
            <Box
                sx={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: '#2a9d8f',
                        fontSize: '2rem',
                    }}
                >
                    For Businesses
                </Typography>
                <List>
                    {[
                        'Forecast project budgets with precision.',
                        'Track expenses and monitor cash flow in real time.',
                        'Analyze profitability and generate reports.',
                        'Set financial goals and monitor progress.',
                        'Collaborate with teams through shared dashboards.',
                        'Access insights for data-driven decision-making.',
                    ].map((text, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <CheckCircleIcon sx={{ color: '#2a9d8f', fontSize: '1.5rem' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                                primaryTypographyProps={{
                                    fontSize: '1.2rem',
                                    color: '#5f6368',
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* About the Developer Section */}
            <Box
                sx={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: '#2a9d8f',
                        fontSize: '2rem',
                    }}
                >
                    About the Developer
                </Typography>
                <Typography
                    variant="body1"
                    paragraph
                    sx={{
                        lineHeight: 1.8,
                        color: '#5f6368',
                        textAlign: 'left',
                        fontSize: '1.25rem',
                    }}
                >
                    Ronnie Aristil is a software engineer with expertise in JavaScript, React, Python, Flask, SQL, and
                    PostgreSQL. He specializes in building scalable web applications and APIs, leveraging SQLAlchemy for
                    efficient database modeling and data management. With a PMP certification and an MBA in Finance, he
                    combines technical expertise with business acumen to build software solutions that streamline workflows,
                    improve performance, and drive impact across diverse industries.
                </Typography>
            </Box>

            <Button
                variant="contained"
                color="primary"
                sx={{
                    marginTop: '2rem',
                    backgroundColor: '#2a9d8f',
                    '&:hover': {
                        backgroundColor: '#21867a',
                    },
                    fontSize: '1.2rem',
                    padding: '0.75rem 1.5rem',
                }}
                onClick={() => navigate('/')}
            >
                Back to Home
            </Button>
        </Container>
    );
};

export default AboutUs;






