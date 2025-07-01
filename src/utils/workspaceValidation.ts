
export const validateRequiredFields = (workspaceData: {
  workspaceCode: string;
  username: string;
  firstName: string;
}) => {
  const errors = [];
  if (!workspaceData.workspaceCode.trim()) {
    errors.push('Workspace Code is required');
  }
  if (!workspaceData.username.trim()) {
    errors.push('Username is required');
  }
  if (!workspaceData.firstName.trim()) {
    errors.push('First Name is required');
  }
  return errors;
};
