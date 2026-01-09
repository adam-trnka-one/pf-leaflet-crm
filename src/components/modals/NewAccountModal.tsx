
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
import { getSampleData } from "@/utils/sampleData";
import { useTranslation } from "react-i18next";

interface Account {
  id: string;
  name: string;
  type: string;
  industry: string;
  revenue: number;
  employees: number;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  owner: string;
  createdAt: Date;
}

interface NewAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccountCreated?: () => void;
}

const NewAccountModal = ({ open, onOpenChange, onAccountCreated }: NewAccountModalProps) => {
  const { t } = useTranslation(['accounts', 'common']);
  const [formData, setFormData] = useState({
    name: "",
    type: "Customer",
    industry: "",
    revenue: "",
    employees: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.industry) {
      return;
    }

    const newAccount: Account = {
      id: `account_${Date.now()}`,
      name: formData.name,
      type: formData.type,
      industry: formData.industry,
      revenue: parseInt(formData.revenue) || 0,
      employees: parseInt(formData.employees) || 0,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        postalCode: formData.postalCode,
      },
      owner: "Current User",
      createdAt: new Date(),
    };

    const existingStoredAccounts = JSON.parse(localStorage.getItem('crmAccounts') || '[]');
    const sampleData = getSampleData();
    const sampleAccounts = sampleData ? sampleData.accounts : [];
    const allExistingAccounts = existingStoredAccounts.length > 0 ? existingStoredAccounts : sampleAccounts;
    const updatedAccounts = [newAccount, ...allExistingAccounts];
    localStorage.setItem('crmAccounts', JSON.stringify(updatedAccounts));
    
    console.log("Creating new account:", newAccount);
    
    onOpenChange(false);
    setFormData({
      name: "",
      type: "Customer",
      industry: "",
      revenue: "",
      employees: "",
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    });
    
    if (onAccountCreated) {
      onAccountCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-testid="new-account-modal">
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto" data-testid="new-account-modal-content">
        <DialogHeader data-testid="new-account-modal-header">
          <DialogTitle data-testid="new-account-modal-title">{t('createNew')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="new-account-modal-form">
          <div className="grid gap-2" data-testid="new-account-name-field">
            <Label htmlFor="account-name" data-testid="new-account-name-label">{t('columns.name')}</Label>
            <Input
              id="account-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Acme Corporation"
              data-testid="new-account-name-input"
            />
          </div>
          
          <div className="grid gap-2" data-testid="new-account-type-field">
            <Label htmlFor="type" data-testid="new-account-type-label">{t('columns.type')}</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger data-testid="new-account-type-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="new-account-type-content">
                <SelectItem value="Customer" data-testid="new-account-type-customer">{t('types.customer')}</SelectItem>
                <SelectItem value="Prospect" data-testid="new-account-type-prospect">{t('types.prospect')}</SelectItem>
                <SelectItem value="Partner" data-testid="new-account-type-partner">{t('types.partner')}</SelectItem>
                <SelectItem value="Competitor" data-testid="new-account-type-competitor">{t('types.competitor')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2" data-testid="new-account-industry-field">
            <Label htmlFor="industry" data-testid="new-account-industry-label">{t('columns.industry')}</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="Technology"
              data-testid="new-account-industry-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4" data-testid="new-account-financials-row">
            <div className="grid gap-2" data-testid="new-account-revenue-field">
              <Label htmlFor="revenue" data-testid="new-account-revenue-label">{t('columns.revenue')}</Label>
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                placeholder="1000000"
                data-testid="new-account-revenue-input"
              />
            </div>
            <div className="grid gap-2" data-testid="new-account-employees-field">
              <Label htmlFor="employees" data-testid="new-account-employees-label">{t('columns.employees')}</Label>
              <Input
                id="employees"
                type="number"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                placeholder="50"
                data-testid="new-account-employees-input"
              />
            </div>
          </div>

          <div className="grid gap-2" data-testid="new-account-street-field">
            <Label htmlFor="street" data-testid="new-account-street-label">{t('common:address')}</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="123 Main St"
              data-testid="new-account-street-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4" data-testid="new-account-city-state-row">
            <div className="grid gap-2" data-testid="new-account-city-field">
              <Label htmlFor="city" data-testid="new-account-city-label">{t('common:city')}</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="New York"
                data-testid="new-account-city-input"
              />
            </div>
            <div className="grid gap-2" data-testid="new-account-state-field">
              <Label htmlFor="state" data-testid="new-account-state-label">{t('common:state')}</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="NY"
                data-testid="new-account-state-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" data-testid="new-account-country-postal-row">
            <div className="grid gap-2" data-testid="new-account-country-field">
              <Label htmlFor="country" data-testid="new-account-country-label">{t('common:country')}</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="USA"
                data-testid="new-account-country-input"
              />
            </div>
            <div className="grid gap-2" data-testid="new-account-postalcode-field">
              <Label htmlFor="postalCode" data-testid="new-account-postalcode-label">{t('common:postalCode')}</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="10001"
                data-testid="new-account-postalcode-input"
              />
            </div>
          </div>
        </div>
        <DialogFooter data-testid="new-account-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="new-account-cancel-button">
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-[#4AB831] hover:bg-[#3da127]" data-testid="new-account-create-button">
            {t('common:create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountModal;