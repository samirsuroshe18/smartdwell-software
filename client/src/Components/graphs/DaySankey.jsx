import React, { useEffect, useRef, useState } from "react";
import anychart from "anychart";
import useDaySankey from "../../hooks/useDaySankey";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dropdown } from "rsuite";

const DaySankey = () => {
  const [date, setDate] = useState(new Date());
  const [dateType, setType] = useState("day");
  const [format, setFormat] = useState("yyyy-MM-dd");
  const containerRef = useRef(null);
  const data = useDaySankey(formatDate(date, dateType));

  // On changed event handler
  const handleDateChange = (date) => {
    setDate(date || new Date());
  };

  const handleSelect = (eventKey) => {
    setType(eventKey);
  };

  useEffect(() => {

    if (dateType === 'day') {
      setFormat('yyyy-MM-dd')
    } else if (dateType === 'month') {
      setFormat('yyyy-MM')
    } else {
      setFormat('yyyy')
    }

    if (data && data.length) {
      // Create a new Sankey chart
      const chart = anychart.sankey(data);

      // Set the width of the flow
      chart.nodeWidth("50%");

      // Set the container id
      chart.container(containerRef.current);

      // Draw the chart
      chart.draw();

      // Cleanup function to dispose the chart when component unmounts
      return () => {
        chart.dispose();
      };
    }
  }, [date, dateType, data]);

  // Check if chartData exists and has chart_data
  const isLoading = !data || data.length === 0;

  return (
    <div className="border-2 rounded-xl border-blue-200 m-5 p-2">
      <div className="flex justify-between">
        <Dropdown title={dateType} onSelect={handleSelect}>
          <Dropdown.Item eventKey="day">Day</Dropdown.Item>
          <Dropdown.Item eventKey="month">Month</Dropdown.Item>
          <Dropdown.Item eventKey="year">Year</Dropdown.Item>
        </Dropdown>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={dateType}
              openTo={dateType}
              views={[dateType]}
              format={format}
              value={date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
      </div>
      <div className="mt-10">
        {isLoading ? (
          <div>Loading data or no data available...</div>
        ) : (
          <div ref={containerRef} style={{ width: "100%", height: "700px" }}></div>
        )}
      </div>
    </div>
  );
};

const formatDate = (date, type) => {
  if (type === "day") {
    const startYear = date?.getFullYear();
    const startMonth = String(date?.getMonth() + 1).padStart(2, "0");
    const startDay = String(date?.getDate()).padStart(2, "0");
    const start_time = `${startYear}/${startMonth}/${startDay}`;
    return start_time;
  } else if (type === "month") {
    const startYear = date?.getFullYear();
    const startMonth = String(date?.getMonth() + 1).padStart(2, "0");
    const start_time = `${startYear}/${startMonth}`;
    return start_time;
  } else {
    const startYear = date?.getFullYear();
    const start_time = `${startYear}`;
    return start_time;
  }
};

export default DaySankey;
