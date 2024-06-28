import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsExporting from "highcharts/modules/exporting";
import DatePicker from "rsuite/DatePicker";
import "rsuite/DatePicker/styles/index.css";

import useMontlyData from "../../hooks/useMontlyData";

// Initialize Highcharts exporting module
highchartsExporting(Highcharts);

const Monthly = () => {
  const [year, setYear] = useState(new Date());
  const response = useMontlyData(formatDate(year));

  // Helper function to get month name from month number
  const getMonthName = (monthNumber) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthNumber - 1];
  };

  const data = Array.from({ length: 12 }, (_, index) => {
    const monthData = response?.monthly_energy_data?.find(
      (entry) => entry.month === index + 1
    );
    return {
      x: getMonthName(index + 1),
      y: parseFloat(monthData ? monthData.total_used : "0.00"),
    };
  });

  // On changed event handler
  const handleYearChange = (date) => {
    setYear(date || new Date());
  };

  const chartOptions = {
    chart: {
      type: "column",
    },
    title: "",
    xAxis: {
      categories: data?.map((entry) => entry.x), // Use day as x-axis labels
      title: {
        text: "Months",
      },
    },
    yAxis: {
      title: {
        text: "Monthly Consumption (kL)",
      },
    },
    series: [
      {
        name: "Monthly Consumption",
        data: data?.map((entry) => entry.y),
      },
    ],
    tooltip: {
      formatter: function () {
        return `<b>${this.x}</b><br/>Monthly Consumption: ${this.y} kL`;
      },
    },
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
  const isLoading =
    !response ||
    !response.monthly_energy_data ||
    response.monthly_energy_data.length === 0;

  return (
    <div>
      <div className="p-6">   {/* border-2 rounded-xl border-blue-200 */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Monthly Consumption
          </h2>
          <DatePicker
            placement="auto"
            oneTap
            value={year}
            format="yyyy"
            onChange={handleYearChange}
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

// Helper function to format date as "YYYY"
const formatDate = (date) => {
  const year = date.getFullYear();
  return `${year}`;
};

export default Monthly;
