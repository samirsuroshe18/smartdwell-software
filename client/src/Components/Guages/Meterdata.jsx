import React, { useState, useEffect } from 'react';

const Meterdata = () => {
  const [instantFlow, setInstantFlow] = useState(''); // Initialize with empty string
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    fetchFlowData(); // Fetch flow data on component mount
  }, []);

  const fetchFlowData = async () => {
    try {
      const userBuilding = JSON.parse(localStorage.getItem("userBuilding"));
      console.log("User building:", userBuilding);

      // Check if userBuilding is available
      if (!userBuilding) {
        console.error('User building data not found in localStorage.');
        setLoading(false);
        return;
      }

      const locbud = userBuilding; // Store userBuilding data in a variable named locbud
      const apiUrl = `http://localhost:8000/api/${locbud}`;
      const response = await fetch(apiUrl); // Fetch data from backend API
      const data = await response.json();
      console.log('API Response:', data); // Log API response for debugging

      // Set instant flow value
      setInstantFlow(data.instant_flow);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching flow data:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
    <div className='container'>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className='midflow'>
          {instantFlow}
          <br />
          <span className='mana'>KL/hr</span>
        </div>
      )}
    </div>
  );
};

export default Meterdata;
