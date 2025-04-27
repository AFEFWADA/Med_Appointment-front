import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Contact from './Components/Pages/Contact';
import Doctors from './Components/Pages/Doctors';
import Login from './Components/Pages/Login';
import About from './Components/Pages/About';
import DashboardAdmin from './Components/Dashboards/Admin/DashboardAdmin';
import PatientsList from './Components/Dashboards/Admin/AdminPages/PatientsList';
import DoctorsList from './Components/Dashboards/Admin/AdminPages/DoctorsList';
import AddDoctor from './Components/Dashboards/Admin/AdminPages/AddDoctor';
import DoctorSchedule from './Components/Dashboards/Admin/AdminPages/DoctorSchedule';
import AppointmentsList from './Components/Dashboards/Admin/AdminPages/AppointmentsList';
import DashboardPatient from './Components/Dashboards/Patient/DashboardPatient';
import AppointmentForm from './Components/Dashboards/Patient/PatientPages/AppointmentForm';
import Doctorlists from './Components/Dashboards/Patient/PatientPages/Doctorlists';
import Medhistorical from './Components/Dashboards/Patient/PatientPages/Medhistory';
import DashboardDoctor from './Components/Dashboards/Med/DoctorDashboard';
import SettingsPage from './Components/Dashboards/Patient/PatientPages/Setting';
import BrainTumorPrediction from './Components/Dashboards/Med/Medpages/TumorDetector.jsx';
import UserImages from './Components/Dashboards/Patient/PatientPages/test.jsx';
function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/About" element={<About />} />

        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/patients-list" element={<PatientsList />} />
        <Route path="/doctors-list" element={<DoctorsList />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/doctors-schedule" element={<DoctorSchedule />} />
        <Route path="/appointments" element={<AppointmentsList />} />

        <Route path="/dashboard-patient" element={<DashboardPatient />} />
        <Route path="/rendez-vous" element={<AppointmentForm />} />
        <Route path="/doctors-list-patient" element={<Doctorlists />} /> 
        <Route path="/appointment-history" element={<Medhistorical />} />

        <Route path="/dashboard-doctor" element={<DashboardDoctor />} />
        <Route path="/brain-tumor-detector" element={< BrainTumorPrediction />} />

        <Route path="/setting" element={<SettingsPage />} />

        <Route path="/test" element={< UserImages />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
