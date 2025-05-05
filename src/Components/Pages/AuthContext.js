import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const login = (userData, navigate) => {
    console.log('🔍 userData:', userData); 

    
    //setUser(userData);
    //localStorage.setItem('user', JSON.stringify(userData));
  
    setUser(userData.user); // Only user info in context
    localStorage.setItem('user', JSON.stringify(userData.user)); 
    localStorage.setItem('token', userData.token);

    // Redirection
 {/*   if (userData.role === 'admin') {
      navigate('/dashboard-admin');
    } else if (userData.role === 'doctor') {
      navigate('/dashboard-doctor');
    } else {
      navigate('/dashboard-patient');
    }   */}
    if (userData.user.role === 'admin') {
      navigate('/dashboard-admin');
    } else if (userData.user.role === 'doctor') {
      navigate('/dashboard-doctor');
    } else {
      navigate('/dashboard-patient');
    }
    
  };
  
  

  const logout = (navigate) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
