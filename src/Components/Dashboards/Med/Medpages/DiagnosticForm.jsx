import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../../Pages/AuthContext";
import Side from "../Layouts/Side";
import Navbar from "../../../Layout/Navbar";
import "./DiagnosticForm.css";
import "react-toastify/dist/ReactToastify.css";

const DiagnosticForm = () => {
  const { user } = useAuth();
  const [patientName, setPatientName] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || user.role !== "doctor") {
      toast.error("You need to be logged in as a doctor.");
      return;
    }

    if (!patientName || !content) {
      toast.error("Patient name and content are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:4000/api/diagnostics/create",
        {
          doctorId: user._id,
          patientName,
          diagnosis: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(" Diagnostic sent successfully!");
      setPatientName("");
      setContent("");
    } catch (error) {
      console.error("Error sending diagnostic:", error);
      toast.error(
        `❌ ${error.response?.data?.message || "Error sending diagnostic."}`
      );
    }
  };

  return (
    <div className="main">
      <Side />
      <div className="contents">
        <div className="nav">
          <Navbar />
        </div>
        <div className="diagnostic-form-page">
          <div className="diagnostic-form-container">
            <h2>Send Diagnostic</h2>
            <form className="diagnostic-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="patientName">Patient Name:</label>
                <input
                  type="text"
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter patient full name "
                />
              </div>

              <div>
                <label htmlFor="content">Diagnostic Content:</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter the diagnostic content"
                ></textarea>
              </div>

              <button type="submit">Send Diagnostic</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DiagnosticForm;
