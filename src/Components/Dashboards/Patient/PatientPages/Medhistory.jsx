import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbar from "../../../Layout/Navbar";
import Sidebar from "../../../Dashboards/Patient/Layouts/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Medhistorical.css";

const Medhistorical = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    doctor: "",
    treatment: "",
    date: "",
    fromTime: "",
    toTime: "",
    notes: "",
  });

  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (!user || !user.userId || !token) {
      setError('Token or User ID not found');
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/appointments/by-userId/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAppointments(response.data.appointments);
          setTotalPages(response.data.totalPages);
        }
      } catch (err) {
        setError('Failed to fetch appointments');
        console.error('Error:', err);
      }
    };

    fetchAppointments();
  }, [token, user, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      doctor: appointment.doctor,
      treatment: appointment.treatment,
      date: appointment.date,
      fromTime: appointment.fromTime,
      toTime: appointment.toTime,
      notes: appointment.notes,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/appointments/UpdateById/${editingAppointment._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === editingAppointment._id ? response.data.appointment : appt
          )
        );
        setEditingAppointment(null);
        toast.success('Appointment updated successfully!');
      }
    } catch (err) {
      console.error("Error updating appointment:", err);
      toast.error('Failed to update appointment.');
    }
  };

  const handleCancel = () => {
    setEditingAppointment(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:4000/api/appointments/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setAppointments((prev) => prev.filter((appt) => appt._id !== id));
        toast.success('Appointment deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error.response?.data || error.message);
      toast.error('Failed to delete appointment.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!appointments.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mains">
      <Sidebar />
      <div className="nav">
        <Navbar />
      </div>
      <div className="main--container">
        <div className="header">
          <h4>Appointments</h4>
        </div>

        {editingAppointment ? (
          <div className="edit-form-container">
            <h3>Edit Appointment</h3>
            <input
              type="text"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              placeholder="Doctor"
            />
            <input
              type="text"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              placeholder="Treatment"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date"
            />
            <input
              type="time"
              name="fromTime"
              value={formData.fromTime}
              onChange={handleChange}
              placeholder="From Time"
            />
            <input
              type="time"
              name="toTime"
              value={formData.toTime}
              onChange={handleChange}
              placeholder="To Time"
            />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes"
            />

            <div className="edit-buttons">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Treatment</th>
                <th>Date</th>
                <th>Notes</th> 
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                   <td>{appointment.doctor?.name} {appointment.doctor?.lastName}</td>
                   <td>{appointment.treatment}</td>
                  <td>{appointment.date ? appointment.date.substring(0, 10) : ''}</td>
                  <td>{appointment.notes}</td> 
                  <td>
  <button
    className="btn update-btn"
    onClick={() => handleEdit(appointment)}
  >
    Update
  </button>
  <button
    className="btn delete-btn"
    onClick={() => handleDelete(appointment._id)}
  >
    Delete
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="pagination">
          {currentPage > 1 && (
            <button
              className="page-number"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              className="page-number"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Medhistorical;
