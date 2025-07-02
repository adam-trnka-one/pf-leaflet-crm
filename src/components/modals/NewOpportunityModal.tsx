
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

interface Opportunity {
  id: string;
  name: string;
  accountName: string;
  amount: number;
  stage: string;
  probability: number;
  closeDate: Date;
  owner: string;
  createdAt: Date;
}

interface NewOpportunityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpportunityCreated?: () => void;
}

const NewOpportunityModal = ({ open, onOpenChange, onOpportunityCreated }: NewOpportunityModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    accountName: "",
    amount: "",
    stage: "Prospecting",
    probability: "",
    closeDate: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.accountName || !formData.amount || !formData.closeDate) {
      return;
    }

    const newOpportunity: Opportunity = {
      id: `opportunity_${Date.now()}`,
      name: formData.name,
      accountName: formData.accountName,
      amount: parseFloat(formData.amount),
      stage: formData.stage,
      probability: parseInt(formData.probability) || 0,
      closeDate: new Date(formData.closeDate),
      owner: "Current User",
      createdAt: new Date(),
    };

    // Get existing opportunities from localStorage
    const existingOpportunities = JSON.parse(localStorage.getItem('crmOpportunities') || '[]');
    const updatedOpportunities = [newOpportunity, ...existingOpportunities];
    
    // Store back to localStorage
    localStorage.setItem('crmOpportunities', JSON.stringify(updatedOpportunities));
    
    console.log("Creating new opportunity:", newOpportunity);
    
    // Reset form and close modal
    onOpenChange(false);
    setFormData({
      name: "",
      accountName: "",
      amount: "",
      stage: "Prospecting",
      probability: "",
      closeDate: "",
    });
    
    // Notify parent component
    if (onOpportunityCreated) {
      onOpportunityCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="new-opportunity-modal-content">
        <DialogHeader data-testid="new-opportunity-modal-header">
          <DialogTitle data-testid="new-opportunity-modal-title">Create New Opportunity</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="new-opportunity-modal-form">
          <div className="grid gap-2" data-testid="new-opportunity-name-field">
            <Label htmlFor="opportunity-name" data-testid="new-opportunity-name-label">Opportunity Name</Label>
            <Input
              id="opportunity-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Software License Deal"
              data-testid="new-opportunity-name-input"
            />
          </div>

          <div className="grid gap-2" data-testid="new-opportunity-account-field">
            <Label htmlFor="accountName" data-testid="new-opportunity-account-label">Account Name</Label>
            <Input
              id="accountName"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              placeholder="Acme Corporation"
              data-testid="new-opportunity-account-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4" data-testid="new-opportunity-amount-probability-row">
            <div className="grid gap-2" data-testid="new-opportunity-amount-field">
              <Label htmlFor="amount" data-testid="new-opportunity-amount-label">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="50000"
                data-testid="new-opportunity-amount-input"
              />
            </div>
            <div className="grid gap-2" data-testid="new-opportunity-probability-field">
              <Label htmlFor="probability" data-testid="new-opportunity-probability-label">Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                placeholder="25"
                data-testid="new-opportunity-probability-input"
              />
            </div>
          </div>

          <div className="grid gap-2" data-testid="new-opportunity-stage-field">
            <Label htmlFor="stage" data-testid="new-opportunity-stage-label">Stage</Label>
            <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
              <SelectTrigger data-testid="new-opportunity-stage-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="new-opportunity-stage-content">
                <SelectItem value="Prospecting" data-testid="new-opportunity-stage-prospecting">Prospecting</SelectItem>
                <SelectItem value="Qualification" data-testid="new-opportunity-stage-qualification">Qualification</SelectItem>
                <SelectItem value="Proposal" data-testid="new-opportunity-stage-proposal">Proposal</SelectItem>
                <SelectItem value="Negotiation" data-testid="new-opportunity-stage-negotiation">Negotiation</SelectItem>
                <SelectItem value="Demo" data-testid="new-opportunity-stage-demo">Demo</SelectItem>
                <SelectItem value="Follow-up" data-testid="new-opportunity-stage-followup">Follow-up</SelectItem>
                <SelectItem value="Closed Won" data-testid="new-opportunity-stage-closed-won">Closed Won</SelectItem>
                <SelectItem value="Closed Lost" data-testid="new-opportunity-stage-closed-lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2" data-testid="new-opportunity-close-date-field">
            <Label htmlFor="closeDate" data-testid="new-opportunity-close-date-label">Expected Close Date</Label>
            <Input
              id="closeDate"
              type="date"
              value={formData.closeDate}
              onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
              data-testid="new-opportunity-close-date-input"
            />
          </div>
        </div>
        <DialogFooter data-testid="new-opportunity-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="new-opportunity-cancel-button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" data-testid="new-opportunity-create-button">
            Create Opportunity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewOpportunityModal;
