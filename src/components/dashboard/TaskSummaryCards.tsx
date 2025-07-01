

import { Card, CardContent } from "@/components/ui/card";
import { List, CheckCircle, AlertCircle } from "lucide-react";

interface TaskSummaryCardsProps {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

const TaskSummaryCards = ({ totalTasks, completedTasks, overdueTasks }: TaskSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-tasks="summary-grid">
      <Card className="bg-white shadow-sm" data-tasks="total-card">
        <CardContent className="p-6" data-tasks="total-content">
          <div className="flex items-center justify-between" data-tasks="total-layout">
            <div data-tasks="total-info">
              <p className="text-sm font-medium text-slate-600" data-tasks="total-label">Total Tasks</p>
              <p className="text-2xl font-bold text-slate-800" data-tasks="total-value">{totalTasks}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center" data-tasks="total-icon-container">
              <List className="h-6 w-6 text-blue-600" data-tasks="total-icon" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm" data-tasks="completed-card">
        <CardContent className="p-6" data-tasks="completed-content">
          <div className="flex items-center justify-between" data-tasks="completed-layout">
            <div data-tasks="completed-info">
              <p className="text-sm font-medium text-slate-600" data-tasks="completed-label">Completed Tasks</p>
              <p className="text-2xl font-bold text-slate-800" data-tasks="completed-value">{completedTasks}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center" data-tasks="completed-icon-container">
              <CheckCircle className="h-6 w-6 text-green-600" data-tasks="completed-icon" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm" data-tasks="overdue-card">
        <CardContent className="p-6" data-tasks="overdue-content">
          <div className="flex items-center justify-between" data-tasks="overdue-layout">
            <div data-tasks="overdue-info">
              <p className="text-sm font-medium text-slate-600" data-tasks="overdue-label">Overdue Tasks</p>
              <p className="text-2xl font-bold text-slate-800" data-tasks="overdue-value">{overdueTasks}</p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center" data-tasks="overdue-icon-container">
              <AlertCircle className="h-6 w-6 text-red-600" data-tasks="overdue-icon" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskSummaryCards;

