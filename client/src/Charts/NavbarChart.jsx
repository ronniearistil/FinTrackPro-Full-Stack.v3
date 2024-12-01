import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip } from 'recharts';

const NavbarChart = () => {
    const [statusData, setStatusData] = useState([]);

    useEffect(() => {
        // Fetch project status data from the API
        const fetchStatusData = async () => {
            const response = await fetch('/projects_status');  // Adjust with your correct endpoint
            const data = await response.json();
            setStatusData(data);  // Assuming data format to match the pie chart
        };

        fetchStatusData();
    }, []);

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
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={30}
                    innerRadius={20}
                    fill="#8884d8"
                />
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default NavbarChart;






