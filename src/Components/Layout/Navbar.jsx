import React from "react";
import { NavLink ,useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
  
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="image">
          <img src={logo} alt="HealthCare Logo" />
        </div>
        <div>
          <span className="health">Health</span>
          <span className="care">Care</span>
        </div>
      </div>
      
      <div className="nav-links">
        <NavLink to="/" className="nav-btn">Home</NavLink>
        <NavLink to="/doctors" className="nav-btn">Doctors</NavLink>
        <NavLink to="/contact" className="nav-btn">Contact</NavLink>
        <NavLink to="/about" className="nav-btn">About Us</NavLink>
      </div>

      <button className="login-btn" onClick={() => navigate("/login")}>Login now</button>
    </nav>
  );
};

export default Navbar;
