import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/Stusignup.css";

function Stusignup() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    name: "",
    father: "",
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
    }
    else if (pass.length < 8) {
      setMsg("Password must be at least 8 characters.");
      setBtnDisabled(true);
    } else if (!specialChar.test(pass)) {
      setMsg("Password must include a special character.");
      setBtnDisabled(true);
    } else if (conf.length > 0 && pass !== conf) {
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
      const res = await fetch("http://localhost:3000/stusignup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (data.success) {
        navigate("/stuotp");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="student-signup-container">
      <div className="student-form-box">
        <h2 className="student-title">Student Signup</h2>

        <form onSubmit={handlesubmit}>
          <label>Full Name</label>
          <input type="text" name="name" placeholder="Enter your name" onChange={handlechange} required />

          <label>Father's Name</label>
          <input type="text" name="father" placeholder="Enter your father name" onChange={handlechange} required />

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
              className="toggle"
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
              className="toggle2"
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
            <p className="msg" style={{ color: "red", marginBottom: "5px", marginLeft: "50px", fontSize: "14px" }}>
              {msg}
            </p>
          )}

          <button type="submit" className="student-btn" disabled={btnDisabled}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default Stusignup;
