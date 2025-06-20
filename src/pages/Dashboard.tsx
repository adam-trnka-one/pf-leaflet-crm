
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSampleData, generateAndStoreSampleData, resetDatabase, type Opportunity } from "@/utils/sampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw, TrendingUp, Users, Target, DollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    let sampleData = getSampleData();
    if (!sampleData) {
      sampleData = generateAndStoreSampleData();
      toast({
        title: "Sample data generated",
        description: "300 accounts, 600 contacts, and 600 opportunities created"
      });
    }
    setData(sampleData);
    setLoading(false);
  };

  const handleResetDatabase = () => {
    setLoading(true);
    const newData = resetDatabase();
    setData(newData);
    setLoading(false);
    toast({
      title: "Database reset",
      description: "All sample data has been regenerated"
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Pipeline data for chart
  const pipelineData = data.opportunities.reduce((acc: any, opp: Opportunity) => {
    const existing = acc.find((item: any) => item.stage === opp.stage);
    if (existing) {
      existing.count += 1;
      existing.value += opp.amount;
    } else {
      acc.push({ stage: opp.stage, count: 1, value: opp.amount });
    }
    return acc;
  }, []);

  // Tasks due today (simulated)
  const tasksToday = [
    { id: 1, title: "Follow up with Acme Corp", type: "Call", time: "10:00 AM" },
    { id: 2, title: "Demo for TechStart Inc", type: "Meeting", time: "2:00 PM" },
    { id: 3, title: "Proposal review", type: "Internal", time: "4:00 PM" },
  ];

  // Calculate metrics
  const totalRevenue = data.opportunities
    .filter((opp: Opportunity) => opp.stage === 'Closed Won')
    .reduce((sum: number, opp: Opportunity) => sum + opp.amount, 0);

  const totalAccounts = data.accounts.length;
  const totalContacts = data.contacts.length;
  const openOpportunities = data.opportunities.filter((opp: Opportunity) => 
    !['Closed Won', 'Closed Lost'].includes(opp.stage)
  ).length;

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back! Here's what's happening with your sales.</p>
        </div>
        <Button 
          onClick={handleResetDatabase}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Reset Database</span>
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-800">${totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Accounts</p>
                <p className="text-2xl font-bold text-slate-800">{totalAccounts}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Contacts</p>
                <p className="text-2xl font-bold text-slate-800">{totalContacts}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Open Opportunities</p>
                <p className="text-2xl font-bold text-slate-800">{openOpportunities}</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pipeline Chart */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span>Sales Pipeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={pipelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="stage" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'count' ? `${value} opportunities` : `$${Number(value).toLocaleString()}`,
                    name === 'count' ? 'Count' : 'Value'
                  ]}
                />
                <Bar dataKey="count" fill="#10b981" name="count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tasks Due Today */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Tasks Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasksToday.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">{task.title}</p>
                    <p className="text-sm text-slate-600">{task.type}</p>
                  </div>
                  <span className="text-sm font-medium text-emerald-600">{task.time}</span>
                </div>
              ))}
              {tasksToday.length === 0 && (
                <p className="text-slate-500 text-center py-8">No tasks due today</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
