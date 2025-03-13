import React from "react";
import "./Appointment.css"; 
import image from "../../assets/appointment.jpg"

const Appointment = () => {
  return (
    <>
   

      <section className="appointment-container">
        <div className="appointment-content">
          
          {/* Partie Gauche - Image */}
          <div className="appointment-image">
            <img src={image} alt="Doctor with Patient" />
          </div>

          {/* Partie Droite - Formulaire */}
          <div className="appointment-form-container">
            <h3 className="appointment-subtitle">APPOINTMENT APPLY FORM</h3>
            <h2 className="appointment-title">Appointment Form</h2>
            
            <form className="appointment-form">
              <div className="form-group">
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Phone" />
              </div>
              <div className="form-group">
                <select>
                  <option>Health Law</option>
                  <option>General Consultation</option>
                  <option>Specialist Visit</option>
                </select>
                <input type="email" placeholder="Email" />
              </div>
              <textarea placeholder="Message"></textarea>
              
              <button className="btn primary">Submit Now →</button>
            </form>
          </div>

        </div>
      </section>
    </>
  );
};

export default Appointment;
