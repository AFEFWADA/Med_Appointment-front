import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pages où le bouton Login doit apparaître
  const showLoginButton = ["/", "/about", "/doctors", "/contact"].includes(location.pathname);

  // Pages où le bouton Logout doit apparaître
  const showLogoutButton = !showLoginButton; 

  const handleLogout = () => {
    // Suppression du token de session
    localStorage.removeItem("token");  
  
    // Empêcher le retour en arrière
    window.history.replaceState(null, "", "/login");
  
    // Redirection vers la page de login
    navigate("/login", { replace: true });
  };
  

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

      {/* Affiche le bouton Login uniquement sur certaines pages */}
      {showLoginButton && (
        <button className="login-btn" onClick={() => navigate("/login")}>Login now</button>
      )}

      {/* Affiche le bouton Logout uniquement sur les autres pages */}
      {showLogoutButton && (
        <button className="login-btn" onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;
