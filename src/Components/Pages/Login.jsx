import React, { useState } from 'react';
import './Login.css';
import background from "../assets/brain.webp";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  // Gestion des changements de formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Section gauche avec image */}
        <div className="image-section">
          <img src={background} alt="Login Illustration" />
        </div>

        {/* Section droite avec formulaire */}
        <div className="form-section">
          <div className="tabs">
            <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>
              Login
            </button>
            <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {isLogin ? (
              <div className="form">
                <input type="email" name="email" placeholder="Email" className="input-field" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="input-field" value={formData.password} onChange={handleChange} required />
                <button type="submit" className="submit-button">Login</button>
                <p className="switch-text">
                  Don't have an account? <span onClick={() => setIsLogin(false)}>Register</span>
                </p>
              </div>
            ) : (
              <div className="form">
                <input type="text" name="firstName" placeholder="First Name" className="input-field" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" className="input-field" value={formData.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="input-field" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="input-field" value={formData.password} onChange={handleChange} required />
                
                {/* Ajout des boutons radio pour le choix du rôle */}
                <div className="role-selection">
                  <label>
                    <input type="radio" name="role" value="client" checked={formData.role === "client"} onChange={handleChange} required />
                    Client
                  </label>
                  <label>
                    <input type="radio" name="role" value="doctor" checked={formData.role === "doctor"} onChange={handleChange} required />
                    Doctor
                  </label>
                </div>

                <button type="submit" className="submit-button">Register</button>
                <p className="switch-text">
                  Already have an account? <span onClick={() => setIsLogin(true)}>Login</span>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
