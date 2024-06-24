import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import './Guage1.css'; // Make sure to import the CSS file

const Guage1 = () => {
  const [instantFlow, setInstantFlow] = useState(0); // Initialize with 0
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

  const chartStyle = {
    height: 250,
  };

  return (
    <div className="gauge-container" style={chartStyle}>
      <GaugeChart
        id="gauge-chart5"
        className="custom-gauge-chart"
        nrOfLevels={20}
        arcsLength={[0.3, 0.5, 0.2]}
        colors={['#61a5c2', '#2a6f97', '#013a63']}
        percent={instantFlow / 100} // Convert value to decimal for the gauge
        arcPadding={0.02}
      />
      <div className="gauge-value-overlay">
        {loading ? <span className="loading">Loading...</span> : `Flow: ${instantFlow} KL/hr`}
      </div>
    </div>
  );
};

export default Guage1;
