
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building } from "lucide-react";
import { useWorkspaceForm } from "@/hooks/useWorkspaceForm";
import { WorkspaceBasicFields } from "./workspace/WorkspaceBasicFields";
import { CustomPropertiesSection } from "./workspace/CustomPropertiesSection";
import { WorkspaceActions } from "./workspace/WorkspaceActions";

export const WorkspaceTab = () => {
  const {
    localWorkspaceData,
    setLocalWorkspaceData,
    customProperties,
    setCustomProperties,
    handleSaveWorkspaceData,
    handleInitiateProductFruits,
    handleResetToDefaults,
    workspaceData
  } = useWorkspaceForm();

  return (
    <Card className="bg-white shadow-sm" data-settings="workspace-card">
      <CardHeader data-settings="workspace-card-header">
        <CardTitle className="flex items-center space-x-2" data-settings="workspace-card-title">
          <Building className="h-5 w-5" data-settings="workspace-icon" />
          <span data-settings="workspace-title-text">Workspace Configuration</span>
        </CardTitle>
        <p className="text-sm text-slate-600" data-settings="workspace-description">
          Configure your workspace settings below. This information will be used to initialize ProductFruits on your site.
        </p>
      </CardHeader>
      <CardContent className="space-y-6" data-settings="workspace-card-content">
        <WorkspaceBasicFields 
          localWorkspaceData={localWorkspaceData}
          setLocalWorkspaceData={setLocalWorkspaceData}
        />

        <Separator data-settings="workspace-separator-1" />

        <CustomPropertiesSection 
          customProperties={customProperties}
          setCustomProperties={setCustomProperties}
        />

        <Separator data-settings="workspace-separator-2" />

        <WorkspaceActions 
          handleResetToDefaults={handleResetToDefaults}
          handleInitiateProductFruits={handleInitiateProductFruits}
          handleSaveWorkspaceData={handleSaveWorkspaceData}
          workspaceData={workspaceData}
        />
      </CardContent>
    </Card>
  );
};
