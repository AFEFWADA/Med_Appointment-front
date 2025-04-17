import React, { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../../../Layout/Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import "./AddDoctor.css";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "doctor", 
    specialty: "",
    experience: "",
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/add-doctor",
        doctor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If the response is successful
      console.log(response.data);
      toast.success("Doctor added successfully!"); // Success toast

      // Reset the form
      setDoctor({
        name: "",
        lastName: "",
        email: "",
        password: "",
        role: "doctor",
        specialty: "",
        experience: "",
      });
    } catch (error) {
      // Handle error by checking specific error messages from the server
      if (error.response) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("duplicate key error")) {
          toast.error("📧 Email is already used!"); // Email already used error
        } else if (errorMessage.includes("Password must be at least 6 characters")) {
          toast.error("🔒 Password must be at least 6 characters!"); // Short password error
        } else {
          toast.error("Error adding doctor. Please try again."); // General error message
        }
      } else {
        // If error is not from the server
        toast.error("Error adding doctor. Please try again.");
      }

      console.error("Error adding doctor:", error.response || error);
    }
  };

  return (
    <div className="main">
      <Sidebar />
      <div className="main-content">
        <div className="nav">
          <Navbar />
        </div>
        <div className="add-doctor-containerr">
          <h2 className="title">Add a Doctor</h2>
          <form className="add-doctor-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={doctor.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
            <input
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={doctor.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <input
              type="text"
              name="specialty"
              value={doctor.specialty}
              onChange={handleChange}
              placeholder="Specialty"
              required
            />
            <input
              type="number"
              name="experience"
              value={doctor.experience}
              onChange={handleChange}
              placeholder="Years of Experience"
              required
            />
            <button type="submit" className="save-btn">
              Add Doctor
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container to display notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddDoctor;
