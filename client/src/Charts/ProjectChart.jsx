import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required elements
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

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

    return (
        <div
            style={{
                width: 'auto', // Allows auto-sizing based on parent container
                height: 'auto',
                maxWidth: '600px', // Constrains maximum width
                maxHeight: '400px', // Constrains maximum height
                overflow: 'hidden', // Ensures no overflow
            }}
        >
            <Bar data={data} options={options} />
        </div>
    );
};

export default ProjectChart;


