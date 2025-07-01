
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Phone, Mail, MessageSquare, Edit, Trash2 } from "lucide-react";
import NewActivityModal from "@/components/modals/NewActivityModal";
import EditActivityModal from "@/components/modals/EditActivityModal";
import { toast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  type: string;
  subject: string;
  date: Date;
  completed: boolean;
}

const Activities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Load activities from localStorage
  const loadActivities = () => {
    const storedActivities = localStorage.getItem('crmActivities');
    if (storedActivities) {
      const parsed = JSON.parse(storedActivities);
      // Convert date strings back to Date objects
      const activitiesWithDates = parsed.map((activity: any) => ({
        ...activity,
        date: new Date(activity.date)
      }));
      setActivities(activitiesWithDates);
    } else {
      // Set default activities if none exist
      const defaultActivities = [
        { id: '1', type: 'Call', subject: 'Follow up call with Acme Corp', date: new Date(), completed: false },
        { id: '2', type: 'Email', subject: 'Send proposal to TechStart', date: new Date(), completed: true },
        { id: '3', type: 'Meeting', subject: 'Demo presentation', date: new Date(), completed: false },
      ];
      setActivities(defaultActivities);
      localStorage.setItem('crmActivities', JSON.stringify(defaultActivities));
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleActivityCreated = () => {
    loadActivities(); // Refresh the list when a new activity is created
  };

  const handleEdit = (activity: Activity) => {
    setSelectedActivity(activity);
    setIsEditModalOpen(true);
  };

  const handleDelete = (activityId: string) => {
    const updatedActivities = activities.filter(a => a.id !== activityId);
    setActivities(updatedActivities);
    localStorage.setItem('crmActivities', JSON.stringify(updatedActivities));
    toast({
      title: "Activity deleted",
      description: "The activity has been successfully deleted."
    });
  };

  const handleActivityUpdated = () => {
    loadActivities();
    setIsEditModalOpen(false);
    setSelectedActivity(null);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Call': return <Phone className="h-4 w-4" data-activities="call-icon" />;
      case 'Email': return <Mail className="h-4 w-4" data-activities="email-icon" />;
      case 'Meeting': return <Calendar className="h-4 w-4" data-activities="meeting-icon" />;
      default: return <MessageSquare className="h-4 w-4" data-activities="default-icon" />;
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen" data-activities="main-container">
      <div className="flex justify-between items-start mb-8" data-activities="header-section">
        <div data-activities="header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-activities="page-title">Activities</h1>
          <p className="text-slate-600 mt-2" data-activities="page-subtitle">Track and manage your activities</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127]"
          onClick={() => setIsModalOpen(true)}
          data-activities="new-activity-button"
        >
          <Plus className="h-4 w-4 mr-2" data-activities="new-activity-icon" />
          <span data-activities="new-activity-text">New Activity</span>
        </Button>
      </div>

      <div className="space-y-4" data-activities="activities-list">
        {activities.map((activity) => (
          <Card key={activity.id} className="bg-white shadow-sm" data-activities="activity-card">
            <CardContent className="p-6" data-activities="card-content">
              <div className="flex items-center justify-between" data-activities="card-row">
                <div className="flex items-center space-x-4" data-activities="activity-info-section">
                  <div className="flex-shrink-0" data-activities="activity-icon-container">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1" data-activities="activity-details">
                    <h3 className="font-semibold text-slate-800" data-activities="activity-subject">{activity.subject}</h3>
                    <p className="text-sm text-slate-600" data-activities="activity-metadata">
                      <span data-activities="activity-type">{activity.type}</span> • <span data-activities="activity-date">{activity.date.toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2" data-activities="activity-actions">
                  <div className="flex-shrink-0 mr-4" data-activities="status-section">
                    {activity.completed ? (
                      <span className="text-emerald-600 text-sm" data-activities="completed-status">Completed</span>
                    ) : (
                      <span className="text-orange-600 text-sm" data-activities="pending-status">Pending</span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(activity)}
                    data-activities="edit-button"
                  >
                    <Edit className="h-4 w-4" data-activities="edit-icon" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-600 hover:text-red-700"
                    data-activities="delete-button"
                  >
                    <Trash2 className="h-4 w-4" data-activities="delete-icon" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewActivityModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onActivityCreated={handleActivityCreated}
        data-activities="new-activity-modal"
      />

      <EditActivityModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        activity={selectedActivity}
        onActivityUpdated={handleActivityUpdated}
        data-activities="edit-activity-modal"
      />
    </div>
  );
};

export default Activities;
