import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Contact from './Components/Pages/Contact';
import Doctors from './Components/Pages/Doctors';
import Login from './Components/Pages/Login';
import About from './Components/Pages/About';
function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
