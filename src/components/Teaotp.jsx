
import React, { useState,useEffect } from "react";
import { useNavigate ,useNavigationType } from "react-router-dom";

function Teaotp() {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const [formData, setFormData] = useState({ otp: "" });
 const [timeLeft, setTimeLeft] = useState(60);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
      if (navigationType === "POP") {
      navigate("/signupasteacher", { replace: true });
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
      const response = await fetch("http://localhost:3000/teaotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        navigate("/teadashbord" ,{state:{tprofile: data.tprofile   }});
      } else {
        alert(data.message ||"Invalid OTP!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "transparent", 
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px 40px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "black", marginBottom: "15px" }}>
          OTP Verification
        </h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "8px" }}>Enter OTP</label>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginBottom: "15px",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#4b7bec",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
            }}
          >
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
          const res = await fetch("http://localhost:3000/teaResendcode");
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

export default Teaotp;
