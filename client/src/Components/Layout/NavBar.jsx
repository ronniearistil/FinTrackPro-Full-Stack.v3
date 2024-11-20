import React, { useState } from 'react';
import { AppBar, Toolbar, InputBase, Box, MenuItem, Select, FormControl } from '@mui/material';
import NavLink from './NavLink';

const NavBar = ({ onSearch, onStatusFilter, onSort }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [sortOption, setSortOption] = useState('');

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
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/projects/new">Add Project</NavLink>
                    <NavLink to="/expenses">Expenses</NavLink>
                    <NavLink to="/expenses/new">Add Expense</NavLink>
                    <NavLink to="/users">Users</NavLink>
                </Box>

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
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;


