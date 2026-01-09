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

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  status: string;
  rating: string;
  source: string;
  owner: string;
  createdAt: Date;
}

interface NewLeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLeadCreated?: () => void;
}

const NewLeadModal = ({ open, onOpenChange, onLeadCreated }: NewLeadModalProps) => {
  const { t } = useTranslation(['leads', 'common']);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    title: "",
    status: "New",
    rating: "Cold",
    source: "Website",
  });

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.company) {
      return;
    }

    const newLead: Lead = {
      id: `lead_${Date.now()}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      title: formData.title,
      status: formData.status,
      rating: formData.rating,
      source: formData.source,
      owner: "Current User",
      createdAt: new Date(),
    };

    const existingStoredLeads = JSON.parse(localStorage.getItem('crmLeads') || '[]');
    const sampleData = getSampleData();
    const sampleLeads = sampleData ? sampleData.leads : [];
    const allExistingLeads = existingStoredLeads.length > 0 ? existingStoredLeads : sampleLeads;
    const updatedLeads = [newLead, ...allExistingLeads];
    localStorage.setItem('crmLeads', JSON.stringify(updatedLeads));
    
    console.log("Creating new lead:", newLead);
    
    onOpenChange(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      title: "",
      status: "New",
      rating: "Cold",
      source: "Website",
    });
    
    if (onLeadCreated) {
      onLeadCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-testid="new-lead-modal">
      <DialogContent className="sm:max-w-[425px]" data-testid="new-lead-modal-content">
        <DialogHeader data-testid="new-lead-modal-header">
          <DialogTitle data-testid="new-lead-modal-title">{t('createNew')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="new-lead-modal-form">
          <div className="grid grid-cols-2 gap-4" data-testid="new-lead-name-row">
            <div className="grid gap-2" data-testid="new-lead-firstname-field">
              <Label htmlFor="firstName" data-testid="new-lead-firstname-label">{t('columns.firstName')}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
                data-testid="new-lead-firstname-input"
              />
            </div>
            <div className="grid gap-2" data-testid="new-lead-lastname-field">
              <Label htmlFor="lastName" data-testid="new-lead-lastname-label">{t('columns.lastName')}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
                data-testid="new-lead-lastname-input"
              />
            </div>
          </div>

          <div className="grid gap-2" data-testid="new-lead-email-field">
            <Label htmlFor="email" data-testid="new-lead-email-label">{t('columns.email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@company.com"
              data-testid="new-lead-email-input"
            />
          </div>

          <div className="grid gap-2" data-testid="new-lead-phone-field">
            <Label htmlFor="phone" data-testid="new-lead-phone-label">{t('columns.phone')}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
              data-testid="new-lead-phone-input"
            />
          </div>

          <div className="grid gap-2" data-testid="new-lead-company-field">
            <Label htmlFor="company" data-testid="new-lead-company-label">{t('columns.company')}</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Corporation"
              data-testid="new-lead-company-input"
            />
          </div>

          <div className="grid gap-2" data-testid="new-lead-title-field">
            <Label htmlFor="title" data-testid="new-lead-title-label">{t('columns.title')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Sales Manager"
              data-testid="new-lead-title-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4" data-testid="new-lead-status-rating-row">
            <div className="grid gap-2" data-testid="new-lead-status-field">
              <Label htmlFor="status" data-testid="new-lead-status-label">{t('columns.status')}</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger data-testid="new-lead-status-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent data-testid="new-lead-status-content">
                  <SelectItem value="New" data-testid="new-lead-status-new">{t('status.new')}</SelectItem>
                  <SelectItem value="Working" data-testid="new-lead-status-working">{t('status.working')}</SelectItem>
                  <SelectItem value="Qualified" data-testid="new-lead-status-qualified">{t('status.qualified')}</SelectItem>
                  <SelectItem value="Unqualified" data-testid="new-lead-status-unqualified">{t('status.unqualified')}</SelectItem>
                  <SelectItem value="Converted" data-testid="new-lead-status-converted">{t('status.converted')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2" data-testid="new-lead-rating-field">
              <Label htmlFor="rating" data-testid="new-lead-rating-label">{t('columns.rating')}</Label>
              <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                <SelectTrigger data-testid="new-lead-rating-trigger">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent data-testid="new-lead-rating-content">
                  <SelectItem value="Hot" data-testid="new-lead-rating-hot">{t('rating.hot')}</SelectItem>
                  <SelectItem value="Warm" data-testid="new-lead-rating-warm">{t('rating.warm')}</SelectItem>
                  <SelectItem value="Cold" data-testid="new-lead-rating-cold">{t('rating.cold')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2" data-testid="new-lead-source-field">
            <Label htmlFor="source" data-testid="new-lead-source-label">{t('columns.source')}</Label>
            <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger data-testid="new-lead-source-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="new-lead-source-content">
                <SelectItem value="Website" data-testid="new-lead-source-website">{t('source.website')}</SelectItem>
                <SelectItem value="Referral" data-testid="new-lead-source-referral">{t('source.referral')}</SelectItem>
                <SelectItem value="Cold Call" data-testid="new-lead-source-coldcall">{t('source.coldCall')}</SelectItem>
                <SelectItem value="Trade Show" data-testid="new-lead-source-tradeshow">{t('source.tradeShow')}</SelectItem>
                <SelectItem value="Social Media" data-testid="new-lead-source-socialmedia">{t('source.socialMedia')}</SelectItem>
                <SelectItem value="Email Campaign" data-testid="new-lead-source-emailcampaign">{t('source.emailCampaign')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="new-lead-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="new-lead-cancel-button">
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" data-testid="new-lead-create-button">
            {t('common:create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeadModal;