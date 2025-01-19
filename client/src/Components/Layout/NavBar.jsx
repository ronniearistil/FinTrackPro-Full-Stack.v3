import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
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
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { AccountCircle } from '@mui/icons-material';
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
  const isMobile = useMediaQuery('(max-width:600px)');

  const [anchorElProjects, setAnchorElProjects] = useState(null);
  const [anchorElExpenses, setAnchorElExpenses] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [userName, setUserName] = useState('Welcome, Guest');

  const handleMenuOpen = (setter) => (event) => setter(event.currentTarget);
  const handleMenuClose = (setter) => () => setter(null);

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

  useEffect(() => {
    setUserName(
      isAuthenticated ? `Welcome Back, ${currentUser?.name || 'User'}!` : 'Welcome, Please Login'
    );
  }, [isAuthenticated, currentUser]);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const drawerContent = (
    <List>
      <ListItem button onClick={() => navigate('/about')}>
        <ListItemText primary="About" />
      </ListItem>
      <ListItem button onClick={() => navigate('/projects')}>
        <ListItemText primary="View All Projects" />
      </ListItem>
      <ListItem button onClick={() => navigate('/projects/new')}>
        <ListItemText primary="Add Project" />
      </ListItem>
      <ListItem button onClick={() => navigate('/expenses')}>
        <ListItemText primary="View All Expenses" />
      </ListItem>
      <ListItem button onClick={() => navigate('/expenses/new')}>
        <ListItemText primary="Add Expense" />
      </ListItem>
      <ListItem button onClick={() => navigate('/account')}>
        <ListItemText primary="Account Settings" />
      </ListItem>
      <ListItem button onClick={onSignOut}>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isMobile ? (
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button onClick={() => navigate('/about')} sx={{ color: 'white', fontWeight: 'bold' }}>
              About
            </Button>
            <Button
              onClick={handleMenuOpen(setAnchorElProjects)}
              sx={{ color: 'white', fontWeight: 'bold' }}
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
              sx={{ color: 'white', fontWeight: 'bold' }}
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
        )}
        {!isMobile && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                backgroundColor: 'white',
                borderRadius: '4px',
                width: '300px',
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
                sx={{ bgcolor: 'white', borderRadius: 1 }}
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
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
            {userName}
          </Typography>
          <IconButton onClick={(e) => setAnchorElProfile(e.currentTarget)}>
            <AccountCircle sx={{ color: 'white' }} />
          </IconButton>
          <Menu
            anchorEl={anchorElProfile}
            open={Boolean(anchorElProfile)}
            onClose={() => setAnchorElProfile(null)}
          >
            {!isAuthenticated && (
              <>
                <MenuItem onClick={onSignUp}>Sign Up</MenuItem>
                <MenuItem onClick={onLogin}>Sign In</MenuItem>
              </>
            )}
            {isAuthenticated && (
              <>
                <MenuItem onClick={() => navigate('/account')}>Account Settings</MenuItem>
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






