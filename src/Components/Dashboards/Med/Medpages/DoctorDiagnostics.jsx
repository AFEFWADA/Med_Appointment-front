import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../Pages/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Side from "../Layouts/Side";
import Navbar from "../../../Layout/Navbar";
import "./DoctorDiagnostics.css";
import "react-toastify/dist/ReactToastify.css";

const DoctorDiagnostics = () => {
  const { user } = useAuth();
  const [diagnostics, setDiagnostics] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);
  const [newDiagnosis, setNewDiagnosis] = useState("");

  useEffect(() => {
    if (user && user._id) {
      fetchDiagnostics();
    }
  }, [user]);

  const fetchDiagnostics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:4000/api/diagnostics/doctor/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDiagnostics(response.data);
    } catch (error) {
      console.error("Error fetching diagnostics:", error);
      toast.error("Failed to fetch diagnostics.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this diagnostic?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/diagnostics/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Diagnostic deleted successfully.");
      setDiagnostics(diagnostics.filter((d) => d._id !== id));
    } catch (error) {
      console.error("Error deleting diagnostic:", error);
      toast.error("Failed to delete diagnostic.");
    }
  };

  const handleEdit = (id) => {
    const diagnosticToEdit = diagnostics.find((diag) => diag._id === id);
    setSelectedDiagnostic(diagnosticToEdit);
    setNewDiagnosis(diagnosticToEdit.diagnosis);
    setEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedDiagnostic = {
        ...selectedDiagnostic,
        diagnosis: newDiagnosis,
      };

      const response = await axios.put(
        `http://localhost:4000/api/diagnostics/${selectedDiagnostic._id}`,
        updatedDiagnostic,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Diagnostic updated successfully.");
        setDiagnostics(
          diagnostics.map((diag) =>
            diag._id === selectedDiagnostic._id ? updatedDiagnostic : diag
          )
        );
        setEditModal(false);
      }
    } catch (error) {
      console.error("Error updating diagnostic:", error);
      toast.error("Failed to update diagnostic.");
    }
  };

  return (
    <div className="main">
      <Side />
      <div className="nav">
        <Navbar />
      </div>
      <div className="contents">
        <div className="diagnostics-container">
          <h2>My Diagnostics</h2>
          {diagnostics.length === 0 ? (
            <p>No diagnostics found.</p>
          ) : (
            <div className="table-wrapper">
              <table className="diagnostics-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Diagnosis</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnostics.map((diag) => (
                    <tr key={diag._id}>
                      <td>
                        {diag.patientName ||
                          `${diag.patientId?.name} ${diag.patientId?.lastName}`}
                      </td>
                      <td>{diag.diagnosis}</td>
                      <td className="actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(diag._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(diag._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editModal && (
          <div className="edit-form-container">
            <h3>Edit Diagnostic</h3>
            <textarea
              value={newDiagnosis}
              onChange={(e) => setNewDiagnosis(e.target.value)}
              rows="5"
              placeholder="Update diagnosis..."
            ></textarea>
            <div className="edit-buttons">
              <button className="save-btn" onClick={handleUpdate}>
                Save Changes
              </button>
              <button
                className="cancel-btn"
                onClick={() => setEditModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DoctorDiagnostics;
