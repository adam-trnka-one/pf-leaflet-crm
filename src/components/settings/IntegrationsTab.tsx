
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plug, Crown, Check, Settings as SettingsIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface Integration {
  name: string;
  description: string;
  status: "active" | "available" | "premium";
  logo: string;
  features: string[];
}

const integrations: Integration[] = [
  {
    name: "Salesforce",
    description: "Connect to Salesforce for unified customer data and advanced CRM features",
    status: "premium",
    logo: "☁️",
    features: ["Contact sync", "Deal tracking", "Custom fields", "Advanced reporting"]
  },
  {
    name: "HubSpot",
    description: "Sync contacts, deals, and activities with HubSpot CRM for better sales automation",
    status: "premium",
    logo: "🟠",
    features: ["Marketing automation", "Lead scoring", "Email campaigns", "Analytics dashboard"]
  },
  {
    name: "Hotjar",
    description: "Advanced user behavior analytics with heatmaps, recordings, and feedback tools",
    status: "premium",
    logo: "🔥",
    features: ["Heatmaps", "Session recordings", "User feedback", "Conversion funnels"]
  },
  {
    name: "Customer.io",
    description: "Powerful email marketing automation and customer messaging platform",
    status: "active",
    logo: "📧",
    features: ["Email automation", "Behavioral triggers", "Segmentation", "A/B testing"]
  },
  {
    name: "Mixpanel",
    description: "Advanced product analytics to understand user behavior and optimize conversions",
    status: "active",
    logo: "📊",
    features: ["Event tracking", "Funnel analysis", "Cohort analysis", "Real-time data"]
  },
  {
    name: "Zapier",
    description: "Connect with 5000+ apps to automate workflows and eliminate manual tasks",
    status: "available",
    logo: "⚡",
    features: ["Multi-step workflows", "Conditional logic", "Error handling", "Custom webhooks"]
  },
  {
    name: "Make.com",
    description: "Visual automation platform for complex integrations and data processing",
    status: "available",
    logo: "🔗",
    features: ["Visual builder", "Advanced logic", "API integrations", "Real-time sync"]
  },
  {
    name: "Smartlook",
    description: "Complete user experience analytics with recordings and conversion optimization",
    status: "available",
    logo: "👁️",
    features: ["Session recordings", "Heatmaps", "Event tracking", "Conversion funnels"]
  }
];

export const IntegrationsTab = () => {
  const { t } = useTranslation(['settings', 'common']);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200">
            <Check className="h-3 w-3 mr-1" />
            {t('common:active')}
          </Badge>
        );
      case "available":
        return (
          <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200">
            <Plug className="h-3 w-3 mr-1" />
            {t('common:available')}
          </Badge>
        );
      case "premium":
        return (
          <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200">
            <Crown className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        );
      default:
        return null;
    }
  };

  const getActionButton = (integration: Integration) => {
    switch (integration.status) {
      case "active":
        return (
          <Button 
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50 w-full md:w-auto"
            onClick={() => {
              toast({
                title: `${integration.name} Settings`,
                description: "Integration settings would open here."
              });
            }}
          >
            <SettingsIcon className="h-4 w-4 mr-2" />
            {t('common:configure')}
          </Button>
        );
      case "available":
        return (
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
            onClick={() => {
              toast({
                title: `Connecting ${integration.name}`,
                description: "Integration setup would begin here."
              });
            }}
          >
            <Plug className="h-4 w-4 mr-2" />
            {t('common:connect')}
          </Button>
        );
      case "premium":
        return (
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md w-full md:w-auto"
            onClick={() => {
              toast({
                title: `Upgrade Required`,
                description: `${integration.name} integration requires a premium plan.`
              });
            }}
            {...(integration.name === "HubSpot" && {
              "data-id": "299e5015-ac9f-4d66-bad4-fe74464c5961",
              "dataId": "299e5015-ac9f-4d66-bad4-fe74464c5961"
            })}
          >
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Connect
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white shadow-sm" data-testid="integrations-card">
      <CardHeader data-testid="integrations-card-header">
        <CardTitle data-testid="integrations-card-title">{t('integrations.title')}</CardTitle>
        <p className="text-sm text-slate-600" data-testid="integrations-description">
          {t('integrations.subtitle')}
        </p>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6" data-testid="integrations-card-content">
        <div className="grid grid-cols-1 gap-4 md:gap-6" data-testid="integrations-grid">
          {integrations.map((integration) => (
            <div key={integration.name} className="p-4 md:p-6 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors bg-gradient-to-r from-slate-50 to-white" data-testid={`integration-${integration.name.toLowerCase().replace(' ', '-')}`}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex items-start space-x-3 md:space-x-4 flex-1">
                  <div className="text-2xl md:text-3xl flex-shrink-0" data-testid={`integration-logo-${integration.name.toLowerCase().replace(' ', '-')}`}>{integration.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-3 mb-2">
                      <h4 className="font-semibold text-slate-800 text-base md:text-lg" data-testid={`integration-name-${integration.name.toLowerCase().replace(' ', '-')}`}>{integration.name}</h4>
                      <div className="mt-1 md:mt-0">
                        {getStatusBadge(integration.status)}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-3 leading-relaxed" data-testid={`integration-description-${integration.name.toLowerCase().replace(' ', '-')}`}>{integration.description}</p>
                    <div className="hidden md:flex flex-wrap gap-1.5 md:gap-2" data-testid={`integration-features-${integration.name.toLowerCase().replace(' ', '-')}`}>
                      {integration.features.map((feature, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200" data-testid={`integration-feature-${integration.name.toLowerCase().replace(' ', '-')}-${index}`}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-auto md:flex-shrink-0">
                  {getActionButton(integration)}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator data-testid="integrations-separator" />
        
        <div className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg" data-testid="premium-upgrade-section">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center text-sm md:text-base" data-testid="premium-upgrade-title">
            <Crown className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            Unlock Premium Integrations
          </h4>
          <p className="text-sm text-blue-700 mb-4 leading-relaxed" data-testid="premium-upgrade-description">
            Upgrade to our Premium plan to connect with enterprise-grade tools and unlock advanced automation features that will transform your sales process.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3" data-testid="premium-upgrade-actions">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full sm:w-auto" data-testid="view-premium-plans-button">
              View Premium Plans
            </Button>
            <Button variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100 w-full sm:w-auto" data-testid="contact-sales-button">
              Contact Sales
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
