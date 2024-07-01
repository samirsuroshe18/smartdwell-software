import React, { useState, useEffect } from 'react';
import useLatestUsageData from '../../hooks/usage/useLatestUsageData';

const Lastupdate = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state
  const response = useLatestUsageData();

  useEffect(() => {
    if (response) {
      setLoading(false); // Set loading to false if response is received
    }
  }, [response]);

  return (
    <div className='upd'>
      {loading ? <span className="loading">Loading...</span> : response?.last_seen || 0}
    </div>
  );
};

export default Lastupdate;
