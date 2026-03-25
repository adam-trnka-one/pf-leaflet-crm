
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WorkspaceData {
  workspaceCode: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  customProperties: { name: string; value: string }[];
  selectedWorkspace?: string;
  customUrl?: string;
  languageCode: string;
}

interface WorkspaceContextType {
  workspaceData: WorkspaceData;
  updateWorkspaceData: (data: Partial<WorkspaceData>) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const STORAGE_KEY = 'leaflet-workspace-data';

const defaultWorkspaceData: WorkspaceData = {
  workspaceCode: 'KFRC3cd1dM48s0p9',
  username: 'john.doe',
  email: 'john@doe.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'Admin',
  customProperties: [],
  selectedWorkspace: 'jess',
  languageCode: 'en'
};

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        return { ...defaultWorkspaceData, ...JSON.parse(savedData) };
      }
    } catch (error) {
      console.error('Error loading workspace data:', error);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultWorkspaceData));
    return defaultWorkspaceData;
  });

  const updateWorkspaceData = (data: Partial<WorkspaceData>) => {
    const updatedData = { ...workspaceData, ...data };
    setWorkspaceData(updatedData);
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      console.log('Workspace data saved to localStorage:', updatedData);
    } catch (error) {
      console.error('Error saving workspace data to localStorage:', error);
    }
  };

  return (
    <WorkspaceContext.Provider value={{ workspaceData, updateWorkspaceData }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
