
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Opportunity</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="opportunity-name">Opportunity Name</Label>
            <Input
              id="opportunity-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Software License Deal"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              placeholder="Acme Corporation"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="50000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="probability">Probability (%)</Label>
              <Input
                id="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                placeholder="25"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="stage">Stage</Label>
            <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Prospecting">Prospecting</SelectItem>
                <SelectItem value="Qualification">Qualification</SelectItem>
                <SelectItem value="Proposal">Proposal</SelectItem>
                <SelectItem value="Negotiation">Negotiation</SelectItem>
                <SelectItem value="Demo">Demo</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
                <SelectItem value="Closed Won">Closed Won</SelectItem>
                <SelectItem value="Closed Lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="closeDate">Expected Close Date</Label>
            <Input
              id="closeDate"
              type="date"
              value={formData.closeDate}
              onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            Create Opportunity
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewOpportunityModal;
