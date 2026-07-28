import { useEffect, useState } from "react";
import { getSampleData, type Opportunity } from "@/utils/sampleData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, DollarSign, Pencil, Trash2 } from "lucide-react";
import NewOpportunityModal from "@/components/modals/NewOpportunityModal";
import EditOpportunityModal from "@/components/modals/EditOpportunityModal";
import { useTranslation } from "react-i18next";

const STORAGE_KEY = "crmOpportunities";

const stages = [
  { name: "Prospecting", key: "prospecting", color: "bg-slate-100 text-slate-700" },
  { name: "Qualification", key: "qualification", color: "bg-blue-100 text-blue-700" },
  { name: "Proposal", key: "proposal", color: "bg-yellow-100 text-yellow-700" },
  { name: "Negotiation", key: "negotiation", color: "bg-orange-100 text-orange-700" },
  { name: "Demo", key: "demo", color: "bg-purple-100 text-purple-700" },
  { name: "Follow-up", key: "followUp", color: "bg-indigo-100 text-indigo-700" },
  { name: "Closed Won", key: "closedWon", color: "bg-emerald-100 text-emerald-700" },
  { name: "Closed Lost", key: "closedLost", color: "bg-red-100 text-red-700" },
];

const Opportunities = () => {
  const { t } = useTranslation(["opportunities", "common"]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Opportunity | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const persist = (list: Opportunity[]) => {
    setOpportunities(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const loadOpportunities = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored).map((opp: Opportunity) => ({
          ...opp,
          closeDate: new Date(opp.closeDate),
          createdAt: new Date(opp.createdAt),
        }));
        setOpportunities(parsed);
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    const data = getSampleData();
    setOpportunities(data?.opportunities ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadOpportunities();
  }, []);

  const handleSaveEdit = (updated: Opportunity) => {
    persist(opportunities.map((opp) => (opp.id === updated.id ? updated : opp)));
    setEditing(null);
  };

  const handleDelete = () => {
    if (!deletingId) return;
    persist(opportunities.filter((opp) => opp.id !== deletingId));
    setDeletingId(null);
  };

  const getOpportunitiesByStage = (stageName: string) =>
    opportunities.filter((opp) => opp.stage === stageName);

  const getTotalValueByStage = (stageName: string) =>
    getOpportunitiesByStage(stageName).reduce((sum, opp) => sum + opp.amount, 0);

  const handleDragStart = (e: React.DragEvent, opportunityId: string) => {
    e.dataTransfer.setData("text/plain", opportunityId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStage: string) => {
    e.preventDefault();
    const opportunityId = e.dataTransfer.getData("text/plain");
    persist(
      opportunities.map((opp) => (opp.id === opportunityId ? { ...opp, stage: newStage } : opp))
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
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen" data-testid="opportunities-main-container">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8" data-testid="opportunities-header-section">
        <div data-testid="opportunities-header-content">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800" data-testid="opportunities-page-title">{t('opportunities:title')}</h1>
          <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base" data-testid="opportunities-page-subtitle">{t('opportunities:subtitle')}</p>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto"
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
                    <h3 className="font-semibold text-slate-800" data-testid="opportunities-stage-title">
                      {t(`opportunities:stages.${stage.key}`)}
                    </h3>
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
                      className="group cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={(e) => handleDragStart(e, opportunity.id)}
                      data-testid="opportunities-opportunity-card"
                    >
                      <CardContent className="p-4" data-testid="opportunities-card-content">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-medium text-slate-800 line-clamp-2" data-testid="opportunities-opportunity-name">
                            {opportunity.name}
                          </h4>
                          <div className="flex items-center gap-1 shrink-0" data-testid="opportunities-card-actions">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-slate-500 hover:text-slate-800"
                              aria-label={t('opportunities:editOpportunity')}
                              title={t('opportunities:editOpportunity')}
                              onClick={() => setEditing(opportunity)}
                              data-testid="opportunities-edit-button"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-slate-500 hover:text-red-600"
                              aria-label={t('opportunities:deleteOpportunity')}
                              title={t('opportunities:deleteOpportunity')}
                              onClick={() => setDeletingId(opportunity.id)}
                              data-testid="opportunities-delete-button"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
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
                          <span data-testid="opportunities-owner-label">{t('opportunities:fields.owner')}: </span>
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
        onOpportunityCreated={loadOpportunities}
      />

      <EditOpportunityModal
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
        opportunity={editing}
        onSave={handleSaveEdit}
      />

      <AlertDialog open={deletingId !== null} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent data-testid="opportunities-delete-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('opportunities:deleteConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription>{t('opportunities:deleteConfirmDescription')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="opportunities-delete-cancel">{t('common:cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              data-testid="opportunities-delete-confirm"
            >
              {t('common:delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Opportunities;
