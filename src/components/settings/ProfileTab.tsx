
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const ProfileTab = () => {
  return (
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
  );
};
