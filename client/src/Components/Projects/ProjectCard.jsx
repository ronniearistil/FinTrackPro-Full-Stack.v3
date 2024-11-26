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

const ProjectCard = ({ project }) => {
  const { editProject, archiveProject } = useProjects();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showProjectID, setShowProjectID] = useState(false);
  const [updatedProject, setUpdatedProject] = useState(project);

  const open = Boolean(anchorEl);

  // Handle opening and closing of menu
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Toggle the modal for editing
  const handleEditOpen = () => {
    if (project.status !== 'Archived') {
      setEditModalOpen(true);
      handleMenuClose();
    }
  };

  const handleEditChange = (e) =>
    setUpdatedProject({ ...updatedProject, [e.target.name]: e.target.value });

  const handleEditSave = () => {
    editProject(updatedProject);
    setEditModalOpen(false);
  };

  // Archive/unarchive logic
  const handleArchiveToggle = async () => {
    await archiveProject(project.id);
    handleMenuClose();
  };

  const toggleProjectID = () => setShowProjectID((prev) => !prev);

  return (
    <Box
      className="project-card"
      sx={{
        opacity: project.status === 'Archived' ? 0.5 : 1,
        backgroundColor: project.status === 'Archived' ? '#f0f0f0' : 'white',
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
        {project.name}
      </Typography>

      <Divider sx={{ marginBottom: 2, borderColor: '#00796b', borderWidth: 1 }} />

      {/* Display key project details */}
      <Typography>Budgeted Cost: ${project.budgeted_cost || 'N/A'}</Typography>
      <Typography>Actual Cost: ${project.actual_cost || 'N/A'}</Typography>
      <Typography>Actual Profit: ${project.actual_profit || 'N/A'}</Typography>
      <Typography>Status: {project.status}</Typography>
      <Typography>Progress: {project.progress_percentage || 0}%</Typography>
      <Typography>Category: {project.category || 'N/A'}</Typography>

      {/* Button to toggle Project ID display */}
      <Button
        variant="outlined"
        size="small"
        onClick={toggleProjectID}
        sx={{ marginTop: 1 }}
      >
        {showProjectID ? 'Hide Project ID' : 'Show Project ID'}
      </Button>

      {showProjectID && (
        <Typography mt={1}>Project ID: {project.id}</Typography>
      )}

      {/* More options menu */}
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleEditOpen} disabled={project.status === 'Archived'}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleArchiveToggle}>
          {project.status === 'Archived' ? 'Unarchive' : 'Archive'}
        </MenuItem>
      </Menu>

      {/* Modal for editing the project */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">Edit Project</Typography>
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
            label="Actual Profit"
            name="actual_profit"
            type="number"
            value={updatedProject.actual_profit || ''}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Progress (%)"
            name="progress_percentage"
            type="number"
            value={updatedProject.progress_percentage || ''}
            onChange={handleEditChange}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Category"
            name="category"
            value={updatedProject.category || ''}
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

export default ProjectCard;
