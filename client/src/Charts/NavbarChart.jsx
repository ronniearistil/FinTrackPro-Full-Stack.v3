import React from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

const data = [
    { name: 'In Progress', value: 10 },
    { name: 'Completed', value: 5 },
    { name: 'At Risk', value: 2 },
];

const NavbarChart = () => {
    return (
        <div
            style={{
                width: 'auto', 
                height: 'auto', 
                maxWidth: '100px', 
                maxHeight: '100px', 
                overflow: 'hidden',
            }}
        >
            <PieChart width={90} height={90}>
                <Pie
                    key="navbar-pie-chart"
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={30} // Adjusted size
                    innerRadius={20} // Added for donut shape
                    fill="#8884d8"
                />
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default NavbarChart;





