import React, { useState, useEffect } from 'react';
import './Dailyusage.css';
import droplet from '../../Assets/droplet.png';

const DailyUsage1 = () => {
  const [todayFlow, setTodayFlow] = useState(''); // Initialize with empty string
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    fetchTodayFlow(); // Fetch today flow data on component mount
  }, []);

  const fetchTodayFlow = async () => {
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

      // Set today flow value
      setTodayFlow(data.today_flow);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching today flow data:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  return (
    <div className='kanda'>
      <div className="batata">
        <img src={droplet} alt="" />
        <div className="text-area">
          Today
          <div className="today-flow">
            {loading ? <span className="loading">Loading...</span> : `${todayFlow} KL`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyUsage1;
