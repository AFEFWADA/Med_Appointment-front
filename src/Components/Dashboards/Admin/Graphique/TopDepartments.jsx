import React from "react";
import "./TopDepartments.css";
import { FaUserMd, FaTooth, FaStethoscope, FaHeartbeat, FaEye } from "react-icons/fa";

const departments = [
  { name: "General Physician", percentage: "35%", icon: <FaUserMd className="icon general" /> },
  { name: "Dentist", percentage: "24%", icon: <FaTooth className="icon dentist" /> },
  { name: "ENT", percentage: "10%", icon: <FaStethoscope className="icon ent" /> },
  { name: "Cardiologist", percentage: "15%", icon: <FaHeartbeat className="icon cardiologist" /> },
  { name: "Ophthalmology", percentage: "20%", icon: <FaEye className="icon ophthalmology" /> },
];

const TopDepartments = () => {
  return (
    <div className="top-departments">
      <h3>Top Departments</h3>
      <ul>
        {departments.map((dept, index) => (
          <li key={index} className="department-item">
            {dept.icon}
            <div>
              <p>{dept.name}</p>
              <span>{dept.percentage}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopDepartments;
