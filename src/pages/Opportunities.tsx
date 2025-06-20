
import { useEffect, useState } from "react";
import { getSampleData, type Opportunity } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign } from "lucide-react";

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const data = getSampleData();
    if (data) {
      setOpportunities(data.opportunities);
    }
    setLoading(false);
  }, []);

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
          <h1 className="text-3xl font-bold text-slate-800">Opportunities</h1>
          <p className="text-slate-600 mt-2">Manage your sales pipeline</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          New Opportunity
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageOpportunities = getOpportunitiesByStage(stage.name);
          const totalValue = getTotalValueByStage(stage.name);

          return (
            <div
              key={stage.name}
              className="flex-shrink-0 w-80"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.name)}
            >
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-800">{stage.name}</h3>
                    <Badge variant="secondary" className={stage.color}>
                      {stageOpportunities.length}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${totalValue.toLocaleString()}
                  </p>
                </div>
                
                <div className="p-4 space-y-3 min-h-[600px] max-h-[600px] overflow-y-auto">
                  {stageOpportunities.map((opportunity) => (
                    <Card
                      key={opportunity.id}
                      className="cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={(e) => handleDragStart(e, opportunity.id)}
                    >
                      <CardContent className="p-4">
                        <h4 className="font-medium text-slate-800 mb-2 line-clamp-2">
                          {opportunity.name}
                        </h4>
                        <p className="text-sm text-slate-600 mb-2">{opportunity.accountName}</p>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-emerald-600">
                            ${opportunity.amount.toLocaleString()}
                          </span>
                          <Badge variant="outline">
                            {opportunity.probability}%
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-500">
                          Close: {opportunity.closeDate.toLocaleDateString()}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          Owner: {opportunity.owner}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {stageOpportunities.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      No opportunities in this stage
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Opportunities;
