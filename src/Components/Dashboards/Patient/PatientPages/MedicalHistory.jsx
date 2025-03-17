import React from "react";
import "./MedicalHistory.css"; // Ajoute un fichier CSS pour le styling

const MedicalHistory = () => {
  const history = [
    {
      doctor: "Dr. Jenny Smith",
      diagnosis: "Dermatology",
      date: "12.05.2022",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      doctor: "Andrea Lalema",
      diagnosis: "Dermatology",
      date: "10.05.2022",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      doctor: "Dr. William Stephin",
      diagnosis: "Dermatology",
      date: "12.05.2022",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  return (
    <div className="medical-history">
      <div className="header">
        <h4>Medical History</h4>
        <a href="#">Show all</a>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Doctor Name</th>
            <th>Diagnosis</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {history.map((record, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>
                <img src={record.image} alt={record.doctor} className="doctor-img" />
                {record.doctor}
              </td>
              <td>{record.diagnosis}</td>
              <td>{record.date}</td>
              <td>
                <button className="reschedule-btn">Reschedule</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="btn">Previous</button>
        <span className="page-number">1</span>
        <button className="btn">Next</button>
      </div>
    </div>
  );
};

export default MedicalHistory;
