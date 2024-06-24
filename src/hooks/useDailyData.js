import { useEffect, useState } from "react";


function useDailyData(date){
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch(`https://api.nbsense.in/water_ms/bar/${date}?meter_id=337`
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