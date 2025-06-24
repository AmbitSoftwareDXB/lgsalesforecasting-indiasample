
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const expansionData = [
  { region: 'Mumbai', planned: 12, completed: 8, base: 45 },
  { region: 'Delhi', planned: 15, completed: 10, base: 38 },
  { region: 'Bangalore', planned: 8, completed: 6, base: 32 },
  { region: 'Chennai', planned: 10, completed: 5, base: 28 },
  { region: 'Kolkata', planned: 6, completed: 4, base: 22 },
];

const ExpansionTracker = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Expansion Tracker
      </h2>
      
      {/* Planned Store Opening Map */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">Store Opening Progress by Region</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={expansionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="region" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value, name) => [
                `${value} stores`,
                name === 'planned' ? 'Planned' : name === 'completed' ? 'Completed' : 'Existing Base'
              ]}
            />
            <Legend />
            <Bar dataKey="base" stackId="a" fill="#E5E7EB" name="base" radius={[0, 0, 0, 0]} />
            <Bar dataKey="completed" stackId="a" fill="#007BFF" name="completed" radius={[0, 0, 0, 0]} />
            <Bar dataKey="planned" stackId="a" fill="#8EC1E0" name="planned" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Expansion Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-700">51 stores</div>
          <div className="text-sm text-gray-600">Total Planned Expansion</div>
          <div className="text-xs text-blue-600 mt-1">Q2-Q4 2024</div>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-700">33 stores</div>
          <div className="text-sm text-gray-600">Completed Openings</div>
          <div className="text-xs text-green-600 mt-1">65% completion rate</div>
        </div>
      </div>
    </div>
  );
};

export default ExpansionTracker;
