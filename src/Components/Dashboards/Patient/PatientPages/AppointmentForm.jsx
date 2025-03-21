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
    images: [], // Stocker plusieurs images
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Rendez-vous soumis avec succès !");
  };

  return (
    <div className="main-container">
      <div className="main">
        <Sidebar />
      </div>

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
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required min={0}/>
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

                {/* Upload Images */}
                <div className="form-group">
                  <label>Upload Files <span>*</span></label>
                  <input type="file" name="images" multiple onChange={handleFileChange} />
                </div>

                {/* Liste des images avec bouton ❌ */}
                <div className="uploaded-files">
                  {formData.images.length > 0 && (
                    <ul>
                      {formData.images.map((file, index) => (
                        <li key={index}>
                          {file.name}
                          <button type="button" className="remove-btn" onClick={() => handleRemoveImage(index)}>❌</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="button-group">
                <button type="button" className="btn cancel">Cancel</button>
                <button type="submit" className="btn submit">Submit</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
