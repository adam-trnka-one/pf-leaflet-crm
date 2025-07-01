
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
    <Card className="bg-white shadow-sm" data-settings="profile-card">
      <CardHeader data-settings="profile-card-header">
        <CardTitle data-settings="profile-card-title">Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6" data-settings="profile-card-content">
        <div className="grid grid-cols-2 gap-4" data-settings="name-fields-grid">
          <div data-settings="first-name-field">
            <Label htmlFor="firstName" data-settings="first-name-label">First Name</Label>
            <Input 
              id="firstName" 
              value={localData.firstName}
              onChange={(e) => setLocalData(prev => ({ ...prev, firstName: e.target.value }))}
              data-settings="first-name-input"
            />
          </div>
          <div data-settings="last-name-field">
            <Label htmlFor="lastName" data-settings="last-name-label">Last Name</Label>
            <Input 
              id="lastName" 
              value={localData.lastName}
              onChange={(e) => setLocalData(prev => ({ ...prev, lastName: e.target.value }))}
              data-settings="last-name-input"
            />
          </div>
        </div>
        
        <div data-settings="email-field">
          <Label htmlFor="email" data-settings="email-label">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={localData.email}
            onChange={(e) => setLocalData(prev => ({ ...prev, email: e.target.value }))}
            data-settings="email-input"
          />
        </div>
        
        <div data-settings="phone-field">
          <Label htmlFor="phone" data-settings="phone-label">Phone</Label>
          <Input 
            id="phone" 
            value={localData.phone}
            onChange={(e) => setLocalData(prev => ({ ...prev, phone: e.target.value }))}
            data-settings="phone-input"
          />
        </div>
        
        <Separator data-settings="profile-separator" />
        
        <div className="flex justify-end" data-settings="profile-actions">
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSaveChanges}
            data-settings="save-changes-button"
          >
            <span data-settings="save-changes-text">Save Changes</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
