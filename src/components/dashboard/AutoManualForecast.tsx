
import { BarChart3, TrendingDown } from 'lucide-react';

const AutoManualForecast = () => {
  const forecastData = [
    {
      label: 'Auto Forecast',
      value: 88,
      units: '88K units',
      color: 'bg-blue-500',
      darkColor: 'dark:bg-blue-400'
    },
    {
      label: 'Manual Forecast',
      value: 100,
      units: '100K units',
      color: 'bg-green-500',
      darkColor: 'dark:bg-green-400'
    }
  ];

  const deltaMetrics = [
    {
      label: 'Auto vs Manual Delta',
      value: '-12K units',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      darkBgColor: 'dark:bg-red-900/20',
      darkColor: 'dark:text-red-400'
    },
    {
      label: 'Flexure Importance Impact',
      value: '-12K units',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      darkBgColor: 'dark:bg-orange-900/20',
      darkColor: 'dark:text-orange-400'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
        Auto vs Manual Forecast
      </h2>
      
      {/* Horizontal Bar Comparison */}
      <div className="space-y-4 mb-6">
        {forecastData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.units}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${item.color} ${item.darkColor} transition-all duration-300`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Delta Metrics */}
      <div className="space-y-3">
        {deltaMetrics.map((metric, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg ${metric.bgColor} ${metric.darkBgColor} border-l-4 border-red-400 dark:border-red-500`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingDown className={`w-4 h-4 ${metric.color} ${metric.darkColor}`} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {metric.label}
                </span>
              </div>
              <span className={`text-sm font-semibold ${metric.color} ${metric.darkColor}`}>
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoManualForecast;
