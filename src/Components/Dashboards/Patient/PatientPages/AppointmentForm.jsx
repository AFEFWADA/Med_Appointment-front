import React, { useState } from "react";
import "./AppointmentForm.css";
import Navbar from "../../../Layout/Navbar";
import Sidebar from "../../../Dashboards/Patient/Layouts/Sidebar";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    date: "",
    fromTime: "",
    toTime: "",
    doctor: "",
    treatment: "",
    notes: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    console.log("Form Data Submitted:", formData);
    alert("Rendez-vous soumis avec succès !");
  };

  return (
    <div className="appointment-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="form-container">
          <h2>Prise de Rendez-vous</h2>
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="form-section">
              <h3>Patient Details</h3>
              <div className="form-group">
                <label>First Name *</label>
                <input type="text" name="firstName" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input type="text" name="lastName" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Gender *</label>
                <div className="radio-group">
                  <input type="radio" name="gender" value="Male" onChange={handleChange} /> Male
                  <input type="radio" name="gender" value="Female" onChange={handleChange} /> Female
                </div>
              </div>
              <div className="form-group">
                <label>Mobile *</label>
                <input type="text" name="mobile" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" onChange={handleChange} required />
              </div>
              <div className="form-group full-width">
                <label>Address *</label>
                <textarea name="address" onChange={handleChange} required></textarea>
              </div>
            </div>
            <div className="form-section">
              <h3>Appointment Details</h3>
              <div className="form-group">
                <label>Date of Appointment *</label>
                <input type="date" name="date" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>From *</label>
                <input type="time" name="fromTime" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>To *</label>
                <input type="time" name="toTime" onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Consulting Doctor</label>
                <select name="doctor" onChange={handleChange}>
                  <option value="">Select Doctor</option>
                  <option value="Dr. John Doe">Dr. John Doe</option>
                  <option value="Dr. Jane Smith">Dr. Jane Smith</option>
                </select>
              </div>
              <div className="form-group">
                <label>Treatment</label>
                <input type="text" name="treatment" onChange={handleChange} />
              </div>
              <div className="form-group full-width">
                <label>Notes *</label>
                <textarea name="notes" onChange={handleChange} required></textarea>
              </div>
              <div className="form-group full-width">
                <label>Upload IRM Image *</label>
                <input type="file" name="image" onChange={handleFileChange} required />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit</button>
              <button type="button" className="cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;