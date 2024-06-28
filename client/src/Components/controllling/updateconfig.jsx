import React, { useState } from 'react';
import axios from 'axios';

const UpdateConfig = () => {
  const [meterId, setMeterId] = useState('');
  const [setValve, setSetValve] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('meter_id', meterId);
    data.append('set_valve', setValve);

    console.log('Data to be sent:', { meter_id: meterId, set_valve: setValve });

    const config = {
      headers: {
        Authorization: 'Bearer 475e703f-dc25-4e07-9eb7-db86cd19e6c0',
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.post('https://api.nbsense.in/water_controller/update_config', data, config);
      console.log('Data updated successfully:', response.data);
      setSuccess('Data updated successfully!');
      setError('');
    } catch (error) {
      console.error('Error updating data:', error.response ? error.response.data : error.message);
      setError('Error updating data: ' + (error.response ? error.response.data : error.message));
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="meterId">Meter ID:</label>
        <input
          type="text"
          id="meterId"
          value={meterId}
          onChange={(e) => setMeterId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="setValve">Set Valve:</label>
        <input
          type="text"
          id="setValve"
          value={setValve}
          onChange={(e) => setSetValve(e.target.value)}
          required
        />
      </div>
      <button type="submit">Update</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default UpdateConfig;
