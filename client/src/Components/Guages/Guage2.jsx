import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';

function Gauge2() {
  const [valvePosition, setValvePosition] = useState(0); // State variable for valve position
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate fetching data with a delay
    const fetchData = setTimeout(() => {
      setValvePosition(55); // Set valve position after data fetch
      setLoading(false); // Set loading to false after data fetch
    }, 2000); // Simulated 2 second delay

    return () => clearTimeout(fetchData); // Clean up on component unmount
  }, []);

  return (
    <div className='container'>
      <div style={{ height: '260px', width: '260px', position: 'relative' }}>
        <GaugeComponent
          value={valvePosition}
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
            alignItems: 'center'
          }}
        >
          {/* <span>Position: </span> */}
          {loading ? <span className="loading">Loading...</span> : <span>Position:{valvePosition}%</span>}
        </div>
      </div>
    </div >
  );
}

export default Gauge2;
