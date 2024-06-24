import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBuild = () => {
  const [locname, setLocname] = useState("");
  const [bldgname, setBldgname] = useState("");
  const [message, setMessage] = useState("");
  const [buildings, setBuildings] = useState([]);

  const addBuilding = async () => {
    try {
      const response = await axios.post("http://localhost:8000/addBuilding", {
        locname,
        bldgname,
      });
      setMessage(response?.data.status === "ok" ? "Building added successfully" : "Error adding building");
      fetchBuildings(); // Fetch buildings again after adding to update the list
    } catch (error) {
      console.error(error);
      setMessage("Error adding building");
    }
  };

  const deleteBuilding = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/deleteBuilding/${id}`);
      setMessage(response?.data.status === "ok" ? "Building deleted successfully" : "Error deleting building");
      fetchBuildings(); // Fetch buildings again after deletion to update the list
    } catch (error) {
      console.error(error);
      setMessage("Error deleting building");
    }
  };

  const fetchBuildings = async () => {
    try {
      const response = await axios.get("http://localhost:8000/getBuildings");
      setBuildings(response?.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  return (
    <div>
      <h1>Add Building</h1>
      <input type="text" placeholder="Location Name" value={locname} onChange={(e) => setLocname(e.target.value)} />
      <input type="text" placeholder="Building Name" value={bldgname} onChange={(e) => setBldgname(e.target.value)} />
      <button onClick={addBuilding}>Add Building</button>
      {message && <p>{message}</p>}
      <h2>Buildings:</h2>
      <ul>
        {buildings.map((building) => (
          <li key={building._id}>
            {building.locname} - {building.bldgname}
            <button onClick={() => deleteBuilding(building._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBuild;
