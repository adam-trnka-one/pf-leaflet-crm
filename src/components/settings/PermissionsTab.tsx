
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export const PermissionsTab = () => {
  const { t } = useTranslation('settings');

  return (
    <Card className="bg-white shadow-sm" data-testid="permissions-card">
      <CardHeader data-testid="permissions-card-header">
        <CardTitle data-testid="permissions-card-title">{t('permissions.title')}</CardTitle>
      </CardHeader>
      <CardContent data-testid="permissions-card-content">
        <div className="space-y-4" data-testid="permissions-list">
          <div className="p-4 border border-slate-200 rounded-lg" data-testid="administrator-role">
            <h4 className="font-medium text-slate-800 mb-2" data-testid="administrator-title">Administrator</h4>
            <p className="text-sm text-slate-600" data-testid="administrator-description">{t('permissions.subtitle')}</p>
          </div>
          
          <div className="p-4 border border-slate-200 rounded-lg" data-testid="sales-manager-role">
            <h4 className="font-medium text-slate-800 mb-2" data-testid="sales-manager-title">Sales Manager</h4>
            <p className="text-sm text-slate-600" data-testid="sales-manager-description">{t('permissions.subtitle')}</p>
          </div>
          
          <div className="p-4 border border-slate-200 rounded-lg" data-testid="sales-rep-role">
            <h4 className="font-medium text-slate-800 mb-2" data-testid="sales-rep-title">Sales Representative</h4>
            <p className="text-sm text-slate-600" data-testid="sales-rep-description">{t('permissions.subtitle')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
