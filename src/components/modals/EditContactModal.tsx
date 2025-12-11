
import { useState, useEffect } from "react";
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
import { toast } from "@/hooks/use-toast";
import { getSampleData } from "@/utils/sampleData";

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
  const { t } = useTranslation();
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
      title: t('common.contactUpdated'),
      description: t('common.contactUpdatedDesc')
    });
    
    onOpenChange(false);
    
    if (onContactUpdated) {
      onContactUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('contacts.editContact')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">{t('common.firstName')}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">{t('common.lastName')}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">{t('common.email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@company.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">{t('common.phone')}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">{t('common.jobTitle')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Sales Manager"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="accountName">{t('contacts.accountName')}</Label>
            <Input
              id="accountName"
              value={formData.accountName}
              onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
              placeholder="Acme Corporation"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            {t('contacts.updateContact')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContactModal;
