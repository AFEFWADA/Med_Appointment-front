import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Navbar from "../../../Layout/Navbar";
import Sidebar from "../../../Dashboards/Patient/Layouts/Sidebar";
import "./Doctorlists.css";

const initialDoctors = [
  { id: 1, name: "coulson shield",  dob: "1978-06-15", email: "coulson@gmail.com",  speciality: "Neurology" },
  { id: 2, name: "Jane Smith",  dob: "1985-09-22", email: "janesmith@example.com",  speciality: "Neurology" },
  { id: 3, name: "Michael Johnson", dob: "1973-03-10", email: "michaelj@example.com",  speciality: "Neurology" },
];

const DoctorsLists = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  const handleEdit = (doctor) => {
    setEditingDoctor({ ...doctor });
  };

  const handleChange = (e) => {
    setEditingDoctor({ ...editingDoctor, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setDoctors(
      doctors.map((d) => (d.id === editingDoctor.id ? editingDoctor : d))
    );
    setEditingDoctor(null);
  };

  const handleCancel = () => {
    setEditingDoctor(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery) ||
    doctor.speciality.toLowerCase().includes(searchQuery) ||
    doctor.email.toLowerCase().includes(searchQuery) ||
    doctor.place.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="mains">
      <Sidebar />
      <div className="mains-content">
        <Navbar />
        <div className="doctors-containers">
          <h2>Doctors List</h2>
          
          {/* Search Bar */}
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search doctors..." 
              value={searchQuery} 
              onChange={handleSearch} 
            />
          </div>

          <div className="table-wrapper">
            <table className="doctors-tables">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Email</th>
                  <th>Speciality</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor.id}>
                      <td>{doctor.id}</td>
                      <td>{doctor.name}</td>
                      <td>{doctor.dob}</td>
                      <td>{doctor.email}</td>
                      <td>{doctor.speciality}</td>
                      <td className="actions">
                        <button className="edit-btn" onClick={() => handleEdit(doctor)}>
                          <FaEdit />
                        </button>
                        <button className="delete-btn" onClick={() => handleDelete(doctor.id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-results">No matching doctors found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {editingDoctor && (
            <div className="edit-form-containers">
              <h3>Edit Doctor</h3>
              <input type="text" name="name" value={editingDoctor.name} onChange={handleChange} placeholder="Name" />
              <input type="date" name="dob" value={editingDoctor.dob} onChange={handleChange} placeholder="Date of Birth" />
              <input type="email" name="email" value={editingDoctor.email} onChange={handleChange} placeholder="Email" />
              <input type="text" name="speciality" value={editingDoctor.speciality} onChange={handleChange} placeholder="Speciality" />
              
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

export default DoctorsLists;
