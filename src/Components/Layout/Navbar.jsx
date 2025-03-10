import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="health">Health</span>
        <span className="care">Care</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" className="nav-btn">Home</NavLink>
        <NavLink to="/doctors" className="nav-btn">Doctors</NavLink>
        <NavLink to="/contact" className="nav-btn">Contact</NavLink>
        <NavLink to="/about" className="nav-btn">About Us</NavLink>
      </div>
      <button className="login-btn">Login now</button>
    </nav>
  );
};

export default Navbar;
