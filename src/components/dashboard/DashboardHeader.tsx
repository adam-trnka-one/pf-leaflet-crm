import { Button } from "@/components/ui/button";
import { RefreshCw, Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DashboardHeaderProps {
  showChecklist: boolean;
  onToggleChecklist: () => void;
  showChecklistToggle?: boolean;
}

const DashboardHeader = ({ 
  showChecklist, 
  onToggleChecklist, 
  showChecklistToggle = true 
}: DashboardHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-start" data-testid="dashboard-header-section">
      <div data-testid="dashboard-header-content">
        <h1 className="text-3xl font-bold text-slate-800" data-testid="dashboard-page-title">{t('dashboard.title')}</h1>
        <p className="text-slate-600 mt-2" data-testid="dashboard-page-subtitle">{t('dashboard.welcome')}! {t('dashboard.overview')}.</p>
      </div>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        {showChecklistToggle && (
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
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
