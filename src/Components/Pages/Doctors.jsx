import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import "./Doctors.css";
import doctor1 from "../assets/assets_frontend/doc1.png";
import doctor2 from "../assets/assets_frontend/doc2.png";
import doctor3 from "../assets/assets_frontend/doc3.png";
import doctor4 from "../assets/assets_frontend/doc4.png";
import doctor5 from "../assets/assets_frontend/doc5.png";
import doctor6 from "../assets/assets_frontend/doc6.png";
import doctor7 from "../assets/assets_frontend/doc7.png";
import doctor8 from "../assets/assets_frontend/doc8.png";

const doctors = [
  { id: 1, name: "Dr. Richard Jones", specialty: "General physician", image: doctor1 },
  { id: 2, name: "Dr. Sarah White", specialty: "Cardiologist", image: doctor2 },
  { id: 3, name: "Dr. Emily Davis", specialty: "Dermatologist", image: doctor3 },
  { id: 4, name: "Dr. Michael Smith", specialty: "Neurologist", image: doctor4 },
  { id: 5, name: "Dr. Anna Brown", specialty: "Pediatrician", image: doctor5 },
  { id: 6, name: "Dr. David Wilson", specialty: "Orthopedic", image: doctor6 },
  { id: 7, name: "Dr. Laura Martinez", specialty: "Oncologist", image: doctor7 },
  { id: 8, name: "Dr. James Taylor", specialty: "ENT Specialist", image: doctor8 },
];

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les docteurs en fonction de la recherche
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors-page">
      {/* Navbar */}
      <Navbar />

      <div className="doctors-container">
        {/* Header */}
        <h2 className="title">Our Doctors</h2>
        <p className="subtitle">
          Our team of experienced and caring doctors is dedicated to providing you with the highest 
          quality healthcare services. Book an appointment with one of our specialists today.
        </p>

        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Search by name or specialty..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Top Doctors */}
        <h3 className="section-title">Top Doctors to book</h3>

        {/* Grid des docteurs */}
        <div className="doctors-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="doctor-card">
                <img src={doctor.image} alt={doctor.name} className="doctor-image" />
                <div className="doctor-info">
                  <span className="available">🟢 Available</span>
                  <h4>{doctor.name}</h4>
                  <p>{doctor.specialty}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No doctors found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
