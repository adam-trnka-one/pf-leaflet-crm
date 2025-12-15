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
    languageCode: string;
  };
  setLocalWorkspaceData: (updater: (prev: any) => any) => void;
}

const languageOptions = [
  { name: "English", code: "en" },
  { name: "Czech", code: "cs" },
  { name: "Portuguese", code: "pt" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Arabic", code: "ar" }
];

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
  const { t } = useTranslation('settings');
  const selectedWorkspace = localWorkspaceData.selectedWorkspace || "jess";
  const isCustomWorkspace = selectedWorkspace === "custom";
  const isDevWorkspace = selectedWorkspace === "dev";
  const isPRWorkspace = ["pr1", "pr2", "pr3", "pr4", "pr5"].includes(selectedWorkspace);
  const isCustomDevWorkspace = selectedWorkspace === "custom-dev";
  
  const isProductFruitsUser = localWorkspaceData.email?.endsWith("@productfruits.com");

  const handleWorkspaceChange = (value: string) => {
    if (value === "dev") {
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
          {t('workspace.selectedWorkspace')} <span className="text-red-500">*</span>
        </Label>
        <Select value={(isPRWorkspace || isCustomDevWorkspace) ? "dev" : selectedWorkspace} onValueChange={handleWorkspaceChange}>
          <SelectTrigger className="mt-1" data-testid="workspace-selection-trigger">
            <SelectValue placeholder={t('workspace.selectedWorkspace')} />
          </SelectTrigger>
          <SelectContent data-testid="workspace-selection-content">
            {workspaceOptions
              .filter(option => option.value !== "dev" || isProductFruitsUser)
              .map((option) => (
                <SelectItem key={option.value} value={option.value} data-testid={`workspace-option-${option.value}`}>
                  {option.name} {option.isDefault && "(Default)"}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {(isPRWorkspace || isCustomDevWorkspace) && (
        <div data-testid="dev-environment-field">
          <Label htmlFor="devEnvironment" className="text-sm font-medium text-slate-700" data-testid="dev-environment-label">
            DEV Environment <span className="text-red-500">*</span>
          </Label>
          <Select value={selectedWorkspace} onValueChange={handleDevWorkspaceChange}>
            <SelectTrigger className="mt-1" data-testid="dev-environment-trigger">
              <SelectValue placeholder="Select DEV environment" />
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
            {t('workspace.customUrl')} <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="customUrl" 
            placeholder="Enter custom URL (e.g. https://my-domain.com)"
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
            {t('workspace.workspaceCode')} {(isPRWorkspace || isCustomDevWorkspace) && <span className="text-red-500">*</span>}
          </Label>
          <Input 
            id="workspaceCode" 
            placeholder={isPRWorkspace ? `Enter your ${selectedWorkspace.toUpperCase()} workspace code` : isCustomDevWorkspace ? "Enter your workspace code" : "Enter your workspace code"}
            className={`mt-1 ${!localWorkspaceData.workspaceCode.trim() && (isPRWorkspace || isCustomDevWorkspace) ? 'border-red-300 focus-visible:border-red-500' : ''}`}
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
            {t('workspace.username')} <span className="text-red-500">*</span>
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
          <Label htmlFor="email" className="text-sm font-medium text-slate-700" data-testid="workspace-email-label">{t('workspace.email')}</Label>
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
            {t('workspace.firstName')} <span className="text-red-500">*</span>
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
          <Label htmlFor="lastName" className="text-sm font-medium text-slate-700" data-testid="workspace-last-name-label">{t('workspace.lastName')}</Label>
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
        <Label htmlFor="role" className="text-sm font-medium text-slate-700" data-testid="workspace-role-label">{t('workspace.role')}</Label>
        <Input 
          id="role" 
          placeholder="Enter role (e.g. Student, Teacher)"
          className="mt-1"
          value={localWorkspaceData.role}
          onChange={(e) => setLocalWorkspaceData(prev => ({ ...prev, role: e.target.value }))}
          data-testid="workspace-role-input"
        />
      </div>

      <div data-testid="workspace-language-field">
        <Label htmlFor="languageCode" className="text-sm font-medium text-slate-700" data-testid="workspace-language-label">
          {t('workspace.languageCode')}
        </Label>
        <Select 
          value={localWorkspaceData.languageCode || "en"} 
          onValueChange={(value) => setLocalWorkspaceData(prev => ({ ...prev, languageCode: value }))}
        >
          <SelectTrigger className="mt-1" data-testid="workspace-language-trigger">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent data-testid="workspace-language-content">
            {languageOptions.map((option) => (
              <SelectItem key={option.code} value={option.code} data-testid={`language-option-${option.code}`}>
                {option.name} ({option.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
