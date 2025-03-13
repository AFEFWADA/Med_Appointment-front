import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Neurology", value: 30 },
  { name: "Dental Care", value: 25 },
  { name: "Gynecology", value: 20 },
  { name: "Orthopedic", value: 25 },
];

const COLORS = ["#007bff", "#00c49f", "#ffbb28", "#ff4c4c"];

const DepartmentChart = () => {
  return (
    <div className="chart-card">
      <h3>Patient by Department</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;
