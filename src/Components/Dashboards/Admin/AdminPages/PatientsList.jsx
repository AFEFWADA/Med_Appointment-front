import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../../../Layout/Navbar";
import "./PatientsList.css";

const initialPatients = [
  { id: 1, name: "John Doe", age: 30, dob: "1993-05-14", email: "johndoe@example.com", mobile: "123-456-7890", diagnosis: "Flu" },
  { id: 2, name: "Jane Smith", age: 25, dob: "1998-08-22", email: "janesmith@example.com", mobile: "987-654-3210", diagnosis: "Asthma" },
  { id: 3, name: "Michael Johnson", age: 40, dob: "1983-02-10", email: "michaelj@example.com", mobile: "555-123-4567", diagnosis: "Diabetes" },
];

const PatientsList = () => {
  const [patients, setPatients] = useState(initialPatients);
  const [editingPatient, setEditingPatient] = useState(null);

  const handleDelete = (id) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  const handleEdit = (patient) => {
    setEditingPatient({ ...patient });
  };

  const handleChange = (e) => {
    setEditingPatient({ ...editingPatient, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setPatients(
      patients.map((p) => (p.id === editingPatient.id ? editingPatient : p))
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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Date of Birth</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Diagnosis</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.dob}</td>
                    <td>{patient.email}</td>
                    <td>{patient.mobile}</td>
                    <td>{patient.diagnosis}</td>
                    <td className="actions">
                      <button className="edit-btn" onClick={() => handleEdit(patient)}>
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(patient.id)}>
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
                placeholder="Name"
              />
              <input
                type="number"
                name="age"
                value={editingPatient.age}
                onChange={handleChange}
                placeholder="Age"
              />
              <input
                type="date"
                name="dob"
                value={editingPatient.dob}
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
                name="mobile"
                value={editingPatient.mobile}
                onChange={handleChange}
                placeholder="Mobile"
              />
              <input
                type="text"
                name="diagnosis"
                value={editingPatient.diagnosis}
                onChange={handleChange}
                placeholder="Diagnosis"
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
