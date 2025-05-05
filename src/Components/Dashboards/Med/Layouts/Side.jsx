import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { 
  FaTachometerAlt, FaUsers, 
  FaCalendarCheck, FaClock, FaAngleDown 
} from "react-icons/fa";
import "./Side.css";

const Side = () => {
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <h2>Doctor</h2>
      <ul>
        <li className="active" onClick={() => navigate("/dashboard-doctor")}>
          <FaTachometerAlt className="icon" /> Dashboard
        </li>

        {/* Patients Dropdown */}
        <li className={`submenu ${openSubmenu === "patients" ? "open" : ""}`}>
          <span onClick={() => toggleSubmenu("patients")}>
            <FaUsers className="icon" /> Patients
            <FaAngleDown className={`arrow ${openSubmenu === "patients" ? "rotated" : ""}`} />
          </span>
          <ul className="submenu-items">
            <li onClick={() => navigate("/patients-lists-fordoc")}>Patients List</li>
            
          </ul>
        </li>

        {/* Doctors Dropdown */}
     { /*  <li className={`submenu ${openSubmenu === "doctors" ? "open" : ""}`}>
          <span onClick={() => toggleSubmenu("doctors")}>
            <FaUserMd className="icon" /> Doctors
            <FaAngleDown className={`arrow ${openSubmenu === "doctors" ? "rotated" : ""}`} />
          </span>
          <ul className="submenu-items">
            <li onClick={() => navigate("/doctors-lists")}>Doctors List</li>

          </ul>
        </li> */ }

        {/* Doctor Dropdown */}
        <li className={`submenu ${openSubmenu === "doctors" ? "open" : ""}`}>
          <span onClick={() => toggleSubmenu("doctors")}>
            <FaUsers className="icon" /> Diagnostic
            <FaAngleDown className={`arrow ${openSubmenu === "doctors" ? "rotated" : ""}`} />
          </span>
          <ul className="submenu-items">
            <li onClick={() => navigate("/create-diag")}>Create diagnostic </li>
            <li onClick={() => navigate("/List-diag")}>List of diagnostic </li>

          </ul>
        </li>

        <li onClick={() => navigate("/brain-tumor-detector")}><FaClock className="icon" /> Tumor detector</li>

      </ul>
    </div>
  );
};

export default Side;
