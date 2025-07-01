

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
  completed: boolean;
  date: Date;
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
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);

  useEffect(() => {
    loadData();
    loadRecentActivities();
    loadRecentLeads();
    loadTotalAccounts();
    loadTotalContacts();
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

  const loadTotalAccounts = () => {
    // Try to load from localStorage first (manually created accounts)
    const storedAccounts = localStorage.getItem('crmAccounts');
    if (storedAccounts) {
      const parsedAccounts = JSON.parse(storedAccounts);
      setTotalAccounts(parsedAccounts.length);
    } else {
      // Fall back to sample data
      const sampleData = getSampleData();
      if (sampleData) {
        setTotalAccounts(sampleData.accounts.length);
      }
    }
  };

  const loadTotalContacts = () => {
    // Try to load from localStorage first (manually created contacts)
    const storedContacts = localStorage.getItem('crmContacts');
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      setTotalContacts(parsedContacts.length);
    } else {
      // Fall back to sample data
      const sampleData = getSampleData();
      if (sampleData) {
        setTotalContacts(sampleData.contacts.length);
      }
    }
  };

  const loadRecentActivities = () => {
    const activities = JSON.parse(localStorage.getItem('crmActivities') || '[]');
    
    // Transform activities to match the expected format
    const transformedActivities = activities.map((activity: any) => ({
      id: activity.id,
      subject: activity.subject,
      type: activity.type,
      status: activity.completed ? 'Completed' : 'In Progress',
      priority: 'Medium', // Default priority since it's not stored
      dueDate: activity.date || new Date().toISOString(),
      assignedTo: 'Current User', // Default assignee
      relatedTo: '', // Default relation
      createdAt: new Date(activity.date || new Date()),
      completed: activity.completed || false,
      date: new Date(activity.date || new Date())
    }));
    
    // Get recent activities (last 5, sorted by date)
    const recent = transformedActivities
      .sort((a: Activity, b: Activity) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
    // Update total accounts and contacts after reset
    setTotalAccounts(newData.accounts.length);
    setTotalContacts(newData.contacts.length);
    toast({
      title: "Database reset",
      description: "All sample data has been regenerated"
    });
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center" data-dashboard="loading-container">
        <div className="text-center" data-dashboard="loading-content">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto" data-dashboard="loading-spinner"></div>
          <p className="mt-4 text-slate-600" data-dashboard="loading-text">Loading dashboard...</p>
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

  const openOpportunities = data.opportunities.filter((opp: Opportunity) => 
    !['Closed Won', 'Closed Lost'].includes(opp.stage)
  ).length;

  // Tasks summary - now based on actual activities
  const completedTasks = recentActivities.filter(activity => activity.completed).length;
  const overdueTasks = recentActivities.filter(activity => {
    const dueDate = new Date(activity.dueDate);
    return dueDate < new Date() && !activity.completed;
  }).length;

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen" data-dashboard="main-container">
      {/* Header */}
      <div className="flex justify-between items-start" data-dashboard="header-section">
        <div data-dashboard="header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-dashboard="page-title">Dashboard</h1>
          <p className="text-slate-600 mt-2" data-dashboard="page-subtitle">Welcome back! Here's what's happening with your sales.</p>
        </div>
        <Button 
          onClick={handleResetDatabase}
          variant="outline"
          className="flex items-center space-x-2"
          data-dashboard="reset-button"
        >
          <RefreshCw className="h-4 w-4" data-dashboard="reset-icon" />
          <span data-dashboard="reset-text">Reset Database</span>
        </Button>
      </div>

      {/* Key Metrics */}
      <div data-dashboard="metrics-section">
        <MetricsCards 
          totalRevenue={totalRevenue}
          totalAccounts={totalAccounts}
          totalContacts={totalContacts}
          openOpportunities={openOpportunities}
        />
      </div>

      {/* Task Summary */}
      <div data-dashboard="task-summary-section">
        <TaskSummaryCards 
          totalTasks={recentActivities.length}
          completedTasks={completedTasks}
          overdueTasks={overdueTasks}
        />
      </div>

      {/* Charts */}
      <div data-dashboard="charts-section">
        <ChartsSection 
          pipelineData={pipelineData}
          monthlyRevenue={monthlyRevenue}
        />
      </div>

      {/* Recent Items */}
      <div data-dashboard="recent-items-section">
        <RecentItemsSection 
          recentActivities={recentActivities}
          recentLeads={recentLeads}
        />
      </div>
    </div>
  );
};

export default Dashboard;

