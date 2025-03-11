import React from "react";
import "./Footer.css"; 
import { FaFacebookF, FaTwitter, FaGlobe, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Colonne 1 - Logo et description */}
        <div className="footer-about">
          <h2 className="logo">Medi</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaGlobe />
            <FaInstagram />
          </div>
        </div>

        {/* Colonne 2 - Nos départements */}
        <div className="footer-departments">
          <h3>Our Departments</h3>
          <ul>
            <li>Births</li>
            <li>Cardiology</li>
            <li>Traumatology</li>
            <li>Nuclear</li>
            <li>Pregnancy</li>
            <li>X-ray</li>
          </ul>
        </div>

        <div className="footer-departments">
          <ul>
            <li>Pulmonary</li>
            <li>Neurology</li>
            <li>Dental</li>
            <li>Magnetic</li>
            <li>For disabled</li>
            <li>Prostheses</li>
          </ul>
        </div>

        {/* Colonne 3 - Horaires */}
        <div className="footer-availability">
          <h3>We’re Available</h3>
          <ul>
            <li>Monday - Friday: <span>8.00 - 18.00</span></li>
            <li>Saturday: <span>8.00 - 18.00</span></li>
            <li>Sunday: <span>8.00 - 13.00</span></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>Copyright ©2025 All rights reserved </p>
      </div>
    </footer>
  );
};

export default Footer;
