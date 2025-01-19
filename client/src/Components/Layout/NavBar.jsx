import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Menu,
    MenuItem,
    TextField,
    Select,
    FormControl,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { AccountCircle } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search'; // Fix: Importing SearchIcon correctly
import { useNavigate } from 'react-router-dom';

const NavBar = ({
    onSearch,
    onStatusFilter,
    onSort,
    onSignOut,
    onLogin,
    onSignUp,
    isAuthenticated,
    currentUser,
}) => {
    const navigate = useNavigate();

    const [anchorElProjects, setAnchorElProjects] = useState(null);
    const [anchorElExpenses, setAnchorElExpenses] = useState(null);
    const [anchorElProfile, setAnchorElProfile] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [status, setStatus] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
    const handleMenuClose = (setter) => () => setter(null);
    const toggleDrawer = (open) => () => setDrawerOpen(open);

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
        <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Mobile Drawer */}
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={toggleDrawer(true)}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                        <List>
                            <ListItem button onClick={() => navigate('/about')}>
                                <ListItemText primary="About" />
                            </ListItem>
                            <ListItem button onClick={handleMenuOpen(setAnchorElProjects)}>
                                <ListItemText primary="Projects" />
                                {Boolean(anchorElProjects) ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={Boolean(anchorElProjects)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button onClick={() => navigate('/projects')}>
                                        <ListItemText primary="View All Projects" />
                                    </ListItem>
                                    <ListItem button onClick={() => navigate('/projects/new')}>
                                        <ListItemText primary="Add Project" />
                                    </ListItem>
                                </List>
                            </Collapse>
                            <ListItem button onClick={handleMenuOpen(setAnchorElExpenses)}>
                                <ListItemText primary="Expenses" />
                                {Boolean(anchorElExpenses) ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={Boolean(anchorElExpenses)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button onClick={() => navigate('/expenses')}>
                                        <ListItemText primary="View All Expenses" />
                                    </ListItem>
                                    <ListItem button onClick={() => navigate('/expenses/new')}>
                                        <ListItemText primary="Add Expense" />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </List>
                    </Box>
                </Drawer>

                {/* Desktop Navigation */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
                    <Button
                        onClick={() => navigate('/about')}
                        sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}
                    >
                        About
                    </Button>
                    <Button
                        onClick={handleMenuOpen(setAnchorElProjects)}
                        sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}
                    >
                        Projects
                    </Button>
                    <Menu
                        anchorEl={anchorElProjects}
                        open={Boolean(anchorElProjects)}
                        onClose={handleMenuClose(setAnchorElProjects)}
                    >
                        <MenuItem onClick={() => navigate('/projects')}>View All Projects</MenuItem>
                        <MenuItem onClick={() => navigate('/projects/new')}>Add Project</MenuItem>
                    </Menu>
                    <Button
                        onClick={handleMenuOpen(setAnchorElExpenses)}
                        sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}
                    >
                        Expenses
                    </Button>
                    <Menu
                        anchorEl={anchorElExpenses}
                        open={Boolean(anchorElExpenses)}
                        onClose={handleMenuClose(setAnchorElExpenses)}
                    >
                        <MenuItem onClick={() => navigate('/expenses')}>View All Expenses</MenuItem>
                        <MenuItem onClick={() => navigate('/expenses/new')}>Add Expense</MenuItem>
                    </Menu>
                </Box>

                {/* Search, Filter, and Sort */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            width: { xs: '150px', sm: '300px' },
                        }}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                    />
                    <FormControl sx={{ minWidth: 150 }}>
                        <Select
                            displayEmpty
                            value={status}
                            onChange={handleStatusChange}
                            sx={{ fontSize: '1rem', bgcolor: 'white', borderRadius: 1 }}
                        >
                            <MenuItem value="">
                                <em>Filter by status</em>
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
                            sx={{ fontSize: '1rem', bgcolor: 'white', borderRadius: 1 }}
                        >
                            <MenuItem value="">
                                <em>Sort by</em>
                            </MenuItem>
                            <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
                            <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
                            <MenuItem value="profitHigh">Profit (High to Low)</MenuItem>
                            <MenuItem value="profitLow">Profit (Low to High)</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* User Profile */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton onClick={handleMenuOpen(setAnchorElProfile)}>
                        <AccountCircle fontSize="large" sx={{ color: 'white' }} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElProfile}
                        open={Boolean(anchorElProfile)}
                        onClose={handleMenuClose(setAnchorElProfile)}
                    >
                        <MenuItem>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {isAuthenticated
                                    ? `Welcome Back, ${currentUser?.name || 'User'}!`
                                    : 'Welcome, Please Login'}
                            </Typography>
                        </MenuItem>
                        {!isAuthenticated && (
                            <>
                                <MenuItem onClick={onSignUp}>Sign Up</MenuItem>
                                <MenuItem onClick={onLogin}>Sign In</MenuItem>
                            </>
                        )}
                        {isAuthenticated && (
                            <>
                                <MenuItem onClick={() => navigate('/account')}>
                                    Account Settings
                                </MenuItem>
                                <MenuItem onClick={onSignOut}>Logout</MenuItem>
                            </>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;








