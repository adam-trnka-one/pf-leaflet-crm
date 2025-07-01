import { useEffect, useState } from "react";
import { getSampleData, type Case } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, HelpCircle, Clock, AlertTriangle, Edit, Trash2 } from "lucide-react";
import NewCaseModal from "@/components/modals/NewCaseModal";
import EditCaseModal from "@/components/modals/EditCaseModal";
import { toast } from "@/hooks/use-toast";

const Cases = () => {
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
    loadCases();
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
      title: "Case deleted",
      description: "The case has been successfully deleted."
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
      <div className="p-8 flex items-center justify-center" data-cases="loading-container">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500" data-cases="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen" data-cases="main-container">
      {/* Header */}
      <div className="flex justify-between items-start mb-8" data-cases="header-section">
        <div data-cases="header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-cases="page-title">Cases</h1>
          <p className="text-slate-600 mt-2" data-cases="page-subtitle">Manage customer support cases</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700" 
          onClick={() => setIsModalOpen(true)}
          data-cases="new-case-button"
        >
          <Plus className="h-4 w-4 mr-2" data-cases="new-case-icon" />
          <span data-cases="new-case-text">New Case</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6" data-cases="filters-section">
        <Select value={statusFilter} onValueChange={setStatusFilter} data-cases="status-filter">
          <SelectTrigger className="w-48 bg-white" data-cases="status-filter-trigger">
            <SelectValue placeholder="Filter by status" data-cases="status-filter-value" />
          </SelectTrigger>
          <SelectContent data-cases="status-filter-content">
            <SelectItem value="all" data-cases="status-option-all">All Statuses</SelectItem>
            <SelectItem value="New" data-cases="status-option-new">New</SelectItem>
            <SelectItem value="In Progress" data-cases="status-option-progress">In Progress</SelectItem>
            <SelectItem value="Pending" data-cases="status-option-pending">Pending</SelectItem>
            <SelectItem value="Resolved" data-cases="status-option-resolved">Resolved</SelectItem>
            <SelectItem value="Closed" data-cases="status-option-closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter} data-cases="priority-filter">
          <SelectTrigger className="w-48 bg-white" data-cases="priority-filter-trigger">
            <SelectValue placeholder="Filter by priority" data-cases="priority-filter-value" />
          </SelectTrigger>
          <SelectContent data-cases="priority-filter-content">
            <SelectItem value="all" data-cases="priority-option-all">All Priorities</SelectItem>
            <SelectItem value="Critical" data-cases="priority-option-critical">Critical</SelectItem>
            <SelectItem value="High" data-cases="priority-option-high">High</SelectItem>
            <SelectItem value="Medium" data-cases="priority-option-medium">Medium</SelectItem>
            <SelectItem value="Low" data-cases="priority-option-low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases List */}
      <div className="space-y-4" data-cases="cases-list">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="bg-white shadow-sm hover:shadow-md transition-shadow" data-cases="case-card">
            <CardContent className="p-6" data-cases="card-content">
              <div className="flex items-start justify-between" data-cases="card-row">
                <div className="flex-1" data-cases="case-info-section">
                  <div className="flex items-center space-x-3 mb-2" data-cases="case-header">
                    <HelpCircle className="h-5 w-5 text-slate-500" data-cases="case-icon" />
                    <h3 className="font-semibold text-slate-800" data-cases="case-subject">{case_.subject}</h3>
                    <Badge className={getStatusColor(case_.status)} variant="secondary" data-cases="status-badge">
                      <span data-cases="status-text">{case_.status}</span>
                    </Badge>
                    <Badge className={getPriorityColor(case_.priority)} variant="secondary" data-cases="priority-badge">
                      <div className="flex items-center space-x-1" data-cases="priority-content">
                        {getPriorityIcon(case_.priority)}
                        <span data-cases="priority-text">{case_.priority}</span>
                      </div>
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-4" data-cases="case-description">{case_.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" data-cases="case-details-grid">
                    <div data-cases="account-info">
                      <label className="text-slate-500" data-cases="account-label">Account</label>
                      <p className="font-medium text-slate-800" data-cases="account-name">{case_.accountName}</p>
                    </div>
                    <div data-cases="contact-info">
                      <label className="text-slate-500" data-cases="contact-label">Contact</label>
                      <p className="font-medium text-slate-800" data-cases="contact-name">{case_.contactName}</p>
                    </div>
                    <div data-cases="type-info">
                      <label className="text-slate-500" data-cases="type-label">Type</label>
                      <p className="font-medium text-slate-800" data-cases="type-value">{case_.type}</p>
                    </div>
                    <div data-cases="owner-info">
                      <label className="text-slate-500" data-cases="owner-label">Owner</label>
                      <p className="font-medium text-slate-800" data-cases="owner-name">{case_.owner}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2" data-cases="case-actions-section">
                  <div className="text-xs text-slate-500 text-right" data-cases="case-metadata">
                    <p data-cases="case-id">Case #{case_.id}</p>
                    <p data-cases="created-date">Created: {case_.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2" data-cases="case-buttons">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(case_)}
                      data-cases="edit-button"
                    >
                      <Edit className="h-4 w-4 mr-1" data-cases="edit-icon" />
                      <span data-cases="edit-text">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(case_.id)}
                      className="text-red-600 hover:text-red-700"
                      data-cases="delete-button"
                    >
                      <Trash2 className="h-4 w-4" data-cases="delete-icon" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12" data-cases="empty-state">
          <p className="text-slate-500" data-cases="empty-message">No cases found matching your filters.</p>
        </div>
      )}

      <NewCaseModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCaseCreated={handleCaseCreated}
        data-cases="new-case-modal"
      />

      <EditCaseModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        case_={selectedCase}
        onCaseUpdated={handleCaseUpdated}
        data-cases="edit-case-modal"
      />
    </div>
  );
};

export default Cases;
