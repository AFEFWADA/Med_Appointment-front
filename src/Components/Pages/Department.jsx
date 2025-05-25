import React from "react";
import "./Department.css"; 

const departments = [
  { name: "Dentistry", icon: "🦷",  },
  { name: "Cardiology", icon: "❤️" },
  { name: "ENT Specialists", icon: "👂" },
  { name: "Astrology", icon: "🔭" }, 
  { name: "Neuroanatomy", icon: "🧠" , active: true},
  { name: "Blood Screening", icon: "🦠" }
];

const Departments = () => {
  return (
    <section className="departments-section">
      <h2 className="departments-title">Departments</h2>
      <p className="departments-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.
      </p>
      <div className="departments-grid">
        {departments.map((dept, index) => (
          <div key={index} className={`department-card ${dept.active ? "active" : ""}`}>
            <span className="department-icon">{dept.icon}</span>
            <p>{dept.name}</p>
          </div>
        ))}
      </div>
      <button className="learn-more">Learn More</button>
    </section>
  );
};

export default Departments;
