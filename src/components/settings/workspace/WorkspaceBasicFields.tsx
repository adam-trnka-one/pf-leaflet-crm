import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WorkspaceBasicFieldsProps {
  localWorkspaceData: {
    workspaceCode: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    selectedWorkspace?: string;
  };
  setLocalWorkspaceData: (updater: (prev: any) => any) => void;
}

const workspaceOptions = [
  {
    name: "Leaflet CRM - Elvin AI",
    code: "KFRC3cd1dM48s0p9",
    value: "jess",
    isDefault: true
  },
  {
    name: "Leaflet CRM - Static PF",
    code: "OxISa0He3RgK0P8q",
    value: "static",
    isDefault: false
  },
  {
    name: "Custom",
    code: "",
    value: "custom",
    isDefault: false
  }
];

export const WorkspaceBasicFields = ({ localWorkspaceData, setLocalWorkspaceData }: WorkspaceBasicFieldsProps) => {
  const selectedWorkspace = localWorkspaceData.selectedWorkspace || "jess";
  const isCustomWorkspace = selectedWorkspace === "custom";

  const handleWorkspaceChange = (value: string) => {
    const selectedOption = workspaceOptions.find(option => option.value === value);
    if (selectedOption) {
      setLocalWorkspaceData(prev => ({
        ...prev,
        selectedWorkspace: value,
        workspaceCode: selectedOption.code
      }));
    }
  };

  return (
    <>
      <div data-testid="workspace-selection-field">
        <Label htmlFor="workspaceSelection" className="text-sm font-medium text-slate-700" data-testid="workspace-selection-label">
          Workspace <span className="text-red-500">*</span>
        </Label>
        <Select value={selectedWorkspace} onValueChange={handleWorkspaceChange}>
          <SelectTrigger className="mt-1" data-testid="workspace-selection-trigger">
            <SelectValue placeholder="Select a workspace" />
          </SelectTrigger>
          <SelectContent data-testid="workspace-selection-content">
            {workspaceOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} data-testid={`workspace-option-${option.value}`}>
                {option.name} {option.isDefault && "(Default)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isCustomWorkspace && (
        <div data-testid="workspace-code-field">
          <Label htmlFor="workspaceCode" className="text-sm font-medium text-slate-700" data-testid="workspace-code-label">
            Workspace Code
          </Label>
          <Input 
            id="workspaceCode" 
            placeholder="Enter your workspace code"
            className={`mt-1 ${!localWorkspaceData.workspaceCode.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
            value={localWorkspaceData.workspaceCode}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, workspaceCode: e.target.value }))}
            data-testid="workspace-code-input"
          />
          <p className="text-xs text-slate-500 mt-1" data-testid="workspace-code-counter">{localWorkspaceData.workspaceCode.length}/40 characters</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="workspace-user-credentials-grid">
        <div data-testid="workspace-username-field">
          <Label htmlFor="username" className="text-sm font-medium text-slate-700" data-testid="workspace-username-label">
            Username <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="username" 
            placeholder="Enter username"
            className={`mt-1 ${!localWorkspaceData.username.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
            value={localWorkspaceData.username}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, username: e.target.value }))}
            required
            data-testid="workspace-username-input"
          />
        </div>
        <div data-testid="workspace-email-field">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700" data-testid="workspace-email-label">Email</Label>
          <Input 
            id="email" 
            type="email"
            placeholder="Enter email address"
            className="mt-1"
            value={localWorkspaceData.email}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, email: e.target.value }))}
            data-testid="workspace-email-input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="workspace-name-fields-grid">
        <div data-testid="workspace-first-name-field">
          <Label htmlFor="firstName" className="text-sm font-medium text-slate-700" data-testid="workspace-first-name-label">
            First Name <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="firstName" 
            placeholder="Enter first name"
            className={`mt-1 ${!localWorkspaceData.firstName.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
            value={localWorkspaceData.firstName}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, firstName: e.target.value }))}
            required
            data-testid="workspace-first-name-input"
          />
        </div>
        <div data-testid="workspace-last-name-field">
          <Label htmlFor="lastName" className="text-sm font-medium text-slate-700" data-testid="workspace-last-name-label">Last Name</Label>
          <Input 
            id="lastName" 
            placeholder="Enter last name"
            className="mt-1"
            value={localWorkspaceData.lastName}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, lastName: e.target.value }))}
            data-testid="workspace-last-name-input"
          />
        </div>
      </div>

      <div data-testid="workspace-role-field">
        <Label htmlFor="role" className="text-sm font-medium text-slate-700" data-testid="workspace-role-label">Role</Label>
        <Input 
          id="role" 
          placeholder="Enter role (e.g. Student, Teacher)"
          className="mt-1"
          value={localWorkspaceData.role}
          onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, role: e.target.value }))}
          data-testid="workspace-role-input"
        />
      </div>
    </>
  );
};
