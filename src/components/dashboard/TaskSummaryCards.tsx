
import { Card, CardContent } from "@/components/ui/card";
import { List, CheckCircle, AlertCircle } from "lucide-react";

interface TaskSummaryCardsProps {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

const TaskSummaryCards = ({ totalTasks, completedTasks, overdueTasks }: TaskSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="tasks-summary-grid">
      <Card className="bg-white shadow-sm" data-testid="tasks-total-card">
        <CardContent className="p-6" data-testid="tasks-total-content">
          <div className="flex items-center justify-between" data-testid="tasks-total-layout">
            <div data-testid="tasks-total-info">
              <p className="text-sm font-medium text-slate-600" data-testid="tasks-total-label">Total Tasks</p>
              <p className="text-2xl font-bold text-slate-800" data-testid="tasks-total-value">{totalTasks}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center" data-testid="tasks-total-icon-container">
              <List className="h-6 w-6 text-blue-600" data-testid="tasks-total-icon" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm" data-testid="tasks-completed-card">
        <CardContent className="p-6" data-testid="tasks-completed-content">
          <div className="flex items-center justify-between" data-testid="tasks-completed-layout">
            <div data-testid="tasks-completed-info">
              <p className="text-sm font-medium text-slate-600" data-testid="tasks-completed-label">Completed Tasks</p>
              <p className="text-2xl font-bold text-slate-800" data-testid="tasks-completed-value">{completedTasks}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center" data-testid="tasks-completed-icon-container">
              <CheckCircle className="h-6 w-6 text-green-600" data-testid="tasks-completed-icon" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm" data-testid="tasks-overdue-card">
        <CardContent className="p-6" data-testid="tasks-overdue-content">
          <div className="flex items-center justify-between" data-testid="tasks-overdue-layout">
            <div data-testid="tasks-overdue-info">
              <p className="text-sm font-medium text-slate-600" data-testid="tasks-overdue-label">Overdue Tasks</p>
              <p className="text-2xl font-bold text-slate-800" data-testid="tasks-overdue-value">{overdueTasks}</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center" data-testid="tasks-overdue-icon-container">
              <AlertCircle className="h-6 w-6 text-red-600" data-testid="tasks-overdue-icon" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskSummaryCards;
