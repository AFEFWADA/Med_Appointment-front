import React from "react";
import Navbar from "./Layout/Navbar";  
import "./Home.css"; 
import irm from "./assets/irm.jpeg";
import DoctorsSection from "./Doctors/DoctorsSection";

const Home = () => {
  return (
    <div>
      <Navbar />  
      <div className="home-content">
        <div className="content">
          <div className="box">
            <h1>Your <span className="health">Health</span> is our Priority</h1>
            <h2>Make an Appointment</h2>
            <p>Get the care you want with our friendly team of doctors and staff.</p>
            <p>We are here to <span className="health">help you to feel better and stay Healthy.</span></p>
            <p>Learn about our service and contact us.</p>
          </div>
          
          {/* Nouvelle boîte pour le rendez-vous */}
          <div className="appointment-box">
            <h2>Book an Appointment</h2>
            <p>Schedule your consultation with our top doctors.</p>
            <button className="appointment-btn">Make an Appointment</button>
          </div>
        </div>

        <div className="img">
          <img src={irm} alt="MRI Scan" />
        </div>
      </div>

      <div className="doctoe-section">

        <DoctorsSection />
      </div>
    </div>
  );
};

export default Home;
