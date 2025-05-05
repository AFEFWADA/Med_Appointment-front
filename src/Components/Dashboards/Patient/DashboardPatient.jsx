import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Layouts/Sidebar";
import Navbar from "../../Layout/Navbar";
import "./DashboardPatient.css";
import MedicalHistory from "./PatientPages/MedicalHistory";

const DashboardPatient = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Charger les rendez-vous depuis une API (simulé ici)  
    setAppointments([
      { title: "Rendez-vous avec Dr. Smith", start: "2025-03-20T10:00:00" },
      { title: "IRM à l'hôpital", start: "2025-03-22T14:00:00" },
    ]);
  }, []);

  const handleDateClick = (arg) => {
    const title = prompt("Entrez le motif du rendez-vous:");
    if (title) {
      const newEvent = { title, start: arg.dateStr };
      setAppointments((prevAppointments) => [...prevAppointments, newEvent]);
      toast.success("✅ Rendez-vous envoyé avec succès !");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <div className="nav">
          <Navbar />
        </div>
        <div className="first-section">
        <h2>Welcome to your dashboard</h2>

       <MedicalHistory /> 

        <div className="calendar-container">
        <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={appointments}
        dateClick={handleDateClick}
        height="auto"  // Permet au calendrier de s'adapter
         />
         </div>
         </div>

        <div className="notifications">
          <h3>🔔 Notifications</h3>
          <p>📢 Nouveau diagnostic disponible de Dr. John Doe</p>
          <p>📅 Votre rendez-vous du 22 mars est confirmé.</p>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default DashboardPatient;
