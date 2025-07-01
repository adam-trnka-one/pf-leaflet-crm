
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Target } from "lucide-react";

interface MetricsCardsProps {
  totalRevenue: number;
  totalAccounts: number;
  totalContacts: number;
  openOpportunities: number;
}

const MetricsCards = ({ totalRevenue, totalAccounts, totalContacts, openOpportunities }: MetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="metrics-cards-grid">
      <Card className="bg-white shadow-sm" data-testid="metrics-revenue-card">
        <CardContent className="p-6" data-testid="metrics-revenue-content">
          <div className="flex items-center justify-between" data-testid="metrics-revenue-layout">
            <div data-testid="metrics-revenue-info">
              <p className="text-sm font-medium text-slate-600" data-testid="metrics-revenue-label">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800" data-testid="metrics-revenue-value">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center" data-testid="metrics-revenue-icon-container">
              <DollarSign className="h-6 w-6 text-emerald-600" data-testid="metrics-revenue-icon" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm" data-testid="metrics-accounts-card">
        <CardContent className="p-6" data-testid="metrics-accounts-content">
          <div className="flex items-center justify-between" data-testid="metrics-accounts-layout">
            <div data-testid="metrics-accounts-info">
              <p className="text-sm font-medium text-slate-600" data-testid="metrics-accounts-label">Total Accounts</p>
              <p className="text-2xl font-bold text-slate-800" data-testid="metrics-accounts-value">{totalAccounts}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center" data-testid="metrics-accounts-icon-container">
              <Users className="h-6 w-6 text-blue-600" data-testid="metrics-accounts-icon" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm" data-testid="metrics-contacts-card">
        <CardContent className="p-6" data-testid="metrics-contacts-content">
          <div className="flex items-center justify-between" data-testid="metrics-contacts-layout">
            <div data-testid="metrics-contacts-info">
              <p className="text-sm font-medium text-slate-600" data-testid="metrics-contacts-label">Total Contacts</p>
              <p className="text-2xl font-bold text-slate-800" data-testid="metrics-contacts-value">{totalContacts}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center" data-testid="metrics-contacts-icon-container">
              <Users className="h-6 w-6 text-purple-600" data-testid="metrics-contacts-icon" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm" data-testid="metrics-opportunities-card">
        <CardContent className="p-6" data-testid="metrics-opportunities-content">
          <div className="flex items-center justify-between" data-testid="metrics-opportunities-layout">
            <div data-testid="metrics-opportunities-info">
              <p className="text-sm font-medium text-slate-600" data-testid="metrics-opportunities-label">Open Opportunities</p>
              <p className="text-2xl font-bold text-slate-800" data-testid="metrics-opportunities-value">{openOpportunities}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center" data-testid="metrics-opportunities-icon-container">
              <Target className="h-6 w-6 text-orange-600" data-testid="metrics-opportunities-icon" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
