import React, { useState } from "react";
import "../styling/Tealogin.css";
import { useNavigate } from "react-router-dom";

function Tealogin() {
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
      const res = await fetch("http://localhost:3000/tealogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (data.success){
        navigate("/teadashbord",{state:{tprofile: data.tprofile , sdata: data.sdata  }});
       
      }
      else alert("Invalid email or password!");
    } catch (err) {
      console.error(err);
      alert("Error while logging in!");
    }
  };

  return (
    <div className="tea-container">
      <div className="tea-box">
        <h2 className="tea-title">Teacher Login</h2>
        <form onSubmit={handleSubmit} className="tea-form">
          <label className="tea-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="tea-input"
            required
            onChange={handleChange}
          />

          <label className="tea-label">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="tea-input"
            required
            onChange={handleChange}
          />

          <button type="submit" className="tea-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Tealogin;
