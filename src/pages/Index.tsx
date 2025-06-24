
import Header from "@/components/dashboard/Header";
import GlobalSalesForecast from "@/components/dashboard/GlobalSalesForecast";
import RegionBreakdown from "@/components/dashboard/RegionBreakdown";
import SupplyChain from "@/components/dashboard/SupplyChain";
import ExpansionTracker from "@/components/dashboard/ExpansionTracker";
import RiskAlertPanel from "@/components/dashboard/RiskAlertPanel";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Analytics Section - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <GlobalSalesForecast />
            <RegionBreakdown />
            <SupplyChain />
            <ExpansionTracker />
          </div>
          
          {/* Sidebar Panels - 1/3 width */}
          <div className="space-y-6">
            <RiskAlertPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
