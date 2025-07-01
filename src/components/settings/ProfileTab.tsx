
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { toast } from "@/hooks/use-toast";

export const ProfileTab = () => {
  const { workspaceData, updateWorkspaceData } = useWorkspace();
  const [localData, setLocalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+1 (555) 123-4567'
  });

  // Load workspace data into local state when context data changes
  useEffect(() => {
    setLocalData(prev => ({
      ...prev,
      firstName: workspaceData.firstName,
      lastName: workspaceData.lastName,
      email: workspaceData.email
    }));
  }, [workspaceData]);

  const handleSaveChanges = () => {
    // Update workspace context with the synced fields
    updateWorkspaceData({
      firstName: localData.firstName,
      lastName: localData.lastName,
      email: localData.email
    });

    toast({
      title: "Profile saved",
      description: "Your profile changes have been saved and synced with workspace data."
    });
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              value={localData.firstName}
              onChange={(e) => setLocalData(prev => ({ ...prev, firstName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              value={localData.lastName}
              onChange={(e) => setLocalData(prev => ({ ...prev, lastName: e.target.value }))}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={localData.email}
            onChange={(e) => setLocalData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            value={localData.phone}
            onChange={(e) => setLocalData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        
        <Separator />
        
        <div className="flex justify-end">
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
