import React, { useEffect, useState } from "react";
import AdminHome from "../adminHome/adminHome";
import SuperAdminHome from "../adminHome/superadmin";
import Home from "../../pages/Home/Home";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserType(data.data.userType);
        setUserData(data.data);

        if (data.data === "token expired") {
          alert("Token expired, please login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);

  const renderUserComponent = () => {
    switch (userType) {
      case "SuperAdmin":
        return <SuperAdminHome userData={userData} />;
      case "Admin":
        return <AdminHome userData={userData} />;
      case "User":
        return <Home userData={userData} />;
      default:
        return null;
    }
  };

  return renderUserComponent();
}
