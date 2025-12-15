
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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(['activities', 'common']);
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

    const existingActivities = JSON.parse(localStorage.getItem('crmActivities') || '[]');
    const updatedActivities = existingActivities.map((a: Activity) => 
      a.id === activity.id ? updatedActivity : a
    );
    localStorage.setItem('crmActivities', JSON.stringify(updatedActivities));
    
    toast({
      title: t('common:updated'),
      description: t('common:updated')
    });
    
    onOpenChange(false);
    
    if (onActivityUpdated) {
      onActivityUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="edit-activity-modal-content">
        <DialogHeader data-testid="edit-activity-modal-header">
          <DialogTitle data-testid="edit-activity-modal-title">{t('edit')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="edit-activity-modal-form">
          <div className="grid gap-2" data-testid="edit-activity-type-field">
            <Label htmlFor="activity-type" data-testid="edit-activity-type-label">{t('columns.type')}</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger data-testid="edit-activity-type-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-activity-type-content">
                <SelectItem value="Call" data-testid="edit-activity-type-call">{t('types.call')}</SelectItem>
                <SelectItem value="Email" data-testid="edit-activity-type-email">{t('types.email')}</SelectItem>
                <SelectItem value="Meeting" data-testid="edit-activity-type-meeting">{t('types.meeting')}</SelectItem>
                <SelectItem value="Task" data-testid="edit-activity-type-task">{t('types.task')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2" data-testid="edit-activity-subject-field">
            <Label htmlFor="subject" data-testid="edit-activity-subject-label">{t('columns.subject')}</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Follow up call with client"
              data-testid="edit-activity-subject-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-activity-date-field">
            <Label htmlFor="date" data-testid="edit-activity-date-label">{t('columns.date')}</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              data-testid="edit-activity-date-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-activity-status-field">
            <Label htmlFor="completed" data-testid="edit-activity-status-label">{t('columns.status')}</Label>
            <Select 
              value={formData.completed ? "completed" : "pending"} 
              onValueChange={(value) => setFormData({ ...formData, completed: value === "completed" })}
            >
              <SelectTrigger data-testid="edit-activity-status-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-activity-status-content">
                <SelectItem value="pending" data-testid="edit-activity-status-pending">{t('status.pending')}</SelectItem>
                <SelectItem value="completed" data-testid="edit-activity-status-completed">{t('status.completed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="edit-activity-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-activity-cancel-button">
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" data-testid="edit-activity-update-button">
            {t('common:update')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditActivityModal;
