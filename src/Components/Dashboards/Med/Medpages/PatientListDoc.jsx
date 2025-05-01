import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../../Layout/Navbar";
import Sidebar from "../Layouts/Side";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./PatientListDoc.css";

const PatientListDoc = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
        try {
          const token = localStorage.getItem("token");// ou selon ton système
          const response = await axios.get("http://localhost:4000/api/appointments/doctor-appointments", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      

    fetchAppointments();
  }, []);

  return (
    <div className="mains">
      <Sidebar />
      <div className="nav">
        <Navbar />
      </div>

      <div className="appointment-list">
        <h2>Liste des Rendez-vous</h2>
        <ul>
          {appointments.map((appt) => (
            <li key={appt._id}>
              Patient : {appt.patient?.name} {appt.patient?.lastName} - Date : {new Date(appt.date).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
};

export default PatientListDoc;
