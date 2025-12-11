
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export const ProfileTab = () => {
  const { t } = useTranslation();
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
      title: t('settings.profile.profileSaved'),
      description: t('settings.profile.profileSavedDesc')
    });
  };

  return (
    <Card className="bg-white shadow-sm" data-testid="profile-card">
      <CardHeader data-testid="profile-card-header">
        <CardTitle data-testid="profile-card-title">{t('settings.profile.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6" data-testid="profile-card-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="profile-name-fields-grid">
          <div data-testid="profile-first-name-field">
            <Label htmlFor="firstName" data-testid="profile-first-name-label">{t('common.firstName')}</Label>
            <Input 
              id="firstName" 
              value={localData.firstName}
              onChange={(e) => setLocalData(prev => ({ ...prev, firstName: e.target.value }))}
              data-testid="profile-first-name-input"
            />
          </div>
          <div data-testid="profile-last-name-field">
            <Label htmlFor="lastName" data-testid="profile-last-name-label">{t('common.lastName')}</Label>
            <Input 
              id="lastName" 
              value={localData.lastName}
              onChange={(e) => setLocalData(prev => ({ ...prev, lastName: e.target.value }))}
              data-testid="profile-last-name-input"
            />
          </div>
        </div>
        
        <div data-testid="profile-email-field">
          <Label htmlFor="email" data-testid="profile-email-label">{t('common.email')}</Label>
          <Input 
            id="email" 
            type="email" 
            value={localData.email}
            onChange={(e) => setLocalData(prev => ({ ...prev, email: e.target.value }))}
            data-testid="profile-email-input"
          />
        </div>
        
        <div data-testid="profile-phone-field">
          <Label htmlFor="phone" data-testid="profile-phone-label">{t('common.phone')}</Label>
          <Input 
            id="phone" 
            value={localData.phone}
            onChange={(e) => setLocalData(prev => ({ ...prev, phone: e.target.value }))}
            data-testid="profile-phone-input"
          />
        </div>
        
        <Separator data-testid="profile-separator" />
        
        <div className="flex justify-end" data-testid="profile-actions">
          <Button 
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={handleSaveChanges}
            data-testid="profile-save-changes-button"
          >
            <span data-testid="profile-save-changes-text">{t('common.saveChanges')}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};