
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plug, Crown, Check, Settings as SettingsIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200">
            <Check className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case "available":
        return (
          <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200">
            <Plug className="h-3 w-3 mr-1" />
            Available
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
            className="border-green-200 text-green-700 hover:bg-green-50"
            onClick={() => {
              toast({
                title: `${integration.name} Settings`,
                description: "Integration settings would open here."
              });
            }}
          >
            <SettingsIcon className="h-4 w-4 mr-2" />
            Configure
          </Button>
        );
      case "available":
        return (
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              toast({
                title: `Connecting ${integration.name}`,
                description: "Integration setup would begin here."
              });
            }}
          >
            <Plug className="h-4 w-4 mr-2" />
            Connect
          </Button>
        );
      case "premium":
        return (
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md"
            onClick={() => {
              toast({
                title: `Upgrade Required`,
                description: `${integration.name} integration requires a premium plan.`
              });
            }}
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
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <p className="text-sm text-slate-600">
          Connect Leaflet CRM with powerful tools to enhance your workflow
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          {integrations.map((integration) => (
            <div key={integration.name} className="p-6 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{integration.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-slate-800 text-lg">{integration.name}</h4>
                      {getStatusBadge(integration.status)}
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{integration.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {integration.features.map((feature, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-200">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {getActionButton(integration)}
              </div>
            </div>
          ))}
        </div>
        
        <Separator />
        
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
            <Crown className="h-5 w-5 mr-2" />
            Unlock Premium Integrations
          </h4>
          <p className="text-sm text-blue-700 mb-4">
            Upgrade to our Premium plan to connect with enterprise-grade tools and unlock advanced automation features that will transform your sales process.
          </p>
          <div className="flex space-x-3">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              View Premium Plans
            </Button>
            <Button variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100">
              Contact Sales
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
