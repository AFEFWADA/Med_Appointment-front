import React from "react";
import Sidebar from "./Layouts/Sidebar";
import Navbar from "../../Layout/Navbar";
import "./DashboardAdmin.css";
import GenderChart from "./Graphique/GenderChart";
import DepartmentChart from "./Graphique/DepartmentChart";
import TopDepartments from "./Graphique/TopDepartments";
import UpcomingAppointments from "./Graphique/UpcomingAppointments";
import RecentPatients from "./Graphique/Patients";
import { useAuth } from "../../../Components/Pages/AuthContext";

const DashboardAdmin = () => {
  const { user } = useAuth(); 

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="nav">
          <Navbar />
        </div>

        {/* Welcome Message */}
        <div className="welcome-card">
          <h2>
            Good Morning,{" "}
            <span className="highlight">{user?.name || "Admin"}</span>
            </h2>
          <p>Have a nice day at work</p>
        </div>

        {/* Statistics Section */}
        <div className="stats">
          <div className="stat-card">
            <p className="stat-value">250</p>
            <span>Appointments</span>
            <p className="change positive">+40% vs last month</p>
          </div>

          <div className="stat-card">
            <p className="stat-value">140</p>
            <span>New Patients</span>
            <p className="change positive">+20% vs last month</p>
          </div>

          <div className="stat-card">
            <p className="stat-value">56</p>
            <span>Operations</span>
            <p className="change negative">-15% vs last month</p>
          </div>

          <div className="stat-card">
            <p className="stat-value">$20,250</p>
            <span>Earnings</span>
            <p className="change positive">+30% vs last month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts">
          <GenderChart />
          <DepartmentChart />
        </div>

        {/* Tables Section */}
        <div className="tables">
          <div className="top-departments">
            <TopDepartments />
          </div>
          <div className="upcoming-appointments">
            <UpcomingAppointments />
          </div>
        </div>

        {/* Recent Patients Section */}
        <div>
          <RecentPatients />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
