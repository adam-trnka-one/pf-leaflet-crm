
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useState } from "react";
import { DataDisplayModal } from "../modals/DataDisplayModal";

interface WorkspaceActionsProps {
  handleResetToDefaults: () => void;
  handleInitiateProductFruits: () => void;
  handleSaveWorkspaceData: () => void;
  workspaceData: any;
}

export const WorkspaceActions = ({ 
  handleResetToDefaults, 
  handleInitiateProductFruits, 
  handleSaveWorkspaceData,
  workspaceData 
}: WorkspaceActionsProps) => {
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [displayData, setDisplayData] = useState('');

  const handleViewSavedData = () => {
    const props: Record<string, string> = {};
    workspaceData.customProperties.forEach((prop: any, index: number) => {
      if (prop.name && prop.value) {
        props[`prop${index + 1}`] = prop.value;
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

  return (
    <>
      <div className="flex justify-between" data-testid="workspace-actions">
        <div className="flex space-x-3" data-testid="workspace-secondary-actions">
          <Button 
            variant="outline" 
            className="text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleResetToDefaults}
            data-testid="workspace-reset-defaults-button"
          >
            <span data-testid="workspace-reset-defaults-text">Reset to Defaults</span>
          </Button>
          <Button 
            variant="outline"
            onClick={handleViewSavedData}
            data-testid="workspace-view-saved-data-button"
          >
            <span data-testid="workspace-view-saved-data-text">View Saved Data</span>
          </Button>
        </div>
        <div className="flex space-x-3" data-testid="workspace-primary-actions">
          <Button 
            variant="outline"
            className="bg-green-600 hover:bg-green-700 text-white border-green-600"
            onClick={handleInitiateProductFruits}
            data-testid="workspace-initiate-productfruits-button"
          >
            <Play className="h-4 w-4 mr-2" data-testid="workspace-initiate-productfruits-icon" />
            <span data-testid="workspace-initiate-productfruits-text">Initiate ProductFruits</span>
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
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
