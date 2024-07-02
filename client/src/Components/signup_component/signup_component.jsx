  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faEye, faEyeSlash, faUser, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

  export default function SignUp() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [building, setBuilding] = useState("");
    const [userType, setUserType] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const [buildingsList, setBuildingsList] = useState([]);

    useEffect(() => {
      fetchBuildingsData();
    }, []);

    const fetchBuildingsData = async () => {
      try {
        const response = await axios.get("http://207.246.91.223:8001/getBuildings");
        setBuildingsList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const handleSubmit = (e) => {
      if (userType === "Admin" && secretKey !== "smartdwell") {
        e.preventDefault();
        alert("Invalid Admin");
      } else {
        e.preventDefault();

        // console.log(fname, lname, email, password);
        fetch("http://207.246.91.223:8001/register", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            fname,
            email,
            lname,
            password,
            userType,
            building,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log(data, "userRegister");
            if (data.status === "ok") {
              alert("Registration Successful");
            } else {
              alert("Something went wrong");
            }
          });
      }
    };

    const togglePasswordVisibility = () => {
      setPasswordVisible((prev) => !prev);
    };

    return (
      <div >
        <form onSubmit={handleSubmit}>
          <h3>Sign Up</h3>
          <div className="adhar">
            <div className="head">
              Register As
            </div>
            <div className="aku">
              <span>
                User
              </span>
              <input
                type="radio"
                name="UserType"
                id="userRadio"
                value="User"
                onChange={(e) => setUserType(e.target.value)}
                required
              />
              <span>
                Admin
              </span>
              <input
                type="radio"
                name="UserType"
                id="userRadio"
                value="Admin"
                onChange={(e) => setUserType(e.target.value)}
                required
              />
            </div>
          </div>

          {userType === "Admin" ? (
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
                required
              />
              <label htmlFor="username">
                <FontAwesomeIcon icon={faKey} />
              </label>
            </div>
          ) : null}

          <div className="input-container">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              required
            />
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} />
            </label>
          </div>

          <div className="input-container">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
              required
            />
            <label htmlFor="username">
              <FontAwesomeIcon icon={faUser} />
            </label>
          </div>
          <div className="input-container">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="username">
              <FontAwesomeIcon icon={faEnvelope} />
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
          {userType === "User" && (
            <div className="input-container">
              <div className="build">
                <label>Building</label>
              </div>
              <select
                className="form-select"
                onChange={(e) => setBuilding(e.target.value)}
                value={building}
                required
              >
                <option value="">Select meter id</option>
                {buildingsList.map((buildingItem) => (
                  <option key={buildingItem._id} value={buildingItem.locname}>
                    {buildingItem.locname}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Your other form inputs */}
          <div className="bbtn">
            <button className="button-28" type="submit">
              Register
            </button>
          </div>
          <br></br>
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
          </p>
        </form>
      </div>
    );
  }
