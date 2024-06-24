import { useState, useEffect } from "react";
import useInstantaneusData from "./useInstantaneusData";

const useFetchInstantaneousData = (date) => {
  const [chartData, setChartData] = useState(null);

  const formattedDate = formatDate(date[0], date[1]);
  const data = useInstantaneusData(formattedDate[0], formattedDate[1]);

  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  return chartData;
};

// Helper function to format date as "YYYY/MM" string
const formatDate = (startDate, endDate) => {
  // if (!date ) return ["", ""];

  const startYear = startDate?.getFullYear();
  const startMonth = String(startDate?.getMonth() + 1).padStart(2, "0");
  const startDay = String(startDate?.getDate()).padStart(2, "0");
  const start_time = `${startYear}-${startMonth}-${startDay}+00:00:00`;

  const endYear = endDate?.getFullYear();
  const endMonth = String(endDate?.getMonth() + 1).padStart(2, "0");
  const endDay = String(endDate?.getDate()).padStart(2, "0");
  const end_time = `${endYear}-${endMonth}-${endDay}+23:59:59`;

  return [start_time, end_time];
};

export default useFetchInstantaneousData;
