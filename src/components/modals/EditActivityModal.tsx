
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  type: string;
  subject: string;
  date: Date;
  completed: boolean;
}

interface EditActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activity: Activity | null;
  onActivityUpdated?: () => void;
}

const EditActivityModal = ({ open, onOpenChange, activity, onActivityUpdated }: EditActivityModalProps) => {
  const [formData, setFormData] = useState({
    type: "Call",
    subject: "",
    date: "",
    completed: false,
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        type: activity.type,
        subject: activity.subject,
        date: activity.date.toISOString().split('T')[0],
        completed: activity.completed,
      });
    }
  }, [activity]);

  const handleSubmit = () => {
    if (!formData.subject || !formData.date || !activity) {
      return;
    }

    const updatedActivity: Activity = {
      ...activity,
      type: formData.type,
      subject: formData.subject,
      date: new Date(formData.date),
      completed: formData.completed,
    };

    // Get existing activities from localStorage
    const existingActivities = JSON.parse(localStorage.getItem('crmActivities') || '[]');
    const updatedActivities = existingActivities.map((a: Activity) => 
      a.id === activity.id ? updatedActivity : a
    );
    
    // Store back to localStorage
    localStorage.setItem('crmActivities', JSON.stringify(updatedActivities));
    
    toast({
      title: "Activity updated",
      description: "The activity has been successfully updated."
    });
    
    // Reset form and close modal
    onOpenChange(false);
    
    // Notify parent component
    if (onActivityUpdated) {
      onActivityUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="activity-type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Call">Call</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Meeting">Meeting</SelectItem>
                <SelectItem value="Task">Task</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Follow up call with client"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Due Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="completed">Status</Label>
            <Select 
              value={formData.completed ? "completed" : "pending"} 
              onValueChange={(value) => setFormData({ ...formData, completed: value === "completed" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            Update Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditActivityModal;
