
import React from 'react';
import { Chart } from "react-google-charts";

const GlobalSalesForecast = () => {
  // Sample data for different regions - converted to Google Charts format
  const data = [
    ["Country", "Forecast Accuracy"],
    ["United States", 95],
    ["China", 87],
    ["India", 92],
    ["Germany", 78],
    ["United Kingdom", 82],
    ["Japan", 85],
    ["Brazil", 73],
    ["Australia", 76],
    ["Canada", 88],
    ["France", 80],
  ];

  const options = {
    title: "Sales Forecast Accuracy by Country",
    colorAxis: { colors: ["#CCE7FF", "#007BFF"] },
    backgroundColor: "transparent",
    datalessRegionColor: "#f0f0f0",
    defaultColor: "#f5f5f5",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Global Sales Forecast Overview
      </h2>
      
      {/* Google Charts GeoChart */}
      <div className="mb-6">
        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = data[selection[0].row + 1];
                  console.log("Selected " + region);
                },
              },
            ]}
            chartType="GeoChart"
            width="100%"
            height="300px"
            data={data}
            options={options}
          />
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-900 rounded-sm"></div>
                <span>High (90-100%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span>Medium (70-89%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
                <span>Low (50-69%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-left">
          <div className="text-sm text-gray-600 mb-1">AI-based 8-Month Rolling Forecast</div>
          <div className="text-2xl font-bold text-gray-900">240K</div>
          <div className="text-xs text-gray-500">units</div>
        </div>
        
        <div className="text-left">
          <div className="text-sm text-gray-600 mb-1">Forecast Error</div>
          <div className="text-2xl font-bold text-gray-900">4.2%</div>
          <div className="text-xs text-green-600">↓ 0.3% from last month</div>
        </div>
        
        <div className="text-left">
          <div className="text-sm text-gray-600 mb-1">Order Fulfillment</div>
          <div className="text-2xl font-bold text-gray-900">95%</div>
          <div className="text-xs text-green-600">↑ 2% from last month</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSalesForecast;
