
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PermissionsTab = () => {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Role Permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-2">Administrator</h4>
            <p className="text-sm text-slate-600">Full access to all features and settings</p>
          </div>
          
          <div className="p-4 border border-slate-200 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-2">Sales Manager</h4>
            <p className="text-sm text-slate-600">Manage sales team and view all opportunities</p>
          </div>
          
          <div className="p-4 border border-slate-200 rounded-lg">
            <h4 className="font-medium text-slate-800 mb-2">Sales Representative</h4>
            <p className="text-sm text-slate-600">Manage own accounts, contacts, and opportunities</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
