# Editable Usertour.js Token

When "Usertour" is selected in Settings → Workspace, show a token input field (same style and behaviour as the Workspace Code field) instead of relying on the hardcoded token.

## Behaviour

- Selecting "Usertour" reveals a required "Usertour.js Token" input, empty by default (no prefill).
- The token is validated as required (red border when empty) and blocks Save / Initiate with a validation toast if blank.
- The value persists in workspace settings (localStorage), so it survives a refresh.
- Initialization uses the saved token instead of the hardcoded constant; everything else in the Usertour load/status flow stays as is.
- Reset to defaults restores the default token.

## Technical details

- `src/contexts/WorkspaceContext.tsx`: add `usertourToken: string` to `WorkspaceData` with the default token in `defaultWorkspaceData`.
- `src/components/settings/workspace/WorkspaceBasicFields.tsx`: add `usertourToken` to the props type and render the token input (with character counter and validation styling) when `selectedWorkspace === 'usertour'`; keep the workspace-code field hidden for Usertour.
- `src/hooks/useWorkspaceForm.tsx`: include `usertourToken` in local state and the save payload; require a non-empty token for Usertour in both `handleSaveWorkspaceData` and `handleInitiateProductFruits`; include the default token in `handleResetToDefaults`.
- `src/hooks/useProductFruits.tsx`: in `initializeUsertour`, replace the hardcoded `token` with `dataToUse.usertourToken` (falling back to the default constant).
- Add an `workspace.usertourToken` label key to the `settings` namespace for all 7 locales.
