import React from 'react';
import { Bar } from 'react-chartjs-2';

const ProjectChart = () => {
    const data = {
        labels: ['Project A', 'Project B', 'Project C'],
        datasets: [
            {
                label: 'Budgeted Cost',
                data: [20000, 15000, 30000],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Actual Cost',
                data: [18000, 16000, 28000],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    return <Bar data={data} />;
};

export default ProjectChart;

