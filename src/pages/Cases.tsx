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
    // Try to load from localStorage first
    const storedCases = localStorage.getItem('crmCases');
    if (storedCases) {
      const parsedCases = JSON.parse(storedCases).map((case_: any) => ({
        ...case_,
        createdAt: new Date(case_.createdAt)
      }));
      setCases(parsedCases);
      setFilteredCases(parsedCases);
    } else {
      // Fall back to sample data
      const data = getSampleData();
      if (data) {
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
    
    setFilteredCases(filtered);
  }, [statusFilter, priorityFilter, cases]);

  const handleCaseCreated = () => {
    loadCases();
  };

  const handleEdit = (case_: Case) => {
    setSelectedCase(case_);
    setIsEditModalOpen(true);
  };

  const handleCaseUpdated = () => {
    loadCases();
    setIsEditModalOpen(false);
    setSelectedCase(null);
  };

  const handleDelete = (caseId: string) => {
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
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
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
          <h1 className="text-3xl font-bold text-slate-800">Cases</h1>
          <p className="text-slate-600 mt-2">Manage customer support cases</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Case
        </Button>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48 bg-white">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-48 bg-white">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cases List */}
      <div className="space-y-4">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <HelpCircle className="h-5 w-5 text-slate-500" />
                    <h3 className="font-semibold text-slate-800">{case_.subject}</h3>
                    <Badge className={getStatusColor(case_.status)} variant="secondary">
                      {case_.status}
                    </Badge>
                    <Badge className={getPriorityColor(case_.priority)} variant="secondary">
                      <div className="flex items-center space-x-1">
                        {getPriorityIcon(case_.priority)}
                        <span>{case_.priority}</span>
                      </div>
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-4">{case_.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <label className="text-slate-500">Account</label>
                      <p className="font-medium text-slate-800">{case_.accountName}</p>
                    </div>
                    <div>
                      <label className="text-slate-500">Contact</label>
                      <p className="font-medium text-slate-800">{case_.contactName}</p>
                    </div>
                    <div>
                      <label className="text-slate-500">Type</label>
                      <p className="font-medium text-slate-800">{case_.type}</p>
                    </div>
                    <div>
                      <label className="text-slate-500">Owner</label>
                      <p className="font-medium text-slate-800">{case_.owner}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="text-xs text-slate-500 text-right">
                    <p>Case #{case_.id}</p>
                    <p>Created: {case_.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(case_)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(case_.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No cases found matching your filters.</p>
        </div>
      )}

      <NewCaseModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCaseCreated={handleCaseCreated}
      />

      <EditCaseModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        case_={selectedCase}
        onCaseUpdated={handleCaseUpdated}
      />
    </div>
  );
};

export default Cases;
