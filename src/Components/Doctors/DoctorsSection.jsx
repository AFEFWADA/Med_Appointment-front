import React, { useEffect, useState } from "react";
import "./DoctorsSection.css";
import "../data.json";
const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("data.json") 
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error loading doctors data:", error));
  }, []);

  return (
    <section className="doctors-section">
      <h2>Top Doctors to Book</h2>
      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="doctor-image"
            />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <span className={`availability ${doctor.available ? "available" : "not-available"}`}>
              {doctor.available ? "✔ Available" : "❌ Not Available"}
            </span>
          </div>
        ))}
      </div>
      <button className="more-button">More</button>
    </section>
  );
};

export default DoctorsSection;
