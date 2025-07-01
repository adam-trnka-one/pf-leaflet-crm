
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ApiTab = () => {
  return (
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
  );
};
