
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
      title: t('activities.activityDeleted'),
      description: t('activities.activityDeletedDesc')
    });
  };

  const handleActivityUpdated = () => {
    loadActivities();
    setIsEditModalOpen(false);
    setSelectedActivity(null);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Call': return <Phone className="h-4 w-4" data-testid="activities-call-icon" />;
      case 'Email': return <Mail className="h-4 w-4" data-testid="activities-email-icon" />;
      case 'Meeting': return <Calendar className="h-4 w-4" data-testid="activities-meeting-icon" />;
      default: return <MessageSquare className="h-4 w-4" data-testid="activities-default-icon" />;
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen" data-testid="activities-main-container">
      <div className="flex justify-between items-start mb-8" data-testid="activities-header-section">
        <div data-testid="activities-header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-testid="activities-page-title">{t('activities.title')}</h1>
          <p className="text-slate-600 mt-2" data-testid="activities-page-subtitle">{t('activities.subtitle')}</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127]"
          onClick={() => setIsModalOpen(true)}
          data-testid="activities-new-activity-button"
        >
          <Plus className="h-4 w-4 mr-2" data-testid="activities-new-activity-icon" />
          <span data-testid="activities-new-activity-text">{t('activities.newActivity')}</span>
        </Button>
      </div>

      <div className="space-y-4" data-testid="activities-list">
        {activities.map((activity) => (
          <Card key={activity.id} className="bg-white shadow-sm" data-testid="activities-activity-card">
            <CardContent className="p-6" data-testid="activities-card-content">
              <div className="flex items-center justify-between" data-testid="activities-card-row">
                <div className="flex items-center space-x-4" data-testid="activities-info-section">
                  <div className="flex-shrink-0" data-testid="activities-icon-container">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1" data-testid="activities-details">
                    <h3 className="font-semibold text-slate-800" data-testid="activities-subject">{activity.subject}</h3>
                    <p className="text-sm text-slate-600" data-testid="activities-metadata">
                      <span data-testid="activities-type">{activity.type}</span> • <span data-testid="activities-date">{activity.date.toLocaleDateString()}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2" data-testid="activities-actions">
                  <div className="flex-shrink-0 mr-4" data-testid="activities-status-section">
                    {activity.completed ? (
                      <span className="text-emerald-600 text-sm" data-testid="activities-completed-status">{t('common.completed')}</span>
                    ) : (
                      <span className="text-orange-600 text-sm" data-testid="activities-pending-status">{t('common.pending')}</span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(activity)}
                    data-testid="activities-edit-button"
                  >
                    <Edit className="h-4 w-4" data-testid="activities-edit-icon" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-600 hover:text-red-700"
                    data-testid="activities-delete-button"
                  >
                    <Trash2 className="h-4 w-4" data-testid="activities-delete-icon" />
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
        data-testid="activities-new-activity-modal"
      />

      <EditActivityModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        activity={selectedActivity}
        onActivityUpdated={handleActivityUpdated}
        data-testid="activities-edit-activity-modal"
      />
    </div>
  );
};

export default Activities;
