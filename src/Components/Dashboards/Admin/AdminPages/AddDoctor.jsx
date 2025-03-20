import React, { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../../../Layout/Navbar";
import "./AddDoctor.css";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    age: "",
    dob: "",
    email: "",
    mobile: "",
    speciality: "",
    place: ""
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Added:", doctor);
    // Ici tu pourras ajouter l'appel API pour enregistrer le docteur
    setDoctor({ name: "", age: "", dob: "", email: "", mobile: "", speciality: "", place: "" });
  };

  return (
    <div className="main">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="add-doctor-containerr">
          <h2 className="title">Add a Doctor</h2>
          <form className="add-doctor-form" onSubmit={handleSubmit}>
            <input type="text" name="name" value={doctor.name} onChange={handleChange} placeholder="Full Name" required />
            <input type="number" name="age" value={doctor.age} onChange={handleChange} placeholder="Age" required />
            <input type="date" name="dob" value={doctor.dob} onChange={handleChange} placeholder="Date of Birth" required />
            <input type="email" name="email" value={doctor.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="mobile" value={doctor.mobile} onChange={handleChange} placeholder="Mobile Number" required />
            <input type="text" name="speciality" value={doctor.speciality} onChange={handleChange} placeholder="Speciality" required />
            <input type="text" name="place" value={doctor.place} onChange={handleChange} placeholder="Location" required />
            <button type="submit" className="save-btn">Add Doctor</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;