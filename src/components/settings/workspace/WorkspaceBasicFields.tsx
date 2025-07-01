
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WorkspaceBasicFieldsProps {
  localWorkspaceData: {
    workspaceCode: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  setLocalWorkspaceData: (updater: (prev: any) => any) => void;
}

export const WorkspaceBasicFields = ({ localWorkspaceData, setLocalWorkspaceData }: WorkspaceBasicFieldsProps) => {
  return (
    <>
      <div data-settings="workspace-code-field">
        <Label htmlFor="workspaceCode" className="text-sm font-medium text-slate-700" data-settings="workspace-code-label">
          Workspace Code <span className="text-red-500">*</span>
        </Label>
        <Input 
          id="workspaceCode" 
          placeholder="Enter your workspace code"
          className={`mt-1 ${!localWorkspaceData.workspaceCode.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
          value={localWorkspaceData.workspaceCode}
          onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, workspaceCode: e.target.value }))}
          required
          data-settings="workspace-code-input"
        />
        <p className="text-xs text-slate-500 mt-1" data-settings="workspace-code-counter">{localWorkspaceData.workspaceCode.length}/40 characters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-settings="user-credentials-grid">
        <div data-settings="username-field">
          <Label htmlFor="username" className="text-sm font-medium text-slate-700" data-settings="username-label">
            Username <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="username" 
            placeholder="Enter username"
            className={`mt-1 ${!localWorkspaceData.username.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
            value={localWorkspaceData.username}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, username: e.target.value }))}
            required
            data-settings="username-input"
          />
        </div>
        <div data-settings="email-field">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700" data-settings="email-label">Email</Label>
          <Input 
            id="email" 
            type="email"
            placeholder="Enter email address"
            className="mt-1"
            value={localWorkspaceData.email}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, email: e.target.value }))}
            data-settings="email-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-settings="name-fields-grid">
        <div data-settings="first-name-field">
          <Label htmlFor="firstName" className="text-sm font-medium text-slate-700" data-settings="first-name-label">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="firstName" 
            placeholder="Enter first name"
            className={`mt-1 ${!localWorkspaceData.firstName.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
            value={localWorkspaceData.firstName}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, firstName: e.target.value }))}
            required
            data-settings="first-name-input"
          />
        </div>
        <div data-settings="last-name-field">
          <Label htmlFor="lastName" className="text-sm font-medium text-slate-700" data-settings="last-name-label">Last Name</Label>
          <Input 
            id="lastName" 
            placeholder="Enter last name"
            className="mt-1"
            value={localWorkspaceData.lastName}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, lastName: e.target.value }))}
            data-settings="last-name-input"
          />
        </div>
      </div>

      <div data-settings="role-field">
        <Label htmlFor="role" className="text-sm font-medium text-slate-700" data-settings="role-label">Role</Label>
        <Input 
          id="role" 
          placeholder="Enter role (e.g. Student, Teacher)"
          className="mt-1"
          value={localWorkspaceData.role}
          onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, role: e.target.value }))}
          data-settings="role-input"
        />
      </div>
    </>
  );
};
