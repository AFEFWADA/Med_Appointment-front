import React from "react";
import "./UpcomingAppointments.css";
import doctor1 from "../../../assets/p1.png";
import doctor2 from "../../../assets/p1.png";
import doctor3 from "../../../assets/p1.png";
import doctor4 from "../../../assets/p1.png";

const appointments = [
  { id: "R00001", name: "Andrea Lalema", doctor: "Dr. Jenny Smith", image: doctor1, time: "12.05.2022 at 7.00 PM", disease: "Fracture" },
  { id: "R00002", name: "Cristina Groves", doctor: "Dr. Angelica Ramos", image: doctor2, time: "13.05.2022 at 7.00 PM", disease: "Fever" },
  { id: "R00003", name: "Bernardo", doctor: "Dr. Martin Doe", image: doctor3, time: "14.05.2022 at 7.00 PM", disease: "Fracture" },
  { id: "R00004", name: "Galaviz Lalema", doctor: "Dr. William Jerk", image: doctor4, time: "15.05.2022 at 7.00 PM", disease: "Fracture" },
  { id: "R00005", name: "Cristina Groves", doctor: "Dr. Angelica Ramos", image: doctor2, time: "16.05.2022 at 7.00 PM", disease: "Fever" },
];

const UpcomingAppointments = () => {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Upcoming Appointments</h3>
        <a href="/doctors.jsx" className="show-all">Show all</a>
      </div>
      
      <table>
        <thead>
          <tr>
            <th></th>
            <th>No</th>
            <th>Patient name</th>
            <th>Doctor</th>
            <th>Time</th>
            <th>Disease</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id}>
              <td><input type="checkbox" /></td>
              <td>{app.id}</td>
              <td>{app.name}</td>
              <td className="doctor-info">
                <img src={app.image} alt={app.doctor} />
                <a href="/doctors.jsx" className="doctor-link">{app.doctor}</a>
              </td>
              <td>{app.time}</td>
              <td>
                <span className={`tag ${app.disease.toLowerCase()}`}>{app.disease}</span>
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

export default UpcomingAppointments;
