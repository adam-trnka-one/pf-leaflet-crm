import { useState, useEffect } from "react";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useProductFruits } from "@/hooks/useProductFruits";
import { toast } from "@/hooks/use-toast";
import { validateRequiredFields } from "@/utils/workspaceValidation";

export const useWorkspaceForm = () => {
  const { workspaceData, updateWorkspaceData } = useWorkspace();
  const { initializeProductFruits } = useProductFruits();
  
  const [localWorkspaceData, setLocalWorkspaceData] = useState({
    workspaceCode: '',
    username: '',
    email: '',
    firstName: 'John',
    lastName: '',
    role: '',
    customProperties: [],
    selectedWorkspace: 'jess',
    customUrl: '',
    languageCode: 'en'
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
      customProperties: workspaceData.customProperties,
      selectedWorkspace: workspaceData.selectedWorkspace || 'jess',
      customUrl: workspaceData.customUrl || '',
      languageCode: workspaceData.languageCode || 'en'
    });
    setCustomProperties(workspaceData.customProperties);
  }, [workspaceData]);

  const handleSaveWorkspaceData = async () => {
    // For custom, PR workspaces, or custom-dev, check if workspace code is provided
    const requiresWorkspaceCode = localWorkspaceData.selectedWorkspace === 'custom' || localWorkspaceData.selectedWorkspace?.startsWith('pr') || localWorkspaceData.selectedWorkspace === 'custom-dev';
    if (requiresWorkspaceCode && !localWorkspaceData.workspaceCode.trim()) {
      const workspaceType = localWorkspaceData.selectedWorkspace === 'custom' ? 'Custom' : localWorkspaceData.selectedWorkspace?.toUpperCase();
      toast({
        title: "Validation Error",
        description: `Workspace Code is required for ${workspaceType} workspace`,
        variant: "destructive"
      });
      return;
    }

    // For custom-dev workspace, check if URL is provided
    if (localWorkspaceData.selectedWorkspace === 'custom-dev' && !localWorkspaceData.customUrl?.trim()) {
      toast({
        title: "Validation Error",
        description: "URL is required for Custom DEV workspace",
        variant: "destructive"
      });
      return;
    }

    // Create validation data - check workspace code for custom and PR workspaces
    const validationData = {
      ...localWorkspaceData,
      workspaceCode: requiresWorkspaceCode ? localWorkspaceData.workspaceCode : 'valid'
    };

    const validationErrors = validateRequiredFields(validationData);
    
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
    
    // Only initialize ProductFruits if workspace code is provided
    if (dataToSave.workspaceCode.trim()) {
      await initializeProductFruits();
      console.log('Workspace data saved and ProductFruits re-initialized:', dataToSave);
    } else {
      console.log('Workspace data saved without ProductFruits initialization (empty workspace code):', dataToSave);
    }
    
    toast({
      title: "Workspace data saved",
      description: "Your workspace configuration has been saved successfully."
    });
  };

  const handleInitiateProductFruits = async () => {
    // Only initialize if workspace code is provided
    if (!localWorkspaceData.workspaceCode.trim()) {
      toast({
        title: "Cannot initialize ProductFruits",
        description: "Workspace code is required to initialize ProductFruits",
        variant: "destructive"
      });
      return false;
    }

    const success = await initializeProductFruits();
    
    toast({
      title: success ? "ProductFruits initiated" : "ProductFruits failed",
      description: success 
        ? "ProductFruits script has been initialized with current workspace data."
        : "Failed to load ProductFruits script. Check workspace code and try again.",
      variant: success ? "default" : "destructive"
    });

    return success;
  };

  const handleDisableProductFruits = () => {
    // Remove ProductFruits script
    const existingScript = document.querySelector('script[data-productfruits-init]');
    if (existingScript) {
      existingScript.remove();
    }

    // Clear ProductFruits global object
    if ((window as any).$productFruits) {
      delete (window as any).$productFruits;
    }

    toast({
      title: "ProductFruits disabled",
      description: "ProductFruits has been disabled and removed from the page."
    });
  };

  const handleResetToDefaults = () => {
    const defaultData = {
      workspaceCode: 'KFRC3cd1dM48s0p9',
      username: localWorkspaceData.username || 'john.doe', // preserve current username
      email: localWorkspaceData.email || 'john@doe.com',   // preserve current email
      firstName: 'John',
      lastName: 'Doe',
      role: 'Admin',
      customProperties: [],
      selectedWorkspace: 'jess',
      languageCode: 'en'
    };

    // Update the context with default data
    updateWorkspaceData(defaultData);
    setCustomProperties([]);
    
    toast({
      title: "Settings reset",
      description: "Workspace data has been reset to defaults."
    });
  };

  return {
    localWorkspaceData,
    setLocalWorkspaceData,
    customProperties,
    setCustomProperties,
    handleSaveWorkspaceData,
    handleInitiateProductFruits,
    handleDisableProductFruits,
    handleResetToDefaults,
    workspaceData
  };
};
