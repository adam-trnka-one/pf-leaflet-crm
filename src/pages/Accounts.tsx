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
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Accounts</h1>
          <p className="text-slate-600 mt-2">Manage your customer accounts</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Account
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md bg-white"
          />
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccounts.map((account) => (
          <Link key={account.id} to={`/accounts/${account.id}`}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-slate-800 line-clamp-1">
                    {account.name}
                  </CardTitle>
                  <Badge className={getTypeColor(account.type)}>
                    {account.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <span className="font-medium mr-2">Industry:</span>
                  {account.industry}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-slate-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${account.revenue.toLocaleString()}
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Users className="h-4 w-4 mr-1" />
                    {account.employees}
                  </div>
                </div>

                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {account.address.city}, {account.address.country}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
                    Owner: {account.owner}
                  </div>
                  <div className="text-xs text-slate-500">
                    Created: {account.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredAccounts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No accounts found matching your search.</p>
        </div>
      )}

      <NewAccountModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onAccountCreated={handleAccountCreated}
      />
    </div>
  );
};

export default Accounts;
