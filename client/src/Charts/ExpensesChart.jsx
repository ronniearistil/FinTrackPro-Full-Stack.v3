import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = () => {
    const expenseData = {
        labels: ['Expense A', 'Expense B', 'Expense C'],
        datasets: [
            {
                label: 'Expenses',
                data: [5000, 3000, 7000],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true, // Makes the chart responsive
        maintainAspectRatio: false, // Allows custom aspect ratio or height/width
        plugins: {
            legend: {
                position: 'bottom', // Moves the legend to the bottom for better mobile view
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '400px', margin: '20px auto' }}>
            <h3 style={{ textAlign: 'center' }}>Expense Breakdown</h3>
            <Doughnut data={expenseData} options={options} />
        </div>
    );
};

export default ExpenseChart;









