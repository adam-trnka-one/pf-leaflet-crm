
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { type Case } from "@/utils/sampleData";

interface EditCaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  case_: Case | null;
  onCaseUpdated?: () => void;
}

const EditCaseModal = ({ open, onOpenChange, case_, onCaseUpdated }: EditCaseModalProps) => {
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

  useEffect(() => {
    if (case_) {
      console.log("Setting form data for case:", case_);
      setFormData({
        subject: case_.subject,
        description: case_.description,
        accountName: case_.accountName,
        contactName: case_.contactName,
        type: case_.type,
        status: case_.status,
        priority: case_.priority,
        owner: case_.owner,
      });
    }
  }, [case_]);

  const handleSubmit = () => {
    if (!formData.subject || !formData.description || !formData.accountName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!case_) {
      console.error("No case to update");
      return;
    }

    console.log("Updating case with data:", formData);

    // Get existing cases from localStorage
    const existingCases = JSON.parse(localStorage.getItem('crmCases') || '[]');
    console.log("Existing cases before update:", existingCases);
    
    const updatedCases = existingCases.map((c: Case) => 
      c.id === case_.id 
        ? { 
            ...c, 
            ...formData,
            // Preserve the original createdAt date
            createdAt: c.createdAt 
          }
        : c
    );
    
    console.log("Updated cases after modification:", updatedCases);
    localStorage.setItem('crmCases', JSON.stringify(updatedCases));

    toast({
      title: "Case updated",
      description: "The case has been successfully updated."
    });

    onOpenChange(false);
    
    if (onCaseUpdated) {
      onCaseUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]" data-testid="edit-case-modal-content">
        <DialogHeader data-testid="edit-case-modal-header">
          <DialogTitle data-testid="edit-case-modal-title">Edit Case</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="edit-case-modal-form">
          <div className="grid gap-2" data-testid="edit-case-subject-field">
            <Label htmlFor="subject" data-testid="edit-case-subject-label">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Enter case subject"
              data-testid="edit-case-subject-input"
            />
          </div>
          
          <div className="grid gap-2" data-testid="edit-case-description-field">
            <Label htmlFor="description" data-testid="edit-case-description-label">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the case details"
              data-testid="edit-case-description-textarea"
            />
          </div>

          <div className="grid grid-cols-2 gap-4" data-testid="edit-case-account-contact-row">
            <div className="grid gap-2" data-testid="edit-case-account-field">
              <Label htmlFor="account" data-testid="edit-case-account-label">Account *</Label>
              <Input
                id="account"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                placeholder="Account name"
                data-testid="edit-case-account-input"
              />
            </div>
            <div className="grid gap-2" data-testid="edit-case-contact-field">
              <Label htmlFor="contact" data-testid="edit-case-contact-label">Contact</Label>
              <Input
                id="contact"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="Contact name"
                data-testid="edit-case-contact-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4" data-testid="edit-case-properties-row">
            <div className="grid gap-2" data-testid="edit-case-type-field">
              <Label htmlFor="type" data-testid="edit-case-type-label">Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger data-testid="edit-case-type-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent data-testid="edit-case-type-content">
                  <SelectItem value="Question" data-testid="edit-case-type-question">Question</SelectItem>
                  <SelectItem value="Problem" data-testid="edit-case-type-problem">Problem</SelectItem>
                  <SelectItem value="Feature Request" data-testid="edit-case-type-feature">Feature Request</SelectItem>
                  <SelectItem value="Bug" data-testid="edit-case-type-bug">Bug</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2" data-testid="edit-case-status-field">
              <Label htmlFor="status" data-testid="edit-case-status-label">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger data-testid="edit-case-status-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent data-testid="edit-case-status-content">
                  <SelectItem value="New" data-testid="edit-case-status-new">New</SelectItem>
                  <SelectItem value="In Progress" data-testid="edit-case-status-progress">In Progress</SelectItem>
                  <SelectItem value="Pending" data-testid="edit-case-status-pending">Pending</SelectItem>
                  <SelectItem value="Resolved" data-testid="edit-case-status-resolved">Resolved</SelectItem>
                  <SelectItem value="Closed" data-testid="edit-case-status-closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2" data-testid="edit-case-priority-field">
              <Label htmlFor="priority" data-testid="edit-case-priority-label">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger data-testid="edit-case-priority-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent data-testid="edit-case-priority-content">
                  <SelectItem value="Low" data-testid="edit-case-priority-low">Low</SelectItem>
                  <SelectItem value="Medium" data-testid="edit-case-priority-medium">Medium</SelectItem>
                  <SelectItem value="High" data-testid="edit-case-priority-high">High</SelectItem>
                  <SelectItem value="Critical" data-testid="edit-case-priority-critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter data-testid="edit-case-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-case-cancel-button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" data-testid="edit-case-update-button">
            Update Case
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCaseModal;
