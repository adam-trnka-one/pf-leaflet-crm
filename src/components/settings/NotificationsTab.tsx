
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const NotificationsTab = () => {
  return (
    <Card className="bg-white shadow-sm" data-settings="notifications-card">
      <CardHeader data-settings="notifications-card-header">
        <CardTitle data-settings="notifications-card-title">Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4" data-settings="notifications-card-content">
        <div className="space-y-4" data-settings="notifications-list">
          <div className="flex items-center justify-between" data-settings="email-notifications-item">
            <div data-settings="email-notifications-info">
              <h4 className="font-medium text-slate-800" data-settings="email-notifications-title">Email Notifications</h4>
              <p className="text-sm text-slate-600" data-settings="email-notifications-description">Receive notifications via email</p>
            </div>
            <Button variant="outline" size="sm" data-settings="email-configure-button">
              <span data-settings="email-configure-text">Configure</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between" data-settings="push-notifications-item">
            <div data-settings="push-notifications-info">
              <h4 className="font-medium text-slate-800" data-settings="push-notifications-title">Push Notifications</h4>
              <p className="text-sm text-slate-600" data-settings="push-notifications-description">Browser push notifications</p>
            </div>
            <Button variant="outline" size="sm" data-settings="push-configure-button">
              <span data-settings="push-configure-text">Configure</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between" data-settings="sms-notifications-item">
            <div data-settings="sms-notifications-info">
              <h4 className="font-medium text-slate-800" data-settings="sms-notifications-title">SMS Notifications</h4>
              <p className="text-sm text-slate-600" data-settings="sms-notifications-description">Receive urgent notifications via SMS</p>
            </div>
            <Button variant="outline" size="sm" data-settings="sms-configure-button">
              <span data-settings="sms-configure-text">Configure</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
