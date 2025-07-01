
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ApiTab = () => {
  return (
    <Card className="bg-white shadow-sm" data-settings="api-card">
      <CardHeader data-settings="api-card-header">
        <CardTitle data-settings="api-card-title">API Keys</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4" data-settings="api-card-content">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg" data-settings="api-warning">
          <p className="text-sm text-yellow-800" data-settings="api-warning-text">
            API keys provide access to your CRM data. Keep them secure and never share them publicly.
          </p>
        </div>
        
        <div className="space-y-4" data-settings="api-keys-section">
          <div data-settings="production-api-key-field">
            <Label data-settings="production-api-key-label">Production API Key</Label>
            <div className="flex space-x-2" data-settings="production-api-key-container">
              <Input value="sk_prod_************************" readOnly data-settings="production-api-key-input" />
              <Button variant="outline" data-settings="production-regenerate-button">
                <span data-settings="production-regenerate-text">Regenerate</span>
              </Button>
            </div>
          </div>
          
          <div data-settings="development-api-key-field">
            <Label data-settings="development-api-key-label">Development API Key</Label>
            <div className="flex space-x-2" data-settings="development-api-key-container">
              <Input value="sk_dev_************************" readOnly data-settings="development-api-key-input" />
              <Button variant="outline" data-settings="development-regenerate-button">
                <span data-settings="development-regenerate-text">Regenerate</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
