import React, { useState, useEffect } from 'react';
import './Dailyusage.css';
import droplet from '../../Assets/droplet.png';
import useLatestUsageData from '../../hooks/usage/useLatestUsageData';

const DailyUsage1 = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state
  const response = useLatestUsageData();

  useEffect(() => {
    if (response) {
      setLoading(false); // Set loading to false if response is received
    }
  }, [response]);

  return (
    <div className='kanda'>
      <div className="batata">
        <img src={droplet} alt="" />
        <div className="text-area">
          Today
          <div className="today-flow">
            {loading ? <span className="loading">Loading...</span> : `${response?.today_flow || 0} KL`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyUsage1;
