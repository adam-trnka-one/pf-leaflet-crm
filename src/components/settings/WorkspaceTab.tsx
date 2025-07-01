
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Building, X, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useProductFruits } from "@/hooks/useProductFruits";
import { toast } from "@/hooks/use-toast";
import { validateRequiredFields } from "@/utils/workspaceValidation";

export const WorkspaceTab = () => {
  const { workspaceData, updateWorkspaceData } = useWorkspace();
  const { initializeProductFruits } = useProductFruits();
  
  const [localWorkspaceData, setLocalWorkspaceData] = useState({
    workspaceCode: '',
    username: '',
    email: '',
    firstName: 'John',
    lastName: '',
    role: '',
    customProperties: []
  });
  const [customProperties, setCustomProperties] = useState<{ name: string; value: string }[]>([]);

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
    const validationErrors = validateRequiredFields(localWorkspaceData);
    
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Error",
        description: validationErrors.join(', '),
        variant: "destructive"
      });
      return;
    }

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
    
    return productFruitsScript;
  };

  return (
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
            className={`mt-1 ${!localWorkspaceData.workspaceCode.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
            value={localWorkspaceData.workspaceCode}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, workspaceCode: e.target.value }))}
            required
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
              className={`mt-1 ${!localWorkspaceData.username.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
              value={localWorkspaceData.username}
              onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, username: e.target.value }))}
              required
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
            <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
              First Name <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="firstName" 
              placeholder="Enter first name"
              className={`mt-1 ${!localWorkspaceData.firstName.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
              value={localWorkspaceData.firstName}
              onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, firstName: e.target.value }))}
              required
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
                  firstName: 'John',
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
              onClick={() => {
                const scriptData = handleViewSavedData();
                return scriptData;
              }}
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
  );
};
