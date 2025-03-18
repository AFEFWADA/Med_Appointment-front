import React, { useState } from "react";
import Navbar from "../../../Layout/Navbar";
import Sidebar from "../../../Dashboards/Patient/Layouts/Sidebar";
import "./AppointmentForm.css";

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
    if (e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Rendez-vous soumis avec succès !");
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="main">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="nav">
          <Navbar />
        </div>

        <div className="form-container">
          <div className="form-box">
            <h2 className="form-title">Prise de Rendez-vous</h2>

            <form onSubmit={handleSubmit}>
  {/* Patient Details */}
  <div className="patient-details">
    <div className="form-row">
      <div className="form-group">
        <label>First Name <span>*</span></label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Last Name <span>*</span></label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Gender <span>*</span></label>
        <div className="gender-group">
          <label>
            <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
            Female
          </label>
        </div>
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Mobile <span>*</span></label>
        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email <span>*</span></label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>
    </div>

    <div className="form-group">
      <label>Address <span>*</span></label>
      <textarea name="address" value={formData.address} onChange={handleChange} required />
    </div>
  </div>

  {/* Appointment Details */}
  <div className="appointment-details">
    <div className="date-time-row">
      <div className="form-group">
        <label>Date of Appointment <span>*</span></label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>From <span>*</span></label>
        <input type="time" name="fromTime" value={formData.fromTime} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>To <span>*</span></label>
        <input type="time" name="toTime" value={formData.toTime} onChange={handleChange} required />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <label>Consulting Doctor</label>
        <select name="doctor" className="consult-docotrs" value={formData.doctor} onChange={handleChange}>
          <option value="">Select Doctor</option>
          <option value="Dr. John Doe">Dr. John Doe</option>
          <option value="Dr. Jane Smith">Dr. Jane Smith</option>
        </select>
      </div>
      <div className="form-group">
        <label>Treatment <span>*</span></label>
        <input type="text" name="treatment" value={formData.treatment} onChange={handleChange} />
      </div>
    </div>

    <div className="form-group">
      <label>Notes <span>*</span></label>
      <textarea name="notes" value={formData.notes} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label>Upload File <span>*</span></label>
      <input type="file" name="image" onChange={handleFileChange} />
    </div>
  </div>

  {/* Submit Buttons */}
  <div className="button-group">
    <button type="button" className="btn">Cancel</button>
    <button type="submit" className="btn">Submit</button>
  </div>
</form>


          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
