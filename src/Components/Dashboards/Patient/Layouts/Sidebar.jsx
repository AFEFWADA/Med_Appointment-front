import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { 
  FaTachometerAlt, FaUserMd, FaClipboardList, 
  FaClock, FaAngleDown ,FaCog
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false); 

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  // Fermer le menu lors d'un changement de page
  useEffect(() => {
    setOpenSubmenu(null);
    setIsOpen(false); // Fermer la sidebar sur mobile après navigation
  }, [location.pathname]);

  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      {/* Icône du menu burger */}
      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      <div className={`sidebar ${isOpen ? "show" : ""}`}>
        <h2>Patient</h2>
        <ul>
          <li 
            className={location.pathname === "/dashboard-patient" ? "active" : ""}
            onClick={() => navigate("/dashboard-patient")}
          >
            <FaTachometerAlt className="icon" /> Dashboard
          </li>

          {/* Appointments Dropdown */}
          <li className={`submenu ${openSubmenu === "appointments" ? "open" : ""}`}>
            <span onClick={() => toggleSubmenu("appointments")}>
              <FaUserMd className="icon" /> Appointments
              <FaAngleDown className={`arrow ${openSubmenu === "appointments" ? "rotated" : ""}`} />
            </span>
            <ul className="submenu-items">
              <li onClick={() => navigate("/appointment-history")}>History</li>
              <li onClick={() => navigate("/appointment-liste")}>Appointments list</li>
            </ul>
          </li>

          <li className={location.pathname === "/rendez-vous" ? "active" : ""}
            onClick={() => navigate("/rendez-vous")}
          >
            <FaClipboardList className="icon" /> Make an appointment
          </li>

          <li className={location.pathname === "/doctors-list-patient" ? "active" : ""}
            onClick={() => navigate("/doctors-list-patient")}
          >
            <FaClock className="icon" /> Doctors
          </li>
          <li className={location.pathname === "/setting" ? "active" : ""}
            onClick={() => navigate("/setting")}
          >
            <FaCog className="icon" /> Setting 
          </li>
          <li className={location.pathname === "/testtest" ? "active" : ""}
            onClick={() => navigate("/test")}
          >
            <FaCog className="icon" /> teeeeeeeeeeeeeeest image 
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
