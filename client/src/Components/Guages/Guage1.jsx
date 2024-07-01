import React, { useState, useEffect } from 'react';
import GaugeChart from 'react-gauge-chart';
import './Guage1.css'; // Make sure to import the CSS file
import useLatestUsageData from '../../hooks/usage/useLatestUsageData';

const Guage1 = () => {
  const [loading, setLoading] = useState(true); // Initialize loading state
  const response = useLatestUsageData();

  useEffect(() => {
    if (response) {
      setLoading(false); // Set loading to false if response is received
    }
  }, [response]);

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
        percent={response?.instant_flow / 100 || 0} // Convert value to decimal for the gauge
        arcPadding={0.02}
      />
      <div className="gauge-value-overlay">
        {loading ? <span className="loading">Loading...</span> : `Flow: ${response?.instant_flow || 0} KL/hr`}
      </div>
    </div>
  );
};

export default Guage1;
