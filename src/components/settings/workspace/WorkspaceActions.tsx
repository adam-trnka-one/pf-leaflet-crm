
import { Button } from "@/components/ui/button";
import { Play, X, Loader2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataDisplayModal } from "../modals/DataDisplayModal";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useTranslation } from "react-i18next";

interface WorkspaceActionsProps {
  handleResetToDefaults: () => void;
  handleInitiateProductFruits: () => void;
  handleSaveWorkspaceData: () => void;
  handleDisableProductFruits: () => void;
  workspaceData: any;
}

export const WorkspaceActions = ({ 
  handleResetToDefaults, 
  handleInitiateProductFruits, 
  handleSaveWorkspaceData,
  handleDisableProductFruits,
  workspaceData 
}: WorkspaceActionsProps) => {
  const { t } = useTranslation('settings');
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [displayData, setDisplayData] = useState('');
  const [isInitiating, setIsInitiating] = useState(false);
  const navigate = useNavigate();
  const { handleResetDatabase } = useDashboardData();

  const handleViewSavedData = () => {
    const props: Record<string, string> = {};
    workspaceData.customProperties.forEach((prop: any) => {
      if (prop.name && prop.value) {
        props[prop.name] = prop.value;
      }
    });

    const signUpDate = new Date().toISOString();

    const initData = {
      username: workspaceData.username,
      ...(workspaceData.email && { email: workspaceData.email }),
      ...(workspaceData.firstName && { firstname: workspaceData.firstName }),
      ...(workspaceData.lastName && { lastname: workspaceData.lastName }),
      signUpAt: signUpDate,
      ...(workspaceData.role && { role: workspaceData.role }),
      ...(Object.keys(props).length > 0 && { props })
    };

    const productFruitsScript = `window.$productFruits.push(['init', '${workspaceData.workspaceCode}', 'en', ${JSON.stringify(initData, null, 2)}]);`;
    
    console.log('Current workspace data from localStorage:');
    console.log('Raw data:', workspaceData);
    console.log('\nProductFruits script format:');
    console.log(productFruitsScript);
    
    setDisplayData(productFruitsScript);
    setIsDataModalOpen(true);
  };

  const handleSaveAndInitiate = async () => {
    console.log('Starting save and initiation process...');
    setIsInitiating(true);
    
    try {
      // First save workspace data
      console.log('Saving workspace data...');
      await handleSaveWorkspaceData();
      
      // Then initiate ProductFruits (now properly async with destroy/init sequencing)
      console.log('Calling handleInitiateProductFruits...');
      const success = await handleInitiateProductFruits();
      console.log('handleInitiateProductFruits completed, success:', success);
      
      if (success) {
        // Full reload to ensure PF state is clean
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      }
    } catch (error) {
      console.error('Error in save and initiate:', error);
    } finally {
      setIsInitiating(false);
    }
  };

  console.log('Current isInitiating state:', isInitiating);

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between gap-4" data-testid="workspace-actions">
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3" data-testid="workspace-secondary-actions">
          <Button 
            variant="outline" 
            className="text-orange-600 border-orange-200 hover:bg-orange-50 w-full sm:w-auto"
            onClick={handleResetDatabase}
            data-testid="workspace-reset-database-button"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            <span data-testid="workspace-reset-database-text">{t('workspace.resetButton')}</span>
          </Button>
          <Button 
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleViewSavedData}
            data-testid="workspace-view-saved-data-button"
          >
            <span data-testid="workspace-view-saved-data-text">{t('workspace.viewDataButton')}</span>
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3" data-testid="workspace-primary-actions">
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 w-full sm:w-auto"
            onClick={handleSaveAndInitiate}
            disabled={isInitiating}
            data-testid="workspace-save-initiate-button"
          >
            {isInitiating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" data-testid="workspace-save-initiate-loader" />
            ) : (
              <Play className="h-4 w-4 mr-2" data-testid="workspace-save-initiate-icon" />
            )}
            <span data-testid="workspace-save-initiate-text">
              {isInitiating ? 'Saving & Initiating...' : t('workspace.initiateButton')}
            </span>
          </Button>
        </div>
      </div>

      <DataDisplayModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        displayData={displayData}
      />
    </>
  );
};
