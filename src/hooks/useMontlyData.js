import { useEffect, useState } from "react";

function useMontlyData(year=2024){
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch(`https://api.nbsense.in/water_ms/bar/${year}?meter_id=337`
            , {
                method: 'GET', // or 'POST' if you are posting data
                headers: {
                  'Authorization': `Bearer 475e703f-dc25-4e07-9eb7-db86cd19e6c0`,
                  'Content-Type': 'application/json'
                }
              }
        ).then((response)=>response.json())
        .then((response)=> setData(response))
    }, [year])

    console.log("Monthly : ",data);
    return data;
}

export default useMontlyData;