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

    return (
        <div style={{ width: '600px', margin: '20px auto' }}>
            <h3>Expense Breakdown</h3>
            <Doughnut data={expenseData} />
        </div>
    );
};

export default ExpenseChart;








