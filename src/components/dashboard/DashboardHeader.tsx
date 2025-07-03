
import { Button } from "@/components/ui/button";
import { RefreshCw, Eye, EyeOff } from "lucide-react";

interface DashboardHeaderProps {
  onResetDatabase: () => void;
  showChecklist: boolean;
  onToggleChecklist: () => void;
}

const DashboardHeader = ({ onResetDatabase, showChecklist, onToggleChecklist }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-start" data-testid="dashboard-header-section">
      <div data-testid="dashboard-header-content">
        <h1 className="text-3xl font-bold text-slate-800" data-testid="dashboard-page-title">Dashboard</h1>
        <p className="text-slate-600 mt-2" data-testid="dashboard-page-subtitle">Welcome back! Here's what's happening with your sales.</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          onClick={onToggleChecklist}
          variant="outline"
          size="icon"
          data-testid="dashboard-toggle-checklist-button"
          title={showChecklist ? "Hide checklist" : "Show checklist"}
        >
          {showChecklist ? (
            <EyeOff className="h-4 w-4" data-testid="dashboard-hide-checklist-icon" />
          ) : (
            <Eye className="h-4 w-4" data-testid="dashboard-show-checklist-icon" />
          )}
        </Button>
        <Button 
          onClick={onResetDatabase}
          variant="outline"
          className="flex items-center space-x-2"
          data-testid="dashboard-reset-button"
        >
          <RefreshCw className="h-4 w-4" data-testid="dashboard-reset-icon" />
          <span data-testid="dashboard-reset-text">Reset Database</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
