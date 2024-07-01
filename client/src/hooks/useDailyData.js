import { useEffect, useState } from "react";
import useMeterId from "../contexts/meterId";

function useDailyData(date){
    const [data, setData] = useState([]);
    const {meter} = useMeterId()
    useEffect(()=>{
        fetch(`https://api.nbsense.in/water_ms/bar/${date}?meter_id=${meter}`
            , {
                method: 'GET', // or 'POST' if you are posting data
                headers: {
                  'Authorization': `Bearer 475e703f-dc25-4e07-9eb7-db86cd19e6c0`,
                  'Content-Type': 'application/json'
                }
              }
        ).then((response)=>response.json())
        .then((response)=> setData(response))
    }, [date])

    console.log("Daily : ",data);
    return data;
}

export default useDailyData;