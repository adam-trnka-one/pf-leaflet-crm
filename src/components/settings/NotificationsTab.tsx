
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const NotificationsTab = () => {
  return (
    <Card className="bg-white shadow-sm" data-testid="notifications-card">
      <CardHeader data-testid="notifications-card-header">
        <CardTitle data-testid="notifications-card-title">Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4" data-testid="notifications-card-content">
        <div className="space-y-4" data-testid="notifications-list">
          <div className="flex items-center justify-between" data-testid="email-notifications-item">
            <div data-testid="email-notifications-info">
              <h4 className="font-medium text-slate-800" data-testid="email-notifications-title">Email Notifications</h4>
              <p className="text-sm text-slate-600" data-testid="email-notifications-description">Receive notifications via email</p>
            </div>
            <Button variant="outline" size="sm" data-testid="email-configure-button">
              <span data-testid="email-configure-text">Configure</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between" data-testid="push-notifications-item">
            <div data-testid="push-notifications-info">
              <h4 className="font-medium text-slate-800" data-testid="push-notifications-title">Push Notifications</h4>
              <p className="text-sm text-slate-600" data-testid="push-notifications-description">Browser push notifications</p>
            </div>
            <Button variant="outline" size="sm" data-testid="push-configure-button">
              <span data-testid="push-configure-text">Configure</span>
            </Button>
          </div>
          
          <div className="flex items-center justify-between" data-testid="sms-notifications-item">
            <div data-testid="sms-notifications-info">
              <h4 className="font-medium text-slate-800" data-testid="sms-notifications-title">SMS Notifications</h4>
              <p className="text-sm text-slate-600" data-testid="sms-notifications-description">Receive urgent notifications via SMS</p>
            </div>
            <Button variant="outline" size="sm" data-testid="sms-configure-button">
              <span data-testid="sms-configure-text">Configure</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
