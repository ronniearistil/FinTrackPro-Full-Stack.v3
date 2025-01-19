import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
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

const ProjectChart = () => {
    const projectDataPie = {
        labels: ['Project A', 'Project B', 'Project C'],
        datasets: [
            {
                label: 'Projects',
                data: [20, 30, 50],
                backgroundColor: ['#4BC0C0', '#FF9F40', '#9966FF'],
            },
        ],
    };

    // // const projectDataBar = {
    //     labels: ['Project A', 'Project B', 'Project C'],
    //     datasets: [
    //         {
    //             label: 'Budgeted Cost',
    //             data: [20000, 15000, 30000],
    //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //         },
    //         {
    //             label: 'Actual Cost',
    //             data: [18000, 16000, 28000],
    //             backgroundColor: 'rgba(255, 99, 132, 0.6)',
    //         },
    //     ],
    // };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
                margin: '20px',
            }}
        >
            {/* Project Pie Chart */}
            <div style={{ width: '100%', maxWidth: '500px', height: '300px' }}>
                <h3 style={{ textAlign: 'center' }}>Project Distribution</h3>
                <Pie data={projectDataPie} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

            {/* Histogram (Bar Chart)
            <div style={{ width: '100%', maxWidth: '600px', height: '400px' }}>
                <h3 style={{ textAlign: 'center' }}>Project Budget vs Actual Costs</h3>
                <Bar data={projectDataBar} options={barOptions} />
            </div> */}
        </div>
    );
};

export default ProjectChart;





