
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

  const handleInitiateProductFruits = () => {
    initializeProductFruits();
    
    toast({
      title: "ProductFruits initiated",
      description: "ProductFruits script has been initialized with current workspace data."
    });

    // Perform soft refresh after initialization
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleResetToDefaults = () => {
    const defaultData = {
      workspaceCode: 'KFRC3cd1dM48s0p9',
      username: 'john.doe',
      email: 'john@doe.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'Admin',
      customProperties: []
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
    handleResetToDefaults,
    workspaceData
  };
};
