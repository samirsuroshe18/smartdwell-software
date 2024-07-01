import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';
import useValvePositionData from '../../hooks/guage/useValvePositionData';

function Gauge2() {
  const [loading, setLoading] = useState(true); // Initialize loading state
  const response = useValvePositionData();

  useEffect(() => {
    if (response) {
      setLoading(false); // Set loading to false if response is received
    }
  }, [response]);

  return (
    <div className='container'>
      <div style={{ height: '260px', width: '260px', position: 'relative' }}>
        <GaugeComponent
          value={response?.controller_current_position || 0}
          type="radial"
          labels={{
            valueLabel: {
              style: {
                fontSize: "35px",
                fill: "black" // Set value label color to black
              }
            },
            tickLabels: {
              type: "inner",
              ticks: [
                { value: 20, style: { fill: "black" } }, // Customize color for specific tick values
                { value: 40, style: { fill: "black" } },
                { value: 60, style: { fill: "black" } },
                { value: 80, style: { fill: "black" } },
                { value: 100, style: { fill: "black" } }
              ]
            }
          }}
          arc={{
            colorArray: ['#5BE12C', '#EA4228'],
            subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
            padding: 0.02,
            width: 0.3
          }}
          pointer={{
            elastic: true,
            animationDelay: 0
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '30px',
            color: loading ? 'gray' : '#053B50', // Change color during loading
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Center content horizontally
            width: '100%', // Ensure it spans the width of the container
            whiteSpace: 'nowrap' // Prevent text wrapping
          }}
        >
          {loading ? (
            <span className="loading">Loading...</span>
          ) : (
            <span>Position: {response?.controller_current_position || 0}%</span>
          )}
        </div>
      </div>
    </div>
  );
} 

export default Gauge2;
