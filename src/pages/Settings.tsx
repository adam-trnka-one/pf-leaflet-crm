
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
      <div className="p-8 bg-slate-50 min-h-screen" data-settings="main-container">
        <div className="mb-8" data-settings="header-section">
          <h1 className="text-3xl font-bold text-slate-800" data-settings="page-title">Settings</h1>
          <p className="text-slate-600 mt-2" data-settings="page-subtitle">Manage your account and application settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6" data-settings="tabs-container">
          <TabsList className="bg-white" data-settings="tabs-list">
            <TabsTrigger value="profile" className="flex items-center space-x-2" data-settings="profile-tab-trigger">
              <User className="h-4 w-4" data-settings="profile-icon" />
              <span data-settings="profile-text">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="workspace" className="flex items-center space-x-2" data-settings="workspace-tab-trigger">
              <Building className="h-4 w-4" data-settings="workspace-icon" />
              <span data-settings="workspace-text">Workspace</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2" data-settings="api-tab-trigger">
              <Key className="h-4 w-4" data-settings="api-icon" />
              <span data-settings="api-text">API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center space-x-2" data-settings="permissions-tab-trigger">
              <Shield className="h-4 w-4" data-settings="permissions-icon" />
              <span data-settings="permissions-text">Permissions</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2" data-settings="integrations-tab-trigger">
              <Plug className="h-4 w-4" data-settings="integrations-icon" />
              <span data-settings="integrations-text">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2" data-settings="notifications-tab-trigger">
              <Bell className="h-4 w-4" data-settings="notifications-icon" />
              <span data-settings="notifications-text">Notifications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" data-settings="profile-tab-content">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="workspace" data-settings="workspace-tab-content">
            <WorkspaceTab />
          </TabsContent>

          <TabsContent value="api" data-settings="api-tab-content">
            <ApiTab />
          </TabsContent>

          <TabsContent value="permissions" data-settings="permissions-tab-content">
            <PermissionsTab />
          </TabsContent>

          <TabsContent value="integrations" data-settings="integrations-tab-content">
            <IntegrationsTab />
          </TabsContent>

          <TabsContent value="notifications" data-settings="notifications-tab-content">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </div>

      <DataDisplayModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        displayData={displayData}
        data-settings="data-display-modal"
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        selectedIntegration={selectedIntegration}
        data-settings="upgrade-modal"
      />
    </>
  );
};

export default Settings;
