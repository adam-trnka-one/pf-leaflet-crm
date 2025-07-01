
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface DashboardHeaderProps {
  onResetDatabase: () => void;
}

const DashboardHeader = ({ onResetDatabase }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-start" data-dashboard="header-section">
      <div data-dashboard="header-content">
        <h1 className="text-3xl font-bold text-slate-800" data-dashboard="page-title">Dashboard</h1>
        <p className="text-slate-600 mt-2" data-dashboard="page-subtitle">Welcome back! Here's what's happening with your sales.</p>
      </div>
      <Button 
        onClick={onResetDatabase}
        variant="outline"
        className="flex items-center space-x-2"
        data-dashboard="reset-button"
      >
        <RefreshCw className="h-4 w-4" data-dashboard="reset-icon" />
        <span data-dashboard="reset-text">Reset Database</span>
      </Button>
    </div>
  );
};

export default DashboardHeader;
