import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../../../Layout/Navbar";
import "./DoctorsList.css";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/user/all-doctors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(res.data.data);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirm) return;
  
    try {
      const token = localStorage.getItem("token");
  
      await axios.delete(`http://localhost:4000/api/user/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
      alert("Doctor deleted successfully!");
    } catch (error) {
      console.error("Failed to delete doctor:", error);
      alert("Failed to delete doctor. Please make sure you have the right permissions.");
    }
  };
  

  const handleEdit = (doctor) => {
    setEditingDoctor({ ...doctor });
  };

  const handleChange = (e) => {
    setEditingDoctor({ ...editingDoctor, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.patch(
        `http://localhost:4000/api/user/update-user/${editingDoctor._id}`,
        editingDoctor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the doctors list with the updated doctor info
      setDoctors(
        doctors.map((doc) =>
          doc._id === editingDoctor._id ? res.data.data.user : doc
        )
      );

      setEditingDoctor(null);
      alert("Doctor updated successfully!");
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Failed to update doctor. Please ensure you have admin access.");
    }
  };
  const handleCancel = () => {
    setEditingDoctor(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredDoctors = doctors.filter((doctor) =>
    (`${doctor.name} ${doctor.lastName}`.toLowerCase().includes(searchQuery) ||
      (doctor.specialty || "").toLowerCase().includes(searchQuery) ||
      (doctor.email || "").toLowerCase().includes(searchQuery) )
  );

  return (
    <div className="main">
      <Sidebar />
      <div className="main-content">
        <div className="nav">
          <Navbar />
        </div>
        <div className="doctors-container">
          <h2>Doctors List</h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="table-wrapper">
            <table className="doctors-table">
              <thead>
                <tr>
                <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Specialty</th>
                  <th>Experience</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor , index) => (
                    <tr key={doctor._id}>
                      <td>{index + 1}</td>
                      <td>{`${doctor.name} ${doctor.lastName}`}</td>
                      <td>{doctor.email || "N/A"}</td>
                      <td>{doctor.specialty || "N/A"}</td>
                      <td>{doctor.experience ? `${doctor.experience} yrs` : "N/A"}</td>

                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEdit(doctor)}>
                          <FaEdit />
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(doctor._id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-results">
                      No matching doctors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {editingDoctor && (
            <div className="edit-form-container">
              <h3>Edit Doctor</h3>
              <input
                type="text"
                name="name"
                value={editingDoctor.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="text"
                name="lastName"
                value={editingDoctor.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            
              <input
                type="email"
                name="email"
                value={editingDoctor.email}
                onChange={handleChange}
                placeholder="Email"
              />
              
              <input
                type="text"
                name="specialty"
                value={editingDoctor.specialty}
                onChange={handleChange}
                placeholder="Specialty"
              />

              <input
                type="number"
                name="experience"
                value={editingDoctor.experience || ""}
                onChange={handleChange}
               placeholder="Experience (years)"
                min="1"
               />

              <div className="edit-buttons">
                <button className="save-btn" onClick={handleSave}>
                  <FaSave /> Save
                </button>
                <button className="cancel-btn" onClick={handleCancel}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
