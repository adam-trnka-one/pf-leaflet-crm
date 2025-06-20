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
      case 'Call': return <Phone className="h-4 w-4" />;
      case 'Email': return <Mail className="h-4 w-4" />;
      case 'Meeting': return <Calendar className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Activities</h1>
          <p className="text-slate-600 mt-2">Track and manage your activities</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Activity
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">{activity.subject}</h3>
                    <p className="text-sm text-slate-600">{activity.type} • {activity.date.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-shrink-0 mr-4">
                    {activity.completed ? (
                      <span className="text-emerald-600 text-sm">Completed</span>
                    ) : (
                      <span className="text-orange-600 text-sm">Pending</span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(activity)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
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
      />

      <EditActivityModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        activity={selectedActivity}
        onActivityUpdated={handleActivityUpdated}
      />
    </div>
  );
};

export default Activities;
