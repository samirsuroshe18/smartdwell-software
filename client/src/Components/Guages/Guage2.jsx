import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';

function Gauge2() {
  const [valvePosition, setValvePosition] = useState(0); // State variable for valve position
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get userBuilding from local storage and parse it as an integer
        const userBuilding = JSON.parse(localStorage.getItem('userBuilding')); // Default to 337 if not found
        console.log('Retrieved userBuilding:', userBuilding); // Debugging log

        // Replace with your actual API endpoint and token
        const apiUrl = `https://api.nbsense.in/water_controller/latest_data?meter_id=${userBuilding}`;
        const token = 'Bearer 475e703f-dc25-4e07-9eb7-db86cd19e6c0';
        console.log('Constructed API URL:', apiUrl); // Debugging log

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Debugging log

        // Set valve position from API response
        setValvePosition(data.controller_current_position);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if there's an error
      }
    };

    fetchData();

    // Clean up function to clear timeout or cancel async operations if component unmounts
    return () => {
      // Cleanup code if necessary
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

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
            alignItems: 'center',
            justifyContent: 'center', // Center content horizontally
            width: '100%', // Ensure it spans the width of the container
            whiteSpace: 'nowrap' // Prevent text wrapping
          }}
        >
          {loading ? (
            <span className="loading">Loading...</span>
          ) : (
            <span>Position: {valvePosition}%</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gauge2;
