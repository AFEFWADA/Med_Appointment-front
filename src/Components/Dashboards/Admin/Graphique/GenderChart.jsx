import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", Male: 20, Female: 10 },
  { name: "Feb", Male: 40, Female: 20 },
  { name: "Mar", Male: 50, Female: 25 },
  { name: "Apr", Male: 60, Female: 30 },
  { name: "May", Male: 25, Female: 15 },
  { name: "Jun", Male: 65, Female: 35 },
  { name: "Jul", Male: 70, Female: 40 },
  { name: "Aug", Male: 20, Female: 10 },
  { name: "Sep", Male: 30, Female: 15 },
  { name: "Oct", Male: 25, Female: 10 },
  { name: "Nov", Male: 45, Female: 20 },
];

const GenderChart = () => {
  return (
    <div className="chart-card">
      <h3>Patient Visit by Gender</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Male" fill="#4F46E5" />
          <Bar dataKey="Female" fill="#22D3EE" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderChart;
