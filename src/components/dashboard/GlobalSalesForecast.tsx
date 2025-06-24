
import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GlobalSalesForecast = () => {
  const chartRef = useRef(null);

  // Sample data for different regions
  const mapData = [
    { 'hc-key': 'us', value: 95, name: 'United States' },
    { 'hc-key': 'cn', value: 87, name: 'China' },
    { 'hc-key': 'in', value: 92, name: 'India' },
    { 'hc-key': 'de', value: 78, name: 'Germany' },
    { 'hc-key': 'gb', value: 82, name: 'United Kingdom' },
    { 'hc-key': 'jp', value: 85, name: 'Japan' },
    { 'hc-key': 'br', value: 73, name: 'Brazil' },
    { 'hc-key': 'au', value: 76, name: 'Australia' },
    { 'hc-key': 'ca', value: 88, name: 'Canada' },
    { 'hc-key': 'fr', value: 80, name: 'France' }
  ];

  const mapOptions = {
    chart: {
      map: 'custom/world',
      height: 300,
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'Inter, sans-serif'
      }
    },
    title: {
      text: null
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    colorAxis: {
      min: 50,
      max: 100,
      stops: [
        [0, '#CCE7FF'],
        [0.5, '#8EC1E0'],
        [0.8, '#007BFF'],
        [1, '#003d82']
      ],
      labels: {
        format: '{value}%'
      }
    },
    series: [{
      name: 'Sales Forecast Accuracy',
      mapData: undefined, // Will be set after loading
      data: mapData,
      joinBy: 'hc-key',
      nullColor: '#f0f0f0',
      borderColor: '#ffffff',
      borderWidth: 0.5,
      states: {
        hover: {
          borderWidth: 2,
          borderColor: '#007BFF'
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        pointFormat: '<b>{point.name}</b><br/>Forecast Accuracy: <b>{point.value}%</b>'
      }
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 768
        },
        chartOptions: {
          chart: {
            height: 200
          }
        }
      }]
    }
  };

  useEffect(() => {
    // Dynamically import and initialize the map module
    const initializeMap = async () => {
      try {
        // Import the map module dynamically
        const mapModule = await import('highcharts/modules/map');
        // Initialize the map module - the default export should be a function
        if (mapModule.default && typeof mapModule.default === 'function') {
          mapModule.default(Highcharts);
        }
        
        // Load the world map data
        const topology = await fetch('https://code.highcharts.com/mapdata/custom/world.js');
        const mapScript = await topology.text();
        
        // Execute the script to load the map into Highcharts.maps
        const script = document.createElement('script');
        script.innerHTML = mapScript;
        document.head.appendChild(script);
        
        // Clean up
        document.head.removeChild(script);
        
        // Update the chart with the loaded map data
        if (chartRef.current && (chartRef.current as any).chart) {
          const chart = (chartRef.current as any).chart;
          chart.series[0].update({
            mapData: (Highcharts as any).maps['custom/world']
          });
        }
      } catch (error) {
        console.log('Map initialization failed, using fallback');
      }
    };

    initializeMap();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Global Sales Forecast Overview
      </h2>
      
      {/* World Map Heatmap */}
      <div className="mb-6">
        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'mapChart'}
            options={mapOptions}
            ref={chartRef}
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
