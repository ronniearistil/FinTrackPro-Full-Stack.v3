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
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProjects } from '../../ProjectContext';

const ProjectCard = ({ project }) => {
  const { editProject, archiveProject } = useProjects();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [updatedProject, setUpdatedProject] = useState(project);

  // **Added: State for showing/hiding Project ID**
  const [showProjectID, setShowProjectID] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleEditOpen = () => {
    if (project.status !== 'Archived') {
      setEditModalOpen(true);
      handleMenuClose();
    }
  };

  const handleEditClose = () => setEditModalOpen(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prev) => {
      if (name === 'progress_percentage') {
        const clampedValue = Math.min(100, Math.max(0, value)); // Ensure value is between 0 and 100
        return { ...prev, [name]: clampedValue };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleEditSave = async () => {
    try {
      await editProject(updatedProject);
      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleArchiveToggle = async () => {
    await archiveProject(project.id);
    handleMenuClose();
  };

  // **Added: Function to toggle visibility of Project ID**
  const toggleProjectID = () => setShowProjectID((prev) => !prev);

  return (
    <Box
      className="project-card"
      sx={{
        opacity: project.status === 'Archived' ? 0.5 : 1,
        backgroundColor: project.status === 'Archived' ? '#f0f0f0' : 'white',
        padding: 2,
        marginBottom: 2,
        borderRadius: 2,
        boxShadow: 2,
        transition: 'opacity 0.3s ease',
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
        {project.name}
      </Typography>

      <Divider sx={{ marginBottom: 2, borderColor: '#00796b', borderWidth: 1 }} />

      <Typography>Budgeted Cost: ${project.budgeted_cost || 'N/A'}</Typography>
      <Typography>Actual Cost: ${project.actual_cost || 'N/A'}</Typography>
      <Typography>Status: {project.status}</Typography>
      <Typography>Progress: {project.progress_percentage || 0}%</Typography>
      <Typography>Category: {project.category || 'N/A'}</Typography>

      {/* **Added: Button to toggle Project ID visibility** */}
      <Button
        variant="outlined"
        size="small"
        onClick={toggleProjectID}
        sx={{ marginTop: 1 }}
      >
        {showProjectID ? 'Hide Project ID' : 'Show Project ID'}
      </Button>

      {/* **Added: Conditional rendering for Project ID** */}
      {showProjectID && (
        <Typography mt={1}>Project ID: {project.id}</Typography>
      )}

      {/* Menu for Edit and Archive */}
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditOpen} disabled={project.status === 'Archived'}>
          <EditIcon sx={{ marginRight: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleArchiveToggle}>
          <DeleteIcon sx={{ marginRight: 1 }} />
          {project.status === 'Archived' ? 'Unarchive' : 'Archive'}
        </MenuItem>
      </Menu>

      {/* Modal for Editing */}
      <Dialog open={editModalOpen} onClose={handleEditClose}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Edit Project
          </Typography>
          <TextField
            label="Project Name"
            name="name"
            value={updatedProject.name || ''}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Budgeted Cost"
            name="budgeted_cost"
            type="number"
            value={updatedProject.budgeted_cost || ''}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Progress Percentage"
            name="progress_percentage"
            type="number"
            value={updatedProject.progress_percentage || ''}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            helperText="Enter a value between 0 and 100"
          />
          <TextField
            label="Category"
            name="category"
            value={updatedProject.category || ''}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              name="status"
              value={updatedProject.status || ''}
              onChange={handleEditChange}
            >
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="At Risk">At Risk</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={handleEditSave}
            variant="contained"
            color="primary"
            fullWidth
          >
            Save Changes
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ProjectCard;
