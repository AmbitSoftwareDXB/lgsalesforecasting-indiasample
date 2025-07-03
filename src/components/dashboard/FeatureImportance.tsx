
import { BarChart3, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { useFeatureImportance } from '@/contexts/FeatureImportanceContext';

const FeatureImportance = () => {
  const [timeRange, setTimeRange] = useState<'month' | 'quarter'>('month');
  const [forecastType, setForecastType] = useState<'sales' | 'supply' | 'risk'>('sales');
  const { featureValues, updateFeatureValue } = useFeatureImportance();

  const getFeatureValue = (featureName: string): number => {
    const featureMap: { [key: string]: keyof typeof featureValues } = {
      'Seasonal Demand': 'seasonalDemand',
      'Marketing Spend': 'marketingSpend', 
      'Inventory Levels': 'inventoryLevels',
      'Economic Index': 'economicIndex',
      'Competition Price': 'competitionPrice'
    };
    
    const key = featureMap[featureName];
    return key ? featureValues[key] : 0;
  };

  const handleFeatureChange = (featureName: string, value: number[]) => {
    const featureMap: { [key: string]: keyof typeof featureValues } = {
      'Seasonal Demand': 'seasonalDemand',
      'Marketing Spend': 'marketingSpend',
      'Inventory Levels': 'inventoryLevels', 
      'Economic Index': 'economicIndex',
      'Competition Price': 'competitionPrice'
    };
    
    const key = featureMap[featureName];
    if (key) {
      updateFeatureValue(key, value[0]);
    }
  };

  const featuresData = {
    month: {
      sales: [
        { name: 'Seasonal Demand', impact: getFeatureValue('Seasonal Demand'), direction: 'positive', description: 'Peak season demand patterns' },
        { name: 'Marketing Spend', impact: getFeatureValue('Marketing Spend'), direction: 'positive', description: 'Advertising and promotional investments' },
        { name: 'Inventory Levels', impact: getFeatureValue('Inventory Levels'), direction: 'negative', description: 'Current stock availability' },
        { name: 'Economic Index', impact: getFeatureValue('Economic Index'), direction: 'positive', description: 'Regional economic indicators' },
        { name: 'Competition Price', impact: getFeatureValue('Competition Price'), direction: 'negative', description: 'Competitor pricing strategies' }
      ],
      supply: [
        { name: 'Supplier Reliability', impact: 78, direction: 'positive', description: 'Vendor delivery consistency' },
        { name: 'Raw Material Cost', impact: 65, direction: 'negative', description: 'Input material pricing' },
        { name: 'Transportation', impact: 59, direction: 'negative', description: 'Logistics and shipping costs' },
        { name: 'Production Capacity', impact: 52, direction: 'positive', description: 'Manufacturing capability' },
        { name: 'Quality Metrics', impact: 47, direction: 'positive', description: 'Product quality indicators' }
      ],
      risk: [
        { name: 'Demand Volatility', impact: 82, direction: 'negative', description: 'Market demand fluctuations' },
        { name: 'Supply Chain Risk', impact: 71, direction: 'negative', description: 'Supplier and logistics risks' },
        { name: 'Market Conditions', impact: 63, direction: 'negative', description: 'Economic and competitive factors' },
        { name: 'Regulatory Changes', impact: 48, direction: 'negative', description: 'Policy and compliance updates' },
        { name: 'Technology Adoption', impact: 36, direction: 'positive', description: 'Digital transformation impact' }
      ]
    },
    quarter: {
      sales: [
        { name: 'Market Trends', impact: 89, direction: 'positive', description: 'Quarterly market dynamics' },
        { name: 'Customer Retention', impact: 76, direction: 'positive', description: 'Long-term customer loyalty' },
        { name: 'Product Innovation', impact: 64, direction: 'positive', description: 'New product launches' },
        { name: 'Brand Recognition', impact: 58, direction: 'positive', description: 'Brand awareness metrics' },
        { name: 'Distribution Network', impact: 43, direction: 'positive', description: 'Channel effectiveness' }
      ],
      supply: [
        { name: 'Strategic Partnerships', impact: 81, direction: 'positive', description: 'Long-term supplier agreements' },
        { name: 'Capacity Planning', impact: 69, direction: 'positive', description: 'Quarterly capacity allocation' },
        { name: 'Cost Optimization', impact: 57, direction: 'positive', description: 'Operational efficiency gains' },
        { name: 'Risk Mitigation', impact: 51, direction: 'positive', description: 'Supply chain resilience' },
        { name: 'Technology Integration', impact: 44, direction: 'positive', description: 'System automation benefits' }
      ],
      risk: [
        { name: 'Market Uncertainty', impact: 79, direction: 'negative', description: 'Long-term market volatility' },
        { name: 'Financial Exposure', impact: 67, direction: 'negative', description: 'Financial risk factors' },
        { name: 'Operational Risk', impact: 55, direction: 'negative', description: 'Internal process risks' },
        { name: 'Competitive Pressure', impact: 49, direction: 'negative', description: 'Market competition intensity' },
        { name: 'Regulatory Risk', impact: 38, direction: 'negative', description: 'Compliance and policy risks' }
      ]
    }
  };

  const currentFeatures = featuresData[timeRange][forecastType];

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
            Feature Importance
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">These factors contribute to the AI forecast variance.<br />Higher impact values indicate stronger influence.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Toggle Controls */}
        <div className="flex flex-wrap gap-2 mt-3">
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
            <Button
              variant={timeRange === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('month')}
              className="rounded-none text-xs"
            >
              This Month
            </Button>
            <Button
              variant={timeRange === 'quarter' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange('quarter')}
              className="rounded-none text-xs"
            >
              Last Quarter
            </Button>
          </div>
          
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
            <Button
              variant={forecastType === 'sales' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setForecastType('sales')}
              className="rounded-none text-xs"
            >
              Sales
            </Button>
            <Button
              variant={forecastType === 'supply' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setForecastType('supply')}
              className="rounded-none text-xs"
            >
              Supply Chain
            </Button>
            <Button
              variant={forecastType === 'risk' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setForecastType('risk')}
              className="rounded-none text-xs"
            >
              Risk
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {currentFeatures.map((feature, index) => (
            <TooltipProvider key={feature.name}>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        {feature.direction === 'positive' ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {feature.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {Math.round(feature.impact)}%
                      </span>
                    </div>
                    
                    {/* Interactive Slider for core sales features */}
                    {forecastType === 'sales' && timeRange === 'month' && [
                      'Seasonal Demand', 'Marketing Spend', 'Inventory Levels', 
                      'Economic Index', 'Competition Price'
                    ].includes(feature.name) ? (
                      <div className="space-y-2">
                        <Slider
                          value={[feature.impact]}
                          onValueChange={(value) => handleFeatureChange(feature.name, value)}
                          max={100}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          Drag to adjust impact
                        </div>
                      </div>
                    ) : (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 transition-all duration-300"
                          style={{ width: `${feature.impact}%` }}
                        />
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm font-medium">{feature.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{feature.description}</p>
                  <p className="text-xs">
                    <span className={feature.direction === 'positive' ? 'text-green-500' : 'text-red-500'}>
                      {feature.direction === 'positive' ? 'Positive' : 'Negative'} correlation
                    </span>
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureImportance;
