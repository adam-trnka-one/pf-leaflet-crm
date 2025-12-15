
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

interface Quote {
  id: number;
  name: string;
  account: string;
  amount: number;
  status: string;
  date: Date;
}

interface EditQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: Quote | null;
  onQuoteUpdated: (updatedQuote: Quote) => void;
}

const EditQuoteModal = ({ open, onOpenChange, quote, onQuoteUpdated }: EditQuoteModalProps) => {
  const { t } = useTranslation(['quotes', 'common']);
  const [formData, setFormData] = useState({
    name: "",
    account: "",
    amount: "",
    status: "Draft",
  });

  useEffect(() => {
    if (quote) {
      setFormData({
        name: quote.name,
        account: quote.account,
        amount: quote.amount.toString(),
        status: quote.status,
      });
    }
  }, [quote]);

  const handleSubmit = () => {
    if (!formData.name || !formData.account || !formData.amount) {
      toast({
        title: t('common:error'),
        description: t('common:fillRequired'),
        variant: "destructive"
      });
      return;
    }

    if (!quote) {
      console.error("No quote to update");
      return;
    }

    const updatedQuote = {
      ...quote,
      name: formData.name,
      account: formData.account,
      amount: Number(formData.amount),
      status: formData.status,
    };

    onQuoteUpdated(updatedQuote);

    toast({
      title: t('common:updated'),
      description: t('common:updated')
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="edit-quote-modal-content">
        <DialogHeader data-testid="edit-quote-modal-header">
          <DialogTitle data-testid="edit-quote-modal-title">{t('edit')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="edit-quote-modal-form">
          <div className="grid gap-2" data-testid="edit-quote-name-field">
            <Label htmlFor="quote-name" data-testid="edit-quote-name-label">{t('columns.name')}</Label>
            <Input
              id="quote-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Q-2024-004"
              data-testid="edit-quote-name-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-quote-account-field">
            <Label htmlFor="account" data-testid="edit-quote-account-label">{t('columns.account')}</Label>
            <Input
              id="account"
              value={formData.account}
              onChange={(e) => setFormData({ ...formData, account: e.target.value })}
              placeholder="Select or enter account name"
              data-testid="edit-quote-account-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-quote-amount-field">
            <Label htmlFor="amount" data-testid="edit-quote-amount-label">{t('columns.amount')}</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="25000"
              data-testid="edit-quote-amount-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-quote-status-field">
            <Label htmlFor="status" data-testid="edit-quote-status-label">{t('columns.status')}</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger data-testid="edit-quote-status-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-quote-status-content">
                <SelectItem value="Draft" data-testid="edit-quote-status-draft">{t('status.draft')}</SelectItem>
                <SelectItem value="Sent" data-testid="edit-quote-status-sent">{t('status.sent')}</SelectItem>
                <SelectItem value="Accepted" data-testid="edit-quote-status-accepted">{t('status.accepted')}</SelectItem>
                <SelectItem value="Rejected" data-testid="edit-quote-status-rejected">{t('status.rejected')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="edit-quote-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-quote-cancel-button">
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-[#4AB831] hover:bg-[#3da127]" data-testid="edit-quote-update-button">
            {t('common:update')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuoteModal;
