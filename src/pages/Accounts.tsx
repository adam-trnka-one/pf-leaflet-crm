
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSampleData, type Account } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, DollarSign, MapPin } from "lucide-react";
import NewAccountModal from "@/components/modals/NewAccountModal";

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadAccounts = () => {
    // Try to load from localStorage first
    const storedAccounts = localStorage.getItem('crmAccounts');
    if (storedAccounts) {
      const parsedAccounts = JSON.parse(storedAccounts).map((account: any) => ({
        ...account,
        createdAt: new Date(account.createdAt)
      }));
      setAccounts(parsedAccounts);
      setFilteredAccounts(parsedAccounts);
    } else {
      // Fall back to sample data
      const data = getSampleData();
      if (data) {
        setAccounts(data.accounts);
        setFilteredAccounts(data.accounts);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    const filtered = accounts.filter(account =>
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.address.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccounts(filtered);
  }, [searchTerm, accounts]);

  const handleAccountCreated = () => {
    loadAccounts(); // Refresh the list when a new account is created
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Customer': return 'bg-emerald-100 text-emerald-700';
      case 'Prospect': return 'bg-blue-100 text-blue-700';
      case 'Partner': return 'bg-purple-100 text-purple-700';
      case 'Competitor': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center" data-testid="accounts-loading-container">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500" data-testid="accounts-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen" data-testid="accounts-main-container">
      {/* Header */}
      <div className="flex justify-between items-start mb-8" data-testid="accounts-header-section">
        <div data-testid="accounts-header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-testid="accounts-page-title">Accounts</h1>
          <p className="text-slate-600 mt-2" data-testid="accounts-page-subtitle">Manage your customer accounts</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127]"
          onClick={() => setIsModalOpen(true)}
          data-testid="accounts-new-account-button"
        >
          <Plus className="h-4 w-4 mr-2" data-testid="accounts-new-account-icon" />
          <span data-testid="accounts-new-account-text">New Account</span>
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6" data-testid="accounts-search-section">
        <div className="relative" data-testid="accounts-search-container">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" data-testid="accounts-search-icon" />
          <Input
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md bg-white"
            data-testid="accounts-search-input"
          />
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="accounts-grid">
        {filteredAccounts.map((account) => (
          <Link key={account.id} to={`/dashboard/accounts/${account.id}`} data-testid="accounts-account-link">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer" data-testid="accounts-account-card">
              <CardHeader className="pb-2" data-testid="accounts-card-header">
                <div className="flex justify-between items-start" data-testid="accounts-header-row">
                  <CardTitle className="text-lg font-semibold text-slate-800 line-clamp-1" data-testid="accounts-account-name">
                    {account.name}
                  </CardTitle>
                  <Badge className={getTypeColor(account.type)} data-testid="accounts-account-type-badge">
                    {account.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3" data-testid="accounts-card-content">
                <div className="flex items-center text-sm text-slate-600" data-testid="accounts-industry-row">
                  <span className="font-medium mr-2" data-testid="accounts-industry-label">Industry:</span>
                  <span data-testid="accounts-industry-value">{account.industry}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm" data-testid="accounts-metrics-row">
                  <div className="flex items-center text-slate-600" data-testid="accounts-revenue-container">
                    <DollarSign className="h-4 w-4 mr-1" data-testid="accounts-revenue-icon" />
                    <span data-testid="accounts-revenue-value">${account.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center text-slate-600" data-testid="accounts-employees-container">
                    <Users className="h-4 w-4 mr-1" data-testid="accounts-employees-icon" />
                    <span data-testid="accounts-employees-value">{account.employees}</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-slate-600" data-testid="accounts-location-row">
                  <MapPin className="h-4 w-4 mr-1" data-testid="accounts-location-icon" />
                  <span data-testid="accounts-location-value">{account.address.city}, {account.address.country}</span>
                </div>

                <div className="pt-2 border-t border-slate-100" data-testid="accounts-metadata-section">
                  <div className="text-xs text-slate-500" data-testid="accounts-owner-row">
                    <span data-testid="accounts-owner-label">Owner: </span>
                    <span data-testid="accounts-owner-value">{account.owner}</span>
                  </div>
                  <div className="text-xs text-slate-500" data-testid="accounts-created-row">
                    <span data-testid="accounts-created-label">Created: </span>
                    <span data-testid="accounts-created-value">{account.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-12" data-testid="accounts-empty-state">
          <p className="text-slate-500" data-testid="accounts-empty-message">No accounts found matching your search.</p>
        </div>
      )}

      <NewAccountModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAccountCreated={handleAccountCreated}
        data-testid="accounts-new-account-modal"
      />
    </div>
  );
};

export default Accounts;
