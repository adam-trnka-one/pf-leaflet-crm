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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('createNew')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">{t('columns.firstName')}</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder="John"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">{t('columns.lastName')}</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">{t('columns.email')}</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@company.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">{t('columns.phone')}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="company">{t('columns.company')}</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Acme Corporation"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">{t('columns.title')}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Sales Manager"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">{t('columns.status')}</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">{t('status.new')}</SelectItem>
                  <SelectItem value="Working">{t('status.working')}</SelectItem>
                  <SelectItem value="Qualified">{t('status.qualified')}</SelectItem>
                  <SelectItem value="Unqualified">{t('status.unqualified')}</SelectItem>
                  <SelectItem value="Converted">{t('status.converted')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rating">{t('columns.rating')}</Label>
              <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hot">{t('rating.hot')}</SelectItem>
                  <SelectItem value="Warm">{t('rating.warm')}</SelectItem>
                  <SelectItem value="Cold">{t('rating.cold')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="source">{t('columns.source')}</Label>
            <Select value={formData.source} onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website">{t('source.website')}</SelectItem>
                <SelectItem value="Referral">{t('source.referral')}</SelectItem>
                <SelectItem value="Cold Call">{t('source.coldCall')}</SelectItem>
                <SelectItem value="Trade Show">{t('source.tradeShow')}</SelectItem>
                <SelectItem value="Social Media">{t('source.socialMedia')}</SelectItem>
                <SelectItem value="Email Campaign">{t('source.emailCampaign')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            {t('common:create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewLeadModal;
