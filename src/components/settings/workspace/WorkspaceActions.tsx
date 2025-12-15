
import { Button } from "@/components/ui/button";
import { Play, X, Loader2, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataDisplayModal } from "../modals/DataDisplayModal";
import { useDashboardData } from "@/hooks/useDashboardData";

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

  const handleInitiateWithLoading = async () => {
    console.log('Starting initiation process...');
    setIsInitiating(true);
    console.log('Loading state set to true');
    
    try {
      console.log('Calling handleInitiateProductFruits...');
      await handleInitiateProductFruits();
      console.log('handleInitiateProductFruits completed');
      
    // Add a small delay to show the loading state
    console.log('Adding delay...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Delay completed, staying on current page...');
    } catch (error) {
      console.error('Error initiating ProductFruits:', error);
    } finally {
      console.log('Setting loading state to false');
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
            <span data-testid="workspace-reset-database-text">Reset to Default</span>
          </Button>
          <Button 
            variant="outline"
            className="w-full sm:w-auto"
            onClick={handleViewSavedData}
            data-testid="workspace-view-saved-data-button"
          >
            <span data-testid="workspace-view-saved-data-text">View Saved Data</span>
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3" data-testid="workspace-primary-actions">
          <Button 
            variant="outline"
            className="bg-green-600 hover:bg-green-700 text-white border-green-600 disabled:opacity-50 w-full sm:w-auto"
            onClick={handleInitiateWithLoading}
            disabled={isInitiating}
            data-testid="workspace-initiate-productfruits-button"
          >
            {isInitiating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" data-testid="workspace-initiate-productfruits-loader" />
            ) : (
              <Play className="h-4 w-4 mr-2" data-testid="workspace-initiate-productfruits-icon" />
            )}
            <span data-testid="workspace-initiate-productfruits-text">
              {isInitiating ? 'Initiating...' : 'Initiate ProductFruits'}
            </span>
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            onClick={handleSaveWorkspaceData}
            data-testid="workspace-save-workspace-button"
          >
            <span data-testid="workspace-save-workspace-text">Save Workspace Data</span>
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
