import React, { useState, useEffect } from 'react';
import './Login.css';
import background from "../assets/brain.webp";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useAuth } from './AuthContext'; // Import du contexte d'authentification

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
  const { login, user } = useAuth(); // Récupération de l'utilisateur du contexte

  // Redirection automatique après connexion
  useEffect(() => {
    if (user?.role) {
      console.log("Redirection en cours vers :", user.role);
      navigate(user.role === 'admin' ? '/dashboard-admin' 
             : user.role === 'doctor' ? '/dashboard-doctor' 
             : '/dashboard-patient');
    }
  }, [user, navigate]); // Surveiller les changements de `user` pour rediriger

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { email, password } = formData;
        console.log("Tentative de connexion avec :", { email, password });

        const { data } = await axios.post('http://localhost:4000/api/auth/login', { email, password });

        console.log("Réponse du serveur :", data);

        if (data.success) {
          toast.success("Login réussi !");
          const { token, role, name } = data;

          // Stockage des informations utilisateur
          const userData = { token, name, role };
          localStorage.setItem('user', JSON.stringify(userData));

          login(userData); // Mise à jour du contexte d'authentification
        } else {
          toast.error("Échec de la connexion ! Identifiants invalides.");
        }
      } else {
        const { firstName, lastName, email, password, role } = formData;
        const payload = { name: firstName, lastName, email, password, role };

        const { data } = await axios.post('http://localhost:4000/api/auth/register', payload);

        if (data.success) {
          toast.success("Inscription réussie !");
          setIsLogin(true); // Basculer vers la connexion après l'inscription
        }
      }
    } catch (error) {
      console.error("Erreur :", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Une erreur est survenue");
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
        {/* Image section */}
        <div className="image-section">
          <img src={background} alt="Login Illustration" />
        </div>

        {/* Form section */}
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
                
                {/* Sélection du rôle */}
                <div className="role-selection">
                  <label>
                    <input type="radio" name="role" value="patient" checked={formData.role === "patient"} onChange={handleChange} required />
                    Patient
                  </label>
                  <label>
                    <input type="radio" name="role" value="doctor" checked={formData.role === "doctor"} onChange={handleChange} required />
                    Doctor
                  </label>
                  <label>
                    <input type="radio" name="role" value="admin" checked={formData.role === "admin"} onChange={handleChange} required />
                    Admin
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
