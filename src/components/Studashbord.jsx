import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styling/Studashbord.css";

function Studashbord() {
  const location = useLocation();
  const { teachers = [], student, assignedTeachers = [] } = location.state || {};
  const [showProfile, setShowProfile] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState(assignedTeachers);

  useEffect(() => {
    const fetchAssigned = async () => {
      if (student && student.id) {
        const response = await fetch("http://localhost:3000/getAssignedTeachers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentId: student.id }),
        });
        const data = await response.json();
        if (data.success) {
          setSelectedSubjects(data.assignedTeachers);
        }
      }
    };
    fetchAssigned();
  }, [student]);

  const handleSelect = async (teacher) => {
    if (selectedSubjects.some((s) => s.id === teacher.id)) {
      alert("⚠️ This teacher is already selected!");
      return;
    }
    await fetch("http://localhost:3000/updateteacher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: student.id, teacherId: teacher.id }),
    });
    setSelectedSubjects([...selectedSubjects, teacher]);
  };

  const handleRemove = async (teacherId) => {
    await fetch("http://localhost:3000/removeteacher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: student.id, teacherId }),
    });
    setSelectedSubjects(selectedSubjects.filter((t) => t.id !== teacherId));
  };

  return (
    <div id="dashboard-container">

      <div id="teachers-section">
        <h2 id="teachers-title">Available Teachers</h2>
        <div id="teachers-grid">
          {teachers.map((t) => (
            <div id="teacher-card" key={t.id}>
              <h3 id="teacher-name">{t.name}</h3>
              <p id="teacher-subject">{t.subject}</p>
              <p id="teacher-qualification">{t.qualification}</p>
              <button id="select-btn" onClick={() => handleSelect(t)}>
                Select
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      <div id="profile-section">
        <button id="toggle-profile-btn" onClick={() => setShowProfile(!showProfile)}>
          {showProfile ? "Hide Profile" : "My Profile"}
        </button>

        {showProfile && (
          <div id="profile-card">
            <h2 id="profile-title">My Profile</h2>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Father Name:</strong> {student.father}</p>
            <p><strong>Email:</strong> {student.email}</p>

            <div id="selected-subjects">
              <h3>Selected Subjects</h3>
              {selectedSubjects.length === 0 ? (
                <p>No subjects selected yet.</p>
              ) : (
                <ul>
                  {selectedSubjects.map((tea) => (
                    <li key={tea.id} className="selected-teacher-item">
                      {tea.subject} ({tea.name})
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(tea.id)}
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Studashbord;
