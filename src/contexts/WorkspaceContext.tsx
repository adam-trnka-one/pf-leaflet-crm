
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WorkspaceData {
  workspaceCode: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  customProperties: { name: string; value: string }[];
}

interface WorkspaceContextType {
  workspaceData: WorkspaceData;
  updateWorkspaceData: (data: Partial<WorkspaceData>) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

export const WorkspaceProvider = ({ children }: { children: ReactNode }) => {
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>({
    workspaceCode: '',
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    customProperties: []
  });

  const updateWorkspaceData = (data: Partial<WorkspaceData>) => {
    setWorkspaceData(prev => ({ ...prev, ...data }));
  };

  return (
    <WorkspaceContext.Provider value={{ workspaceData, updateWorkspaceData }}>
      {children}
    </WorkspaceContext.Provider>
  );
};
