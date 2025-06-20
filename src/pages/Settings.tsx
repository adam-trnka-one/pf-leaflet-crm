
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Key, Shield, Bell } from "lucide-react";

const Settings = () => {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-600 mt-2">Manage your account and application settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center space-x-2">
            <Key className="h-4 w-4" />
            <span>API Keys</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Permissions</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@company.com" />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  API keys provide access to your CRM data. Keep them secure and never share them publicly.
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Production API Key</Label>
                  <div className="flex space-x-2">
                    <Input value="sk_prod_************************" readOnly />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
                
                <div>
                  <Label>Development API Key</Label>
                  <div className="flex space-x-2">
                    <Input value="sk_dev_************************" readOnly />
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
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
        </TabsContent>

        <TabsContent value="notifications">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
