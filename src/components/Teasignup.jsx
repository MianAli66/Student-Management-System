import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/Teasignup.css";

function Teasignup() {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    name: "",
    qualification: "",
    subject: "",
    email: "",
    password: "",
    conpassword: "",
  });

  const [msg, setMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const checkPassword = (name, value) => {
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    let updatedForm = { ...formdata, [name]: value };
    const pass = updatedForm.password;
    const conf = updatedForm.conpassword;

    if (!pass || !conf) {
      setBtnDisabled(true);
    } else if (pass.length < 8) {
      setMsg("Password must be at least 8 characters.");
      setBtnDisabled(true);
    } else if (!specialChar.test(pass)) {
      setMsg("Password must include a special character.");
      setBtnDisabled(true);
    } else if (pass !== conf) {
      setMsg("Passwords do not match.");
      setBtnDisabled(true);
    } else {
      setMsg("");
      setBtnDisabled(false);
    }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
    if (name === "password" || name === "conpassword") checkPassword(name, value);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/teasignup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (data.success) {
        navigate("/teaotp");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="teacher-signup-container">
      <div className="teacher-form-box">
        <h2 className="teacher-title">Teacher Signup</h2>

        <form onSubmit={handlesubmit}>
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter your name" onChange={handlechange} required/>

          <label>Qualification</label>
          <input type="text" name="qualification" placeholder="Enter your qualification" onChange={handlechange} required />

          <label>Subject to teach</label>
          <input type="text" name="subject" placeholder="Enter your subject" onChange={handlechange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" onChange={handlechange} />

          <label>Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              onChange={handlechange}
              className="password"
            />
            <img
              src={
                showPass
                  ? "https://cdn-icons-png.flaticon.com/512/709/709612.png"
                  : "https://cdn-icons-png.flaticon.com/512/159/159604.png"
              }
              alt="toggle"
              onClick={() => setShowPass(!showPass)}
              style={{
                width: "20px",
                height: "20px",
                position: "absolute",
                right: "10px",
                top: "20%",
                cursor: "pointer",
              }}
            />
          </div>

          <label>Confirm Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showConfirm ? "text" : "password"}
              name="conpassword"
              placeholder="Confirm your password"
              onChange={handlechange}
              className="confirm"
            />
            <img
              src={
                showConfirm
                  ? "https://cdn-icons-png.flaticon.com/512/709/709612.png"
                  : "https://cdn-icons-png.flaticon.com/512/159/159604.png"
              }
              alt="toggle2"
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                width: "20px",
                height: "20px",
                position: "absolute",
                right: "10px",
                top: "20%",
                cursor: "pointer",
              }}
            />
          </div>

          {msg && (
            <p style={{ color: "red", marginLeft: "80px", fontSize: "14px" }}>
              {msg}
            </p>
          )}

          <button type="submit" className="teacher-btn" disabled={btnDisabled}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Teasignup;
