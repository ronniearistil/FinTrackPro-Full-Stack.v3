import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const ExpenseChart = () => {
    const data = {
        labels: ['Expense A', 'Expense B', 'Expense C'],
        datasets: [
            {
                label: 'Expenses',
                data: [5000, 3000, 7000],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return <Doughnut data={data} />;
};

export default ExpenseChart;


