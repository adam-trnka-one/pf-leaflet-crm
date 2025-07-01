
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
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-600 mt-2">Manage your account and application settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="workspace" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Workspace</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <span>API Keys</span>
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Permissions</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2">
              <Plug className="h-4 w-4" />
              <span>Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="workspace">
            <WorkspaceTab />
          </TabsContent>

          <TabsContent value="api">
            <ApiTab />
          </TabsContent>

          <TabsContent value="permissions">
            <PermissionsTab />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsTab />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </div>

      <DataDisplayModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        displayData={displayData}
      />

      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        selectedIntegration={selectedIntegration}
      />
    </>
  );
};

export default Settings;
