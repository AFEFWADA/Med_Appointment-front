import React, { useState, useEffect } from 'react';
import './Login.css';
import background from "../assets/brain.webp";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../Pages/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user?.role) {
      navigate(user.role === 'admin' ? '/dashboard-admin'
             : user.role === 'doctor' ? '/dashboard-doctor'
             : '/dashboard-patient');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { email, password } = formData;
        const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
        const data = response.data;
  
        if (data.success) {
          toast.success("Login réussi !");

          const userData = { token: data.token, user: data.user };
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          login(userData, navigate);
        } else {
          toast.error(data.message || "Échec de la connexion !");
        }
  
      } else {
        const { firstName, lastName, email, password, role } = formData;
        const payload = { name: firstName, lastName, email, password, role };
        const response = await axios.post('http://localhost:4000/api/auth/register', payload);
        const data = response.data;
  
        if (data.success) {
          toast.success("Inscription réussie !");
          setIsLogin(true);
        } else {
          toast.error(data.message || "Erreur lors de l'inscription");
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message;
  
      if (errorMessage?.toLowerCase().includes("email") && errorMessage.toLowerCase().includes("exist")) {
        toast.error("L'email est déjà utilisé.");
      } else if (errorMessage?.toLowerCase().includes("mot de passe") || errorMessage?.toLowerCase().includes("password")) {
        toast.error("Mot de passe incorrect.");
      } else if (errorMessage?.toLowerCase().includes("not found")) {
        toast.error("Utilisateur non trouvé.");
      } else {
        toast.error(errorMessage || "Une erreur est survenue.");
      }
  
      console.error("Erreur complète :", error.response || error);
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="image-section">
          <img src={background} alt="Login Illustration" />
        </div>

        <div className="form-section">
          <div className="tabs">
            <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Login</button>
            <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Register</button>
          </div>

          <form onSubmit={handleSubmit}>
            {isLogin ? (
              <div className="form">
                <input type="email" name="email" placeholder="Email" className="input-field" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="input-field" value={formData.password} onChange={handleChange} required />
                <button type="submit" className="submit-button">Login</button>
                <p className="switch-text">Don't have an account? <span onClick={() => setIsLogin(false)}>Register</span></p>
              </div>
            ) : (
              <div className="form">
                <input type="text" name="firstName" placeholder="First Name" className="input-field" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" className="input-field" value={formData.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" className="input-field" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" className="input-field" value={formData.password} onChange={handleChange} required />
                
                <div className="role-selection">
                  <label><input type="radio" name="role" value="patient" checked={formData.role === "patient"} onChange={handleChange} required /> Patient</label>
                  <label><input type="radio" name="role" value="doctor" checked={formData.role === "doctor"} onChange={handleChange} required /> Doctor</label>
                  <label><input type="radio" name="role" value="admin" checked={formData.role === "admin"} onChange={handleChange} required /> Admin</label>
                </div>

                <button type="submit" className="submit-button">Register</button>
                <p className="switch-text">Already have an account? <span onClick={() => setIsLogin(true)}>Login</span></p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
