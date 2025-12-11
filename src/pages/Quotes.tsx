
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, DollarSign, Calendar, Edit, Trash2 } from "lucide-react";
import NewQuoteModal from "@/components/modals/NewQuoteModal";
import EditQuoteModal from "@/components/modals/EditQuoteModal";
import { toast } from "@/hooks/use-toast";

const Quotes = () => {
  const { t } = useTranslation();
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
      title: t('quotes.quoteCreated'),
      description: t('quotes.quoteCreatedDesc')
    });
  };

  const handleDelete = (quoteId: number) => {
    setQuotes(quotes.filter(q => q.id !== quoteId));
    toast({
      title: t('quotes.quoteDeleted'),
      description: t('quotes.quoteDeletedDesc')
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-700';
      case 'Sent': return 'bg-blue-100 text-blue-700';
      case 'Accepted': return 'bg-emerald-100 text-emerald-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen" data-testid="quotes-main-container">
      <div className="flex justify-between items-start mb-8" data-testid="quotes-header-section">
        <div data-testid="quotes-header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-testid="quotes-page-title">{t('quotes.title')}</h1>
          <p className="text-slate-600 mt-2" data-testid="quotes-page-subtitle">{t('quotes.subtitle')}</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127]"
          onClick={() => setIsModalOpen(true)}
          data-testid="quotes-new-quote-button"
        >
          <Plus className="h-4 w-4 mr-2" data-testid="quotes-new-quote-icon" />
          <span data-testid="quotes-new-quote-text">{t('quotes.newQuote')}</span>
        </Button>
      </div>

      <div className="space-y-4" data-testid="quotes-list">
        {quotes.map((quote) => (
          <Card key={quote.id} className="bg-white shadow-sm hover:shadow-md transition-shadow" data-testid="quotes-quote-card">
            <CardContent className="p-6" data-testid="quotes-card-content">
              <div className="flex items-center justify-between" data-testid="quotes-card-row">
                <div className="flex items-center space-x-4" data-testid="quotes-quote-info-section">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-testid="quotes-quote-icon-container">
                    <FileText className="h-5 w-5 text-blue-600" data-testid="quotes-quote-icon" />
                  </div>
                  <div data-testid="quotes-quote-details">
                    <h3 className="font-semibold text-slate-800" data-testid="quotes-quote-name">{quote.name}</h3>
                    <p className="text-sm text-slate-600" data-testid="quotes-quote-account">{quote.account}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6" data-testid="quotes-quote-metadata-section">
                  <div className="text-right" data-testid="quotes-quote-financial-info">
                    <div className="flex items-center space-x-1 text-emerald-600 font-semibold" data-testid="quotes-amount-section">
                      <DollarSign className="h-4 w-4" data-testid="quotes-amount-icon" />
                      <span data-testid="quotes-amount-text">{quote.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-slate-500" data-testid="quotes-date-section">
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
                      <Edit className="h-4 w-4 mr-1" data-testid="quotes-edit-icon" />
                      <span data-testid="quotes-edit-text">{t('common.edit')}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(quote.id)}
                      className="text-red-600 hover:text-red-700"
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
