
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
              AI-based Sales Analytics | LG India Pune Plant
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-right">
              <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-md">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Session</span>
                <div className="text-sm font-mono text-blue-700 dark:text-blue-300">At 8B244</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
