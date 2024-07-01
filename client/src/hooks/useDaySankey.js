import { useEffect, useState } from "react";


function useDaySankey(date){
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch(`https://api.nbsense.in/water_ms/day_sankey/${date}`
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

    console.log("DaySankey Data : ",data);
    return data;
}

export default useDaySankey;