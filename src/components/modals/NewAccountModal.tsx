
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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

    // Get existing accounts from localStorage
    const existingStoredAccounts = JSON.parse(localStorage.getItem('crmAccounts') || '[]');
    
    // Get sample data accounts
    const sampleData = getSampleData();
    const sampleAccounts = sampleData ? sampleData.accounts : [];
    
    // Combine all accounts: new account + stored accounts + sample accounts
    // But avoid duplicates by checking if sample accounts are already in stored accounts
    const allExistingAccounts = existingStoredAccounts.length > 0 ? existingStoredAccounts : sampleAccounts;
    const updatedAccounts = [newAccount, ...allExistingAccounts];
    
    // Store back to localStorage
    localStorage.setItem('crmAccounts', JSON.stringify(updatedAccounts));
    
    console.log("Creating new account:", newAccount);
    
    // Reset form and close modal
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
    
    // Notify parent component
    if (onAccountCreated) {
      onAccountCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('accounts.createAccount')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="account-name">{t('accounts.accountName')}</Label>
            <Input
              id="account-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Acme Corporation"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="type">{t('accounts.accountType')}</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Customer">{t('accounts.customer')}</SelectItem>
                <SelectItem value="Prospect">{t('accounts.prospect')}</SelectItem>
                <SelectItem value="Partner">{t('accounts.partner')}</SelectItem>
                <SelectItem value="Competitor">{t('accounts.competitor')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="industry">{t('common.industry')}</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="Technology"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="revenue">{t('common.annualRevenue')}</Label>
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                placeholder="1000000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="employees">{t('common.employees')}</Label>
              <Input
                id="employees"
                type="number"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="street">{t('common.street')}</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="123 Main St"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">{t('common.city')}</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="New York"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">{t('common.state')}</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="NY"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="country">{t('common.country')}</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="USA"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="postalCode">{t('common.postalCode')}</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="10001"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-[#4AB831] hover:bg-[#3da127]">
            {t('accounts.createAccount')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountModal;
