import React from "react";
import Navbar from "../../../Layout/Navbar";
import Sidebar from "../../../Dashboards/Patient/Layouts/Sidebar";
import MedicalHistory from "./MedicalHistory";
import "./Medhistorical.css"; 

const Medhistorical = () => {
  return (
    <div className="mains">
      <Sidebar />
      <div className="nav">
        <Navbar />
        <div className="main--container">

          {/* Section Historique Médical */}
          <div className="medical-history-section">
            <MedicalHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medhistorical;
