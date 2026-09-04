import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, DollarSign, Calendar, Edit, Trash2 } from "lucide-react";
import NewQuoteModal from "@/components/modals/NewQuoteModal";
import EditQuoteModal from "@/components/modals/EditQuoteModal";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Quotes = () => {
  const { t } = useTranslation(['quotes', 'common']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [quotes, setQuotes] = useState([
    { id: 1, name: 'Q-2024-001', account: 'Acme Corp', amount: 25000, status: 'Draft', date: new Date() },
    { id: 2, name: 'Q-2024-002', account: 'TechStart Inc', amount: 15000, status: 'Sent', date: new Date() },
    { id: 3, name: 'Q-2024-003', account: 'GlobalSoft', amount: 35000, status: 'Accepted', date: new Date() },
  ]);

  const handleEdit = (quote: any) => {
    setSelectedQuote(quote);
    setIsEditModalOpen(true);
  };

  const handleQuoteUpdated = (updatedQuote: any) => {
    setQuotes(quotes.map(q => q.id === updatedQuote.id ? updatedQuote : q));
    setSelectedQuote(null);
  };

  const handleQuoteCreated = (newQuote: any) => {
    setQuotes(prevQuotes => [newQuote, ...prevQuotes]);
    toast({
      title: t('common:created'),
      description: t('quotes:messages.created')
    });
  };

  const handleDelete = (quoteId: number) => {
    setQuotes(quotes.filter(q => q.id !== quoteId));
    toast({
      title: t('common:deleted'),
      description: t('quotes:messages.deleted')
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-muted text-foreground';
      case 'Sent': return 'bg-info-muted text-info-muted-foreground';
      case 'Accepted': return 'bg-success-muted text-success-muted-foreground';
      case 'Rejected': return 'bg-destructive-muted text-destructive-muted-foreground';
      default: return 'bg-muted text-foreground';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-muted min-h-screen" data-testid="quotes-main-container">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8" data-testid="quotes-header-section">
        <div data-testid="quotes-header-content">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="quotes-page-title">{t('quotes:title')}</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base" data-testid="quotes-page-subtitle">{t('quotes:subtitle')}</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127] w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
          data-testid="quotes-new-quote-button"
        >
          <Plus className="h-4 w-4 mr-2" data-testid="quotes-new-quote-icon" />
          <span data-testid="quotes-new-quote-text">{t('quotes:newQuote')}</span>
        </Button>
      </div>

      <div className="space-y-4" data-testid="quotes-list">
        {quotes.map((quote) => (
          <Card key={quote.id} className="bg-card shadow-sm hover:shadow-md transition-shadow" data-testid="quotes-quote-card">
            <CardContent className="p-4 sm:p-6" data-testid="quotes-card-content">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" data-testid="quotes-card-row">
                <div className="flex items-center space-x-4" data-testid="quotes-quote-info-section">
                  <div className="w-10 h-10 bg-info-muted rounded-lg flex items-center justify-center flex-shrink-0" data-testid="quotes-quote-icon-container">
                    <FileText className="h-5 w-5 text-info-muted-foreground" data-testid="quotes-quote-icon" />
                  </div>
                  <div data-testid="quotes-quote-details">
                    <h3 className="font-semibold text-foreground" data-testid="quotes-quote-name">{quote.name}</h3>
                    <p className="text-sm text-muted-foreground" data-testid="quotes-quote-account">{quote.account}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-6" data-testid="quotes-quote-metadata-section">
                  <div className="text-left sm:text-right" data-testid="quotes-quote-financial-info">
                    <div className="flex items-center space-x-1 text-success-muted-foreground font-semibold" data-testid="quotes-amount-section">
                      <DollarSign className="h-4 w-4" data-testid="quotes-amount-icon" />
                      <span data-testid="quotes-amount-text">{quote.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground" data-testid="quotes-date-section">
                      <Calendar className="h-3 w-3" data-testid="quotes-date-icon" />
                      <span data-testid="quotes-date-text">{quote.date.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(quote.status)} variant="secondary" data-testid="quotes-status-badge">
                    <span data-testid="quotes-status-text">{quote.status}</span>
                  </Badge>

                  <div className="flex space-x-2" data-testid="quotes-quote-actions">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(quote)}
                      data-testid="quotes-edit-button"
                    >
                      <Edit className="h-4 w-4 sm:mr-1" data-testid="quotes-edit-icon" />
                      <span className="hidden sm:inline" data-testid="quotes-edit-text">{t('common:edit')}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(quote.id)}
                      className="text-destructive-muted-foreground hover:text-destructive-muted-foreground"
                      data-testid="quotes-delete-button"
                    >
                      <Trash2 className="h-4 w-4" data-testid="quotes-delete-icon" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewQuoteModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onQuoteCreated={handleQuoteCreated}
        data-testid="quotes-new-quote-modal"
      />

      <EditQuoteModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        quote={selectedQuote}
        onQuoteUpdated={handleQuoteUpdated}
        data-testid="quotes-edit-quote-modal"
      />
    </div>
  );
};

export default Quotes;
