import React, { useState, useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";

function Stuotp() {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const [formData, setFormData] = useState({ otp: "" });
  const [timeLeft, setTimeLeft] = useState(60);
  const [expired, setExpired] = useState(false);



  useEffect(() => {
    if (navigationType === "POP") {
      navigate("/signupasstudent", { replace: true });
    }
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/stuotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (data.success) {
        navigate("/studashbord", {
          state: {
            teachers: data.teachers,
            student: data.student,
            assignedTeachers: data.assignedTeachers,
          },
        });
      } else {
        alert("Invalid OTP!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="student-signup-container">
      <div className="student-form-box">
        <h2 className="student-title">OTP Verification</h2>

        <form onSubmit={handleSubmit}>
          <label>OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            required
          />

          <button type="submit" className="student-btn" disabled={expired}>
            Verify OTP
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "2rem",
              color: "rgb(14, 2, 2)",
            }}
          >
            {expired ? (
              <>
                OTP has expired. Please request again. <br />
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch("http://localhost:3000/stuResendcode");
                      const data = await res.json();
                      alert(data.message);
                      if (data.success) {
                        setExpired(false);
                        setTimeLeft(60);

                        const countdown = setInterval(() => {
                          setTimeLeft((prev) => {
                            if (prev <= 1) {
                              clearInterval(countdown);
                              setExpired(true);
                              return 0;
                            }
                            return prev - 1;
                          });
                        }, 1000);

                      }
                    } catch (err) {
                      alert("Error resending code!");
                    }
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "blue",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Resend Code
                </button>
              </>
            ) : (
              `OTP will expire in ${timeLeft} seconds`
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default Stuotp;
