import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Footer = () => (
    <footer className="footer">
        <p>&copy; 2024 FinTrackFlow - All Rights Reserved</p>
        <p>Powered by FinTrackFlow, A Seamless Project Forecasting, Budgeting, and Expense Management Hub.</p>
        <div className="footer-links">
            {/* About Us Link */}
            <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
                About Us
            </Link>

            {/* LinkedIn Profile Link */}
            <a
                href="https://www.linkedin.com/in/aristil-mba-pmp/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Connect on LinkedIn
            </a>

            {/* Email Contact */}
            <a href="mailto:contact@fintrackpro.com">Email Us</a>

            {/* Twitter Profile */}
            <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
            >
                Follow us on Twitter
            </a>

            {/* GitHub Project Link */}
            <a
                href="https://github.com/ronniearistil/FinTrackPro_Ph4_Full_Stack"
                target="_blank"
                rel="noopener noreferrer"
            >
                Check out our GitHub Projects
            </a>
        </div>
    </footer>
);

export default Footer;
