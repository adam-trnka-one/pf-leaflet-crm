
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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(['activities', 'common']);
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

    const existingStoredActivities = JSON.parse(localStorage.getItem('crmActivities') || '[]');
    let allExistingActivities = existingStoredActivities;
    const updatedActivities = [newActivity, ...allExistingActivities];
    localStorage.setItem('crmActivities', JSON.stringify(updatedActivities));
    
    console.log("Creating new activity:", newActivity);
    
    onOpenChange(false);
    setFormData({ type: "Call", subject: "", date: "" });
    
    if (onActivityCreated) {
      onActivityCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="new-activity-modal-content">
        <DialogHeader data-testid="new-activity-modal-header">
          <DialogTitle data-testid="new-activity-modal-title">{t('createNew')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="new-activity-modal-form">
          <div className="grid gap-2" data-testid="new-activity-type-field">
            <Label htmlFor="activity-type" data-testid="new-activity-type-label">{t('columns.type')}</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger data-testid="new-activity-type-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="new-activity-type-content">
                <SelectItem value="Call" data-testid="new-activity-type-call">{t('types.call')}</SelectItem>
                <SelectItem value="Email" data-testid="new-activity-type-email">{t('types.email')}</SelectItem>
                <SelectItem value="Meeting" data-testid="new-activity-type-meeting">{t('types.meeting')}</SelectItem>
                <SelectItem value="Task" data-testid="new-activity-type-task">{t('types.task')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2" data-testid="new-activity-subject-field">
            <Label htmlFor="subject" data-testid="new-activity-subject-label">{t('columns.subject')}</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Follow up call with client"
              data-testid="new-activity-subject-input"
            />
          </div>
          <div className="grid gap-2" data-testid="new-activity-date-field">
            <Label htmlFor="date" data-testid="new-activity-date-label">{t('columns.date')}</Label>
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
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-leaflet-green hover:bg-leaflet-green-hover" data-testid="new-activity-create-button">
            {t('common:create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewActivityModal;
