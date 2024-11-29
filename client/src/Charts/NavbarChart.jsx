import { PieChart, Pie, Tooltip } from "recharts";

const data = [
    { name: "In Progress", value: 10 },
    { name: "Completed", value: 5 },
    { name: "At Risk", value: 2 },
];

const NavbarChart = () => {
    return (
        <PieChart width={200} height={200}>
            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
            />
            <Tooltip />
        </PieChart>
    );
};

export default NavbarChart;


