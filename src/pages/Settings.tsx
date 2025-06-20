import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { User, Key, Shield, Bell, Plug, Building, Crown } from "lucide-react";
import { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useProductFruits } from "@/hooks/useProductFruits";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const { workspaceData, updateWorkspaceData } = useWorkspace();
  const { initializeProductFruits } = useProductFruits();
  
  const [localWorkspaceData, setLocalWorkspaceData] = useState({
    workspaceCode: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    customProperties: []
  });
  const [customProperties, setCustomProperties] = useState<{ name: string; value: string }[]>([]);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState('');
  const [displayData, setDisplayData] = useState('');

  // Load workspace data into local state when context data changes
  useEffect(() => {
    setLocalWorkspaceData({
      workspaceCode: workspaceData.workspaceCode,
      username: workspaceData.username,
      email: workspaceData.email,
      firstName: workspaceData.firstName,
      lastName: workspaceData.lastName,
      role: workspaceData.role,
      customProperties: workspaceData.customProperties
    });
    setCustomProperties(workspaceData.customProperties);
  }, [workspaceData]);

  const addCustomProperty = () => {
    setCustomProperties([...customProperties, { name: "", value: "" }]);
  };

  const removeCustomProperty = (index: number) => {
    const newProperties = customProperties.filter((_, i) => i !== index);
    setCustomProperties(newProperties);
  };

  const updateCustomProperty = (index: number, field: "name" | "value", value: string) => {
    const newProperties = [...customProperties];
    newProperties[index][field] = value;
    setCustomProperties(newProperties);
  };

  const handleSaveWorkspaceData = () => {
    const dataToSave = {
      ...localWorkspaceData,
      customProperties: customProperties.filter(prop => prop.name && prop.value)
    };
    updateWorkspaceData(dataToSave);
    initializeProductFruits();
    console.log('Workspace data saved and ProductFruits re-initialized:', dataToSave);
    
    toast({
      title: "Workspace data saved",
      description: "Your workspace configuration has been saved successfully."
    });
  };

  const handleViewSavedData = () => {
    const props: Record<string, string> = {};
    workspaceData.customProperties.forEach((prop, index) => {
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

  const handleIntegrationConnect = (integrationName: string) => {
    setSelectedIntegration(integrationName);
    setIsUpgradeModalOpen(true);
  };

  const integrations = [
    {
      name: "Salesforce",
      description: "Connect to Salesforce for unified customer data and advanced CRM features",
      status: "premium",
      logo: "☁️",
      features: ["Contact sync", "Deal tracking", "Custom fields", "Advanced reporting"]
    },
    {
      name: "HubSpot",
      description: "Sync contacts, deals, and activities with HubSpot CRM for better sales automation",
      status: "premium",
      logo: "🟠",
      features: ["Marketing automation", "Lead scoring", "Email campaigns", "Analytics dashboard"]
    },
    {
      name: "Hotjar",
      description: "Advanced user behavior analytics with heatmaps, recordings, and feedback tools",
      status: "premium",
      logo: "🔥",
      features: ["Heatmaps", "Session recordings", "User feedback", "Conversion funnels"]
    }
  ];

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

          <TabsContent value="workspace">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Workspace Configuration</span>
                </CardTitle>
                <p className="text-sm text-slate-600">
                  Configure your workspace settings below. This information will be used to initialize ProductFruits on your site.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="workspaceCode" className="text-sm font-medium text-slate-700">
                    Workspace Code <span className="text-red-500">*</span>
                  </Label>
                  <Input 
                    id="workspaceCode" 
                    placeholder="Enter your workspace code"
                    className="mt-1"
                    value={localWorkspaceData.workspaceCode}
                    onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, workspaceCode: e.target.value }))}
                  />
                  <p className="text-xs text-slate-500 mt-1">{localWorkspaceData.workspaceCode.length}/40 characters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                      Username <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="username" 
                      placeholder="Enter username"
                      className="mt-1"
                      value={localWorkspaceData.username}
                      onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="Enter email address"
                      className="mt-1"
                      value={localWorkspaceData.email}
                      onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Enter first name"
                      className="mt-1"
                      value={localWorkspaceData.firstName}
                      onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Enter last name"
                      className="mt-1"
                      value={localWorkspaceData.lastName}
                      onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role" className="text-sm font-medium text-slate-700">Role</Label>
                  <Input 
                    id="role" 
                    placeholder="Enter role (e.g. Student, Teacher)"
                    className="mt-1"
                    value={localWorkspaceData.role}
                    onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, role: e.target.value }))}
                  />
                </div>

                <Separator />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-sm font-medium text-slate-700">Custom Properties</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={addCustomProperty}
                      className="flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Property</span>
                    </Button>
                  </div>
                  
                  {customProperties.length > 0 && (
                    <div className="space-y-3">
                      {customProperties.map((property, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input 
                            placeholder="Property Name"
                            value={property.name}
                            onChange={(e) => updateCustomProperty(index, "name", e.target.value)}
                            className="flex-1"
                          />
                          <Input 
                            placeholder="Property Value"
                            value={property.value}
                            onChange={(e) => updateCustomProperty(index, "value", e.target.value)}
                            className="flex-1"
                          />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeCustomProperty(index)}
                            className="text-slate-500 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between">
                  <div className="flex space-x-3">
                    <Button 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        setLocalWorkspaceData({
                          workspaceCode: 'KFRC3cd1dM48s0p9',
                          username: 'john.dow',
                          email: '',
                          firstName: '',
                          lastName: '',
                          role: '',
                          customProperties: []
                        });
                        setCustomProperties([]);
                        toast({
                          title: "Settings reset",
                          description: "Workspace data has been reset to defaults."
                        });
                      }}
                    >
                      Reset to Defaults
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleViewSavedData}
                    >
                      View Saved Data
                    </Button>
                  </div>
                  <div className="flex space-x-3">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={handleSaveWorkspaceData}
                    >
                      Save Workspace Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@company.com" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                
                <Separator />
                
                <div className="flex justify-end">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    API keys provide access to your CRM data. Keep them secure and never share them publicly.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Production API Key</Label>
                    <div className="flex space-x-2">
                      <Input value="sk_prod_************************" readOnly />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Development API Key</Label>
                    <div className="flex space-x-2">
                      <Input value="sk_dev_************************" readOnly />
                      <Button variant="outline">Regenerate</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">Administrator</h4>
                    <p className="text-sm text-slate-600">Full access to all features and settings</p>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">Sales Manager</h4>
                    <p className="text-sm text-slate-600">Manage sales team and view all opportunities</p>
                  </div>
                  
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-medium text-slate-800 mb-2">Sales Representative</h4>
                    <p className="text-sm text-slate-600">Manage own accounts, contacts, and opportunities</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Premium Integrations</CardTitle>
                <p className="text-sm text-slate-600">
                  Connect Leaflet CRM with powerful enterprise tools to supercharge your workflow
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {integrations.map((integration) => (
                    <div key={integration.name} className="p-6 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors bg-gradient-to-r from-slate-50 to-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="text-3xl">{integration.logo}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-slate-800 text-lg">{integration.name}</h4>
                              <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200">
                                <Crown className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{integration.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {integration.features.map((feature, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
                          onClick={() => handleIntegrationConnect(integration.name)}
                        >
                          <Crown className="h-4 w-4 mr-2" />
                          Upgrade to Connect
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Crown className="h-5 w-5 mr-2" />
                    Unlock Premium Integrations
                  </h4>
                  <p className="text-sm text-blue-700 mb-4">
                    Upgrade to our Premium plan to connect with enterprise-grade tools and unlock advanced automation features that will transform your sales process.
                  </p>
                  <div className="flex space-x-3">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      View Premium Plans
                    </Button>
                    <Button variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                      Contact Sales
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">Email Notifications</h4>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">Push Notifications</h4>
                      <p className="text-sm text-slate-600">Browser push notifications</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-800">SMS Notifications</h4>
                      <p className="text-sm text-slate-600">Receive urgent notifications via SMS</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Data Display Modal */}
      <Dialog open={isDataModalOpen} onOpenChange={setIsDataModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>ProductFruits Script Format</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Here's your workspace data formatted for the ProductFruits script:
            </p>
            <Textarea
              value={displayData}
              readOnly
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(displayData);
                toast({
                  title: "Copied to clipboard",
                  description: "The script has been copied to your clipboard."
                });
              }}
            >
              Copy to Clipboard
            </Button>
            <Button onClick={() => setIsDataModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upgrade Modal */}
      <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-amber-500" />
              <span>Upgrade to Premium</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-slate-800 mb-2">{selectedIntegration} Integration</h4>
              <p className="text-sm text-slate-600">
                Connect with {selectedIntegration} to unlock powerful automation and sync your data seamlessly across platforms.
              </p>
            </div>
            <div className="space-y-3">
              <h5 className="font-medium text-slate-800">Premium features include:</h5>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Real-time data synchronization</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Advanced automation workflows</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Priority customer support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Custom field mapping</span>
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full sm:w-auto"
              onClick={() => setIsUpgradeModalOpen(false)}
            >
              <Crown className="h-4 w-4 mr-2" />
              Upgrade Now
            </Button>
            <Button variant="outline" onClick={() => setIsUpgradeModalOpen(false)} className="w-full sm:w-auto">
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Settings;
