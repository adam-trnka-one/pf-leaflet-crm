
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
    const existingActivities = JSON.parse(localStorage.getItem('crmActivities') || '[]');
    const updatedActivities = [newActivity, ...existingActivities];
    
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Activity</DialogTitle>
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
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-leaflet-green hover:bg-leaflet-green-hover">
            Create Activity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewActivityModal;
