import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, Key, Shield, Bell, Plug, Building, Code, FileText } from "lucide-react";
import { useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { WorkspaceTab } from "@/components/settings/WorkspaceTab";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { ApiTab } from "@/components/settings/ApiTab";
import { PermissionsTab } from "@/components/settings/PermissionsTab";
import { IntegrationsTab } from "@/components/settings/IntegrationsTab";
import { NotificationsTab } from "@/components/settings/NotificationsTab";
import { HtmlTab } from "@/components/settings/HtmlTab";
import { DataDisplayModal } from "@/components/settings/modals/DataDisplayModal";
import { UpgradeModal } from "@/components/settings/modals/UpgradeModal";

const Settings = () => {
  const { t } = useTranslation('settings');
  const { workspaceData } = useWorkspace();
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState('');
  const [displayData, setDisplayData] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const isMobile = useIsMobile();

  const isProductFruitsUser = useMemo(() => {
    return workspaceData.email?.toLowerCase().endsWith('@productfruits.com');
  }, [workspaceData.email]);

  const tabOptions = useMemo(() => {
    const baseOptions = [
      { value: 'profile', label: t('tabs.profile'), icon: User },
      { value: 'workspace', label: t('tabs.workspace'), icon: Building },
      { value: 'api', label: t('tabs.api'), icon: Key },
      { value: 'permissions', label: t('tabs.permissions'), icon: Shield },
      { value: 'integrations', label: t('tabs.integrations'), icon: Plug },
      { value: 'notifications', label: t('tabs.notifications'), icon: Bell },
    ];
    
    if (isProductFruitsUser) {
      baseOptions.push({ value: 'html', label: t('tabs.html', 'HTML'), icon: Code });
    }
    
    return baseOptions;
  }, [t, isProductFruitsUser]);

  const getCurrentTabLabel = () => {
    const currentTab = tabOptions.find(tab => tab.value === activeTab);
    return currentTab ? currentTab.label : 'Select Tab';
  };

  const getCurrentTabIcon = () => {
    const currentTab = tabOptions.find(tab => tab.value === activeTab);
    return currentTab ? currentTab.icon : User;
  };

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
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800" data-testid="settings-page-title">{t('title')}</h1>
          <p className="text-slate-600 mt-1 md:mt-2 text-sm md:text-base" data-testid="settings-page-subtitle">{t('subtitle')}</p>
        </div>

        {isMobile ? (
          <div className="space-y-4 md:space-y-6" data-testid="settings-tabs-container">
            <div className="bg-white rounded-lg border p-1">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full border-0 shadow-none focus:ring-0" data-testid="settings-tab-selector">
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const CurrentIcon = getCurrentTabIcon();
                      return <CurrentIcon className="h-4 w-4" />;
                    })()}
                    <SelectValue placeholder="Select a tab">
                      {getCurrentTabLabel()}
                    </SelectValue>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  {tabOptions.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <SelectItem 
                        key={tab.value} 
                        value={tab.value}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-slate-50"
                        data-testid={`settings-${tab.value}-option`}
                      >
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{tab.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {activeTab === 'profile' && (
              <div data-testid="settings-profile-tab-content">
                <ProfileTab />
              </div>
            )}

            {activeTab === 'workspace' && (
              <div data-testid="settings-workspace-tab-content">
                <WorkspaceTab />
              </div>
            )}

            {activeTab === 'api' && (
              <div data-testid="settings-api-tab-content">
                <ApiTab />
              </div>
            )}

            {activeTab === 'permissions' && (
              <div data-testid="settings-permissions-tab-content">
                <PermissionsTab />
              </div>
            )}

            {activeTab === 'integrations' && (
              <div data-testid="settings-integrations-tab-content">
                <IntegrationsTab />
              </div>
            )}

            {activeTab === 'notifications' && (
              <div data-testid="settings-notifications-tab-content">
                <NotificationsTab />
              </div>
            )}

            {activeTab === 'html' && isProductFruitsUser && (
              <div data-testid="settings-html-tab-content">
                <HtmlTab />
              </div>
            )}
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full bg-muted p-1 ${isProductFruitsUser ? 'grid-cols-7' : 'grid-cols-6'}`}>
              {tabOptions.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value}
                    className="flex items-center space-x-2 data-[state=active]:bg-background"
                    data-testid={`settings-${tab.value}-tab`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="hidden lg:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            <TabsContent value="profile" className="mt-4" data-testid="settings-profile-tab-content">
              <ProfileTab />
            </TabsContent>
            
            <TabsContent value="workspace" className="mt-4" data-testid="settings-workspace-tab-content">
              <WorkspaceTab />
            </TabsContent>
            
            <TabsContent value="api" className="mt-4" data-testid="settings-api-tab-content">
              <ApiTab />
            </TabsContent>
            
            <TabsContent value="permissions" className="mt-4" data-testid="settings-permissions-tab-content">
              <PermissionsTab />
            </TabsContent>
            
            <TabsContent value="integrations" className="mt-4" data-testid="settings-integrations-tab-content">
              <IntegrationsTab />
            </TabsContent>
            
            <TabsContent value="notifications" className="mt-4" data-testid="settings-notifications-tab-content">
              <NotificationsTab />
            </TabsContent>

            {isProductFruitsUser && (
              <TabsContent value="html" className="mt-4" data-testid="settings-html-tab-content">
                <HtmlTab />
              </TabsContent>
            )}
          </Tabs>
        )}
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
