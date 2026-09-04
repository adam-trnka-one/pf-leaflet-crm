
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

export const ApiTab = () => {
  const { t } = useTranslation('settings');

  return (
    <Card className="bg-card shadow-sm" data-testid="api-card">
      <CardHeader data-testid="api-card-header">
        <CardTitle data-testid="api-card-title">{t('api.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4" data-testid="api-card-content">
        <div className="p-4 bg-warning-muted border border-warning/40 rounded-lg" data-testid="api-warning">
          <p className="text-sm text-warning-muted-foreground" data-testid="api-warning-text">
            {t('api.subtitle')}
          </p>
        </div>
        
        <div className="space-y-4" data-testid="api-keys-section">
          <div data-testid="production-api-key-field">
            <Label data-testid="production-api-key-label">{t('api.productionKey')}</Label>
            <div className="flex space-x-2" data-testid="production-api-key-container">
              <Input value="sk_prod_************************" readOnly data-testid="production-api-key-input" />
              <Button variant="outline" data-testid="production-regenerate-button">
                <span data-testid="production-regenerate-text">{t('api.regenerate')}</span>
              </Button>
            </div>
          </div>
          
          <div data-testid="development-api-key-field">
            <Label data-testid="development-api-key-label">{t('api.developmentKey')}</Label>
            <div className="flex space-x-2" data-testid="development-api-key-container">
              <Input value="sk_dev_************************" readOnly data-testid="development-api-key-input" />
              <Button variant="outline" data-testid="development-regenerate-button">
                <span data-testid="development-regenerate-text">{t('api.regenerate')}</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
