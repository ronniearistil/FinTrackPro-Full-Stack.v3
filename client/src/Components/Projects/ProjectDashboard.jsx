// src/Components/ProjectDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useProjects } from '../../ProjectContext';
import ProjectCard from './ProjectCard';

const ProjectDashboard = ({ statusFilter }) => {
    const { projects, filterProjectsByStatus, archiveProject } = useProjects();
    const [filteredProjects, setFilteredProjects] = useState(projects);

    useEffect(() => {
        const updatedProjects = filterProjectsByStatus(statusFilter);
        setFilteredProjects(updatedProjects);
    }, [statusFilter, projects]); // Re-run when status or projects change

    return (
        <div className="dashboard">
            {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} onArchive={archiveProject} />
            ))}
        </div>
    );
};

export default ProjectDashboard;