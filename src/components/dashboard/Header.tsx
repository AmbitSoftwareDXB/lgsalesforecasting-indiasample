
const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
              AI-based Sales Analytics
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              LG India's Pune Plant
            </p>
          </div>
          
          <div className="text-right">
            <div className="bg-blue-50 px-3 py-1 rounded-md">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Session</span>
              <div className="text-sm font-mono text-blue-700">At 8B244</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
