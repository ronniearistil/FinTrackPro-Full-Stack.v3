import React, { useEffect, useState } from 'react';
import { useProjects } from '../../ProjectContext';
import ProjectCard from './ProjectCard';
import { Button } from '@mui/material';

const ProjectsContainer = ({ searchTerm = '', statusFilter = '', sortOption = '' }) => {
    const { projects, archiveProject } = useProjects();
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [showArchived, setShowArchived] = useState(false);

    // Toggle between active and archived projects
    const toggleArchived = () => setShowArchived((prev) => !prev);

    // Filter and sort projects whenever relevant state or props change
    useEffect(() => {
        const lowerCasedSearchTerm = searchTerm.toLowerCase();

        // Filter projects based on search, status, and archive toggle
        let filtered = projects.filter((project) => {
            const matchesSearch =
                project.name.toLowerCase().includes(lowerCasedSearchTerm) ||
                project.id.toString().includes(searchTerm);

            const matchesStatus =
                !statusFilter || statusFilter === 'All' || project.status === statusFilter;

            const matchesArchiveStatus = showArchived
                ? project.status === 'Archived'
                : project.status !== 'Archived';

            return matchesSearch && matchesStatus && matchesArchiveStatus;
        });

        // Sort projects based on the selected sorting criteria
        if (sortOption) {
            filtered = filtered.sort((a, b) => {
                switch (sortOption) {
                    case 'nameAsc':
                        return a.name.localeCompare(b.name);
                    case 'nameDesc':
                        return b.name.localeCompare(a.name);
                    case 'profitHigh':
                        return (b.actual_profit || 0) - (a.actual_profit || 0);
                    case 'profitLow':
                        return (a.actual_profit || 0) - (b.actual_profit || 0);
                    case 'costHigh':
                        return (b.budgeted_cost || 0) - (a.budgeted_cost || 0);
                    case 'costLow':
                        return (a.budgeted_cost || 0) - (b.budgeted_cost || 0);
                    default:
                        return 0;
                }
            });
        }

        setFilteredProjects(filtered);
    }, [projects, searchTerm, statusFilter, sortOption, showArchived]);

    return (
        <div className="dashboard" style={{ padding: '20px' }}>
            <Button
                variant="outlined"
                onClick={toggleArchived}
                sx={{ mb: 2 }}
            >
                {showArchived ? 'Show Active Projects' : 'Show Archived Projects'}
            </Button>

            {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onArchive={() => archiveProject(project.id)} // Archive functionality
                    />
                ))
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
};

export default ProjectsContainer;

