import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsExporting from "highcharts/modules/exporting";
import useDailyData from '../../hooks/useDailyData'
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";


// Initialize Highcharts exporting module
highchartsExporting(Highcharts);

const Daily = () => {
  const navigate = useNavigate();   //For navigating one page to another 
  const [date, setDate] = useState(new Date());
  const response = useDailyData(formatDate(date));
  
  // Determine the number of days in the month
  const daysInMonth = new Date(response?.year, response?.month, 0).getDate();

  // Prepare data with default values
  const dailyEnergyData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    total_used: 0,
  }));

  // Merge raw data into the prepared data
  response?.daily_energy_data?.forEach((item) => {
    dailyEnergyData[item.day - 1].total_used = parseFloat(item.total_used);
  });

  // Prepare categories and data for Highcharts
  const categories = dailyEnergyData?.map((item) => item.day);
  const data = dailyEnergyData?.map((item) => item.total_used);

  // On changed event handler
  const handleDateChange = (date) => {
    setDate(date || new Date());
  };

  const chartOptions = {
    chart: {
      type: "column",
    },
    title: "",
    xAxis: {
      categories: categories,
      title: {
        text: "Days",
      },
    },
    yAxis: {
      title: {
        text: "Daily Consumption (kL)",
      },
    },
    series: [
      {
        name: "Daily Consumption",
        data: data,
        point: {
          events: {
            click: (event) => {
              const day = event.point.category;
              const date = new Date(response?.year, response?.month - 1, day);
              navigate("/home/analysis", { state: { passDate: date } });
            },
          },
        },
      },
    ],
    tooltip: {
      formatter: function () {
        return `<b>${this.x}</b><br/>Daily Consumption: ${this.y} kL`;
      },
    },
    accessibility: {
      enabled: false, // This line is optional since including the module enables it by default
    },
    exporting: {
      enabled: true,              // To show context menu button on highchart
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
  const isLoading = !response || !response.daily_energy_data || response.daily_energy_data.length === 0;

  return (
    <div>
      <div className="p-6">    {/* border-2 rounded-xl border-blue-200 */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Daily Consumption
          </h2>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={'"Month"'}
              openTo="month"
              views={['month']}
              format="yyyy-MM"
              value={date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
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

// Helper function to format date as "YYYY/MM" string
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${year}/${month}`;
};

export default Daily;
