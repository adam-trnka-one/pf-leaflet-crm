
import MetricsCards from "@/components/dashboard/MetricsCards";
import TaskSummaryCards from "@/components/dashboard/TaskSummaryCards";
import ChartsSection from "@/components/dashboard/ChartsSection";
import RecentItemsSection from "@/components/dashboard/RecentItemsSection";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ChecklistSection from "@/components/dashboard/ChecklistSection";
import { useDashboardData } from "@/hooks/useDashboardData";
import { 
  calculatePipelineData, 
  calculateTotalRevenue, 
  calculateOpenOpportunities, 
  calculateTaskMetrics,
  getMonthlyRevenueData 
} from "@/utils/dashboardCalculations";

const Dashboard = () => {
  const {
    data,
    loading,
    recentActivities,
    recentLeads,
    totalAccounts,
    totalContacts,
    handleResetDatabase
  } = useDashboardData();

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center" data-testid="dashboard-loading-container">
        <div className="text-center" data-testid="dashboard-loading-content">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto" data-testid="dashboard-loading-spinner"></div>
          <p className="mt-4 text-slate-600" data-testid="dashboard-loading-text">Loading dashboard...</p>
        </div>
      </div>
    );
  };

  // Calculate metrics using utility functions
  const pipelineData = calculatePipelineData(data.opportunities);
  const monthlyRevenue = getMonthlyRevenueData();
  const totalRevenue = calculateTotalRevenue(data.opportunities);
  const openOpportunities = calculateOpenOpportunities(data.opportunities);
  const { completedTasks, overdueTasks } = calculateTaskMetrics(recentActivities);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen" data-testid="dashboard-main-container">
      {/* Header */}
      <DashboardHeader onResetDatabase={handleResetDatabase} />

      {/* Top Metrics Group - First red rectangle */}
      <div data-testid="dashboard-top-metrics-group">
        {/* Key Metrics */}
        <div data-testid="dashboard-metrics-section">
          <MetricsCards 
            totalRevenue={totalRevenue}
            totalAccounts={totalAccounts}
            totalContacts={totalContacts}
            openOpportunities={openOpportunities}
          />
        </div>

        {/* Task Summary */}
        <div className="mt-8" data-testid="dashboard-task-summary-section">
          <TaskSummaryCards 
            totalTasks={recentActivities.length}
            completedTasks={completedTasks}
            overdueTasks={overdueTasks}
          />
        </div>
      </div>

      {/* Checklist Section - NEW: Between Tasks and Charts */}
      <div data-testid="dashboard-checklist-group">
        <div data-testid="dashboard-checklist-section">
          <ChecklistSection />
        </div>
      </div>

      {/* Charts Group - Second red rectangle */}
      <div data-testid="dashboard-charts-group">
        <div data-testid="dashboard-charts-section">
          <ChartsSection 
            pipelineData={pipelineData}
            monthlyRevenue={monthlyRevenue}
          />
        </div>
      </div>

      {/* Recent Items Group - Third red rectangle */}
      <div data-testid="dashboard-recent-items-group">
        <div data-testid="dashboard-recent-items-section">
          <RecentItemsSection 
            recentActivities={recentActivities}
            recentLeads={recentLeads}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
