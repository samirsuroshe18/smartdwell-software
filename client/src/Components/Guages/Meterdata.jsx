import React, { useState, useEffect } from 'react';
import useLatestUsageData from '../../hooks/usage/useLatestUsageData';

const Meterdata = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state
  const response = useLatestUsageData();

  useEffect(() => {
    if (response) {
      setLoading(false); // Set loading to false if response is received
    }
  }, [response]);

  return (
    <div className='container'>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className='midflow'>
          {response?.instant_flow || 0}
          <br />
          <span className='mana'>KL/hr</span>
        </div>
      )}
    </div>
  );
};

export default Meterdata;
