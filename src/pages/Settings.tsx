import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Key, Shield, Bell, Plug, Building } from "lucide-react";
import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useProductFruits } from "@/hooks/useProductFruits";

const Settings = () => {
  const { workspaceData, updateWorkspaceData } = useWorkspace();
  const { initializeProductFruits, hasWorkspaceCodeChanged } = useProductFruits();
  
  const [localWorkspaceData, setLocalWorkspaceData] = useState({
    workspaceCode: workspaceData.workspaceCode || 'KFRC3cd1dM48s0p9',
    username: workspaceData.username || 'john.dow',
    email: workspaceData.email || '',
    firstName: workspaceData.firstName || '',
    lastName: workspaceData.lastName || '',
    role: workspaceData.role || '',
    customProperties: workspaceData.customProperties || []
  });
  const [customProperties, setCustomProperties] = useState(
    workspaceData.customProperties || []
  );

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
    console.log('Workspace data saved:', dataToSave);
  };

  const handleInitializeProductFruits = () => {
    handleSaveWorkspaceData();
    initializeProductFruits();
    console.log('ProductFruits manually initialized with current workspace data');
  };

  const integrations = [
    {
      name: "HubSpot",
      description: "Sync contacts, deals, and activities with HubSpot CRM",
      status: "disconnected",
      logo: "🟠"
    },
    {
      name: "Salesforce",
      description: "Connect to Salesforce for unified customer data",
      status: "connected",
      logo: "☁️"
    },
    {
      name: "Mixpanel",
      description: "Track user events and product analytics",
      status: "disconnected",
      logo: "🔵"
    },
    {
      name: "Amplitude",
      description: "Advanced product analytics and user behavior tracking",
      status: "disconnected",
      logo: "📊"
    },
    {
      name: "Customer.io",
      description: "Automated email campaigns and customer messaging",
      status: "connected",
      logo: "💌"
    },
    {
      name: "Google Analytics",
      description: "Website traffic and conversion tracking",
      status: "disconnected",
      logo: "📈"
    },
    {
      name: "Hotjar",
      description: "Heatmaps, recordings, and user feedback",
      status: "disconnected",
      logo: "🔥"
    },
    {
      name: "Zapier",
      description: "Connect to 5000+ apps with automated workflows",
      status: "disconnected",
      logo: "⚡"
    }
  ];

  return (
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
                    }}
                  >
                    Reset to Defaults
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => console.log('Current workspace data:', workspaceData)}
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
                  <Button 
                    className={`${hasWorkspaceCodeChanged ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400'} text-white`}
                    onClick={handleInitializeProductFruits}
                    disabled={!hasWorkspaceCodeChanged && workspaceData.workspaceCode !== ''}
                  >
                    {hasWorkspaceCodeChanged ? 'Reinitialize ProductFruits' : 'Initialize ProductFruits'}
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
              <CardTitle>Integrations</CardTitle>
              <p className="text-sm text-slate-600">
                Connect Leaflet CRM with your favorite tools to streamline your workflow
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div key={integration.name} className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{integration.logo}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-slate-800">{integration.name}</h4>
                            <Badge 
                              variant={integration.status === 'connected' ? 'default' : 'secondary'}
                              className={integration.status === 'connected' ? 'bg-emerald-100 text-emerald-700' : ''}
                            >
                              {integration.status === 'connected' ? 'Connected' : 'Disconnected'}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{integration.description}</p>
                        </div>
                      </div>
                      <Button 
                        variant={integration.status === 'connected' ? 'outline' : 'default'}
                        size="sm"
                        className={integration.status === 'connected' ? 'text-slate-600' : 'bg-emerald-600 hover:bg-emerald-700'}
                      >
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Need a custom integration?</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Contact our team to discuss building a custom integration for your specific needs.
                </p>
                <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
                  Request Integration
                </Button>
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
  );
};

export default Settings;
