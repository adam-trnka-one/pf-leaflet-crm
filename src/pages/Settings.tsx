
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Key, Shield, Bell, Plug, Building } from "lucide-react";
import { useState } from "react";
import { WorkspaceTab } from "@/components/settings/WorkspaceTab";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { ApiTab } from "@/components/settings/ApiTab";
import { PermissionsTab } from "@/components/settings/PermissionsTab";
import { IntegrationsTab } from "@/components/settings/IntegrationsTab";
import { NotificationsTab } from "@/components/settings/NotificationsTab";
import { DataDisplayModal } from "@/components/settings/modals/DataDisplayModal";
import { UpgradeModal } from "@/components/settings/modals/UpgradeModal";

const Settings = () => {
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState('');
  const [displayData, setDisplayData] = useState('');

  const handleViewSavedData = (scriptData: string) => {
    setDisplayData(scriptData);
    setIsDataModalOpen(true);
  };

  const handleIntegrationConnect = (integrationName: string) => {
    setSelectedIntegration(integrationName);
    setIsUpgradeModalOpen(true);
  };

  return (
    <>
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen" data-testid="settings-main-container">
        <div className="mb-6 md:mb-8" data-testid="settings-header-section">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800" data-testid="settings-page-title">Settings</h1>
          <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base" data-testid="settings-page-subtitle">Manage your account and application settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4 md:space-y-6" data-testid="settings-tabs-container">
          <TabsList className="bg-white grid w-full grid-cols-2 md:grid-cols-6 h-auto md:h-10 gap-1 md:gap-0" data-testid="settings-tabs-list">
            <TabsTrigger value="profile" className="flex items-center justify-center md:justify-start space-x-1 md:space-x-2 p-2 md:p-3 text-xs md:text-sm" data-testid="settings-profile-tab-trigger">
              <User className="h-3 w-3 md:h-4 md:w-4" data-testid="settings-profile-icon" />
              <span className="hidden sm:inline" data-testid="settings-profile-text">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="workspace" className="flex items-center justify-center md:justify-start space-x-1 md:space-x-2 p-2 md:p-3 text-xs md:text-sm" data-testid="settings-workspace-tab-trigger">
              <Building className="h-3 w-3 md:h-4 md:w-4" data-testid="settings-workspace-icon" />
              <span className="hidden sm:inline" data-testid="settings-workspace-text">Workspace</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center justify-center md:justify-start space-x-1 md:space-x-2 p-2 md:p-3 text-xs md:text-sm md:flex" data-testid="settings-api-tab-trigger">
              <Key className="h-3 w-3 md:h-4 md:w-4" data-testid="settings-api-icon" />
              <span className="hidden sm:inline" data-testid="settings-api-text">API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center justify-center md:justify-start space-x-1 md:space-x-2 p-2 md:p-3 text-xs md:text-sm md:flex" data-testid="settings-permissions-tab-trigger">
              <Shield className="h-3 w-3 md:h-4 md:w-4" data-testid="settings-permissions-icon" />
              <span className="hidden sm:inline" data-testid="settings-permissions-text">Permissions</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center justify-center md:justify-start space-x-1 md:space-x-2 p-2 md:p-3 text-xs md:text-sm md:flex" data-testid="settings-integrations-tab-trigger">
              <Plug className="h-3 w-3 md:h-4 md:w-4" data-testid="settings-integrations-icon" />
              <span className="hidden sm:inline" data-testid="settings-integrations-text">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center justify-center md:justify-start space-x-1 md:space-x-2 p-2 md:p-3 text-xs md:text-sm md:flex" data-testid="settings-notifications-tab-trigger">
              <Bell className="h-3 w-3 md:h-4 md:w-4" data-testid="settings-notifications-icon" />
              <span className="hidden sm:inline" data-testid="settings-notifications-text">Notifications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" data-testid="settings-profile-tab-content">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="workspace" data-testid="settings-workspace-tab-content">
            <WorkspaceTab />
          </TabsContent>

          <TabsContent value="api" data-testid="settings-api-tab-content">
            <ApiTab />
          </TabsContent>

          <TabsContent value="permissions" data-testid="settings-permissions-tab-content">
            <PermissionsTab />
          </TabsContent>

          <TabsContent value="integrations" data-testid="settings-integrations-tab-content">
            <IntegrationsTab />
          </TabsContent>

          <TabsContent value="notifications" data-testid="settings-notifications-tab-content">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </div>

      <DataDisplayModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        displayData={displayData}
        data-testid="settings-data-display-modal"
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        selectedIntegration={selectedIntegration}
        data-testid="settings-upgrade-modal"
      />
    </>
  );
};

export default Settings;
