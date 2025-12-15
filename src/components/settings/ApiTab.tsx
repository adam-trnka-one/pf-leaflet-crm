
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ApiTab = () => {
  return (
    <Card className="bg-white shadow-sm" data-testid="api-card">
      <CardHeader data-testid="api-card-header">
        <CardTitle data-testid="api-card-title">API Keys</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4" data-testid="api-card-content">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg" data-testid="api-warning">
          <p className="text-sm text-yellow-800" data-testid="api-warning-text">
            API keys provide access to your CRM data. Keep them secure and never share them publicly.
          </p>
        </div>
        
        <div className="space-y-4" data-testid="api-keys-section">
          <div data-testid="production-api-key-field">
            <Label data-testid="production-api-key-label">Production API Key</Label>
            <div className="flex space-x-2" data-testid="production-api-key-container">
              <Input value="sk_prod_************************" readOnly data-testid="production-api-key-input" />
              <Button variant="outline" data-testid="production-regenerate-button">
                <span data-testid="production-regenerate-text">Regenerate</span>
              </Button>
            </div>
          </div>
          
          <div data-testid="development-api-key-field">
            <Label data-testid="development-api-key-label">Development API Key</Label>
            <div className="flex space-x-2" data-testid="development-api-key-container">
              <Input value="sk_dev_************************" readOnly data-testid="development-api-key-input" />
              <Button variant="outline" data-testid="development-regenerate-button">
                <span data-testid="development-regenerate-text">Regenerate</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
