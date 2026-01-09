
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
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface Account {
  id: string;
  name: string;
  type: string;
  industry: string;
  phone: string;
  website: string;
  revenue: number;
  employees: number;
  owner: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
}

interface EditAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
  onAccountUpdated?: () => void;
}

const EditAccountModal = ({ open, onOpenChange, account, onAccountUpdated }: EditAccountModalProps) => {
  const { t } = useTranslation(['accounts', 'common']);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    industry: "",
    phone: "",
    website: "",
    revenue: 0,
    employees: 0,
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name,
        type: account.type,
        industry: account.industry,
        phone: account.phone,
        website: account.website,
        revenue: account.revenue,
        employees: account.employees,
        street: account.address.street,
        city: account.address.city,
        state: account.address.state,
        zipCode: account.address.zipCode,
        country: account.address.country,
      });
    }
  }, [account]);

  const handleSubmit = () => {
    if (!formData.name || !account) {
      return;
    }

    const updatedAccount: Account = {
      ...account,
      name: formData.name,
      type: formData.type,
      industry: formData.industry,
      phone: formData.phone,
      website: formData.website,
      revenue: formData.revenue,
      employees: formData.employees,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
    };

    const existingAccounts = JSON.parse(localStorage.getItem('crmAccounts') || '[]');
    const updatedAccounts = existingAccounts.map((a: Account) => 
      a.id === account.id ? updatedAccount : a
    );
    localStorage.setItem('crmAccounts', JSON.stringify(updatedAccounts));
    
    toast({
      title: t('common:updated'),
      description: t('common:updated')
    });
    
    onOpenChange(false);
    
    if (onAccountUpdated) {
      onAccountUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-testid="edit-account-modal">
      <DialogContent className="sm:max-w-[600px]" data-testid="edit-account-modal-content">
        <DialogHeader data-testid="edit-account-modal-header">
          <DialogTitle data-testid="edit-account-modal-title">{t('edit')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto" data-testid="edit-account-modal-form">
          <div className="grid grid-cols-2 gap-4" data-testid="edit-account-name-type-row">
            <div className="grid gap-2" data-testid="edit-account-name-field">
              <Label htmlFor="name" data-testid="edit-account-name-label">{t('columns.name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Acme Corporation"
                data-testid="edit-account-name-input"
              />
            </div>
            <div className="grid gap-2" data-testid="edit-account-type-field">
              <Label htmlFor="type" data-testid="edit-account-type-label">{t('columns.type')}</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="Customer"
                data-testid="edit-account-type-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" data-testid="edit-account-industry-phone-row">
            <div className="grid gap-2" data-testid="edit-account-industry-field">
              <Label htmlFor="industry" data-testid="edit-account-industry-label">{t('columns.industry')}</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="Technology"
                data-testid="edit-account-industry-input"
              />
            </div>
            <div className="grid gap-2" data-testid="edit-account-phone-field">
              <Label htmlFor="phone" data-testid="edit-account-phone-label">{t('common:phone')}</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                data-testid="edit-account-phone-input"
              />
            </div>
          </div>

          <div className="grid gap-2" data-testid="edit-account-website-field">
            <Label htmlFor="website" data-testid="edit-account-website-label">{t('common:website')}</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://www.example.com"
              data-testid="edit-account-website-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4" data-testid="edit-account-financials-row">
            <div className="grid gap-2" data-testid="edit-account-revenue-field">
              <Label htmlFor="revenue" data-testid="edit-account-revenue-label">{t('columns.revenue')}</Label>
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })}
                placeholder="1000000"
                data-testid="edit-account-revenue-input"
              />
            </div>
            <div className="grid gap-2" data-testid="edit-account-employees-field">
              <Label htmlFor="employees" data-testid="edit-account-employees-label">{t('columns.employees')}</Label>
              <Input
                id="employees"
                type="number"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: Number(e.target.value) })}
                placeholder="50"
                data-testid="edit-account-employees-input"
              />
            </div>
          </div>

          <div className="space-y-4" data-testid="edit-account-address-section">
            <h4 className="font-medium" data-testid="edit-account-address-title">{t('common:address')}</h4>
            <div className="grid gap-2" data-testid="edit-account-street-field">
              <Label htmlFor="street" data-testid="edit-account-street-label">{t('common:street')}</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="123 Main Street"
                data-testid="edit-account-street-input"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4" data-testid="edit-account-city-state-row">
              <div className="grid gap-2" data-testid="edit-account-city-field">
                <Label htmlFor="city" data-testid="edit-account-city-label">{t('common:city')}</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="New York"
                  data-testid="edit-account-city-input"
                />
              </div>
              <div className="grid gap-2" data-testid="edit-account-state-field">
                <Label htmlFor="state" data-testid="edit-account-state-label">{t('common:state')}</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="NY"
                  data-testid="edit-account-state-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4" data-testid="edit-account-zip-country-row">
              <div className="grid gap-2" data-testid="edit-account-zipcode-field">
                <Label htmlFor="zipCode" data-testid="edit-account-zipcode-label">{t('common:postalCode')}</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="10001"
                  data-testid="edit-account-zipcode-input"
                />
              </div>
              <div className="grid gap-2" data-testid="edit-account-country-field">
                <Label htmlFor="country" data-testid="edit-account-country-label">{t('common:country')}</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="United States"
                  data-testid="edit-account-country-input"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter data-testid="edit-account-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-account-cancel-button">
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" data-testid="edit-account-update-button">
            {t('common:update')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountModal;