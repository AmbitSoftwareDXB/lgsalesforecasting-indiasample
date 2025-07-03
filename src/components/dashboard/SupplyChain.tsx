
import { useFeatureImportance } from '@/contexts/FeatureImportanceContext';

const getBaseSupplyChainStages = () => [
  { stage: 'Raw Materials', progress: 95, color: 'bg-green-500' },
  { stage: 'Manufacturing', progress: 78, color: 'bg-blue-500' },
  { stage: 'Quality Control', progress: 88, color: 'bg-yellow-500' },
  { stage: 'Packaging', progress: 92, color: 'bg-purple-500' },
  { stage: 'Distribution', progress: 85, color: 'bg-orange-500' },
];

const SupplyChain = () => {
  const { featureValues } = useFeatureImportance();
  
  // Adjust supply chain stages based on feature importance values
  const supplyChainStages = getBaseSupplyChainStages().map(stage => {
    let adjustment = 0;
    
    // Inventory levels affect all stages
    adjustment += (featureValues.inventoryLevels - 68) * 0.1;
    
    // Manufacturing affected by economic conditions
    if (stage.stage === 'Manufacturing') {
      adjustment += (featureValues.economicIndex - 54) * 0.15;
    }
    
    // Distribution affected by competition
    if (stage.stage === 'Distribution') {
      adjustment -= (featureValues.competitionPrice - 41) * 0.1;
    }
    
    return {
      ...stage,
      progress: Math.min(100, Math.max(0, stage.progress + adjustment))
    };
  });
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Factory Supply Chain View
      </h2>
      
      {/* Production Schedule */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-3">Production Schedule</h3>
        <div className="space-y-3">
          {supplyChainStages.map((stage, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-24 text-sm text-gray-600 dark:text-gray-300 font-medium">
                {stage.stage}
              </div>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative">
                <div 
                  className={`${stage.color} h-3 rounded-full transition-all duration-300`}
                  style={{ width: `${stage.progress}%` }}
                ></div>
              </div>
              <div className="w-12 text-sm font-medium text-gray-700 dark:text-gray-300">
                {stage.progress}%
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stats in 2-column format */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-300">Current Stock</span>
            <span className="font-semibold text-gray-900 dark:text-white">15,240 units</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-300">Lead Time</span>
            <span className="font-semibold text-green-700 dark:text-green-400">12 days</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-300">MAPE Score</span>
            <span className="font-semibold text-blue-700 dark:text-blue-400">8.2%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm text-gray-600 dark:text-gray-300">Efficiency</span>
            <span className="font-semibold text-purple-700 dark:text-purple-400">94.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChain;
