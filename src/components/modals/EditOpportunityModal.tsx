import { useEffect, useState } from "react";
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
import type { Opportunity } from "@/utils/sampleData";

interface EditOpportunityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunity: Opportunity | null;
  onSave: (opportunity: Opportunity) => void;
}

const toDateInput = (date: Date) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
};

const EditOpportunityModal = ({ open, onOpenChange, opportunity, onSave }: EditOpportunityModalProps) => {
  const { t } = useTranslation(["opportunities", "common"]);
  const [formData, setFormData] = useState({
    name: "",
    accountName: "",
    amount: "",
    stage: "Prospecting",
    probability: "",
    closeDate: "",
  });

  useEffect(() => {
    if (opportunity) {
      setFormData({
        name: opportunity.name,
        accountName: opportunity.accountName,
        amount: String(opportunity.amount),
        stage: opportunity.stage,
        probability: String(opportunity.probability),
        closeDate: toDateInput(opportunity.closeDate),
      });
    }
  }, [opportunity]);

  const handleSubmit = () => {
    if (!opportunity) return;
    if (!formData.name || !formData.accountName || !formData.amount || !formData.closeDate) return;

    onSave({
      ...opportunity,
      name: formData.name,
      accountName: formData.accountName,
      amount: parseFloat(formData.amount) || 0,
      stage: formData.stage,
      probability: parseInt(formData.probability) || 0,
      closeDate: new Date(formData.closeDate),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="edit-opportunity-modal-content">
        <DialogHeader data-testid="edit-opportunity-modal-header">
          <DialogTitle data-testid="edit-opportunity-modal-title">{t("opportunities:modal.editTitle")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="edit-opportunity-modal-form">
          <div className="grid gap-2" data-testid="edit-opportunity-name-field">
            <Label htmlFor="edit-opportunity-name">{t("opportunities:fields.opportunityName")}</Label>
            <Input
              id="edit-opportunity-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              data-testid="edit-opportunity-name-input"
            />
          </div>

          <div className="grid gap-2" data-testid="edit-opportunity-account-field">
            <Label htmlFor="edit-opportunity-account">{t("opportunities:fields.account")}</Label>
            <Input
              id="edit-opportunity-account"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              data-testid="edit-opportunity-account-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2" data-testid="edit-opportunity-amount-field">
              <Label htmlFor="edit-opportunity-amount">{t("opportunities:fields.amount")}</Label>
              <Input
                id="edit-opportunity-amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                data-testid="edit-opportunity-amount-input"
              />
            </div>
            <div className="grid gap-2" data-testid="edit-opportunity-probability-field">
              <Label htmlFor="edit-opportunity-probability">{t("opportunities:fields.probability")} (%)</Label>
              <Input
                id="edit-opportunity-probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                data-testid="edit-opportunity-probability-input"
              />
            </div>
          </div>

          <div className="grid gap-2" data-testid="edit-opportunity-stage-field">
            <Label htmlFor="edit-opportunity-stage">{t("opportunities:fields.stage")}</Label>
            <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
              <SelectTrigger id="edit-opportunity-stage" data-testid="edit-opportunity-stage-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-opportunity-stage-content">
                <SelectItem value="Prospecting">{t("opportunities:stages.prospecting")}</SelectItem>
                <SelectItem value="Qualification">{t("opportunities:stages.qualification")}</SelectItem>
                <SelectItem value="Proposal">{t("opportunities:stages.proposal")}</SelectItem>
                <SelectItem value="Negotiation">{t("opportunities:stages.negotiation")}</SelectItem>
                <SelectItem value="Demo">{t("opportunities:stages.demo")}</SelectItem>
                <SelectItem value="Follow-up">{t("opportunities:stages.followUp")}</SelectItem>
                <SelectItem value="Closed Won">{t("opportunities:stages.closedWon")}</SelectItem>
                <SelectItem value="Closed Lost">{t("opportunities:stages.closedLost")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2" data-testid="edit-opportunity-close-date-field">
            <Label htmlFor="edit-opportunity-close-date">{t("opportunities:fields.closeDate")}</Label>
            <Input
              id="edit-opportunity-close-date"
              type="date"
              value={formData.closeDate}
              onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
              data-testid="edit-opportunity-close-date-input"
            />
          </div>
        </div>
        <DialogFooter data-testid="edit-opportunity-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-opportunity-cancel-button">
            {t("common:cancel")}
          </Button>
          <Button onClick={handleSubmit} className="bg-success hover:bg-success" data-testid="edit-opportunity-save-button">
            {t("opportunities:modal.saveButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditOpportunityModal;
