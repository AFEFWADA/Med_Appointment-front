import React, { useState } from "react";
import "./AppointmentsList.css";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../../../Layout/Navbar";

const initialAppointments = [
  {
    id: 1,
    patient_name: "Andrea Lalema",
    doctor_name: "Dr. Bernardo James",
    treatment: "Infertility",
    mobile: "+1 23 456890",
    email: "andrea@email.com",
    date: "01.10.2022",
    time: "07:30",
  },
  {
    id: 2,
    patient_name: "Michael Doe",
    doctor_name: "Dr. Sarah Williams",
    treatment: "General Checkup",
    mobile: "+1 98 765432",
    email: "michael@email.com",
    date: "02.10.2022",
    time: "10:00",
  },
  {
    id: 3,
    patient_name: "Emma Watson",
    doctor_name: "Dr. Robert Brown",
    treatment: "Cardiology",
    mobile: "+1 55 789654",
    email: "emma@email.com",
    date: "03.10.2022",
    time: "09:15",
  },
];

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patient_name.toLowerCase().includes(searchQuery) ||
    appointment.doctor_name.toLowerCase().includes(searchQuery) ||
    appointment.treatment.toLowerCase().includes(searchQuery) ||
    appointment.mobile.includes(searchQuery) ||
    appointment.email.toLowerCase().includes(searchQuery) ||
    appointment.date.includes(searchQuery) ||
    appointment.time.includes(searchQuery)
  );

  return (
    <div className="main">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar />

        {/* Appointment List */}
        <div className="appointments-container">
          <div className="top-bar">
            <h2 className="center">Appointments</h2>
            <div className="actions">
              <input 
                type="text" 
                placeholder="Search here..." 
                value={searchQuery} 
                onChange={handleSearch}
              />
              <button className="add-btn">+</button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Consulting Doctor</th>
                  <th>Treatment</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td><span className="doctor-patient">{appointment.patient_name}</span></td>
                      <td>{appointment.doctor_name}</td>
                      <td>{appointment.treatment}</td>
                      <td className="mobile">{appointment.mobile}</td>
                      <td>{appointment.email}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td><button className="action-btn">⋮</button></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-results">No matching appointments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <span>Items Per Page <select><option>10</option></select></span>
            <span>Showing {filteredAppointments.length} of {appointments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
