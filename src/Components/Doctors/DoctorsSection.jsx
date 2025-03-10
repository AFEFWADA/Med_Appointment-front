import React from "react";
import "./DoctorsSection.css";
import doctor1 from "../assets/assets_frontend/doc1.png";
import doctor2 from "../assets/assets_frontend/doc2.png";
import doctor3 from "../assets/assets_frontend/doc3.png";
import doctor4 from "../assets/assets_frontend/doc4.png";
import doctor5 from "../assets/assets_frontend/doc5.png";
import doctor6 from "../assets/assets_frontend/doc6.png";
import { useNavigate } from "react-router-dom";

const doctorsData = [
  {
    id: 1,
    name: "Dr. Richard Jones",
    specialty: "General Physician",
    image: doctor1, 
    available: true,
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    specialty: "Neurologist",
    image: doctor2,
    available: true,
  },
  {
    id: 3,
    name: "Dr. Michael Smith",
    specialty: "Dermatologist",
    image: doctor3,
    available: false,
  },
  {
    id: 4,
    name: "Dr. Emily White",
    specialty: "Pediatrician",
    image: doctor4,
    available: true,
  },
  {
    id: 5,
    name: "Dr. David Brown",
    specialty: "Gynecologist",
    image: doctor5,
    available: true,
  },
  {
    id: 6,
    name: "Dr. Jessica Lee",
    specialty: "Gastroenterologist",
    image: doctor6,
    available: false,
  },
  {
    id: 5,
    name: "Dr. David Brown",
    specialty: "Gynecologist",
    image: doctor5,
    available: true,
  },
  {
    id: 6,
    name: "Dr. Jessica Lee",
    specialty: "Gastroenterologist",
    image: doctor6,
    available: false,
  },
];

const DoctorsSection = () => {
  const navigate = useNavigate();
  return (
    <section className="doctors-section">
      <h2 className="section-title">Top Doctors to Book</h2>
      <div className="doctors-grid">
        {doctorsData.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <span className={`availability ${doctor.available ? "available" : "not-available"}`}>
              {doctor.available ? "✔ Available" : "❌ Not Available"}
            </span>
          </div>
        ))}
      </div>
      <button className="more-button" onClick={() => navigate("/doctors")}>More</button>
    </section>
  );
};

export default DoctorsSection;
