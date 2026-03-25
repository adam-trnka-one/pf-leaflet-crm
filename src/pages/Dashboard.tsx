import { Skeleton } from "@/components/ui/skeleton";
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
import { useTranslation } from "react-i18next";

// Initialize Crisp chat
declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}
import { 
  calculatePipelineData, 
  calculateTotalRevenue, 
  calculateOpenOpportunities, 
  calculateTaskMetrics,
  getMonthlyRevenueData 
} from "@/utils/dashboardCalculations";

const Dashboard = () => {
  const { t } = useTranslation('dashboard');
  const { workspaceData } = useWorkspace();
  const isMobile = useIsMobile();
  const isJessWorkspace = workspaceData.selectedWorkspace === 'jess';

  // Initialize Crisp chat
  useEffect(() => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "72291954-9726-47ee-980c-09eff435c8d7";
    
    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    script.id = "crisp-script";
    document.getElementsByTagName("head")[0].appendChild(script);
    
    // Hide chat widget by default
    window.$crisp.push(["do", "chat:hide"]);

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById("crisp-script");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);
  
  const [showChecklist, setShowChecklist] = useState(() => {
    // If Jess workspace, always hide checklist
    if (isJessWorkspace) return false;
    
    // Load initial state from localStorage for other workspaces
    const saved = localStorage.getItem('dashboard-show-checklist');
    return saved !== null ? JSON.parse(saved) : true;
  });

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
      <div className="p-8 space-y-8 bg-slate-50 min-h-screen" data-testid="dashboard-loading-container">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-6">
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-32" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-6">
              <Skeleton className="h-4 w-20 mb-3" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-slate-200 p-6">
              <Skeleton className="h-4 w-32 mb-4" />
              <Skeleton className="h-48 w-full" />
            </div>
          ))}
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
        showChecklistToggle={!isJessWorkspace && !isMobile}
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
            <ChecklistSection />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
