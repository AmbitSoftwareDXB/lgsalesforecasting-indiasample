
const supplyChainStages = [
  { stage: 'Raw Materials', progress: 95, color: 'bg-green-500' },
  { stage: 'Manufacturing', progress: 78, color: 'bg-blue-500' },
  { stage: 'Quality Control', progress: 88, color: 'bg-yellow-500' },
  { stage: 'Packaging', progress: 92, color: 'bg-purple-500' },
  { stage: 'Distribution', progress: 85, color: 'bg-orange-500' },
];

const SupplyChain = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Factory Supply Chain View
      </h2>
      
      {/* Production Schedule */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 mb-3">Production Schedule</h3>
        <div className="space-y-3">
          {supplyChainStages.map((stage, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-24 text-sm text-gray-600 font-medium">
                {stage.stage}
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                <div 
                  className={`${stage.color} h-3 rounded-full transition-all duration-300`}
                  style={{ width: `${stage.progress}%` }}
                ></div>
              </div>
              <div className="w-12 text-sm font-medium text-gray-700">
                {stage.progress}%
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats in 2-column format */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Current Stock</span>
            <span className="font-semibold text-gray-900">15,240 units</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Lead Time</span>
            <span className="font-semibold text-green-700">12 days</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">MAPE Score</span>
            <span className="font-semibold text-blue-700">8.2%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">Efficiency</span>
            <span className="font-semibold text-purple-700">94.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChain;
