
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSampleData, resetDatabase, type Case } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, HelpCircle, Clock, AlertTriangle, Edit, Trash2 } from "lucide-react";
import NewCaseModal from "@/components/modals/NewCaseModal";
import EditCaseModal from "@/components/modals/EditCaseModal";
import { toast } from "@/hooks/use-toast";

const Cases = () => {
  const { t } = useTranslation();
  const [cases, setCases] = useState<Case[]>([]);
  const [filteredCases, setFilteredCases] = useState<Case[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const loadCases = () => {
    console.log("Loading cases...");
    // Try to load from localStorage first
    const storedCases = localStorage.getItem('crmCases');
    if (storedCases) {
      console.log("Found stored cases:", storedCases);
      const parsedCases = JSON.parse(storedCases).map((case_: any) => ({
        ...case_,
        createdAt: new Date(case_.createdAt)
      }));
      console.log("Parsed cases:", parsedCases);
      setCases(parsedCases);
      setFilteredCases(parsedCases);
    } else {
      // Fall back to sample data
      const data = getSampleData();
      if (data) {
        console.log("Using sample data:", data.cases);
        setCases(data.cases);
        setFilteredCases(data.cases);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // Reset database to apply new case limit
    const data = resetDatabase();
    setCases(data.cases);
    setFilteredCases(data.cases);
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = cases;
    
    if (statusFilter !== "all") {
      filtered = filtered.filter(case_ => case_.status === statusFilter);
    }
    
    if (priorityFilter !== "all") {
      filtered = filtered.filter(case_ => case_.priority === priorityFilter);
    }
    
    console.log("Filtered cases:", filtered);
    setFilteredCases(filtered);
  }, [statusFilter, priorityFilter, cases]);

  const handleCaseCreated = () => {
    console.log("Case created, reloading...");
    loadCases();
  };

  const handleEdit = (case_: Case) => {
    console.log("Editing case:", case_);
    setSelectedCase(case_);
    setIsEditModalOpen(true);
  };

  const handleCaseUpdated = () => {
    console.log("Case updated, reloading...");
    loadCases();
    setIsEditModalOpen(false);
    setSelectedCase(null);
  };

  const handleDelete = (caseId: string) => {
    console.log("Deleting case:", caseId);
    const storedCases = JSON.parse(localStorage.getItem('crmCases') || '[]');
    const updatedCases = storedCases.filter((c: Case) => c.id !== caseId);
    localStorage.setItem('crmCases', JSON.stringify(updatedCases));
    loadCases();
    toast({
      title: t('cases.caseDeleted'),
      description: t('cases.caseDeletedDesc')
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-700';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700';
      case 'Pending': return 'bg-orange-100 text-orange-700';
      case 'Resolved': return 'bg-emerald-100 text-emerald-700';
      case 'Closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700';
      case 'High': return 'bg-orange-100 text-orange-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'Critical':
      case 'High':
        return <AlertTriangle className="h-4 w-4" data-cases="priority-icon-high" />;
      default:
        return <Clock className="h-4 w-4" data-cases="priority-icon-normal" />;
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center" data-testid="cases-loading-container">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500" data-testid="cases-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen" data-testid="cases-main-container">
      {/* Header */}
      <div className="flex justify-between items-start mb-8" data-testid="cases-header-section">
        <div data-testid="cases-header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-testid="cases-page-title">{t('cases.title')}</h1>
          <p className="text-slate-600 mt-2" data-testid="cases-page-subtitle">{t('cases.subtitle')}</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700" 
          onClick={() => setIsModalOpen(true)}
          data-testid="cases-new-case-button"
        >
          <Plus className="h-4 w-4 mr-2" data-testid="cases-new-case-icon" />
          <span data-testid="cases-new-case-text">{t('cases.newCase')}</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6" data-testid="cases-filters-section">
        <Select value={statusFilter} onValueChange={setStatusFilter} data-testid="cases-status-filter">
          <SelectTrigger className="w-48 bg-white" data-testid="cases-status-filter-trigger">
            <SelectValue placeholder={t('common.filterByStatus')} data-testid="cases-status-filter-value" />
          </SelectTrigger>
          <SelectContent data-testid="cases-status-filter-content">
            <SelectItem value="all" data-testid="cases-status-option-all">{t('common.allStatuses')}</SelectItem>
            <SelectItem value="New" data-testid="cases-status-option-new">{t('cases.statuses.new')}</SelectItem>
            <SelectItem value="In Progress" data-testid="cases-status-option-progress">{t('cases.statuses.inProgress')}</SelectItem>
            <SelectItem value="Pending" data-testid="cases-status-option-pending">{t('cases.statuses.pending')}</SelectItem>
            <SelectItem value="Resolved" data-testid="cases-status-option-resolved">{t('cases.statuses.resolved')}</SelectItem>
            <SelectItem value="Closed" data-testid="cases-status-option-closed">{t('cases.statuses.closed')}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter} data-testid="cases-priority-filter">
          <SelectTrigger className="w-48 bg-white" data-testid="cases-priority-filter-trigger">
            <SelectValue placeholder={t('common.filterByPriority')} data-testid="cases-priority-filter-value" />
          </SelectTrigger>
          <SelectContent data-testid="cases-priority-filter-content">
            <SelectItem value="all" data-testid="cases-priority-option-all">{t('common.allPriorities')}</SelectItem>
            <SelectItem value="Critical" data-testid="cases-priority-option-critical">{t('cases.priorities.critical')}</SelectItem>
            <SelectItem value="High" data-testid="cases-priority-option-high">{t('cases.priorities.high')}</SelectItem>
            <SelectItem value="Medium" data-testid="cases-priority-option-medium">{t('cases.priorities.medium')}</SelectItem>
            <SelectItem value="Low" data-testid="cases-priority-option-low">{t('cases.priorities.low')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases List */}
      <div className="space-y-4" data-testid="cases-list">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="bg-white shadow-sm hover:shadow-md transition-shadow" data-testid={`case-card-${case_.id}`}>
            <CardContent className="p-6" data-testid={`case-card-content-${case_.id}`}>
              <div className="flex items-start justify-between" data-testid={`case-card-row-${case_.id}`}>
                <div className="flex-1" data-testid={`case-info-section-${case_.id}`}>
                  <div className="flex items-center space-x-3 mb-2" data-testid={`case-header-${case_.id}`}>
                    <HelpCircle className="h-5 w-5 text-slate-500" data-testid={`case-icon-${case_.id}`} />
                    <h3 className="font-semibold text-slate-800" data-testid={`case-subject-${case_.id}`}>{case_.subject}</h3>
                    <Badge className={getStatusColor(case_.status)} variant="secondary" data-testid={`case-status-badge-${case_.id}`}>
                      <span data-testid={`case-status-text-${case_.id}`}>{case_.status}</span>
                    </Badge>
                    <Badge className={getPriorityColor(case_.priority)} variant="secondary" data-testid={`case-priority-badge-${case_.id}`}>
                      <div className="flex items-center space-x-1" data-testid={`case-priority-content-${case_.id}`}>
                        {getPriorityIcon(case_.priority)}
                        <span data-testid={`case-priority-text-${case_.id}`}>{case_.priority}</span>
                      </div>
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-4" data-testid={`case-description-${case_.id}`}>{case_.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" data-testid={`case-details-grid-${case_.id}`}>
                    <div data-testid={`case-account-info-${case_.id}`}>
                      <label className="text-slate-500" data-testid={`case-account-label-${case_.id}`}>{t('common.account')}</label>
                      <p className="font-medium text-slate-800" data-testid={`case-account-name-${case_.id}`}>{case_.accountName}</p>
                    </div>
                    <div data-testid={`case-contact-info-${case_.id}`}>
                      <label className="text-slate-500" data-testid={`case-contact-label-${case_.id}`}>{t('common.contact')}</label>
                      <p className="font-medium text-slate-800" data-testid={`case-contact-name-${case_.id}`}>{case_.contactName}</p>
                    </div>
                    <div data-testid={`case-type-info-${case_.id}`}>
                      <label className="text-slate-500" data-testid={`case-type-label-${case_.id}`}>{t('common.type')}</label>
                      <p className="font-medium text-slate-800" data-testid={`case-type-value-${case_.id}`}>{case_.type}</p>
                    </div>
                    <div data-testid={`case-owner-info-${case_.id}`}>
                      <label className="text-slate-500" data-testid={`case-owner-label-${case_.id}`}>{t('common.owner')}</label>
                      <p className="font-medium text-slate-800" data-testid={`case-owner-name-${case_.id}`}>{case_.owner}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2" data-testid={`case-actions-section-${case_.id}`}>
                  <div className="text-xs text-slate-500 text-right" data-testid={`case-metadata-${case_.id}`}>
                    <p data-testid={`case-id-${case_.id}`}>Case #{case_.id}</p>
                    <p data-testid={`case-created-date-${case_.id}`}>{t('common.created')}: {case_.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2" data-testid={`case-buttons-${case_.id}`}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(case_)}
                      data-testid={`case-edit-button-${case_.id}`}
                    >
                      <Edit className="h-4 w-4 mr-1" data-testid={`case-edit-icon-${case_.id}`} />
                      <span data-testid={`case-edit-text-${case_.id}`}>{t('common.edit')}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(case_.id)}
                      className="text-red-600 hover:text-red-700"
                      data-testid={`case-delete-button-${case_.id}`}
                    >
                      <Trash2 className="h-4 w-4" data-testid={`case-delete-icon-${case_.id}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12" data-testid="cases-empty-state">
          <p className="text-slate-500" data-testid="cases-empty-message">{t('cases.noCasesFound')}</p>
        </div>
      )}

      <NewCaseModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCaseCreated={handleCaseCreated}
        data-testid="cases-new-case-modal"
      />

      <EditCaseModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        case_={selectedCase}
        onCaseUpdated={handleCaseUpdated}
        data-testid="cases-edit-case-modal"
      />
    </div>
  );
};

export default Cases;
