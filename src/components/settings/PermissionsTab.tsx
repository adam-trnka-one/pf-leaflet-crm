
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PermissionsTab = () => {
  return (
    <Card className="bg-white shadow-sm" data-settings="permissions-card">
      <CardHeader data-settings="permissions-card-header">
        <CardTitle data-settings="permissions-card-title">Role Permissions</CardTitle>
      </CardHeader>
      <CardContent data-settings="permissions-card-content">
        <div className="space-y-4" data-settings="permissions-list">
          <div className="p-4 border border-slate-200 rounded-lg" data-settings="administrator-role">
            <h4 className="font-medium text-slate-800 mb-2" data-settings="administrator-title">Administrator</h4>
            <p className="text-sm text-slate-600" data-settings="administrator-description">Full access to all features and settings</p>
          </div>
          
          <div className="p-4 border border-slate-200 rounded-lg" data-settings="sales-manager-role">
            <h4 className="font-medium text-slate-800 mb-2" data-settings="sales-manager-title">Sales Manager</h4>
            <p className="text-sm text-slate-600" data-settings="sales-manager-description">Manage sales team and view all opportunities</p>
          </div>
          
          <div className="p-4 border border-slate-200 rounded-lg" data-settings="sales-rep-role">
            <h4 className="font-medium text-slate-800 mb-2" data-settings="sales-rep-title">Sales Representative</h4>
            <p className="text-sm text-slate-600" data-settings="sales-rep-description">Manage own accounts, contacts, and opportunities</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
