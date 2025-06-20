
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Phone, Mail, MessageSquare } from "lucide-react";

const Activities = () => {
  const activities = [
    { id: 1, type: 'Call', subject: 'Follow up call with Acme Corp', date: new Date(), completed: false },
    { id: 2, type: 'Email', subject: 'Send proposal to TechStart', date: new Date(), completed: true },
    { id: 3, type: 'Meeting', subject: 'Demo presentation', date: new Date(), completed: false },
  ];

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
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          New Activity
        </Button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{activity.subject}</h3>
                  <p className="text-sm text-slate-600">{activity.type} • {activity.date.toLocaleDateString()}</p>
                </div>
                <div className="flex-shrink-0">
                  {activity.completed ? (
                    <span className="text-emerald-600 text-sm">Completed</span>
                  ) : (
                    <span className="text-orange-600 text-sm">Pending</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Activities;
