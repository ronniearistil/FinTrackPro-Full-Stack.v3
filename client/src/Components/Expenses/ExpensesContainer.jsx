import React, { useState, useEffect } from 'react';
import { useProjects } from '../../ProjectContext';
import ExpenseCard from './ExpenseCard';
import { Button } from '@mui/material';

const ExpensesContainer = ({ searchTerm = '' }) => {
    const { expenses, projects } = useProjects(); // Access expenses and projects from context
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [showArchived, setShowArchived] = useState(false);

    // Toggle visibility of archived expenses
    const toggleArchived = () => setShowArchived((prev) => !prev);

    useEffect(() => {
        const lowerCasedSearchTerm = searchTerm?.toLowerCase() || '';

        const visibleExpenses = expenses.filter((expense) => {
            // Find the associated project name
            const associatedProject = projects?.find(
                (project) => project.id === expense.project_id
            )?.name || '';

            // Check if the search term matches any of the fields
            const matchesName = expense.name.toLowerCase().includes(lowerCasedSearchTerm);
            const matchesProjectName = associatedProject.toLowerCase().includes(lowerCasedSearchTerm);
            const matchesProjectId = expense.project_id.toString().includes(searchTerm);

            // Match archive status
            const matchesArchiveStatus = showArchived ? expense.archived : !expense.archived;

            return matchesArchiveStatus && (matchesName || matchesProjectName || matchesProjectId);
        });

        setFilteredExpenses(visibleExpenses);
    }, [expenses, projects, searchTerm, showArchived]);

    return (
        <div className="expense-dashboard">
            <Button variant="outlined" onClick={toggleArchived} sx={{ mb: 2 }}>
                {showArchived ? 'Hide Archived' : 'Show Archived'}
            </Button>

            {filteredExpenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
            ))}

            {filteredExpenses.length === 0 && (
                <p>No {showArchived ? 'archived' : 'active'} expenses found.</p>
            )}
        </div>
    );
};

export default ExpensesContainer;

