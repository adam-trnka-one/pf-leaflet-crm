

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Users } from "lucide-react";

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

interface RecentItemsSectionProps {
  recentActivities: Activity[];
  recentLeads: Lead[];
}

const RecentItemsSection = ({ recentActivities, recentLeads }: RecentItemsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-recent="section-grid">
      {/* Recent Tasks */}
      <Card className="bg-white shadow-sm" data-recent="tasks-card">
        <CardHeader data-recent="tasks-header">
          <CardTitle className="flex items-center space-x-2" data-recent="tasks-title">
            <Clock className="h-5 w-5 text-orange-600" data-recent="tasks-icon" />
            <span data-recent="tasks-text">Recent Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-recent="tasks-content">
          <div className="space-y-4" data-recent="tasks-list">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg" data-recent="task-item" data-task-id={activity.id}>
                  <div className="flex-1" data-recent="task-info">
                    <p className="font-medium text-slate-800" data-recent="task-subject">{activity.subject}</p>
                    <p className="text-sm text-slate-600" data-recent="task-details">{activity.type} • {activity.assignedTo}</p>
                  </div>
                  <div className="text-right" data-recent="task-status">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activity.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : activity.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`} data-recent="task-badge">
                      {activity.status}
                    </span>
                    <p className="text-xs text-slate-500 mt-1" data-recent="task-date">
                      {new Date(activity.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8" data-recent="no-tasks">No recent tasks</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Leads */}
      <Card className="bg-white shadow-sm" data-recent="leads-card">
        <CardHeader data-recent="leads-header">
          <CardTitle className="flex items-center space-x-2" data-recent="leads-title">
            <Users className="h-5 w-5 text-purple-600" data-recent="leads-icon" />
            <span data-recent="leads-text">Recent Leads</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-recent="leads-content">
          <div className="space-y-4" data-recent="leads-list">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg" data-recent="lead-item" data-lead-id={lead.id}>
                  <div className="flex-1" data-recent="lead-info">
                    <p className="font-medium text-slate-800" data-recent="lead-name">{lead.firstName} {lead.lastName}</p>
                    <p className="text-sm text-slate-600" data-recent="lead-details">{lead.company} • {lead.email}</p>
                  </div>
                  <div className="text-right" data-recent="lead-status">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      lead.status === 'New' 
                        ? 'bg-blue-100 text-blue-800' 
                        : lead.status === 'Qualified'
                        ? 'bg-green-100 text-green-800'
                        : lead.status === 'Working'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`} data-recent="lead-badge">
                      {lead.status}
                    </span>
                    <p className="text-xs text-slate-500 mt-1" data-recent="lead-source">{lead.source}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8" data-recent="no-leads">No recent leads</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentItemsSection;

