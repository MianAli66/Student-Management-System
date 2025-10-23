import React, { useState } from "react";
import "../styling/Stulogin.css";
import { useNavigate } from "react-router-dom";
function Stulogin() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/stulogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.success) {

        navigate("/studashbord", { state: { teachers: data.teachers, student: data.student, tea: data.teacher, assignedTeachers: data.assignedTeachers, } });
      }
      else alert("Invalid email or password!");

    } catch (err) {
      console.error(err);
      alert("Error while logging in!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            onChange={handleChange}
          />

          <button type="submit" className="student-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Stulogin;

