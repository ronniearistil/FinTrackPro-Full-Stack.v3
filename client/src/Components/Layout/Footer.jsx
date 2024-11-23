// src/Components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Footer = () => (
    <footer className="footer">
        <p>&copy; 2024 FinTrackFlow - All Rights Reserved</p>
        <p>Powered by FinTrackFlow, A Seamless Project Forecasting, Budgeting, and Expense Management Hub.</p>
        <div className="footer-links">
            <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                About Us
            </Link>
            <a
                href="https://www.linkedin.com/in/aristil-mba-pmp/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Connect on LinkedIn
            </a>
            <a href="mailto:contact@fintrackpro.com">Email Us</a>
            <agit
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
            >
                Follow us on Twittergit@github.com:ronniearistil/FinTrackPro_Ph4_Full_Stack.git
            </a>
        </div>
    </footer>
);

export default Footer;
