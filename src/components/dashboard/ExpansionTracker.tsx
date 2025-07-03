
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, LineChart, Line, ComposedChart } from 'recharts';
import { useTheme } from '@/contexts/ThemeContext';
import { useFeatureImportance } from '@/contexts/FeatureImportanceContext';

const getBaseCapacityData = () => [
  { 
    quarter: 'Q1 2025', 
    currentCapacity: 115000, 
    plannedCapacity: 125000, 
    forecastDemand: 118000,
    utilizationRate: 94
  },
  { 
    quarter: 'Q2 2025', 
    currentCapacity: 125000, 
    plannedCapacity: 135000, 
    forecastDemand: 128000,
    utilizationRate: 95
  },
  { 
    quarter: 'Q3 2025', 
    currentCapacity: 135000, 
    plannedCapacity: 145000, 
    forecastDemand: 138000,
    utilizationRate: 95
  },
  { 
    quarter: 'Q4 2025', 
    currentCapacity: 145000, 
    plannedCapacity: 155000, 
    forecastDemand: 148000,
    utilizationRate: 96
  },
  { 
    quarter: 'Q1 2026', 
    currentCapacity: 155000, 
    plannedCapacity: 165000, 
    forecastDemand: 158000,
    utilizationRate: 96
  },
  { 
    quarter: 'Q2 2026', 
    currentCapacity: 165000, 
    plannedCapacity: 175000, 
    forecastDemand: 168000,
    utilizationRate: 96
  },
  { 
    quarter: 'Q3 2026', 
    currentCapacity: 175000, 
    plannedCapacity: 185000, 
    forecastDemand: 178000,
    utilizationRate: 97
  },
  { 
    quarter: 'Q4 2026', 
    currentCapacity: 185000, 
    plannedCapacity: 195000, 
    forecastDemand: 188000,
    utilizationRate: 97
  },
  { 
    quarter: 'Q1 2027', 
    currentCapacity: 195000, 
    plannedCapacity: 205000, 
    forecastDemand: 198000,
    utilizationRate: 97
  }
];

const expansionMilestones = [
  { project: 'Line A Expansion', budget: '₹25Cr', status: 'In Progress', completion: 75 },
  { project: 'Automation Upgrade', budget: '₹18Cr', status: 'Planning', completion: 15 },
  { project: 'Warehouse Extension', budget: '₹8Cr', status: 'Completed', completion: 100 },
  { project: 'Quality Lab Setup', budget: '₹5Cr', status: 'In Progress', completion: 60 },
];

const ExpansionTracker = () => {
  const { theme } = useTheme();
  const { featureValues } = useFeatureImportance();
  
  // Adjust capacity data based on feature importance values
  const capacityData = getBaseCapacityData().map(item => {
    const demandMultiplier = 1 + (featureValues.seasonalDemand - 85) * 0.002 + 
                           (featureValues.marketingSpend - 72) * 0.0015 + 
                           (featureValues.economicIndex - 54) * 0.001;
    
    return {
      ...item,
      forecastDemand: Math.round(item.forecastDemand * demandMultiplier)
    };
  });
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Manufacturing Expansion Tracker
      </h2>
      
      {/* Capacity vs Demand Forecast */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
          Capacity Planning vs Sales Forecast (Units)
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={capacityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="quarter" 
              tick={{ fontSize: 12, fill: theme === 'dark' ? '#D1D5DB' : '#374151' }} 
            />
            <YAxis 
              tick={{ fontSize: 12, fill: theme === 'dark' ? '#D1D5DB' : '#374151' }} 
            />
            <Tooltip 
              formatter={(value, name) => [
                `${Number(value).toLocaleString()} units`,
                name === 'currentCapacity' ? 'Current Capacity' : 
                name === 'plannedCapacity' ? 'Planned Capacity' : 'Forecast Demand'
              ]}
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#374151' : '#FFFFFF',
                border: `1px solid ${theme === 'dark' ? '#4B5563' : '#E5E7EB'}`,
                borderRadius: '6px',
                color: theme === 'dark' ? '#F9FAFB' : '#111827'
              }}
            />
            <Legend />
            <Bar dataKey="currentCapacity" fill={theme === 'dark' ? '#6B7280' : '#D1D5DB'} name="currentCapacity" radius={[0, 0, 0, 0]} />
            <Bar dataKey="plannedCapacity" fill="#007BFF" name="plannedCapacity" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="forecastDemand" stroke="#FF6B35" strokeWidth={3} name="forecastDemand" dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      {/* Expansion Projects Status */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">
          Expansion Project Milestones
        </h3>
        <div className="space-y-3">
          {expansionMilestones.map((project, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{project.project}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{project.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        project.status === 'Completed' ? 'bg-green-500' :
                        project.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${project.completion}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">{project.completion}%</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Key Manufacturing Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-lg font-bold text-blue-700 dark:text-blue-300">30,000 units</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Planned Capacity Addition</div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Q2-Q1 2025</div>
        </div>
        
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-lg font-bold text-green-700 dark:text-green-300">₹56 Cr</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Total Capex Investment</div>
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">ROI: 18% (3 years)</div>
        </div>
        
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="text-lg font-bold text-orange-700 dark:text-orange-300">94%</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Avg. Capacity Utilization</div>
          <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">Target: 90-95%</div>
        </div>
      </div>
    </div>
  );
};

export default ExpansionTracker;
