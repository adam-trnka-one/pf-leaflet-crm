import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface WorkspaceBasicFieldsProps {
  localWorkspaceData: {
    workspaceCode: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    selectedWorkspace?: string;
    customUrl?: string;
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
    name: "DEV",
    code: "",
    value: "dev",
    isDefault: false
  },
  {
    name: "Custom",
    code: "",
    value: "custom",
    isDefault: false
  }
];

const devOptions = [
  { name: "PR1", value: "pr1" },
  { name: "PR2", value: "pr2" },
  { name: "PR3", value: "pr3" },
  { name: "PR4", value: "pr4" },
  { name: "PR5", value: "pr5" },
  { name: "Custom", value: "custom-dev" }
];

export const WorkspaceBasicFields = ({ localWorkspaceData, setLocalWorkspaceData }: WorkspaceBasicFieldsProps) => {
  const { t } = useTranslation();
  const selectedWorkspace = localWorkspaceData.selectedWorkspace || "jess";
  const isCustomWorkspace = selectedWorkspace === "custom";
  const isDevWorkspace = selectedWorkspace === "dev";
  const isPRWorkspace = ["pr1", "pr2", "pr3", "pr4", "pr5"].includes(selectedWorkspace);
  const isCustomDevWorkspace = selectedWorkspace === "custom-dev";
  
  // Check if user email has @productfruits.com domain
  const isProductFruitsUser = localWorkspaceData.email?.endsWith("@productfruits.com");

  const handleWorkspaceChange = (value: string) => {
    if (value === "dev") {
      // When DEV is selected, default to PR1
      setLocalWorkspaceData(prev => ({
        ...prev,
        selectedWorkspace: "pr1",
        workspaceCode: ""
      }));
    } else {
      const selectedOption = workspaceOptions.find(option => option.value === value);
      if (selectedOption) {
        setLocalWorkspaceData(prev => ({
          ...prev,
          selectedWorkspace: value,
          workspaceCode: selectedOption.code
        }));
      }
    }
  };

  const handleDevWorkspaceChange = (value: string) => {
    setLocalWorkspaceData(prev => ({
      ...prev,
      selectedWorkspace: value,
      workspaceCode: ""
    }));
  };

  return (
    <>
      <div data-testid="workspace-selection-field">
        <Label htmlFor="workspaceSelection" className="text-sm font-medium text-slate-700" data-testid="workspace-selection-label">
          {t('settings.workspace.workspace')} <span className="text-red-500">*</span>
        </Label>
        <Select value={(isPRWorkspace || isCustomDevWorkspace) ? "dev" : selectedWorkspace} onValueChange={handleWorkspaceChange}>
          <SelectTrigger className="mt-1" data-testid="workspace-selection-trigger">
            <SelectValue placeholder={t('settings.workspace.selectWorkspace')} />
          </SelectTrigger>
          <SelectContent data-testid="workspace-selection-content">
            {workspaceOptions
              .filter(option => option.value !== "dev" || isProductFruitsUser)
              .map((option) => (
                <SelectItem key={option.value} value={option.value} data-testid={`workspace-option-${option.value}`}>
                  {option.name} {option.isDefault && `(${t('common.default')})`}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {(isPRWorkspace || isCustomDevWorkspace) && (
        <div data-testid="dev-environment-field">
          <Label htmlFor="devEnvironment" className="text-sm font-medium text-slate-700" data-testid="dev-environment-label">
            {t('settings.workspace.devEnvironment')} <span className="text-red-500">*</span>
          </Label>
          <Select value={selectedWorkspace} onValueChange={handleDevWorkspaceChange}>
            <SelectTrigger className="mt-1" data-testid="dev-environment-trigger">
              <SelectValue placeholder={t('settings.workspace.selectDevEnvironment')} />
            </SelectTrigger>
            <SelectContent data-testid="dev-environment-content">
              {devOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} data-testid={`dev-option-${option.value}`}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {isCustomDevWorkspace && (
        <div data-testid="custom-url-field">
          <Label htmlFor="customUrl" className="text-sm font-medium text-slate-700" data-testid="custom-url-label">
            {t('common.url')} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="customUrl" 
            placeholder={t('common.enterCustomUrl')}
            className={`mt-1 ${!localWorkspaceData.customUrl?.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
            value={localWorkspaceData.customUrl || ''}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, customUrl: e.target.value }))}
            data-testid="custom-url-input"
          />
        </div>
      )}

      {(isCustomWorkspace || isPRWorkspace || isCustomDevWorkspace) && (
        <div data-testid="workspace-code-field">
          <Label htmlFor="workspaceCode" className="text-sm font-medium text-slate-700" data-testid="workspace-code-label">
            {t('settings.workspace.workspaceCode')} {(isPRWorkspace || isCustomDevWorkspace) && <span className="text-red-500">*</span>}
          </Label>
          <Input 
            id="workspaceCode" 
            placeholder={t('common.enterWorkspaceCode')}
            className={`mt-1 ${!localWorkspaceData.workspaceCode.trim() && (isPRWorkspace || isCustomDevWorkspace) ? 'border-red-300 focus-visible:border-red-500' : ''}`}
            value={localWorkspaceData.workspaceCode}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, workspaceCode: e.target.value }))}
            data-testid="workspace-code-input"
          />
          <p className="text-xs text-slate-500 mt-1" data-testid="workspace-code-counter">{localWorkspaceData.workspaceCode.length}/40 {t('common.characters')}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="workspace-user-credentials-grid">
        <div data-testid="workspace-username-field">
          <Label htmlFor="username" className="text-sm font-medium text-slate-700" data-testid="workspace-username-label">
            {t('common.username')} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="username" 
            placeholder={t('common.enterUsername')}
            className={`mt-1 ${!localWorkspaceData.username.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
            value={localWorkspaceData.username}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, username: e.target.value }))}
            required
            data-testid="workspace-username-input"
          />
        </div>
        <div data-testid="workspace-email-field">
          <Label htmlFor="email" className="text-sm font-medium text-slate-700" data-testid="workspace-email-label">{t('common.email')}</Label>
          <Input 
            id="email" 
            type="email"
            placeholder={t('common.enterEmail')}
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
            {t('common.firstName')} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="firstName" 
            placeholder={t('common.enterFirstName')}
            className={`mt-1 ${!localWorkspaceData.firstName.trim() ? 'border-red-300 focus-visible:border-red-500' : ''}`}
            value={localWorkspaceData.firstName}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, firstName: e.target.value }))}
            required
            data-testid="workspace-first-name-input"
          />
        </div>
        <div data-testid="workspace-last-name-field">
          <Label htmlFor="lastName" className="text-sm font-medium text-slate-700" data-testid="workspace-last-name-label">{t('common.lastName')}</Label>
          <Input 
            id="lastName" 
            placeholder={t('common.enterLastName')}
            className="mt-1"
            value={localWorkspaceData.lastName}
            onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, lastName: e.target.value }))}
            data-testid="workspace-last-name-input"
          />
        </div>
      </div>

      <div data-testid="workspace-role-field">
        <Label htmlFor="role" className="text-sm font-medium text-slate-700" data-testid="workspace-role-label">{t('common.role')}</Label>
        <Input 
          id="role" 
          placeholder={t('common.enterRole')}
          className="mt-1"
          value={localWorkspaceData.role}
          onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, role: e.target.value }))}
          data-testid="workspace-role-input"
        />
      </div>
    </>
  );
};