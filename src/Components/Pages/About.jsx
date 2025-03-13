import React from "react";
import "./About.css";
import Navbar from "../Layout/Navbar"; 
import img1 from "../assets/about1.png";
import img2 from "../assets/about2.png";

import doc1 from "../assets/doctor1.jpg";
import doc2 from "../assets/doctor.webp";
import doc3 from "../assets/doctor2.jpg";
import doc4 from "../assets/doctor3.jpg";
import doc5 from "../assets/doctor4.jpg";
import doc6 from "../assets/doctor5.avif";
import Appointment from "../Layout/Appointment/Appointment";

import Footer from "../Layout/Footer";
const About = () => {
  return (
    <>
      {/* Navbar Section */}
      <header>
        <Navbar />
      </header>

      {/* About Section */}
      <section className="about-container">
        <div className="about-content">
          {/* Left Side - Text Content */}
          <div className="about-text">
            <h4 className="about-subtitle">About Our Company</h4>
            <h2 className="about-title">
              Welcome To Our <span className="highlight">Hospital</span>
            </h2>
            <p className="about-description">
              There are many variations of passages of Lorem Ipsum available, but
              the majority have suffered alteration in some form, by injected
              humour, or randomised words.
            </p>

            {/* Buttons */}
            <div className="about-buttons">
              <button className="btn primary">Find Doctors →</button>
  
               <div className="secondary-buttons">
                 <button className="btn secondary">Appointment →</button>
                 <button className="btn secondary">Emergency →</button>
               </div>
            </div> 

          </div>

          {/* Right Side - Images */}
          <div className="about-images">
            {/* Background Doctor Image */}
            <img src={img1} alt="Doctor" className="doctor-bg" />
            {/* Foreground Doctor Image */}
            <img src={img2} alt="Doctor Smiling" className="doctor-fg" />
          </div>
        </div>
      </section>


      {/* Gallery Section */}
<section className="gallery-container">
  <h3 className="gallery-subtitle">OUR GALLERY</h3>
  <h2 className="gallery-title">Our Medical Camp</h2>
  
  <div className="gallery-grid">
    <img src={doc1} alt="Doctor in Surgery" className="gallery-item large doc1" />

    <img src={doc3} alt="Patient Blood Pressure Check" className="gallery-item small doc3" />
    <img src={doc6}alt="Doctor Checking Patient" className="gallery-item large doc6" />
    <img src={doc4}alt="Doctor Checking Patient" className="gallery-item small doc4" />

    <img src={doc5} alt="Doctor Helping Elderly Patient" className="gallery-item medium doc5" />
    <img src={doc2} alt="Doctor with Stethoscope" className="gallery-item small doc2" />


  </div>
</section>


<section>
    <Appointment />
  </section>
    
 
     <Footer/>
    </>
  );
};

export default About;