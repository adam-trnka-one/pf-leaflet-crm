
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface NewCaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCaseCreated?: () => void;
}

const NewCaseModal = ({ open, onOpenChange, onCaseCreated }: NewCaseModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    accountName: "",
    contactName: "",
    type: "Question",
    status: "New",
    priority: "Medium",
    owner: "John Doe",
  });

  const handleSubmit = () => {
    if (!formData.subject || !formData.description || !formData.accountName) {
      toast({
        title: t('common.error'),
        description: t('common.fillRequiredFields'),
        variant: "destructive"
      });
      return;
    }

    const newCase = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date(),
    };

    // Get existing cases from localStorage
    const existingStoredCases = JSON.parse(localStorage.getItem('crmCases') || '[]');
    
    // If no stored cases exist, we'll let the Cases page handle loading defaults
    // This preserves any existing cases whether they're from sample data or previously created
    const updatedCases = [newCase, ...existingStoredCases];
    localStorage.setItem('crmCases', JSON.stringify(updatedCases));

    toast({
      title: t('common.caseCreated'),
      description: t('common.caseCreatedDesc')
    });

    onOpenChange(false);
    setFormData({
      subject: "",
      description: "",
      accountName: "",
      contactName: "",
      type: "Question",
      status: "New",
      priority: "Medium",
      owner: "John Doe",
    });
    
    if (onCaseCreated) {
      onCaseCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]" data-testid="new-case-modal-content">
        <DialogHeader data-testid="new-case-modal-header">
          <DialogTitle data-testid="new-case-modal-title">{t('cases.createCase')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="new-case-modal-form">
          <div className="grid gap-2" data-testid="new-case-subject-field">
            <Label htmlFor="subject" data-testid="new-case-subject-label">{t('common.subject')} *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder={t('common.subject')}
              data-testid="new-case-subject-input"
            />
          </div>
          
          <div className="grid gap-2" data-testid="new-case-description-field">
            <Label htmlFor="description" data-testid="new-case-description-label">{t('common.description')} *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t('common.description')}
              data-testid="new-case-description-textarea"
            />
          </div>

          <div className="grid grid-cols-2 gap-4" data-testid="new-case-account-contact-row">
            <div className="grid gap-2" data-testid="new-case-account-field">
              <Label htmlFor="account" data-testid="new-case-account-label">{t('common.account')} *</Label>
              <Input
                id="account"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                placeholder={t('common.account')}
                data-testid="new-case-account-input"
              />
            </div>
            <div className="grid gap-2" data-testid="new-case-contact-field">
              <Label htmlFor="contact" data-testid="new-case-contact-label">{t('common.contact')}</Label>
              <Input
                id="contact"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder={t('common.contact')}
                data-testid="new-case-contact-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4" data-testid="new-case-properties-row">
            <div className="grid gap-2" data-testid="new-case-type-field">
              <Label htmlFor="type" data-testid="new-case-type-label">{t('common.type')}</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger data-testid="new-case-type-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent data-testid="new-case-type-content">
                  <SelectItem value="Question" data-testid="new-case-type-question">{t('common.question')}</SelectItem>
                  <SelectItem value="Problem" data-testid="new-case-type-problem">{t('common.problem')}</SelectItem>
                  <SelectItem value="Feature Request" data-testid="new-case-type-feature">{t('common.featureRequest')}</SelectItem>
                  <SelectItem value="Bug" data-testid="new-case-type-bug">{t('common.bug')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2" data-testid="new-case-status-field">
              <Label htmlFor="status" data-testid="new-case-status-label">{t('common.status')}</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger data-testid="new-case-status-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent data-testid="new-case-status-content">
                  <SelectItem value="New" data-testid="new-case-status-new">{t('cases.statuses.new')}</SelectItem>
                  <SelectItem value="In Progress" data-testid="new-case-status-progress">{t('cases.statuses.inProgress')}</SelectItem>
                  <SelectItem value="Pending" data-testid="new-case-status-pending">{t('cases.statuses.pending')}</SelectItem>
                  <SelectItem value="Resolved" data-testid="new-case-status-resolved">{t('cases.statuses.resolved')}</SelectItem>
                  <SelectItem value="Closed" data-testid="new-case-status-closed">{t('cases.statuses.closed')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2" data-testid="new-case-priority-field">
              <Label htmlFor="priority" data-testid="new-case-priority-label">{t('common.priority')}</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger data-testid="new-case-priority-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent data-testid="new-case-priority-content">
                  <SelectItem value="Low" data-testid="new-case-priority-low">{t('cases.priorities.low')}</SelectItem>
                  <SelectItem value="Medium" data-testid="new-case-priority-medium">{t('cases.priorities.medium')}</SelectItem>
                  <SelectItem value="High" data-testid="new-case-priority-high">{t('cases.priorities.high')}</SelectItem>
                  <SelectItem value="Critical" data-testid="new-case-priority-critical">{t('cases.priorities.critical')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter data-testid="new-case-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="new-case-cancel-button">
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" data-testid="new-case-create-button">
            {t('cases.createCase')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewCaseModal;