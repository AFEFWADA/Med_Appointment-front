import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AppointmentsList.css";
import Sidebar from "../Layouts/Sidebar";
import Navbar from "../../../Layout/Navbar";
import { FaImages } from "react-icons/fa";
import { format } from "date-fns";

const AppointmentsList = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/appointments/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(res.data.appointments || []);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleViewImages = (images = []) => {
    setSelectedImages(images);
    setShowModal(true);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    (appointment.name || "").toLowerCase().includes(searchQuery) ||
    (appointment.lastName || "").toLowerCase().includes(searchQuery) ||
    (appointment.doctor || "").toLowerCase().includes(searchQuery) ||
    (appointment.treatment || "").toLowerCase().includes(searchQuery) ||
    (appointment.mobile || "").includes(searchQuery) ||
    (appointment.email || "").toLowerCase().includes(searchQuery) ||
    (appointment.date || "").includes(searchQuery)
  );

  return (
    <div className="main">
      <Sidebar />
      <div className="main-content">
        <div className="nav">
          <Navbar />
        </div>

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
            </div>
          </div>

          <div className="table-wrapper">
            <table className="appointments-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>Doctor</th>
                  <th>Treatment</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Images</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment, index) => (
                    <tr key={appointment._id}>
                      <td>{index + 1}</td>
                      <td>{appointment.name} {appointment.lastName}</td>
                      <td>{appointment.doctor}</td>
                      <td>{appointment.treatment}</td>
                      <td>{appointment.mobile}</td>
                      <td>{appointment.email}</td>
                      <td>{format(new Date(appointment.date), "yyyy-MM-dd")}</td>
                      <td>{`${appointment.fromTime}:00 - ${appointment.toTime}:00`}</td>
                      <td>
                        <button
                          onClick={() => handleViewImages(appointment.images || [])}
                          className="image-btn"
                          title="View Images"
                        >
                          <FaImages />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-results">
                      No matching appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Image Modal */}
          {showModal && (
            <div className="image-modal">
              <div className="modal-content">
                <h3>Uploaded Images</h3>
                <div className="images-preview">
                  {selectedImages.length > 0 ? (
                    selectedImages.map((img, index) => {
                      const normalizedPath = img.includes("uploads")
                        ? img.slice(img.indexOf("uploads")).replace(/\\/g, "/")
                        : img;
                      return (
                        <img
                          key={index}
                          src={`http://localhost:4000/${normalizedPath}`}
                          alt={`Uploaded ${index + 1}`}
                          className="preview-image"
                        />
                      );
                    })
                  ) : (
                    <p>No images uploaded for this appointment.</p>
                  )}
                </div>
                <button onClick={() => setShowModal(false)} className="close-btn">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
