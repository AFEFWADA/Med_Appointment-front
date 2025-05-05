import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../Pages/AuthContext";
import "./PatientDiagnostics.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../../Layout/Navbar";
import Sidebar from "../../../Dashboards/Patient/Layouts/Sidebar";

const PatientDiagnostics = () => {
  const { user } = useAuth();
  const [diagnostics, setDiagnostics] = useState([]);

  useEffect(() => {
    if (user && user._id) {
      fetchDiagnostics();
    }
  }, [user]);

  const fetchDiagnostics = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:4000/api/diagnostics/patient/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDiagnostics(res.data);
    } catch (err) {
      console.error("Failed to fetch diagnostics", err);
      toast.error("Could not load diagnostics.");
    }
  };

  return (
    <div className="main">
      <Sidebar />
      <div className="nav">
        <Navbar />
      </div>

      <div className="diagnostics-container">
        <h2>My Diagnostics</h2>
        {diagnostics.length === 0 ? (
          <p>No diagnostics found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="diagnostics-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Diagnosis</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {diagnostics.map((diag) => (
                  <tr key={diag._id}>
                    <td>
                      {diag.doctorId?.name} {diag.doctorId?.lastName}
                    </td>
                    <td>{diag.diagnosis}</td>
                    <td>{new Date(diag.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientDiagnostics;
