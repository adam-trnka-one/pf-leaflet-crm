import { useEffect, useState } from "react";
import { getSampleData, resetDatabase, type Lead } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, UserPlus, Mail, Phone, Building, Edit, Trash2 } from "lucide-react";
import NewLeadModal from "@/components/modals/NewLeadModal";
import EditLeadModal from "@/components/modals/EditLeadModal";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Leads = () => {
  const { t } = useTranslation(['leads', 'common']);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const loadLeads = () => {
    // Try to load from localStorage first
    const storedLeads = localStorage.getItem('crmLeads');
    if (storedLeads) {
      const parsedLeads = JSON.parse(storedLeads).map((lead: any) => ({
        ...lead,
        createdAt: new Date(lead.createdAt)
      }));
      setLeads(parsedLeads);
    } else {
      // Fall back to sample data
      const data = getSampleData();
      if (data) {
        setLeads(data.leads);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // Reset database to apply new lead limit
    const data = resetDatabase();
    setLeads(data.leads);
    setLoading(false);
  }, []);

  const handleLeadCreated = () => {
    loadLeads(); // Refresh the list when a new lead is created
  };

  const handleEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setIsEditModalOpen(true);
  };

  const handleDelete = (leadId: string) => {
    const storedLeads = JSON.parse(localStorage.getItem('crmLeads') || '[]');
    const updatedLeads = storedLeads.filter((l: Lead) => l.id !== leadId);
    localStorage.setItem('crmLeads', JSON.stringify(updatedLeads));
    loadLeads();
    toast({
      title: t('common:deleted'),
      description: t('leads:messages.deleted')
    });
  };

  const handleLeadUpdated = () => {
    loadLeads();
    setIsEditModalOpen(false);
    setSelectedLead(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'Working': return 'bg-yellow-100 text-yellow-700';
      case 'Qualified': return 'bg-emerald-100 text-emerald-700';
      case 'Unqualified': return 'bg-red-100 text-red-700';
      case 'Converted': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Hot': return 'bg-red-100 text-red-700';
      case 'Warm': return 'bg-orange-100 text-orange-700';
      case 'Cold': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center" data-testid="leads-loading-container">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500" data-testid="leads-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen" data-testid="leads-main-container">
      {/* Header */}
      <div className="flex justify-between items-start mb-8" data-testid="leads-header-section">
        <div data-testid="leads-header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-testid="leads-page-title">{t('leads:title')}</h1>
          <p className="text-slate-600 mt-2" data-testid="leads-page-subtitle">{t('leads:subtitle')}</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsModalOpen(true)}
          data-testid="leads-new-lead-button"
        >
          <Plus className="h-4 w-4 mr-2" data-testid="leads-new-lead-icon" />
          <span data-testid="leads-new-lead-text">{t('leads:newLead')}</span>
        </Button>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="leads-grid">
        {leads.map((lead) => (
          <Card key={lead.id} className="bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="leads-lead-card">
            <CardHeader className="pb-2" data-testid="leads-card-header">
              <div className="flex items-center justify-between" data-testid="leads-header-row">
                <div className="flex items-center space-x-3" data-testid="leads-lead-info-section">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center" data-testid="leads-lead-avatar">
                    <UserPlus className="h-5 w-5 text-blue-600" data-testid="leads-lead-avatar-icon" />
                  </div>
                  <div data-testid="leads-lead-name-section">
                    <CardTitle className="text-lg font-semibold text-slate-800" data-testid="leads-lead-name">
                      {lead.firstName} {lead.lastName}
                    </CardTitle>
                    <p className="text-sm text-slate-600" data-testid="leads-lead-title">{lead.title}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1" data-testid="leads-badges-section">
                  <Badge className={getStatusColor(lead.status)} variant="secondary" data-testid="leads-status-badge">
                    {lead.status}
                  </Badge>
                  <Badge className={getRatingColor(lead.rating)} variant="secondary" data-testid="leads-rating-badge">
                    {lead.rating}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3" data-testid="leads-card-content">
              <div className="flex items-center text-sm text-slate-600" data-testid="leads-company-row">
                <Building className="h-4 w-4 mr-2" data-testid="leads-company-icon" />
                <span data-testid="leads-company-value">{lead.company}</span>
              </div>
              
              <div className="flex items-center text-sm text-slate-600" data-testid="leads-email-row">
                <Mail className="h-4 w-4 mr-2" data-testid="leads-email-icon" />
                <span data-testid="leads-email-value">{lead.email}</span>
              </div>

              <div className="flex items-center text-sm text-slate-600" data-testid="leads-phone-row">
                <Phone className="h-4 w-4 mr-2" data-testid="leads-phone-icon" />
                <span data-testid="leads-phone-value">{lead.phone}</span>
              </div>

              <div className="text-sm text-slate-600" data-testid="leads-source-row">
                <span className="font-medium" data-testid="leads-source-label">{t('leads:fields.source')}:</span> 
                <span data-testid="leads-source-value">{lead.source}</span>
              </div>

              <div className="pt-2 border-t border-slate-100" data-testid="leads-metadata-section">
                <div className="text-xs text-slate-500" data-testid="leads-owner-row">
                  <span data-testid="leads-owner-label">{t('common:owner')}: </span>
                  <span data-testid="leads-owner-value">{lead.owner}</span>
                </div>
                <div className="text-xs text-slate-500" data-testid="leads-created-row">
                  <span data-testid="leads-created-label">{t('common:created')}: </span>
                  <span data-testid="leads-created-value">{lead.createdAt.toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2" data-testid="leads-actions-section">
                <Button size="sm" className="w-full" data-testid="leads-convert-button">
                  <span data-testid="leads-convert-text">{t('leads:convertLead')}</span>
                </Button>
                <div className="flex space-x-2" data-testid="leads-edit-delete-row">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(lead)}
                    className="flex-1"
                    data-testid="leads-edit-button"
                  >
                    <Edit className="h-4 w-4 mr-1" data-testid="leads-edit-icon" />
                    <span data-testid="leads-edit-text">{t('common:edit')}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(lead.id)}
                    className="text-red-600 hover:text-red-700"
                    data-testid="leads-delete-button"
                  >
                    <Trash2 className="h-4 w-4" data-testid="leads-delete-icon" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {leads.length === 0 && (
        <div className="text-center py-12" data-testid="leads-empty-state">
          <p className="text-slate-500" data-testid="leads-empty-message">{t('leads:noResults')}</p>
        </div>
      )}

      <NewLeadModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onLeadCreated={handleLeadCreated}
        data-testid="leads-new-lead-modal"
      />

      <EditLeadModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        lead={selectedLead}
        onLeadUpdated={handleLeadUpdated}
        data-testid="leads-edit-lead-modal"
      />
    </div>
  );
};

export default Leads;
