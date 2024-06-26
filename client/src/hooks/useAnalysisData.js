import { useEffect, useState } from "react";
import useMeterId from "../contexts/meterId";

function useAnalysisData(start_time, end_time){
    const [data, setData] = useState([]);
    const {meter} = useMeterId();
    const meter_id = JSON.parse(localStorage.getItem("userBuilding"));
    useEffect(()=>{
        fetch(`https://api.nbsense.in/water_ms/analytics/line?meter_id=${meter || meter_id}&start_time=${start_time}&end_time=${end_time}`
            , {
                method: 'GET', // or 'POST' if you are posting data
                headers: {
                  'Authorization': `Bearer 475e703f-dc25-4e07-9eb7-db86cd19e6c0`,
                  'Content-Type': 'application/json'
                }
              }
        ).then((response)=>response.json())
        .then((response)=> setData(response.chart_data))
    }, [start_time, end_time, meter, meter_id])

    console.log("Analysis : ",data);
    return data;
}

export default useAnalysisData;
