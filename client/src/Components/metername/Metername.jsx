import React, { useState, useEffect } from 'react';
import './Metername.css'

const Metername = () => {
  const [meterName, setMeterName] = useState(''); // Initialize with an empty string

  useEffect(() => {
    fetchMeterName(); // Fetch meter name data on component mount
  }, []);

  const fetchMeterName = async () => {
    try {
      const userBuilding = JSON.parse(localStorage.getItem("userBuilding"));
      console.log("User building:", userBuilding);

      // Check if userBuilding is available
      if (!userBuilding) {
        console.error('User building data not found in localStorage.');
        return;
      }

      const locbud = userBuilding; // Store userBuilding data in a variable named locbud
      const apiUrl = `http://localhost:8000/api/${locbud}`;
      const response = await fetch(apiUrl); // Fetch data from backend API
      const data = await response.json();
      console.log('API Response:', data); // Log API response for debugging

      // Set meter name value
      setMeterName(data.meter_name);
    } catch (error) {
      console.error('Error fetching meter name:', error);
    }
  };

  return (
    <div className='mname'>{meterName}</div>
  );
};

export default Metername;
