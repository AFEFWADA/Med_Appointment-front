import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { 
  FaTachometerAlt, FaUserMd, FaUsers, FaClipboardList, 
  FaCalendarCheck, FaClock, FaBuilding, FaAngleDown 
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <h2>Patient</h2>
      <ul>
        <li className="active" onClick={() => navigate("/dashboard-patient")}>
          <FaTachometerAlt className="icon" /> Dashboard
        </li>

      

        {/* patient Dropdown */}
        <li className={`submenu ${openSubmenu === "patient" ? "open" : ""}`}>
          <span onClick={() => toggleSubmenu("patient")}>
            <FaUserMd className="icon" /> Appointments
            <FaAngleDown className={`arrow ${openSubmenu === "patient" ? "rotated" : ""}`} />
          </span>
          <ul className="submenu-items">
            <li onClick={() => navigate("/appointment-history")}>History</li>
            <li onClick={() => navigate("/appointment-liste")}>Appointments list</li>

          </ul>
        </li>

        <li onClick={() => navigate("/rendez-vous")}><FaClipboardList className="icon" /> Make an appointment</li>
        <li onClick={() => navigate("/doctors-list-patient")}><FaClock className="icon" /> Doctors</li>
      </ul>
    </div>
  );
};

export default Sidebar;
