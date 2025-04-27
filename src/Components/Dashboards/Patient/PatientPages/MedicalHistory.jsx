import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './MedicalHistory.css'; // Assuming you have a CSS file for styling

const MedicalHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

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
          `http://localhost:4000/api/appointments/by-userId/${user.userId}`, // Added pagination to the request
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAppointments(response.data.appointments);
          setTotalPages(response.data.totalPages); // Assuming the response contains totalPages
        }
      } catch (err) {
        setError('Failed to fetch appointments');
        console.error('Error:', err);
      }
    };

    fetchAppointments();
  }, [token, user, currentPage]);  // Added currentPage dependency to trigger pagination update

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!appointments.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="medical-history">
      <div className="header">
        <h4>Appointments</h4>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Treatment</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.doctor}</td>
              <td>{appointment.treatment}</td>
              <td>{appointment.date}</td>
              <td>
                <button className="btn">Reschedule</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <button className="page-number" onClick={() => handlePageChange(currentPage - 1)}>
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
          <button className="page-number" onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MedicalHistory;
