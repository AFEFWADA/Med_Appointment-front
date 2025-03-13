import React from "react";
import "./Patients.css";
import patient1 from "../../../assets/p1.png";
import patient2 from "../../../assets/p1.png";
import patient3 from "../../../assets/p1.png";
import patient4 from "../../../assets/p1.png";

const RecentPatients = () => {
  const patients = [
    { id: "R00001", name: "Andrea Lalema", age: 21, dob: "07 January 2002", diagnosis: "Heart attack", triage: "Non Urgent", image: patient1 },
    { id: "R00002", name: "Mark Hay Smith", age: 23, dob: "06 January 2002", diagnosis: "Jaundice", triage: "Emergency", image: patient2 },
    { id: "R00003", name: "Cristina Groves", age: 25, dob: "10 January 2002", diagnosis: "Malaria", triage: "Out Patient", image: patient3 },
    { id: "R00004", name: "Galaviz Lalema", age: 21, dob: "09 January 2002", diagnosis: "Typhoid", triage: "Non Urgent", image: patient4 },
  ];

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
            <th>Age</th>
            <th>Date of Birth</th>
            <th>Diagnosis</th>
            <th>Triage</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td><input type="checkbox" /></td>
              <td>{patient.id}</td>
              <td className="patient-info">
                <img src={patient.image} alt={patient.name} />
                {patient.name}
              </td>
              <td>{patient.age}</td>
              <td>{patient.dob}</td>
              <td>{patient.diagnosis}</td>
              <td>
                <span className={`tag ${patient.triage.replace(/\s+/g, '-').toLowerCase()}`}>
                  {patient.triage}
                </span>
              </td>
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
