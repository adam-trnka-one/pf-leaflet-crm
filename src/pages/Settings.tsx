
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
          <div className="overflow-x-auto">
            <TabsList className="bg-white flex w-max md:grid md:w-full md:grid-cols-6 h-auto md:h-10 gap-1 p-1" data-testid="settings-tabs-list">
              <TabsTrigger value="profile" className="flex items-center space-x-2 px-3 py-2 text-sm whitespace-nowrap" data-testid="settings-profile-tab-trigger">
                <User className="h-4 w-4" data-testid="settings-profile-icon" />
                <span data-testid="settings-profile-text">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="workspace" className="flex items-center space-x-2 px-3 py-2 text-sm whitespace-nowrap" data-testid="settings-workspace-tab-trigger">
                <Building className="h-4 w-4" data-testid="settings-workspace-icon" />
                <span data-testid="settings-workspace-text">Workspace</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center space-x-2 px-3 py-2 text-sm whitespace-nowrap" data-testid="settings-api-tab-trigger">
                <Key className="h-4 w-4" data-testid="settings-api-icon" />
                <span data-testid="settings-api-text">API Keys</span>
              </TabsTrigger>
              <TabsTrigger value="permissions" className="flex items-center space-x-2 px-3 py-2 text-sm whitespace-nowrap" data-testid="settings-permissions-tab-trigger">
                <Shield className="h-4 w-4" data-testid="settings-permissions-icon" />
                <span data-testid="settings-permissions-text">Permissions</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center space-x-2 px-3 py-2 text-sm whitespace-nowrap" data-testid="settings-integrations-tab-trigger">
                <Plug className="h-4 w-4" data-testid="settings-integrations-icon" />
                <span data-testid="settings-integrations-text">Integrations</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2 px-3 py-2 text-sm whitespace-nowrap" data-testid="settings-notifications-tab-trigger">
                <Bell className="h-4 w-4" data-testid="settings-notifications-icon" />
                <span data-testid="settings-notifications-text">Notifications</span>
              </TabsTrigger>
            </TabsList>
          </div>

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
