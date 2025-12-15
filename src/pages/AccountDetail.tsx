
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSampleData, type Account } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Phone, Globe, MapPin, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";
import EditAccountModal from "@/components/modals/EditAccountModal";
import { useTranslation } from "react-i18next";

const AccountDetail = () => {
  const { t } = useTranslation(['accounts', 'common']);
  const { id } = useParams();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadAccount = () => {
    // First try to load from localStorage
    const storedAccounts = localStorage.getItem('crmAccounts');
    let foundAccount = null;
    
    if (storedAccounts) {
      const parsedAccounts = JSON.parse(storedAccounts).map((account: any) => ({
        ...account,
        createdAt: new Date(account.createdAt)
      }));
      foundAccount = parsedAccounts.find((acc: Account) => acc.id === id);
    }
    
    // If not found in localStorage, try sample data
    if (!foundAccount) {
      const data = getSampleData();
      if (data && id) {
        foundAccount = data.accounts.find((acc: Account) => acc.id === id);
      }
    }
    
    setAccount(foundAccount || null);
    setLoading(false);
  };

  useEffect(() => {
    loadAccount();
  }, [id]);

  const handleAccountUpdated = () => {
    loadAccount(); // Refresh the account data when updated
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800">{t('notFound')}</h1>
        <Link to="/dashboard/accounts">
          <Button className="mt-4">{t('backToList')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/dashboard/accounts">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800">{account.name}</h1>
          <p className="text-slate-600">{account.industry} • {account.type}</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsEditModalOpen(true)}
        >
          <Edit className="h-4 w-4 mr-2" />
          {t('edit')}
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-white">
          <TabsTrigger value="details">{t('tabs.details')}</TabsTrigger>
          <TabsTrigger value="timeline">{t('tabs.timeline')}</TabsTrigger>
          <TabsTrigger value="files">{t('tabs.files')}</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>{t('sections.basicInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">{t('columns.name')}</label>
                    <p className="font-medium text-slate-800">{account.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">{t('columns.type')}</label>
                    <Badge className="mt-1">{account.type}</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">{t('columns.industry')}</label>
                    <p className="font-medium text-slate-800">{account.industry}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">{t('columns.owner')}</label>
                    <p className="font-medium text-slate-800">{account.owner}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-slate-500" />
                    <div>
                      <label className="text-sm font-medium text-slate-600">{t('columns.revenue')}</label>
                      <p className="font-medium text-slate-800">${account.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-slate-500" />
                    <div>
                      <label className="text-sm font-medium text-slate-600">{t('columns.employees')}</label>
                      <p className="font-medium text-slate-800">{account.employees}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>{t('sections.contactInfo')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">{t('common:phone')}</label>
                    <p className="font-medium text-slate-800">{account.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-slate-500" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">{t('common:website')}</label>
                    <p className="font-medium text-slate-800">{account.website}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-slate-500 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">{t('common:address')}</label>
                    <p className="font-medium text-slate-800">
                      {account.address.street}<br />
                      {account.address.city}, {account.address.state} {account.address.zipCode}<br />
                      {account.address.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>{t('sections.timeline')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 text-center py-8">{t('placeholders.timeline')}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>{t('sections.files')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 text-center py-8">{t('placeholders.files')}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EditAccountModal 
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        account={account}
        onAccountUpdated={handleAccountUpdated}
      />
    </div>
  );
};

export default AccountDetail;
