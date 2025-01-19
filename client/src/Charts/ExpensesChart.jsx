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
            <Doughnut data={expenseData} options={options} />
        </div>
    );
};

export default ExpenseChart;










