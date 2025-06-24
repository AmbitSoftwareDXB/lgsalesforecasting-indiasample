
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const worldRegions = [
  { region: 'North America', sales: 85, color: '#007BFF' },
  { region: 'Europe', sales: 72, color: '#8EC1E0' },
  { region: 'Asia Pacific', sales: 95, color: '#0056B3' },
  { region: 'Latin America', sales: 45, color: '#B3D9FF' },
  { region: 'Middle East', sales: 38, color: '#CCE7FF' },
];

const GlobalSalesForecast = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Global Sales Forecast Overview
      </h2>
      
      {/* World Map Heatmap Simulation */}
      <div className="mb-6">
        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 h-48">
          <div className="absolute inset-0 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={worldRegions} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="region" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Sales Performance']}
                  labelStyle={{ color: '#374151' }}
                />
                <Bar dataKey="sales" fill="#007BFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">240K</div>
          <div className="text-sm text-gray-600">AI-based 8-Month Rolling Forecast</div>
          <div className="text-xs text-gray-500 mt-1">units</div>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-700">4.2%</div>
          <div className="text-sm text-gray-600">Forecast Error</div>
          <div className="text-xs text-green-600 mt-1">↓ 0.3% from last month</div>
        </div>
        
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-700">95%</div>
          <div className="text-sm text-gray-600">Order Fulfillment</div>
          <div className="text-xs text-purple-600 mt-1">↑ 2% from last month</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalSalesForecast;
