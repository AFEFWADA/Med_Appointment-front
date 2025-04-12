import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Patients.css";
import patientImg from "../../../assets/p1.png"; // Keep using placeholder

const RecentPatients = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/appointments/getAll");
        setAppointments(res.data.appointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Recent Patients</h3>
        <a href="/patient.jsx" className="show-all">Show all</a>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>No</th>
            <th>Patient name</th>
            <th>Gender</th>
            <th>Mobile</th>
            <th>Email</th>
            
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, index) => (
            <tr key={a._id}>
              <td><input type="checkbox" /></td>
              <td>{index + 1}</td>
              <td className="patient-info">
                <img src={patientImg} alt={`${a.name} ${a.lastName}`} />
                {a.name} {a.lastName}
              </td>
              <td>{a.gender}</td>
              <td>{a.mobile}</td>
              <td>{a.email}</td>
              
              <td><button className="options">⋮</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button className="btn-prev">Previous</button>
        <span className="current-page">1</span>
        <button className="btn-next">Next</button>
      </div>
    </div>
  );
};

export default RecentPatients;
