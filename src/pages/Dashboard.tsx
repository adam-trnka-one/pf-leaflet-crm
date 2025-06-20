
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getSampleData, generateAndStoreSampleData, resetDatabase, type Opportunity } from "@/utils/sampleData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { RefreshCw, TrendingUp, Users, Target, DollarSign, CheckCircle, Clock, AlertCircle, List } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  subject: string;
  type: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo: string;
  relatedTo: string;
  createdAt: Date;
}

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  rating: string;
  owner: string;
  createdAt: Date;
}

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);

  useEffect(() => {
    loadData();
    loadRecentActivities();
    loadRecentLeads();
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

  const loadRecentActivities = () => {
    const activities = JSON.parse(localStorage.getItem('crmActivities') || '[]');
    // Get recent activities (last 5, sorted by creation date)
    const recent = activities
      .sort((a: Activity, b: Activity) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
    setRecentActivities(recent);
  };

  const loadRecentLeads = () => {
    const leads = JSON.parse(localStorage.getItem('crmLeads') || '[]');
    // Get recent leads (last 3, sorted by creation date)
    const recent = leads
      .sort((a: Lead, b: Lead) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    setRecentLeads(recent);
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

  // Monthly revenue trend (simulated data for the chart)
  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
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

  // Tasks summary
  const totalTasks = recentActivities.length;
  const completedTasks = recentActivities.filter(activity => activity.status === 'Completed').length;
  const overdueTasks = recentActivities.filter(activity => {
    const dueDate = new Date(activity.dueDate);
    return dueDate < new Date() && activity.status !== 'Completed';
  }).length;

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

      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Tasks</p>
                <p className="text-2xl font-bold text-slate-800">{totalTasks}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <List className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Completed Tasks</p>
                <p className="text-2xl font-bold text-slate-800">{completedTasks}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Overdue Tasks</p>
                <p className="text-2xl font-bold text-slate-800">{overdueTasks}</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
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

        {/* Revenue Trend */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Revenue Trend</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span>Recent Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{activity.subject}</p>
                      <p className="text-sm text-slate-600">{activity.type} • {activity.assignedTo}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activity.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : activity.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {activity.status}
                      </span>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(activity.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">No recent tasks</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>Recent Leads</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-slate-800">{lead.firstName} {lead.lastName}</p>
                      <p className="text-sm text-slate-600">{lead.company} • {lead.email}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        lead.status === 'New' 
                          ? 'bg-blue-100 text-blue-800' 
                          : lead.status === 'Qualified'
                          ? 'bg-green-100 text-green-800'
                          : lead.status === 'Working'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                      <p className="text-xs text-slate-500 mt-1">{lead.source}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">No recent leads</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
