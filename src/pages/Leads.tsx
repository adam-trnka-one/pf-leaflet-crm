import { useEffect, useState } from "react";
import { getSampleData, type Lead } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, UserPlus, Mail, Phone, Building, Edit, Trash2 } from "lucide-react";
import NewLeadModal from "@/components/modals/NewLeadModal";
import EditLeadModal from "@/components/modals/EditLeadModal";
import { toast } from "@/hooks/use-toast";

const Leads = () => {
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
    loadLeads();
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
      title: "Lead deleted",
      description: "The lead has been successfully deleted."
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
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Leads</h1>
          <p className="text-slate-600 mt-2">Manage your sales leads</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Lead
        </Button>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <Card key={lead.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-800">
                      {lead.firstName} {lead.lastName}
                    </CardTitle>
                    <p className="text-sm text-slate-600">{lead.title}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Badge className={getStatusColor(lead.status)} variant="secondary">
                    {lead.status}
                  </Badge>
                  <Badge className={getRatingColor(lead.rating)} variant="secondary">
                    {lead.rating}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-slate-600">
                <Building className="h-4 w-4 mr-2" />
                {lead.company}
              </div>
              
              <div className="flex items-center text-sm text-slate-600">
                <Mail className="h-4 w-4 mr-2" />
                {lead.email}
              </div>

              <div className="flex items-center text-sm text-slate-600">
                <Phone className="h-4 w-4 mr-2" />
                {lead.phone}
              </div>

              <div className="text-sm text-slate-600">
                <span className="font-medium">Source:</span> {lead.source}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  Owner: {lead.owner}
                </div>
                <div className="text-xs text-slate-500">
                  Created: {lead.createdAt.toLocaleDateString()}
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Button size="sm" className="w-full">
                  Convert Lead
                </Button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(lead)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(lead.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {leads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No leads found.</p>
        </div>
      )}

      <NewLeadModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onLeadCreated={handleLeadCreated}
      />

      <EditLeadModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        lead={selectedLead}
        onLeadUpdated={handleLeadUpdated}
      />
    </div>
  );
};

export default Leads;
