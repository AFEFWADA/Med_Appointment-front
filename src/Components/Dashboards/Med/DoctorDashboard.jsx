import React from "react";
import Side from "./Layouts/Side";
import Navbar from "../../Layout/Navbar";
import "./DoctorDashboard.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { FaCalendarAlt, FaUserMd, FaProcedures, FaWallet } from "react-icons/fa";

const DashboardDoctor = () => {
  const stats = [
    { icon: <FaCalendarAlt />, value: "30", total: "85", label: "Appointments", change: "+60%", changeClass: "positive" },
    { icon: <FaUserMd />, value: "20", total: "125", label: "Consultations", change: "-20%", changeClass: "negative" },
    { icon: <FaProcedures />, value: "12", total: "30", label: "Operations", change: "+40%", changeClass: "positive" },
    { icon: <FaWallet />, value: "$530", total: "", label: "Earnings", change: "+50%", changeClass: "positive" },
  ];

  const incomeData = [
    { month: "Jan", income: 40 }, { month: "Feb", income: 60 },
    { month: "Mar", income: 75 }, { month: "Apr", income: 65 },
    { month: "May", income: 55 }, { month: "Jun", income: 50 },
    { month: "Jul", income: 45 }
  ];

  const patientData = [
    { name: "Male", value: 45, color: "#0088FE" },
    { name: "Female", value: 55, color: "#00C49F" }
  ];

  return (
    <div className="main">
      <Side />
      <div className="contents">
        <div className="nav">
          <Navbar />
          </div>
        <div className="main-content">
          {/* stats */}
          <div className="stats">
            <div className="doctor-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-info">
                    <p className="stat-value">{stat.value} {stat.total && <span className="total">/{stat.total}</span>}</p>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                  <span className={`change ${stat.changeClass}`}>{stat.change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Income Chart */}
        <div className="chart">  
          <div className="chart-container">
            <h3>Income</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={incomeData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#3f51b5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Patient Distribution */}
          <div className="chart-container">
            <h3>Patients</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={patientData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                  {patientData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* New and Old Patients */}
          <div className="patient-stats">
            <div className="patient-card positive">
              <h4>New Patients</h4>
              <p>56</p>
              <span>+60%</span>
            </div>
            <div className="patient-card negative">
              <h4>Old Patients</h4>
              <p>35</p>
              <span>-20%</span>
            </div>
          </div>
        </div>  
        </div>
      </div>
    </div>
  );
};

export default DashboardDoctor;
