
import { useState } from "react";
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

interface Activity {
  id: string;
  type: string;
  subject: string;
  date: Date;
  completed: boolean;
}

interface NewActivityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivityCreated?: () => void;
}

const NewActivityModal = ({ open, onOpenChange, onActivityCreated }: NewActivityModalProps) => {
  const [formData, setFormData] = useState({
    type: "Call",
    subject: "",
    date: "",
  });

  const handleSubmit = () => {
    if (!formData.subject || !formData.date) {
      return;
    }

    const newActivity: Activity = {
      id: `activity_${Date.now()}`,
      type: formData.type,
      subject: formData.subject,
      date: new Date(formData.date),
      completed: false,
    };

    // Get existing activities from localStorage
    const existingStoredActivities = JSON.parse(localStorage.getItem('crmActivities') || '[]');
    
    // If no stored activities exist, check if we have default activities from the Activities page
    // This preserves the default activities that were set in the Activities page
    let allExistingActivities = existingStoredActivities;
    
    // If localStorage is empty, we'll let the Activities page handle the defaults
    // This way we don't duplicate the default activities logic
    const updatedActivities = [newActivity, ...allExistingActivities];
    
    // Store back to localStorage
    localStorage.setItem('crmActivities', JSON.stringify(updatedActivities));
    
    console.log("Creating new activity:", newActivity);
    
    // Reset form and close modal
    onOpenChange(false);
    setFormData({ type: "Call", subject: "", date: "" });
    
    // Notify parent component
    if (onActivityCreated) {
      onActivityCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="new-activity-modal-content">
        <DialogHeader data-testid="new-activity-modal-header">
          <DialogTitle data-testid="new-activity-modal-title">Create New Activity</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="new-activity-modal-form">
          <div className="grid gap-2" data-testid="new-activity-type-field">
            <Label htmlFor="activity-type" data-testid="new-activity-type-label">Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger data-testid="new-activity-type-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="new-activity-type-content">
                <SelectItem value="Call" data-testid="new-activity-type-call">Call</SelectItem>
                <SelectItem value="Email" data-testid="new-activity-type-email">Email</SelectItem>
                <SelectItem value="Meeting" data-testid="new-activity-type-meeting">Meeting</SelectItem>
                <SelectItem value="Task" data-testid="new-activity-type-task">Task</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2" data-testid="new-activity-subject-field">
            <Label htmlFor="subject" data-testid="new-activity-subject-label">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Follow up call with client"
              data-testid="new-activity-subject-input"
            />
          </div>
          <div className="grid gap-2" data-testid="new-activity-date-field">
            <Label htmlFor="date" data-testid="new-activity-date-label">Due Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              data-testid="new-activity-date-input"
            />
          </div>
        </div>
        <DialogFooter data-testid="new-activity-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="new-activity-cancel-button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-leaflet-green hover:bg-leaflet-green-hover" data-testid="new-activity-create-button">
            Create Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewActivityModal;
