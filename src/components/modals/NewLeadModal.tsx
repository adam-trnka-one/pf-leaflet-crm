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
  const { t } = useTranslation();
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

    // Get existing leads from localStorage
    const existingStoredLeads = JSON.parse(localStorage.getItem('crmLeads') || '[]');
    
    // Get sample data leads
    const sampleData = getSampleData();
    const sampleLeads = sampleData ? sampleData.leads : [];
    
    // Combine all leads: new lead + stored leads + sample leads
    // But avoid duplicates by checking if sample leads are already in stored leads
    const allExistingLeads = existingStoredLeads.length > 0 ? existingStoredLeads : sampleLeads;
    const updatedLeads = [newLead, ...allExistingLeads];
    
    // Store back to localStorage
    localStorage.setItem('crmLeads', JSON.stringify(updatedLeads));
    
    console.log("Creating new lead:", newLead);
    
    // Reset form and close modal
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
    
    // Notify parent component
    if (onLeadCreated) {
      onLeadCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('leads.createLead')}</DialogTitle>
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
            <Label htmlFor="company">{t('common.company')}</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Corporation"
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

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">{t('common.status')}</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">{t('leads.statuses.new')}</SelectItem>
                  <SelectItem value="Working">{t('leads.statuses.working')}</SelectItem>
                  <SelectItem value="Qualified">{t('leads.statuses.qualified')}</SelectItem>
                  <SelectItem value="Unqualified">{t('leads.statuses.unqualified')}</SelectItem>
                  <SelectItem value="Converted">{t('leads.statuses.converted')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rating">{t('common.rating')}</Label>
              <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hot">{t('leads.ratings.hot')}</SelectItem>
                  <SelectItem value="Warm">{t('leads.ratings.warm')}</SelectItem>
                  <SelectItem value="Cold">{t('leads.ratings.cold')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="source">{t('leads.source')}</Label>
            <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website">{t('leads.sources.website')}</SelectItem>
                <SelectItem value="Referral">{t('leads.sources.referral')}</SelectItem>
                <SelectItem value="Cold Call">{t('leads.sources.coldCall')}</SelectItem>
                <SelectItem value="Trade Show">{t('leads.sources.tradeShow')}</SelectItem>
                <SelectItem value="Social Media">{t('leads.sources.socialMedia')}</SelectItem>
                <SelectItem value="Email Campaign">{t('leads.sources.emailCampaign')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            {t('leads.createLead')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeadModal;
