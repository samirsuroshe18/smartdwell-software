import { useEffect, useState } from "react";
import useMeterId from "../../contexts/meterId";

function useLatestUsageData(){
    const [data, setData] = useState([]);
    const {meter} = useMeterId()
    const meter_id = JSON.parse(localStorage.getItem("userBuilding"));
    
    useEffect(()=>{
        fetch(`https://api.nbsense.in/water_ms/get_latest_data?meter_id=${meter || meter_id}`
            , {
                method: 'GET', // or 'POST' if you are posting data
                headers: {
                  'Authorization': `Bearer 475e703f-dc25-4e07-9eb7-db86cd19e6c0`,
                  'Content-Type': 'application/json'
                }
              }
        ).then((response)=>response.json())
        .then((response)=> setData(response))
        .catch((err)=>{
          console.error('Error fetching Monthly flow data:', err);
        })
    }, [meter, meter_id])

    return data;
}

export default useLatestUsageData;