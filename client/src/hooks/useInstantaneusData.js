import { useState, useEffect } from "react";
import useMeterId from "../contexts/meterId";

const useInstantaneusData = (start_time, end_time) => {
  const [data, setData] = useState(null);
  const {meter} = useMeterId()
  const meter_id = JSON.parse(localStorage.getItem("userBuilding"));

  useEffect(() => {
    const fetchData = async () => {
      // Replace with your actual data fetching logic
      const response = await fetch(`https://api.nbsense.in/water_ms/analytics/line?meter_id=${meter || meter_id}&start_time=${start_time}&end_time=${end_time}`,
        {
          method: 'GET', // or 'POST' if you are posting data
          headers: {
            'Authorization': `Bearer 475e703f-dc25-4e07-9eb7-db86cd19e6c0`,
            'Content-Type': 'application/json'
          }
        }
      );
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [start_time, end_time, meter, meter_id]);

  return data;
};

export default useInstantaneusData;
