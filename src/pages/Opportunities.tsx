import { useEffect, useState } from "react";
import { getSampleData, resetDatabase, type Opportunity } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign } from "lucide-react";
import NewOpportunityModal from "@/components/modals/NewOpportunityModal";
import { useTranslation } from "react-i18next";

const Opportunities = () => {
  const { t } = useTranslation(['opportunities', 'common']);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stages = [
    { name: 'Prospecting', color: 'bg-slate-100 text-slate-700' },
    { name: 'Qualification', color: 'bg-blue-100 text-blue-700' },
    { name: 'Proposal', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Negotiation', color: 'bg-orange-100 text-orange-700' },
    { name: 'Demo', color: 'bg-purple-100 text-purple-700' },
    { name: 'Follow-up', color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Closed Won', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Closed Lost', color: 'bg-red-100 text-red-700' },
  ];

  const loadOpportunities = () => {
    // Try to load from localStorage first
    const storedOpportunities = localStorage.getItem('crmOpportunities');
    if (storedOpportunities) {
      const parsedOpportunities = JSON.parse(storedOpportunities).map((opp: any) => ({
        ...opp,
        closeDate: new Date(opp.closeDate),
        createdAt: new Date(opp.createdAt)
      }));
      setOpportunities(parsedOpportunities);
    } else {
      // Fall back to sample data
      const data = getSampleData();
      if (data) {
        setOpportunities(data.opportunities);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    // Reset database to apply new opportunity limit
    const data = resetDatabase();
    setOpportunities(data.opportunities);
    setLoading(false);
  }, []);

  const handleOpportunityCreated = () => {
    loadOpportunities(); // Refresh the list when a new opportunity is created
  };

  const getOpportunitiesByStage = (stageName: string) => {
    return opportunities.filter(opp => opp.stage === stageName);
  };

  const getTotalValueByStage = (stageName: string) => {
    return getOpportunitiesByStage(stageName)
      .reduce((sum, opp) => sum + opp.amount, 0);
  };

  const handleDragStart = (e: React.DragEvent, opportunityId: string) => {
    e.dataTransfer.setData('text/plain', opportunityId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    const opportunityId = e.dataTransfer.getData('text/plain');
    
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === opportunityId 
          ? { ...opp, stage: newStage }
          : opp
      )
    );
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center" data-testid="opportunities-loading-container">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500" data-testid="opportunities-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen" data-testid="opportunities-main-container">
      {/* Header */}
      <div className="flex justify-between items-start mb-8" data-testid="opportunities-header-section">
        <div data-testid="opportunities-header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-testid="opportunities-page-title">{t('opportunities:title')}</h1>
          <p className="text-slate-600 mt-2" data-testid="opportunities-page-subtitle">{t('opportunities:subtitle')}</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsModalOpen(true)}
          data-testid="opportunities-new-opportunity-button"
        >
          <Plus className="h-4 w-4 mr-2" data-testid="opportunities-new-opportunity-icon" />
          <span data-testid="opportunities-new-opportunity-text">{t('opportunities:newOpportunity')}</span>
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex space-x-4 overflow-x-auto pb-4" data-testid="opportunities-kanban-board">
        {stages.map((stage) => {
          const stageOpportunities = getOpportunitiesByStage(stage.name);
          const totalValue = getTotalValueByStage(stage.name);

          return (
            <div
              key={stage.name}
              className="flex-shrink-0 w-80"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.name)}
              data-testid="opportunities-stage-column"
            >
              <div className="bg-white rounded-lg shadow-sm" data-testid="opportunities-stage-container">
                <div className="p-4 border-b border-slate-200" data-testid="opportunities-stage-header">
                  <div className="flex items-center justify-between mb-2" data-testid="opportunities-stage-title-row">
                    <h3 className="font-semibold text-slate-800" data-testid="opportunities-stage-title">{stage.name}</h3>
                    <Badge variant="secondary" className={stage.color} data-testid="opportunities-stage-count-badge">
                      {stageOpportunities.length}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 flex items-center" data-testid="opportunities-stage-total-value">
                    <DollarSign className="h-4 w-4 mr-1" data-testid="opportunities-stage-value-icon" />
                    <span data-testid="opportunities-stage-value-amount">${totalValue.toLocaleString()}</span>
                  </p>
                </div>
                
                <div className="p-4 space-y-3 min-h-[600px] max-h-[600px] overflow-y-auto" data-testid="opportunities-stage-content">
                  {stageOpportunities.map((opportunity) => (
                    <Card
                      key={opportunity.id}
                      className="cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={(e) => handleDragStart(e, opportunity.id)}
                      data-testid="opportunities-opportunity-card"
                    >
                      <CardContent className="p-4" data-testid="opportunities-card-content">
                        <h4 className="font-medium text-slate-800 mb-2 line-clamp-2" data-testid="opportunities-opportunity-name">
                          {opportunity.name}
                        </h4>
                        <p className="text-sm text-slate-600 mb-2" data-testid="opportunities-opportunity-account">{opportunity.accountName}</p>
                        <div className="flex justify-between items-center mb-2" data-testid="opportunities-opportunity-metrics">
                          <span className="font-semibold text-emerald-600" data-testid="opportunities-opportunity-amount">
                            ${opportunity.amount.toLocaleString()}
                          </span>
                          <Badge variant="outline" data-testid="opportunities-opportunity-probability">
                            {opportunity.probability}%
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-500" data-testid="opportunities-opportunity-close-date">
                          <span data-testid="opportunities-close-date-label">{t('opportunities:close')}: </span>
                          <span data-testid="opportunities-close-date-value">{opportunity.closeDate.toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1" data-testid="opportunities-opportunity-owner">
                          <span data-testid="opportunities-owner-label">{t('common:owner')}: </span>
                          <span data-testid="opportunities-owner-value">{opportunity.owner}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {stageOpportunities.length === 0 && (
                    <div className="text-center py-8 text-slate-400" data-testid="opportunities-empty-stage">
                      <span data-testid="opportunities-empty-stage-message">{t('opportunities:noOpportunitiesInStage')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <NewOpportunityModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onOpportunityCreated={handleOpportunityCreated}
        data-testid="opportunities-new-opportunity-modal"
      />
    </div>
  );
};

export default Opportunities;
