import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useProjects } from '../../ProjectContext';

const ExpenseCard = ({ expense }) => {
  const { editExpense, archiveExpense, projects } = useProjects();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [updatedExpense, setUpdatedExpense] = useState({});

  const open = Boolean(anchorEl);

  // Find associated project name
  const associatedProject = projects?.find(
    (project) => project.id === expense.project_id
  )?.name || 'Unknown Project';

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Open the edit modal
  const handleEditOpen = () => {
    if (!expense.archived) {
      setEditModalOpen(true);
      handleMenuClose();
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      await editExpense({ ...updatedExpense, id: expense.id }); // Send updated fields with ID
      setEditModalOpen(false);
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
  };

  // Toggle archive status
  const handleArchiveToggle = async () => {
    await archiveExpense(expense.id);
    handleMenuClose();
  };

  return (
    <Box
      className="expense-card"
      sx={{
        opacity: expense.archived ? 0.5 : 1,
        backgroundColor: expense.archived ? '#f9f9f9' : 'white',
        transition: 'opacity 0.3s ease',
        padding: 2,
        marginBottom: 2,
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          marginBottom: 1,
          textAlign: 'center',
          color: '#00796b',
        }}
      >
        {expense.name}
      </Typography>

      <Divider sx={{ marginBottom: 2, borderColor: '#00796b', borderWidth: 1 }} />

      <Typography>Amount: ${expense.amount}</Typography>
      <Typography>Category: {expense.category || 'N/A'}</Typography>
      <Typography>Project: {associatedProject}</Typography>
      <Typography>Project ID: {expense.project_id}</Typography>

      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditOpen} disabled={expense.archived}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleArchiveToggle}>
          {expense.archived ? 'Unarchive' : 'Archive'}
        </MenuItem>
      </Menu>

      {/* Modal for editing the expense */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Edit Expense</Typography>
          <TextField
            label="Expense Name"
            name="name"
            defaultValue={expense.name}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Amount"
            name="amount"
            type="number"
            defaultValue={expense.amount}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Category"
            name="category"
            defaultValue={expense.category}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button
            onClick={handleEditSave}
            variant="contained"
            color="primary"
            fullWidth
          >
            Save
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ExpenseCard;
