import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import "./Charts.css"

const genderData = [
  { name: "Male", value: 75 },
  { name: "Female", value: 25 },
];

const departmentData = [
  { name: "Cardiology", value: 40 },
  { name: "Neurology", value: 30 },
  { name: "Orthopedics", value: 20 },
  { name: "Pediatrics", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Charts = () => {
  return (
    <div className="charts-container">
      <div className="chart">
        <h3>Patient Visit by Gender</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
              {genderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart">
        <h3>Patient by Department</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={departmentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d">
              {departmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
