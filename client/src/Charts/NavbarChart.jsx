import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const NavbarChart = () => {
    const [statusData, setStatusData] = useState([]);

    useEffect(() => {
        // Fetch project status data from the API
        const fetchStatusData = async () => {
            try {
                const response = await fetch('/projects_status'); // Adjust endpoint as needed
                const data = await response.json();
                setStatusData(data); // Assuming data is already formatted
            } catch (error) {
                console.error('Failed to fetch status data:', error);
            }
        };

        fetchStatusData();
    }, []);

    return (
        <div style={{ width: '100%', maxWidth: '100px', height: 'auto' }}>
            <ResponsiveContainer width="100%" height={90}>
                <PieChart>
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
            </ResponsiveContainer>
        </div>
    );
};

export default NavbarChart;







