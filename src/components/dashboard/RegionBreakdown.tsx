
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const forecastErrorData = [
  { month: 'Jan', error: 3.2, target: 5.0 },
  { month: 'Feb', error: 4.1, target: 5.0 },
  { month: 'Mar', error: 2.8, target: 5.0 },
  { month: 'Apr', error: 3.5, target: 5.0 },
  { month: 'May', error: 4.2, target: 5.0 },
  { month: 'Jun', error: 3.9, target: 5.0 },
];

const weatherImpactData = [
  { month: 'Jan', impact: 85, temperature: 22 },
  { month: 'Feb', impact: 78, temperature: 25 },
  { month: 'Mar', impact: 92, temperature: 28 },
  { month: 'Apr', impact: 88, temperature: 32 },
  { month: 'May', impact: 75, temperature: 35 },
  { month: 'Jun', impact: 82, temperature: 33 },
];

const RegionBreakdown = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Region-wise Performance Breakdown
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Forecast Error */}
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">Monthly Forecast Error</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={forecastErrorData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}%`, 
                  name === 'error' ? 'Actual Error' : 'Target Error'
                ]}
              />
              <Legend />
              <Bar dataKey="error" fill="#007BFF" name="error" radius={[2, 2, 0, 0]} />
              <Bar dataKey="target" fill="#E5E7EB" name="target" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Weather Impact Score */}
        <div>
          <h3 className="text-md font-medium text-gray-700 mb-3">Weather Impact Score</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weatherImpactData}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'impact' ? `${value}%` : `${value}°C`,
                  name === 'impact' ? 'Impact Score' : 'Avg Temperature'
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="impact" 
                stroke="#007BFF" 
                strokeWidth={3}
                dot={{ fill: '#007BFF', strokeWidth: 2, r: 4 }}
                name="impact"
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#8EC1E0" 
                strokeWidth={2}
                dot={{ fill: '#8EC1E0', strokeWidth: 2, r: 3 }}
                name="temperature"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RegionBreakdown;
