import MetricsCards from "@/components/dashboard/MetricsCards";
import TaskSummaryCards from "@/components/dashboard/TaskSummaryCards";
import ChartsSection from "@/components/dashboard/ChartsSection";
import RecentItemsSection from "@/components/dashboard/RecentItemsSection";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ChecklistSection from "@/components/dashboard/ChecklistSection";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { 
  calculatePipelineData, 
  calculateTotalRevenue, 
  calculateOpenOpportunities, 
  calculateTaskMetrics,
  getMonthlyRevenueData 
} from "@/utils/dashboardCalculations";

const Dashboard = () => {
  const { workspaceData } = useWorkspace();
  const isMobile = useIsMobile();
  const isJessWorkspace = workspaceData.selectedWorkspace === 'jess';
  
  const [showChecklist, setShowChecklist] = useState(() => {
    // If Jess workspace, always hide checklist
    if (isJessWorkspace) return false;
    
    // Load initial state from localStorage for other workspaces
    const saved = localStorage.getItem('dashboard-show-checklist');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [checklistAvailable, setChecklistAvailable] = useState(true);

  // Save to localStorage whenever showChecklist changes (only for non-Jess workspaces)
  useEffect(() => {
    if (!isJessWorkspace) {
      localStorage.setItem('dashboard-show-checklist', JSON.stringify(showChecklist));
    }
  }, [showChecklist, isJessWorkspace]);

  // Update checklist visibility when workspace changes
  useEffect(() => {
    if (isJessWorkspace) {
      setShowChecklist(false);
    } else {
      // Load from localStorage for other workspaces and ensure it's applied
      const saved = localStorage.getItem('dashboard-show-checklist');
      const savedState = saved !== null ? JSON.parse(saved) : true;
      setShowChecklist(savedState);
    }
  }, [isJessWorkspace]);

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
  }

  // Calculate metrics using utility functions
  const pipelineData = calculatePipelineData(data.opportunities);
  const monthlyRevenue = getMonthlyRevenueData();
  const totalRevenue = calculateTotalRevenue(data.opportunities);
  const openOpportunities = calculateOpenOpportunities(data.opportunities);
  const { completedTasks, overdueTasks } = calculateTaskMetrics(recentActivities);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen" data-testid="dashboard-main-container">
      {/* Header */}
      <DashboardHeader 
        showChecklist={showChecklist}
        onToggleChecklist={() => setShowChecklist(!showChecklist)}
        showChecklistToggle={!isJessWorkspace && !isMobile && checklistAvailable}
      />

      {/* Main Dashboard Layout */}
      <div className={`grid gap-8 ${showChecklist && !isJessWorkspace && !isMobile ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1'}`}>
        {/* Left Column - Main Dashboard Content */}
        <div className={`space-y-8 ${showChecklist && !isJessWorkspace && !isMobile ? 'xl:col-span-2' : ''}`}>
          {/* Top Metrics Group */}
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

          {/* Charts Group */}
          <div data-testid="dashboard-charts-group">
            <div data-testid="dashboard-charts-section">
              <ChartsSection 
                pipelineData={pipelineData}
                monthlyRevenue={monthlyRevenue}
              />
            </div>
          </div>

          {/* Recent Items Group */}
          <div data-testid="dashboard-recent-items-group">
            <div data-testid="dashboard-recent-items-section">
              <RecentItemsSection 
                recentActivities={recentActivities}
                recentLeads={recentLeads}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Checklist */}
        {showChecklist && !isJessWorkspace && !isMobile && (
          <div className="xl:col-span-1" data-testid="dashboard-checklist-column">
            <ChecklistSection onVisibilityChange={setChecklistAvailable} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
