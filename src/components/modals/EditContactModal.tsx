
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

interface EditContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contact: Contact | null;
  onContactUpdated?: () => void;
}

const EditContactModal = ({ open, onOpenChange, contact, onContactUpdated }: EditContactModalProps) => {
  const { t } = useTranslation(['contacts', 'common']);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
    accountName: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        title: contact.title,
        accountName: contact.accountName,
      });
    }
  }, [contact]);

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !contact) {
      return;
    }

    const updatedContact: Contact = {
      ...contact,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      title: formData.title,
      accountName: formData.accountName,
    };

    const existingStoredContacts = JSON.parse(localStorage.getItem('crmContacts') || '[]');
    const sampleData = getSampleData();
    const sampleContacts = sampleData ? sampleData.contacts : [];
    const allContacts = existingStoredContacts.length > 0 ? existingStoredContacts : sampleContacts;
    
    const updatedContacts = allContacts.map((c: Contact) => 
      c.id === contact.id ? updatedContact : c
    );
    localStorage.setItem('crmContacts', JSON.stringify(updatedContacts));
    
    toast({
      title: t('common:updated'),
      description: t('common:updated')
    });
    
    onOpenChange(false);
    
    if (onContactUpdated) {
      onContactUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-testid="edit-contact-modal">
      <DialogContent className="sm:max-w-[425px]" data-testid="edit-contact-modal-content">
        <DialogHeader data-testid="edit-contact-modal-header">
          <DialogTitle data-testid="edit-contact-modal-title">{t('edit')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="edit-contact-modal-form">
          <div className="grid grid-cols-2 gap-4" data-testid="edit-contact-name-row">
            <div className="grid gap-2" data-testid="edit-contact-firstname-field">
              <Label htmlFor="firstName" data-testid="edit-contact-firstname-label">{t('columns.firstName')}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
                data-testid="edit-contact-firstname-input"
              />
            </div>
            <div className="grid gap-2" data-testid="edit-contact-lastname-field">
              <Label htmlFor="lastName" data-testid="edit-contact-lastname-label">{t('columns.lastName')}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
                data-testid="edit-contact-lastname-input"
              />
            </div>
          </div>

          <div className="grid gap-2" data-testid="edit-contact-email-field">
            <Label htmlFor="email" data-testid="edit-contact-email-label">{t('columns.email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@company.com"
              data-testid="edit-contact-email-input"
            />
          </div>

          <div className="grid gap-2" data-testid="edit-contact-phone-field">
            <Label htmlFor="phone" data-testid="edit-contact-phone-label">{t('columns.phone')}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              data-testid="edit-contact-phone-input"
            />
          </div>

          <div className="grid gap-2" data-testid="edit-contact-title-field">
            <Label htmlFor="title" data-testid="edit-contact-title-label">{t('columns.title')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Sales Manager"
              data-testid="edit-contact-title-input"
            />
          </div>

          <div className="grid gap-2" data-testid="edit-contact-account-field">
            <Label htmlFor="accountName" data-testid="edit-contact-account-label">{t('columns.account')}</Label>
            <Input
              id="accountName"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              placeholder="Acme Corporation"
              data-testid="edit-contact-account-input"
            />
          </div>
        </div>
        <DialogFooter data-testid="edit-contact-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-contact-cancel-button">
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" data-testid="edit-contact-update-button">
            {t('common:update')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactModal;