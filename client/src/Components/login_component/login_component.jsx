import React, { useState } from "react";
import './login.css';
import citybg from '../../Assets/citybg.jpg';
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [building, setBuilding] = useState(""); // State for storing building data

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          // Extract building data from user data
          const userBuilding = data.building; // Access data.building directly
          console.log("User building:", userBuilding);
          window.localStorage.setItem("userBuilding", JSON.stringify(userBuilding));
          // After setting userBuilding in localStorage
          console.log("Stored userBuilding in localStorage:", userBuilding);


          // Set building data in state
          setBuilding(userBuilding);

          // Redirect or perform further actions
          window.location.href = "./userDetails";
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred during login");
      });
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className='bggg' style={{ backgroundImage: `url(${citybg})` }}>
      <form onSubmit={handleSubmit} className="form">
        <h3>Login</h3><br></br><br></br>

        <div className="input-container">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="username">
            <FontAwesomeIcon icon={faUser} />
          </label>
        </div>

        <div className="input-container">
          <input
            type={passwordVisible ? "text" : "password"}
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="password" className="password-icon">
            {passwordVisible ? (
              <FontAwesomeIcon icon={faEye} onClick={togglePasswordVisibility} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} onClick={togglePasswordVisibility} />
            )}
          </label>
        </div>

        <div className="bbtn">
          <button className="button-28" type="submit">Log In</button>
        </div><br></br>
        <p className="forgot-password text-right">
            Already registered <a href="/sign-up">sign up?</a>
          </p>
      </form>
    </div>
  );
}






