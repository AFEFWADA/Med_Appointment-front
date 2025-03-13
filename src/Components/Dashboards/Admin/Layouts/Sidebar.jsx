import React, { useState } from "react";
import { 
  FaTachometerAlt, FaUserMd, FaUsers, FaClipboardList, 
  FaCalendarCheck, FaClock, FaBuilding, FaWallet, FaComments, FaAngleDown 
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <ul>
        <li className="active"><FaTachometerAlt className="icon" /> Dashboard</li>

        {/* Patients Dropdown */}
        <li className={`submenu ${openSubmenu === "patients" ? "open" : ""}`}>
          <span onClick={() => toggleSubmenu("patients")}>
            <FaUsers className="icon" /> Patients
            <FaAngleDown className={`arrow ${openSubmenu === "patients" ? "rotated" : ""}`} />
          </span>
          <ul className="submenu-items">
            <li>Patients List</li>
            <li>Add Patients</li>
            <li>Edit Patients</li>
            <li>Patients Profile</li>
          </ul>
        </li>

        {/* Doctors Dropdown */}
        <li className={`submenu ${openSubmenu === "doctors" ? "open" : ""}`}>
          <span onClick={() => toggleSubmenu("doctors")}>
            <FaUserMd className="icon" /> Doctors
            <FaAngleDown className={`arrow ${openSubmenu === "doctors" ? "rotated" : ""}`} />
          </span>
          <ul className="submenu-items">
            <li>Doctors List</li>
            <li>Add Doctor</li>
            <li>Edit Doctor</li>
            <li>Doctor Profile</li>
          </ul>
        </li>

        <li><FaClipboardList className="icon" /> Staff</li>
        <li><FaCalendarCheck className="icon" /> Appointments</li>
        <li><FaClock className="icon" /> Doctor Schedule</li>
        <li><FaBuilding className="icon" /> Departments</li>
        <li><FaWallet className="icon" /> Accounts</li>
        <li><FaClipboardList className="icon" /> Payroll</li>
        <li><FaComments className="icon" /> Chat</li>
      </ul>
    </div>
  );
};

export default Sidebar;
