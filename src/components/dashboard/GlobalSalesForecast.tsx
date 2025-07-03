import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import { useTheme } from '@/contexts/ThemeContext';
import { useFeatureImportance } from '@/contexts/FeatureImportanceContext';

const GlobalSalesForecast = () => {
  const { theme } = useTheme();
  const { featureValues } = useFeatureImportance();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  // Sample data for different countries - converted to Google Charts format
  // Adjust accuracy based on feature importance values
  const accuracyMultiplier = 1 + 
    (featureValues.seasonalDemand - 85) * 0.001 + 
    (featureValues.marketingSpend - 72) * 0.0015 + 
    (featureValues.economicIndex - 54) * 0.002 - 
    (featureValues.competitionPrice - 41) * 0.001;
    
  const worldData = [
    ["Country", "Forecast Accuracy"],
    ["United States", Math.round(95 * accuracyMultiplier)],
    ["China", Math.round(87 * accuracyMultiplier)],
    ["India", Math.round(92 * accuracyMultiplier)],
    ["Germany", Math.round(78 * accuracyMultiplier)],
    ["United Kingdom", Math.round(82 * accuracyMultiplier)],
    ["Japan", Math.round(85 * accuracyMultiplier)],
    ["Brazil", Math.round(73 * accuracyMultiplier)],
    ["Australia", Math.round(76 * accuracyMultiplier)],
    ["Canada", Math.round(88 * accuracyMultiplier)],
    ["France", Math.round(80 * accuracyMultiplier)],
  ];

  // Regional data for each country using proper region codes
  const regionalData = {
    "United States": [
      ["State", "Forecast Accuracy"],
      ["US-CA", 95], // California
      ["US-TX", 87], // Texas
      ["US-NY", 92], // New York
      ["US-FL", 78], // Florida
      ["US-IL", 82], // Illinois
      ["US-PA", 85], // Pennsylvania
    ],
    "Germany": [
      ["State", "Forecast Accuracy"],
      ["DE-BY", 85], // Bavaria
      ["DE-NW", 78], // North Rhine-Westphalia
      ["DE-BW", 82], // Baden-Württemberg
      ["DE-NI", 75], // Lower Saxony
      ["DE-HE", 80], // Hesse
      ["DE-SN", 77], // Saxony
    ],
    "United Kingdom": [
      ["Region", "Forecast Accuracy"],
      ["GB-ENG", 85], // England
      ["GB-SCT", 78], // Scotland
      ["GB-WLS", 80], // Wales
      ["GB-NIR", 75], // Northern Ireland
    ],
    "Japan": [
      ["Prefecture", "Forecast Accuracy"],
      ["JP-13", 88], // Tokyo
      ["JP-27", 85], // Osaka
      ["JP-14", 82], // Kanagawa
      ["JP-23", 78], // Aichi
      ["JP-28", 80], // Hyogo
      ["JP-40", 75], // Fukuoka
    ]
  };

  // Detailed country data
  const countryDetails = {
    "United States": {
      accuracy: 95,
      forecast: "285K units",
      trend: "+5.2%",
      regions: ["California: 45K", "Texas: 38K", "New York: 32K", "Florida: 28K"]
    },
    "China": {
      accuracy: 87,
      forecast: "412K units",
      trend: "+8.1%",
      regions: ["Beijing: 85K", "Shanghai: 78K", "Guangzhou: 65K", "Shenzhen: 58K"]
    },
    "India": {
      accuracy: 92,
      forecast: "198K units",
      trend: "+12.3%",
      regions: ["Mumbai: 42K", "Delhi: 38K", "Bangalore: 35K", "Chennai: 28K"]
    },
    "Germany": {
      accuracy: 78,
      forecast: "145K units",
      trend: "+2.8%",
      regions: ["Berlin: 35K", "Munich: 28K", "Hamburg: 25K", "Frankfurt: 22K"]
    },
    "United Kingdom": {
      accuracy: 82,
      forecast: "128K units",
      trend: "+3.5%",
      regions: ["London: 45K", "Manchester: 22K", "Birmingham: 18K", "Leeds: 15K"]
    },
    "Japan": {
      accuracy: 85,
      forecast: "156K units",
      trend: "+1.9%",
      regions: ["Tokyo: 58K", "Osaka: 32K", "Yokohama: 25K", "Nagoya: 18K"]
    }
  };

  // Get the current data to display
  const getCurrentData = () => {
    if (selectedCountry && regionalData[selectedCountry as keyof typeof regionalData]) {
      return regionalData[selectedCountry as keyof typeof regionalData];
    }
    return worldData;
  };

  const options = {
    title: selectedCountry ? `${selectedCountry} - Regional Breakdown` : "Sales Forecast Accuracy by Country",
    colorAxis: { colors: ["#CCE7FF", "#007BFF"] },
    backgroundColor: theme === 'dark' ? '#1F2937' : 'transparent',
    datalessRegionColor: theme === 'dark' ? '#374151' : '#f0f0f0',
    defaultColor: theme === 'dark' ? '#374151' : '#f5f5f5',
    region: selectedCountry ? getCountryCode(selectedCountry) : "world",
    resolution: selectedCountry ? "provinces" : "countries",
    keepAspectRatio: true,
    legend: {
      numberFormat: "#'%'",
      textStyle: {
        color: theme === 'dark' ? '#F9FAFB' : '#111827'
      }
    },
    titleTextStyle: {
      color: theme === 'dark' ? '#F9FAFB' : '#111827'
    }
  };

  function getCountryCode(countryName: string): string {
    const codes: { [key: string]: string } = {
      "United States": "US",
      "China": "CN", 
      "India": "IN",
      "Germany": "DE",
      "United Kingdom": "GB",
      "Japan": "JP",
      "Brazil": "BR",
      "Australia": "AU",
      "Canada": "CA",
      "France": "FR"
    };
    return codes[countryName] || "world";
  }

  const handleCountryClick = ({ chartWrapper }: any) => {
    const chart = chartWrapper.getChart();
    const selection = chart.getSelection();
    if (selection.length === 0) return;
    
    const selectedRow = selection[0].row;
    const currentData = getCurrentData();
    
    if (selectedRow >= 0 && selectedRow < currentData.length - 1) {
      if (selectedCountry) {
        // If we're already in a country view, clicking should reset to world view
        console.log("Resetting to world view");
        setSelectedCountry(null);
      } else {
        // If we're in world view, zoom into the selected country
        const countryName = currentData[selectedRow + 1][0] as string;
        console.log("Selected country:", countryName);
        
        // Only zoom in if we have regional data for this country
        if (regionalData[countryName as keyof typeof regionalData]) {
          setSelectedCountry(countryName);
        } else {
          console.log("No regional data available for:", countryName);
        }
      }
    }
  };

  const resetView = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Global Sales Forecast Overview
        </h2>
        {selectedCountry && (
          <button
            onClick={resetView}
            className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
          >
            ← Back to World View
          </button>
        )}
      </div>
      
      {/* Google Charts GeoChart */}
      <div className="mb-6">
        <div className={`relative ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-700' : 'bg-gradient-to-br from-blue-50 to-blue-100'} rounded-lg p-4`}>
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: handleCountryClick,
              },
            ]}
            chartType="GeoChart"
            width="100%"
            height="300px"
            data={getCurrentData()}
            options={options}
          />
          
          {/* Legend */}
          <div className={`absolute bottom-4 left-4 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} rounded-lg p-3 text-xs`}>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-900 rounded-sm"></div>
                <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>High (90-100%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>Medium (70-89%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
                <span className={theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}>Low (50-69%)</span>
              </div>
            </div>
          </div>
          
          {/* Click instruction */}
          <div className={`absolute bottom-4 right-4 ${theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'} rounded-lg p-2 text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {selectedCountry ? "Click region to return to world view" : "Click on a country to zoom in"}
          </div>
        </div>
      </div>
      
      {/* Country Details Panel */}
      {selectedCountry && countryDetails[selectedCountry as keyof typeof countryDetails] && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
            {selectedCountry} - Detailed Analytics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Forecast Accuracy</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {countryDetails[selectedCountry as keyof typeof countryDetails].accuracy}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Forecast</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">
                {countryDetails[selectedCountry as keyof typeof countryDetails].forecast}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                {countryDetails[selectedCountry as keyof typeof countryDetails].trend} from last quarter
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Top Regions</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {countryDetails[selectedCountry as keyof typeof countryDetails].regions.map((region, index) => (
                <div key={index} className="text-gray-700 dark:text-gray-300">{region}</div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-left">
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">AI-based 8-Month Rolling Forecast</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(240 * (1 + (featureValues.seasonalDemand - 85) * 0.002 + (featureValues.marketingSpend - 72) * 0.0015))}K
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">units</div>
        </div>
        
        <div className="text-left">
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Forecast Error</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {(4.2 + (featureValues.inventoryLevels - 68) * 0.02).toFixed(1)}%
          </div>
          <div className="text-xs text-green-600 dark:text-green-400">↓ 0.3% from last month</div>
        </div>
        
        <div className="text-left">
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Order Fulfillment</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">95%</div>
          <div className="text-xs text-green-600 dark:text-green-400">↑ 2% from last month</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSalesForecast;
