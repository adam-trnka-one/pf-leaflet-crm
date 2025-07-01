
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const NotificationsTab = () => {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">Email Notifications</h4>
              <p className="text-sm text-slate-600">Receive notifications via email</p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">Push Notifications</h4>
              <p className="text-sm text-slate-600">Browser push notifications</p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-slate-800">SMS Notifications</h4>
              <p className="text-sm text-slate-600">Receive urgent notifications via SMS</p>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
