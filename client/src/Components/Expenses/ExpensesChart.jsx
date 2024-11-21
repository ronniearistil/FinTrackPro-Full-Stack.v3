// src/Components/ExpensesChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ExpensesChart = ({ expenses }) => {
    const data = expenses.map((expense) => ({
        name: expense.name,
        amount: expense.amount,
    }));

    return (
        <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
    );
};

export default ExpensesChart;