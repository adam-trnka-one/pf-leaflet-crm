
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building } from "lucide-react";
import { useWorkspaceForm } from "@/hooks/useWorkspaceForm";
import { WorkspaceBasicFields } from "./workspace/WorkspaceBasicFields";
import { CustomPropertiesSection } from "./workspace/CustomPropertiesSection";
import { WorkspaceActions } from "./workspace/WorkspaceActions";
import { useTranslation } from "react-i18next";

export const WorkspaceTab = () => {
  const { t } = useTranslation();
  const {
    localWorkspaceData,
    setLocalWorkspaceData,
    customProperties,
    setCustomProperties,
    handleSaveWorkspaceData,
    handleInitiateProductFruits,
    handleDisableProductFruits,
    handleResetToDefaults,
    workspaceData
  } = useWorkspaceForm();

  return (
    <Card className="bg-white shadow-sm" data-testid="workspace-card">
      <CardHeader data-testid="workspace-card-header">
        <CardTitle className="flex items-center space-x-2" data-testid="workspace-card-title">
          <Building className="h-5 w-5" data-testid="workspace-icon" />
          <span data-testid="workspace-title-text">{t('settings.workspace.title')}</span>
        </CardTitle>
        <p className="text-sm text-slate-600" data-testid="workspace-description">
          {t('settings.workspace.description')}
        </p>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6" data-testid="workspace-card-content">
        <WorkspaceBasicFields 
          localWorkspaceData={localWorkspaceData}
          setLocalWorkspaceData={setLocalWorkspaceData}
        />

        <Separator data-testid="workspace-separator-1" />

        <CustomPropertiesSection 
          customProperties={customProperties}
          setCustomProperties={setCustomProperties}
        />

        <Separator data-testid="workspace-separator-2" />

        <WorkspaceActions 
          handleResetToDefaults={handleResetToDefaults}
          handleInitiateProductFruits={handleInitiateProductFruits}
          handleDisableProductFruits={handleDisableProductFruits}
          handleSaveWorkspaceData={handleSaveWorkspaceData}
          workspaceData={workspaceData}
        />
      </CardContent>
    </Card>
  );
};