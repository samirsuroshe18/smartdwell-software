import { useEffect, useState } from "react";

function useAnalysisData(start_time, end_time, meter_id){
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch(`https://api.nbsense.in/water_ms/analytics/line?meter_id=${meter_id}&start_time=${start_time}&end_time=${end_time}`
            , {
                method: 'GET', // or 'POST' if you are posting data
                headers: {
                  'Authorization': `Bearer 475e703f-dc25-4e07-9eb7-db86cd19e6c0`,
                  'Content-Type': 'application/json'
                }
              }
        ).then((response)=>response.json())
        .then((response)=> setData(response.chart_data))
    }, [start_time, end_time, meter_id])

    console.log("Analysis : ",data);
    return data;
}

export default useAnalysisData;