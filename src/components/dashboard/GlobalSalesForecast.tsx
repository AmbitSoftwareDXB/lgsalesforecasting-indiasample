
import { ResponsiveContainer } from 'recharts';

const GlobalSalesForecast = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Global Sales Forecast Overview
      </h2>
      
      {/* World Map Heatmap */}
      <div className="mb-6">
        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 h-64">
          {/* Simplified World Map SVG */}
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            {/* North America */}
            <path d="M150 120 L280 110 L290 180 L250 220 L180 200 L120 160 Z" 
                  fill="#0056B3" className="opacity-90" />
            
            {/* South America */}
            <path d="M220 260 L280 250 L300 350 L260 420 L220 380 L200 320 Z" 
                  fill="#8EC1E0" className="opacity-80" />
            
            {/* Europe */}
            <path d="M420 100 L500 95 L520 140 L480 160 L440 150 L410 120 Z" 
                  fill="#007BFF" className="opacity-85" />
            
            {/* Africa */}
            <path d="M450 180 L520 170 L540 280 L500 350 L460 340 L430 250 Z" 
                  fill="#B3D9FF" className="opacity-70" />
            
            {/* Asia */}
            <path d="M550 80 L720 70 L750 180 L680 200 L600 160 L540 120 Z" 
                  fill="#003d82" className="opacity-95" />
            
            {/* Australia */}
            <path d="M700 320 L780 315 L790 360 L750 370 L720 355 Z" 
                  fill="#CCE7FF" className="opacity-75" />
            
            {/* India highlight */}
            <circle cx="620" cy="180" r="8" fill="#FF6B35" className="animate-pulse" />
            <text x="635" y="185" className="text-xs font-semibold fill-gray-700">India</text>
          </svg>
          
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
