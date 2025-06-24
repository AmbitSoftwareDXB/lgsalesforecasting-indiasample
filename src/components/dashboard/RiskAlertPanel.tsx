
import { AlertTriangle, TrendingUp, Truck, Factory, Clock, AlertCircle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'critical',
    icon: AlertTriangle,
    title: 'Demand Spike Alert',
    description: 'Mumbai region showing 35% demand increase',
    time: '2 mins ago',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    id: 2,
    type: 'warning',
    icon: Truck,
    title: 'Production Delays',
    description: 'Supply chain bottleneck in packaging unit',
    time: '15 mins ago',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    id: 3,
    type: 'info',
    icon: TrendingUp,
    title: 'Sales Forecast Update',
    description: 'Q3 forecast revised upward by 8%',
    time: '1 hour ago',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 4,
    type: 'warning',
    icon: Factory,
    title: 'Maintenance Scheduled',
    description: 'Line 3 maintenance on weekend',
    time: '2 hours ago',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  {
    id: 5,
    type: 'info',
    icon: Clock,
    title: 'Lead Time Optimization',
    description: 'Achieved 2-day reduction in lead time',
    time: '4 hours ago',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
];

const riskMetrics = [
  { label: 'Supply Risk', value: 'Low', color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: 'Demand Volatility', value: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { label: 'Market Risk', value: 'Low', color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: 'Operational Risk', value: 'Medium', color: 'text-orange-600', bgColor: 'bg-orange-100' }
];

const RiskAlertPanel = () => {
  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
          Risk Overview
        </h2>
        
        <div className="space-y-3">
          {riskMetrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{metric.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${metric.color} ${metric.bgColor}`}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Alerts Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Real-time Alerts
        </h2>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {alerts.map((alert) => {
            const IconComponent = alert.icon;
            return (
              <div 
                key={alert.id} 
                className={`p-3 rounded-lg border-l-4 ${alert.bgColor} ${alert.borderColor} transition-all hover:shadow-md`}
              >
                <div className="flex items-start space-x-3">
                  <IconComponent className={`w-5 h-5 mt-0.5 ${alert.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {alert.title}
                      </h4>
                      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                        {alert.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {alert.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RiskAlertPanel;
