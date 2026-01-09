
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
import { getSampleData } from "@/utils/sampleData";
import { useTranslation } from "react-i18next";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  accountName: string;
  owner: string;
  createdAt: Date;
}

interface NewContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactCreated?: () => void;
}

const NewContactModal = ({ open, onOpenChange, onContactCreated }: NewContactModalProps) => {
  const { t } = useTranslation(['contacts', 'common']);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
    accountName: "",
  });

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      return;
    }

    const newContact: Contact = {
      id: `contact_${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      title: formData.title,
      accountName: formData.accountName,
      owner: "Current User",
      createdAt: new Date(),
    };

    const existingStoredContacts = JSON.parse(localStorage.getItem('crmContacts') || '[]');
    const sampleData = getSampleData();
    const sampleContacts = sampleData ? sampleData.contacts : [];
    const allExistingContacts = existingStoredContacts.length > 0 ? existingStoredContacts : sampleContacts;
    const updatedContacts = [newContact, ...allExistingContacts];
    localStorage.setItem('crmContacts', JSON.stringify(updatedContacts));
    
    console.log("Creating new contact:", newContact);
    
    onOpenChange(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      title: "",
      accountName: "",
    });
    
    if (onContactCreated) {
      onContactCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-testid="new-contact-modal">
      <DialogContent className="sm:max-w-[425px]" data-testid="new-contact-modal-content">
        <DialogHeader data-testid="new-contact-modal-header">
          <DialogTitle data-testid="new-contact-modal-title">{t('createNew')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="new-contact-modal-form">
          <div className="grid grid-cols-2 gap-4" data-testid="new-contact-name-row">
            <div className="grid gap-2" data-testid="new-contact-firstname-field">
              <Label htmlFor="firstName" data-testid="new-contact-firstname-label">{t('columns.firstName')}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
                data-testid="new-contact-firstname-input"
              />
            </div>
            <div className="grid gap-2" data-testid="new-contact-lastname-field">
              <Label htmlFor="lastName" data-testid="new-contact-lastname-label">{t('columns.lastName')}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
                data-testid="new-contact-lastname-input"
              />
            </div>
          </div>

          <div className="grid gap-2" data-testid="new-contact-email-field">
            <Label htmlFor="email" data-testid="new-contact-email-label">{t('columns.email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@company.com"
              data-testid="new-contact-email-input"
            />
          </div>

          <div className="grid gap-2" data-testid="new-contact-phone-field">
            <Label htmlFor="phone" data-testid="new-contact-phone-label">{t('columns.phone')}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              data-testid="new-contact-phone-input"
            />
          </div>

          <div className="grid gap-2" data-testid="new-contact-title-field">
            <Label htmlFor="title" data-testid="new-contact-title-label">{t('columns.title')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Sales Manager"
              data-testid="new-contact-title-input"
            />
          </div>

          <div className="grid gap-2" data-testid="new-contact-account-field">
            <Label htmlFor="accountName" data-testid="new-contact-account-label">{t('columns.account')}</Label>
            <Input
              id="accountName"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              placeholder="Acme Corporation"
              data-testid="new-contact-account-input"
            />
          </div>
        </div>
        <DialogFooter data-testid="new-contact-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="new-contact-cancel-button">
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" data-testid="new-contact-create-button">
            {t('common:create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewContactModal;