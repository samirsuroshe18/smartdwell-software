import React, { useState, useEffect } from 'react';
import './Dailyusage.css';
import droplet from '../../Assets/droplet.png';

const MonthlyUsage1 = () => {
  const [monthlyFlow, setMonthlyFlow] = useState(''); // Initialize with empty string
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    fetchMonthlyFlow(); // Fetch monthly flow data on component mount
  }, []);

  const fetchMonthlyFlow = async () => {
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

      // Set monthly flow value
      setMonthlyFlow(data.monthly_flow);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching monthly flow data:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
    <div className='kanda'>
      <div className="batataa">
        <img src={droplet} alt="" />
        <div className="text-area">
          Month
          <div className="today-flow">
            {loading ? <span className="loading">Loading...</span> : `${monthlyFlow} KL`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthlyUsage1;
