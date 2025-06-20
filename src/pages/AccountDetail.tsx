
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSampleData, type Account } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Phone, Globe, MapPin, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";

const AccountDetail = () => {
  const { id } = useParams();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getSampleData();
    if (data && id) {
      const foundAccount = data.accounts.find((acc: Account) => acc.id === id);
      setAccount(foundAccount || null);
    }
    setLoading(false);
  }, [id]);

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
        <h1 className="text-2xl font-bold text-slate-800">Account not found</h1>
        <Link to="/accounts">
          <Button className="mt-4">Back to Accounts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/accounts">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800">{account.name}</h1>
          <p className="text-slate-600">{account.industry} • {account.type}</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Edit className="h-4 w-4 mr-2" />
          Edit Account
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-white">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Account Name</label>
                    <p className="font-medium text-slate-800">{account.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Type</label>
                    <Badge className="mt-1">{account.type}</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Industry</label>
                    <p className="font-medium text-slate-800">{account.industry}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Owner</label>
                    <p className="font-medium text-slate-800">{account.owner}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-slate-500" />
                    <div>
                      <label className="text-sm font-medium text-slate-600">Annual Revenue</label>
                      <p className="font-medium text-slate-800">${account.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-slate-500" />
                    <div>
                      <label className="text-sm font-medium text-slate-600">Employees</label>
                      <p className="font-medium text-slate-800">{account.employees}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">Phone</label>
                    <p className="font-medium text-slate-800">{account.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="h-4 w-4 text-slate-500" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">Website</label>
                    <p className="font-medium text-slate-800">{account.website}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-slate-500 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">Address</label>
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
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 text-center py-8">Activity timeline will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Files & Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 text-center py-8">File management will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountDetail;
