
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const NotificationsTab = () => {
  const { t } = useTranslation();

  return (
    <Card className="bg-white shadow-sm" data-testid="notifications-card">
      <CardHeader data-testid="notifications-card-header">
        <CardTitle data-testid="notifications-card-title">{t('settings.notifications.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4" data-testid="notifications-card-content">
        <div className="space-y-4" data-testid="notifications-list">
          <div className="flex items-center justify-between" data-testid="email-notifications-item">
            <div data-testid="email-notifications-info">
              <h4 className="font-medium text-slate-800" data-testid="email-notifications-title">{t('settings.notifications.email')}</h4>
              <p className="text-sm text-slate-600" data-testid="email-notifications-description">{t('settings.notifications.emailDesc')}</p>
            </div>
            <Button variant="outline" size="sm" data-testid="email-configure-button">
              <span data-testid="email-configure-text">{t('common.configure')}</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between" data-testid="push-notifications-item">
            <div data-testid="push-notifications-info">
              <h4 className="font-medium text-slate-800" data-testid="push-notifications-title">{t('settings.notifications.push')}</h4>
              <p className="text-sm text-slate-600" data-testid="push-notifications-description">{t('settings.notifications.pushDesc')}</p>
            </div>
            <Button variant="outline" size="sm" data-testid="push-configure-button">
              <span data-testid="push-configure-text">{t('common.configure')}</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between" data-testid="sms-notifications-item">
            <div data-testid="sms-notifications-info">
              <h4 className="font-medium text-slate-800" data-testid="sms-notifications-title">{t('settings.notifications.sms')}</h4>
              <p className="text-sm text-slate-600" data-testid="sms-notifications-description">{t('settings.notifications.smsDesc')}</p>
            </div>
            <Button variant="outline" size="sm" data-testid="sms-configure-button">
              <span data-testid="sms-configure-text">{t('common.configure')}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};