
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  title: string;
  status: string;
  source: string;
  rating: string;
  owner: string;
  createdAt: Date;
}

interface EditLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead | null;
  onLeadUpdated?: () => void;
}

const EditLeadModal = ({ open, onOpenChange, lead, onLeadUpdated }: EditLeadModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    title: "",
    status: "New",
    source: "Website",
    rating: "Cold",
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        firstName: lead.firstName,
        lastName: lead.lastName,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        title: lead.title,
        status: lead.status,
        source: lead.source,
        rating: lead.rating,
      });
    }
  }, [lead]);

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !lead) {
      return;
    }

    const updatedLead: Lead = {
      ...lead,
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      title: formData.title,
      status: formData.status,
      source: formData.source,
      rating: formData.rating,
    };

    const existingLeads = JSON.parse(localStorage.getItem('crmLeads') || '[]');
    const updatedLeads = existingLeads.map((l: Lead) => 
      l.id === lead.id ? updatedLead : l
    );
    
    localStorage.setItem('crmLeads', JSON.stringify(updatedLeads));
    
    toast({
      title: t('common.leadUpdated'),
      description: t('common.leadUpdatedDesc')
    });
    
    onOpenChange(false);
    
    if (onLeadUpdated) {
      onLeadUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="edit-lead-modal-content">
        <DialogHeader data-testid="edit-lead-modal-header">
          <DialogTitle data-testid="edit-lead-modal-title">{t('leads.editLead')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="edit-lead-modal-form">
          <div className="grid grid-cols-2 gap-4" data-testid="edit-lead-name-row">
            <div className="grid gap-2" data-testid="edit-lead-first-name-field">
              <Label htmlFor="firstName" data-testid="edit-lead-first-name-label">{t('common.firstName')}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
                data-testid="edit-lead-first-name-input"
              />
            </div>
            <div className="grid gap-2" data-testid="edit-lead-last-name-field">
              <Label htmlFor="lastName" data-testid="edit-lead-last-name-label">{t('common.lastName')}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
                data-testid="edit-lead-last-name-input"
              />
            </div>
          </div>

          <div className="grid gap-2" data-testid="edit-lead-company-field">
            <Label htmlFor="company" data-testid="edit-lead-company-label">{t('common.company')}</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Corporation"
              data-testid="edit-lead-company-input"
            />
          </div>

          <div className="grid gap-2" data-testid="edit-lead-email-field">
            <Label htmlFor="email" data-testid="edit-lead-email-label">{t('common.email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@company.com"
              data-testid="edit-lead-email-input"
            />
          </div>

          <div className="grid gap-2" data-testid="edit-lead-phone-field">
            <Label htmlFor="phone" data-testid="edit-lead-phone-label">{t('common.phone')}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              data-testid="edit-lead-phone-input"
            />
          </div>

          <div className="grid gap-2" data-testid="edit-lead-title-field">
            <Label htmlFor="title" data-testid="edit-lead-title-label">{t('common.jobTitle')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="CEO"
              data-testid="edit-lead-title-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4" data-testid="edit-lead-status-rating-row">
            <div className="grid gap-2" data-testid="edit-lead-status-field">
              <Label htmlFor="status" data-testid="edit-lead-status-label">{t('common.status')}</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger data-testid="edit-lead-status-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent data-testid="edit-lead-status-content">
                  <SelectItem value="New" data-testid="edit-lead-status-new">{t('leads.statuses.new')}</SelectItem>
                  <SelectItem value="Working" data-testid="edit-lead-status-working">{t('leads.statuses.working')}</SelectItem>
                  <SelectItem value="Qualified" data-testid="edit-lead-status-qualified">{t('leads.statuses.qualified')}</SelectItem>
                  <SelectItem value="Unqualified" data-testid="edit-lead-status-unqualified">{t('leads.statuses.unqualified')}</SelectItem>
                  <SelectItem value="Converted" data-testid="edit-lead-status-converted">{t('leads.statuses.converted')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2" data-testid="edit-lead-rating-field">
              <Label htmlFor="rating" data-testid="edit-lead-rating-label">{t('common.rating')}</Label>
              <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                <SelectTrigger data-testid="edit-lead-rating-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent data-testid="edit-lead-rating-content">
                  <SelectItem value="Hot" data-testid="edit-lead-rating-hot">{t('leads.ratings.hot')}</SelectItem>
                  <SelectItem value="Warm" data-testid="edit-lead-rating-warm">{t('leads.ratings.warm')}</SelectItem>
                  <SelectItem value="Cold" data-testid="edit-lead-rating-cold">{t('leads.ratings.cold')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2" data-testid="edit-lead-source-field">
            <Label htmlFor="source" data-testid="edit-lead-source-label">{t('leads.source')}</Label>
            <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger data-testid="edit-lead-source-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-lead-source-content">
                <SelectItem value="Website" data-testid="edit-lead-source-website">{t('leads.sources.website')}</SelectItem>
                <SelectItem value="Referral" data-testid="edit-lead-source-referral">{t('leads.sources.referral')}</SelectItem>
                <SelectItem value="Cold Call" data-testid="edit-lead-source-cold-call">{t('leads.sources.coldCall')}</SelectItem>
                <SelectItem value="Trade Show" data-testid="edit-lead-source-trade-show">{t('leads.sources.tradeShow')}</SelectItem>
                <SelectItem value="Social Media" data-testid="edit-lead-source-social-media">{t('leads.sources.socialMedia')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="edit-lead-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-lead-cancel-button">
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" data-testid="edit-lead-update-button">
            {t('leads.updateLead')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditLeadModal;
