import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../../../Layout/Navbar";
import "./PatientsList.css";

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/all-patients");
        setPatients(res.data.patients || []);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = (id) => {
    setPatients(patients.filter((p) => p._id !== id));
  };

  const handleEdit = (patient) => {
    setEditingPatient({ ...patient });
  };

  const handleChange = (e) => {
    setEditingPatient({ ...editingPatient, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setPatients(
      patients.map((p) => (p._id === editingPatient._id ? editingPatient : p))
    );
    setEditingPatient(null);
  };

  const handleCancel = () => {
    setEditingPatient(null);
  };

  return (
    <div className="main">
      <Sidebar />
      <div className="main-content">
        <div className="nav">
          <Navbar />
        </div>
        <div className="patients-container">
          <h2>Patients List</h2>
          <div className="table-wrapper">
            <table className="patients-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={patient._id}>
                    <td>{index + 1}</td>
                    <td>{patient.name} {patient.lastName}</td>
                    <td>{patient.gender || "--"}</td>
                    <td>{patient.email}</td>
                    <td>{patient.phone || "--"}</td>
                    <td className="actions">
                      <button className="edit-btn" onClick={() => handleEdit(patient)}>
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(patient._id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingPatient && (
            <div className="edit-form-container">
              <h3>Edit Patient</h3>
              <input
                type="text"
                name="name"
                value={editingPatient.name}
                onChange={handleChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                value={editingPatient.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
              
              <input
                type="date"
                name="dob"
                value={editingPatient.dob || ""}
                onChange={handleChange}
                placeholder="Date of Birth"
              />
              <input
                type="email"
                name="email"
                value={editingPatient.email}
                onChange={handleChange}
                placeholder="Email"
              />
             <input
               type="text"
               name="gender"
               value={editingPatient.gender || ""}
               onChange={handleChange}
               placeholder="Gender"  
              />

               < input
               type="number"
               name="phone"  
                value={editingPatient.phone || ""}  
               onChange={handleChange}
               placeholder="Phone"
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

export default PatientsList;
