import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';
import axios from 'axios';

function Gauge2() {
  const [valvePosition, setValvePosition] = useState(null); // State variable for valve position
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.nbsense.in/water_controller/latest_data?meter_id=337', {
          headers: {
            Authorization: 'Bearer 475e703f-dc25-4e07-9eb7-db86cd19e6c0'
          }
        });
        // Set valve position to controller_current_position from API response
        setValvePosition(response.data.controller_current_position);
        setLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        console.error('Error fetching valve position:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchData(); // Call the fetch data function

    // Clean-up function
    return () => {
      // Any clean-up code if needed
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className='container'>
      <div style={{ height: '260px', width: '260px', position: 'relative' }}>
        <GaugeComponent
          value={valvePosition !== null ? valvePosition : 0} // Display 0 if valvePosition is null
          type="radial"
          labels={{
            valueLabel: {
              style: {
                fontSize: "35px",
                fill: "black"
              }
            },
            tickLabels: {
              type: "inner",
              ticks: [
                { value: 20, style: { fill: "black" } },
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
            color: loading ? 'gray' : '#053B50',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {loading ? <span className="loading">Loading...</span> : <span>Position: {valvePosition !== null ? `${valvePosition}%` : 'Unknown'}</span>}
        </div>
      </div>
    </div>
  );
}

export default Gauge2;
