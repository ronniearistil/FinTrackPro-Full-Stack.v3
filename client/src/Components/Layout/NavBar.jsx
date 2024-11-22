import React, { useState } from 'react';
import { AppBar, Toolbar, Box, IconButton, Menu, MenuItem, Typography, InputBase, Select, FormControl } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import NavLink from './NavLink';

const NavBar = ({ onSearch, onStatusFilter, onSort, onSignOut, onLogin, onSignUp }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [sortOption, setSortOption] = useState('');

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setStatus(value);
        onStatusFilter(value);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortOption(value);
        onSort(value);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: '#2a9d8f', mb: 2 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                {/* Navigation Links */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/projects/new">Add Project</NavLink>
                    <NavLink to="/expenses">Expenses</NavLink>
                    <NavLink to="/expenses/new">Add Expense</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                </Box>

                {/* Search, Filter, and Sort */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flexGrow: 1,
                        justifyContent: 'center',
                    }}
                >
                    <InputBase
                        placeholder="Search by name or ID..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{
                            bgcolor: 'white',
                            borderRadius: 1,
                            px: 1,
                            width: '450px',
                            border: '2px solid #1bc0ad',
                            '&:focus': { borderColor: '#188f87' },
                        }}
                    />

                    <FormControl sx={{ minWidth: 150 }}>
                        <Select
                            displayEmpty
                            value={status}
                            onChange={handleStatusChange}
                            sx={{ bgcolor: 'white', borderRadius: 1 }}
                        >
                            <MenuItem value="">
                                <em>Filter projects by status</em>
                            </MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="At Risk">At Risk</MenuItem>
                            <MenuItem value="All">All</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 150 }}>
                        <Select
                            displayEmpty
                            value={sortOption}
                            onChange={handleSortChange}
                            sx={{ bgcolor: 'white', borderRadius: 1 }}
                        >
                            <MenuItem value="">
                                <em>Sort projects by</em>
                            </MenuItem>
                            <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
                            <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
                            <MenuItem value="profitHigh">Profit (High to Low)</MenuItem>
                            <MenuItem value="profitLow">Profit (Low to High)</MenuItem>
                            <MenuItem value="costHigh">Cost (High to Low)</MenuItem>
                            <MenuItem value="costLow">Cost (Low to High)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* User Account Menu */}
                <Box>
                    <IconButton onClick={handleMenuOpen}>
                        <AccountCircle fontSize="large" sx={{ color: 'white' }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={onSignUp}>Sign Up</MenuItem>
                        <MenuItem onClick={onLogin}>Sign In</MenuItem>
                        <MenuItem onClick={onSignOut}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;



