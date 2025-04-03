import React, { useState } from "react";
import Sidebar from "../../../Dashboards/Patient/Layouts/Sidebar";
import Navbar from "../../../Layout/Navbar";
import axios from "axios";
import "./Setting.css";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    username: "Kate",
    surname: "Paisley",
    phone: "+123456789",
    email: "Katepaisley@gmail.com",
    password: "",
    confirmPassword: "",
    location: "United States of America",
  });

  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.username);
    data.append("lastName", formData.surname);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("location", formData.location);
    if (image) {
      data.append("img", image);
    }

    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        "http://127.0.0.1:3300/api/v1/users/update-profile/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="container-settings">
      <div style={{ width: "250px" }}>
        <Sidebar />
      </div>

      <div className="main-settings">
        <div className="nav">
          <Navbar />
        </div>

        <div className="content-settings">
          <h2>Personal Information</h2>

          <div className="profilePicSection">
            <img
              src={image ? URL.createObjectURL(image) : "https://via.placeholder.com/80"}
              alt="Profile"
              className="profilePic"
            />
            <label className="uploadButton">
              Upload
              <input type="file" style={{ display: "none" }} onChange={handleImageChange} />
            </label>
            <button className="deleteButton" onClick={() => setImage(null)}>
              Delete
            </button>
          </div>

          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

          <form className="form-settings" onSubmit={handleSubmit}>
            <div className="formGroup-settings">
              <label>Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-settings"
              />
            </div>

            <div className="formGroup-settings">
              <label>Last Name</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="input-settings"
              />
            </div>

            <div className="formGroup-settings">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-settings"
              />
            </div>

            <div className="formGroup-settings">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-settings"
              />
            </div>

            <div className="formGroup-settings">
              <label>New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-settings"
              />
            </div>

            <div className="formGroup-settings">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-settings"
              />
            </div>

            <div className="formGroup-settings">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input-settings"
              />
            </div>

            <div className="buttonGroup-settings">
              <button type="submit" className="btn">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
