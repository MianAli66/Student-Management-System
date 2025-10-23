import React from "react";
import "../styling/Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="form-box">
        <h1 className="title">Welcome to Student Management System</h1>

        <div className="button-row">
          <div className="column">
            <form method="get">
              <input
                type="submit"
                formAction="/loginasstudent"
                value="Login as Student"
                className="btn"
              />
            </form>
            <p className="link">
              Don’t have an account?{" "}
              <a href="/signupasstudent">Signup</a>
            </p>
          </div>

          <div className="column">
            <form method="get">
              <input
                type="submit"
                formAction="/loginasteacher"
                value="Login as Teacher"
                className="btn"
              />
            </form>
            <p className="link">
              Don’t have an account?{" "}
              <a href="/signupasteacher">Signup</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
