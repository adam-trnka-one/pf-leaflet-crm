
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getSampleData, generateAndStoreSampleData, resetDatabase, type Opportunity } from "@/utils/sampleData";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import MetricsCards from "@/components/dashboard/MetricsCards";
import TaskSummaryCards from "@/components/dashboard/TaskSummaryCards";
import ChartsSection from "@/components/dashboard/ChartsSection";
import RecentItemsSection from "@/components/dashboard/RecentItemsSection";

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
      <MetricsCards 
        totalRevenue={totalRevenue}
        totalAccounts={totalAccounts}
        totalContacts={totalContacts}
        openOpportunities={openOpportunities}
      />

      {/* Task Summary */}
      <TaskSummaryCards 
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        overdueTasks={overdueTasks}
      />

      {/* Charts */}
      <ChartsSection 
        pipelineData={pipelineData}
        monthlyRevenue={monthlyRevenue}
      />

      {/* Recent Items */}
      <RecentItemsSection 
        recentActivities={recentActivities}
        recentLeads={recentLeads}
      />
    </div>
  );
};

export default Dashboard;
