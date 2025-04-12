import React, { useState } from "react";
import axios from "axios"; // Import axios
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import Navbar from "../../../Layout/Navbar";
import Sidebar from "../../../Dashboards/Patient/Layouts/Sidebar";
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import "./AppointmentForm.css";
import { useAuth } from "../../../Pages/AuthContext"; // Import useAuth for authentication context

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
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
    images: [], // Store multiple images
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(formData);
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("lastName", formData.lastName);
    formDataToSubmit.append("gender", formData.gender);
    formDataToSubmit.append("mobile", formData.mobile);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("date", formData.date);
    formDataToSubmit.append("fromTime", formData.fromTime);
    formDataToSubmit.append("toTime", formData.toTime);
    formDataToSubmit.append("doctor", formData.doctor);
    formDataToSubmit.append("treatment", formData.treatment);
    formDataToSubmit.append("notes", formData.notes);
  
    formData.images.forEach((image) => {
      formDataToSubmit.append("images", image);
    });
  
    // Get the token from localStorage so i can send appointment
    const token = localStorage.getItem("token");

  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/appointments/create",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`, 
          },
        }
      );
  
      console.log(response.data);
      toast.success("Rendez-vous soumis avec succès !");
    } catch (error) {
      console.error("There was an error submitting the form", error);
      console.error(error.response ? error.response.data : error);
      toast.error("Erreur lors de l'envoi du rendez-vous !");
    }
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
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
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

                {/* Upload Images */}
                <div className="form-group">
                  <label>Upload Files <span>*</span></label>
                  <input type="file" name="images" multiple onChange={handleFileChange} />
                </div>

                {/* List images with remove button */}
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

      {/* ToastContainer to render notifications */}
      <ToastContainer />
    </div>
  );
};

export default AppointmentForm;
