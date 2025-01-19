import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectChart = () => {
    const projectData = {
        labels: ['Project A', 'Project B', 'Project C'],
        datasets: [
            {
                label: 'Projects',
                data: [20, 30, 50],
                backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top', // Ensure the legend is displayed at the top
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Pie data={projectData} options={options} />
        </div>
    );
};

export default ProjectChart;






