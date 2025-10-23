import React, { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styling/Teadashbord.css";


function Teacherdashboard() {
  
 const location = useLocation();
  const { sdata = [], tprofile = {} } = location.state || {};

const [selectedStudents ,setselectedstudents ] = useState([]);


 useEffect(() => {
    setselectedstudents(sdata);
  }, [sdata]);

  return (
    <div className="teacher-main-container">
      {/* Left Section - Teacher Profile */}
      <div className="teacher-profile-section">
        <h2 className="teacher-section-title">Teacher Profile</h2>
        <div className="teacher-profile-card">
          <p><strong>Name:</strong> {tprofile.name}</p>
          <p><strong>Subject:</strong> {tprofile.subject}</p>
          <p><strong>Email:</strong> {tprofile.email}</p>
          <p><strong>Qualification:</strong> {tprofile.qualification}</p>
        </div>
      </div>

      {/* Right Section - Students List */}
      <div className="teacher-student-section">
        <h2 className="teacher-section-title">Selected Students</h2>
        <div className="teacher-student-list">
          {selectedStudents.map((sdata, index) => (
            <div key={index} className="teacher-student-box">
              <h3 className="teacher-student-name">{sdata.name}</h3>
              <p className="teacher-student-course">{sdata.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teacherdashboard;
