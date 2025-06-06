import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { 
  FaTachometerAlt, FaUserMd, FaUsers,  
  FaCalendarCheck, FaClock,  FaAngleDown 
} from "react-icons/fa";
import "./Sidebar.css";
import { FaComments } from "react-icons/fa";
const Sidebar = () => {
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <ul>
        <li className="active" onClick={() => navigate("/dashboard-admin")}>
          <FaTachometerAlt className="icon" /> Dashboard
        </li>

        {/* Patients Dropdown */}
        <li className={`submenu ${openSubmenu === "patients" ? "open" : ""}`}>
          <span onClick={() => toggleSubmenu("patients")}>
            <FaUsers className="icon" /> Patients
            <FaAngleDown className={`arrow ${openSubmenu === "patients" ? "rotated" : ""}`} />
          </span>
          <ul className="submenu-items">
            <li onClick={() => navigate("/patients-list")}>Patients List</li>
            
          </ul>
        </li>

        {/* Doctors Dropdown */}
        <li className={`submenu ${openSubmenu === "doctors" ? "open" : ""}`}>
          <span onClick={() => toggleSubmenu("doctors")}>
            <FaUserMd className="icon" /> Doctors
            <FaAngleDown className={`arrow ${openSubmenu === "doctors" ? "rotated" : ""}`} />
          </span>
          <ul className="submenu-items">
            <li onClick={() => navigate("/doctors-list")}>Doctors List</li>
            <li onClick={() => navigate("/add-doctor")}>Add Doctor</li>

          </ul>
        </li>

        <li onClick={() => navigate("/appointments")}><FaCalendarCheck className="icon" /> Appointments</li>
        <li onClick={() => navigate("/schedule")}><FaClock className="icon" /> Doctor Schedule</li>
        <li onClick={() => window.open("http://localhost:5173/", "_blank")}>
                   <FaComments className="icon" /> Chat
                 </li>
       
      </ul>
    </div>
  );
};

export default Sidebar;
