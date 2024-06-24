import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsExporting from "highcharts/modules/exporting";
import useFetchInstantaneousData from "../../hooks/useFetchInstantaneousData ";
import { useLocation } from 'react-router-dom';
import { DateRangePicker } from 'rsuite';
import "rsuite/DateRangePicker/styles/index.css";

// Initialize Highcharts exporting module
highchartsExporting(Highcharts);

const Analysis = () => {
  
  // To get the data from state
  const location = useLocation();
  const { passDate } = location.state || {}; // Ensure there's a fallback in case state is not passed

  const [date, setDate] = useState([passDate || new Date(), passDate || new Date()]);
  const chartData = useFetchInstantaneousData(date);
  
  // On changed event handler 
  const handleDateChange = (range) => {
    setDate([range[0], range[1]] || [new Date(), new Date()]);
  };

  // Convert data to the format required by Highcharts
  const data = chartData?.chart_data?.map((item) => {
    const date = new Date(item.Device_time);
    const istTime = date.getTime() + 5.5 * 60 * 60 * 1000;        // Adjust to IST (UTC+5:30)
    return [istTime, parseFloat(item.instant_flow)];
  });

  const chartOptions = {
    chart: {
      type: "spline",
      zoomType: "x",
    },
    title : "",
    xAxis: {
      type: "datetime",            // Use a datetime axis
      dateTimeLabelFormats: {
        hour: "%H:%M",             // Format for hours and minutes
        minute: "%H:%M",
      },
      title: {
        text: "Time",
      },
    },
    yAxis: {
      min : 0,
      title: {
        text: "Instantaneous Flow (kL)",
      },
    },
    series: [
      {
        name: "Instantaneous Flow",
        data: data,
      },
    ],
    accessibility: {
      enabled: false, // This line is optional since including the module enables it by default
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          symbolStroke: "#666",
          menuItems: [
            "viewFullscreen",
            "downloadPDF",
            "downloadPNG",
            "downloadJPEG",
            "downloadCSV",
          ],
        },
      },
    },
  };

  // Check if chartData exists and has chart_data
  const isLoading = !chartData || !chartData.chart_data || chartData.chart_data.length === 0;

  return (
    <div>
      <div className="p-6">   {/* border-2 rounded-xl border-blue-200 */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Instantaneous Flow</h2>
          <DateRangePicker
            placement="auto"
            value={date}
            format="yyyy-MM-dd"
            onChange={handleDateChange}
            character="   To   "
            // calendar={1}
          />
        </div>
        <div className="mt-10">
          {isLoading ? (
            <div>Loading data or no data available...</div>
          ) : (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Analysis;
