import React from "react";
import "./QualityHealth.css";
import doctor1 from "../assets/icon1.png";
import doctor2 from "../assets/icon2.png";
import doctor3 from "../assets/icon3.png";
const QualityHealth = () => {
  return (
    <section className="quality-health">
      <h2 className="title">Quality Health</h2>
      <p className="subtitle">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
      </p>

      <div className="quality-cards">
        <div className="card">
          <div className="icon">
            <img src={doctor1} alt="Health Consultation" />
          </div>
          <h3>Health Consultation</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>

        <div className="card">
          <div className="icon">
            <img src={doctor2}  alt="Find Health" />
          </div>
          <h3>Find Health</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>

        <div className="card">
          <div className="icon">
            <img src={doctor3} alt="Search Doctor" />
          </div>
          <h3>Search Doctor</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
        </div>
      </div>
    </section>
  );
};

export default QualityHealth;
