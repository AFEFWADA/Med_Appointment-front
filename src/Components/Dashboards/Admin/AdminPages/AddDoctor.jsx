import React, { useState } from "react";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../../../Layout/Navbar";
import axios from "axios"; 
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "./AddDoctor.css";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    role: "doctor", // default role
    specialty: "",
    experience: "",
  });

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage

    try {
      // Send a POST request to the backend API with the token in the header
      const response = await axios.post(
        "http://localhost:4000/api/user/add-doctor",
        doctor,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token in the header
          },
        }
      );

      // Handle success
      console.log(response.data);
      toast.success("Doctor added successfully!"); // Success notification

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
      // Handle error
      console.error("Error adding doctor:", error.response || error);
      toast.error("Error adding doctor. Please try again."); // Error notification
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
    </div>
  );
};

export default AddDoctor;
