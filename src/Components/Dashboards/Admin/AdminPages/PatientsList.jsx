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
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/user/all-patients", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatients(res.data.data || []);
      } catch (error) {
        console.error("Error fetching patients:", error.response?.data || error.message);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this patient?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/user/delete-user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPatients(patients.filter((p) => p._id !== id));
      alert("Patient deleted successfully!");
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient. Please make sure you have admin access.");
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient({ ...patient });
  };

  const handleChange = (e) => {
    setEditingPatient({ ...editingPatient, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await axios.patch(
        `http://localhost:4000/api/user/update-user/${editingPatient._id}`,
        editingPatient,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update UI
      setPatients(
        patients.map((p) =>
          p._id === editingPatient._id ? res.data.data.user : p
        )
      );
  
      setEditingPatient(null);
      alert("Patient updated successfully!");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient. Please ensure you have admin access.");
    }
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
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={patient._id}>
                    <td>{index + 1}</td>
                    <td>{patient.name} {patient.lastName}</td>
                    <td>{patient.email}</td>
                    <td>{patient.role || "--"}</td>
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
                type="number"
                name="phone"
                value={editingPatient.phone || ""}
                onChange={handleChange}
                placeholder="Phone"
              />
              <input
                type="text"
                name="role"
                value={editingPatient.role || ""}
                onChange={handleChange}
                placeholder="Role"
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
