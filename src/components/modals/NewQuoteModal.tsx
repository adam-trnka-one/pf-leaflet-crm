
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

interface Quote {
  id: number;
  name: string;
  account: string;
  amount: number;
  status: string;
  date: Date;
}

interface NewQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onQuoteCreated?: (quote: Quote) => void;
}

const NewQuoteModal = ({ open, onOpenChange, onQuoteCreated }: NewQuoteModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    account: "",
    amount: "",
    status: "Draft",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.account || !formData.amount) {
      return;
    }

    const newQuote: Quote = {
      id: Date.now(),
      name: formData.name,
      account: formData.account,
      amount: Number(formData.amount),
      status: formData.status,
      date: new Date(),
    };

    console.log("Creating new quote:", newQuote);
    
    // Notify parent component
    if (onQuoteCreated) {
      onQuoteCreated(newQuote);
    }
    
    onOpenChange(false);
    setFormData({ name: "", account: "", amount: "", status: "Draft" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="new-quote-modal-content">
        <DialogHeader data-testid="new-quote-modal-header">
          <DialogTitle data-testid="new-quote-modal-title">{t('quotes.createQuote')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="new-quote-modal-form">
          <div className="grid gap-2" data-testid="new-quote-name-field">
            <Label htmlFor="quote-name" data-testid="new-quote-name-label">{t('quotes.quoteName')}</Label>
            <Input
              id="quote-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Q-2024-004"
              data-testid="new-quote-name-input"
            />
          </div>
          <div className="grid gap-2" data-testid="new-quote-account-field">
            <Label htmlFor="account" data-testid="new-quote-account-label">{t('common.account')}</Label>
            <Input
              id="account"
              value={formData.account}
              onChange={(e) => setFormData({ ...formData, account: e.target.value })}
              placeholder={t('common.account')}
              data-testid="new-quote-account-input"
            />
          </div>
          <div className="grid gap-2" data-testid="new-quote-amount-field">
            <Label htmlFor="amount" data-testid="new-quote-amount-label">{t('common.amount')}</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="25000"
              data-testid="new-quote-amount-input"
            />
          </div>
          <div className="grid gap-2" data-testid="new-quote-status-field">
            <Label htmlFor="status" data-testid="new-quote-status-label">{t('common.status')}</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger data-testid="new-quote-status-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="new-quote-status-content">
                <SelectItem value="Draft" data-testid="new-quote-status-draft">{t('quotes.statuses.draft')}</SelectItem>
                <SelectItem value="Sent" data-testid="new-quote-status-sent">{t('quotes.statuses.sent')}</SelectItem>
                <SelectItem value="Accepted" data-testid="new-quote-status-accepted">{t('quotes.statuses.accepted')}</SelectItem>
                <SelectItem value="Rejected" data-testid="new-quote-status-rejected">{t('quotes.statuses.rejected')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="new-quote-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="new-quote-cancel-button">
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-leaflet-green hover:bg-leaflet-green-hover" data-testid="new-quote-create-button">
            {t('quotes.createQuote')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewQuoteModal;