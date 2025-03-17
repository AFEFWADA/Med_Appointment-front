import React, { useState } from "react";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../../../Layout/Navbar";
import "./DoctorSchedule.css";

const initialDoctors = [
  { id: 1, name: "Andrea Lalema", department: "Cardiology", days: "Mon - Sun", time: "09:00 AM - 06:00 PM", status: "Active", avatar: "https://via.placeholder.com/40" },
  { id: 2, name: "William Stephin", department: "Cardiology", days: "Sun, Mon, Tue, Wed, Thu", time: "10:00 AM - 07:00 PM", status: "In Active", avatar: "https://via.placeholder.com/40" },
  { id: 3, name: "Smith Bruklin", department: "Cardiology", days: "Mon - Sat", time: "09:00 AM - 06:00 PM", status: "Active", avatar: "https://via.placeholder.com/40" },
];

const DoctorSchedule = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [search, setSearch] = useState("");

  // search doctors
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="schedule-container">
          <h2>Doctor Schedule</h2>
          <div className="top-bar">
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="add-btn">
              <FaPlus />
            </button>
          </div>
          <div className="table-wrapper">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Department</th>
                  <th>Available Days</th>
                  <th>Available Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>
                      {doctor.name}
                    </td>
                    <td>{doctor.department}</td>
                    <td>{doctor.days}</td>
                    <td>{doctor.time}</td>
                    <td>
                      <span className={`status ${doctor.status === "Active" ? "active" : "inactive"}`}>
                        {doctor.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn">
                        <FaEllipsisV />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
