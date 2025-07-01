
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, DollarSign, Calendar, Edit, Trash2 } from "lucide-react";
import NewQuoteModal from "@/components/modals/NewQuoteModal";
import EditQuoteModal from "@/components/modals/EditQuoteModal";
import { toast } from "@/hooks/use-toast";

const Quotes = () => {
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
      title: "Quote created",
      description: "The quote has been successfully created."
    });
  };

  const handleDelete = (quoteId: number) => {
    setQuotes(quotes.filter(q => q.id !== quoteId));
    toast({
      title: "Quote deleted",
      description: "The quote has been successfully deleted."
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
    <div className="p-8 bg-slate-50 min-h-screen" data-quotes="main-container">
      <div className="flex justify-between items-start mb-8" data-quotes="header-section">
        <div data-quotes="header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-quotes="page-title">Quotes</h1>
          <p className="text-slate-600 mt-2" data-quotes="page-subtitle">Manage sales quotes and proposals</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127]"
          onClick={() => setIsModalOpen(true)}
          data-quotes="new-quote-button"
        >
          <Plus className="h-4 w-4 mr-2" data-quotes="new-quote-icon" />
          <span data-quotes="new-quote-text">New Quote</span>
        </Button>
      </div>

      <div className="space-y-4" data-quotes="quotes-list">
        {quotes.map((quote) => (
          <Card key={quote.id} className="bg-white shadow-sm hover:shadow-md transition-shadow" data-quotes="quote-card">
            <CardContent className="p-6" data-quotes="card-content">
              <div className="flex items-center justify-between" data-quotes="card-row">
                <div className="flex items-center space-x-4" data-quotes="quote-info-section">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center" data-quotes="quote-icon-container">
                    <FileText className="h-5 w-5 text-blue-600" data-quotes="quote-icon" />
                  </div>
                  <div data-quotes="quote-details">
                    <h3 className="font-semibold text-slate-800" data-quotes="quote-name">{quote.name}</h3>
                    <p className="text-sm text-slate-600" data-quotes="quote-account">{quote.account}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6" data-quotes="quote-metadata-section">
                  <div className="text-right" data-quotes="quote-financial-info">
                    <div className="flex items-center space-x-1 text-emerald-600 font-semibold" data-quotes="amount-section">
                      <DollarSign className="h-4 w-4" data-quotes="amount-icon" />
                      <span data-quotes="amount-text">{quote.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-slate-500" data-quotes="date-section">
                      <Calendar className="h-3 w-3" data-quotes="date-icon" />
                      <span data-quotes="date-text">{quote.date.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(quote.status)} variant="secondary" data-quotes="status-badge">
                    <span data-quotes="status-text">{quote.status}</span>
                  </Badge>

                  <div className="flex space-x-2" data-quotes="quote-actions">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(quote)}
                      data-quotes="edit-button"
                    >
                      <Edit className="h-4 w-4 mr-1" data-quotes="edit-icon" />
                      <span data-quotes="edit-text">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(quote.id)}
                      className="text-red-600 hover:text-red-700"
                      data-quotes="delete-button"
                    >
                      <Trash2 className="h-4 w-4" data-quotes="delete-icon" />
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
        data-quotes="new-quote-modal"
      />

      <EditQuoteModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        quote={selectedQuote}
        onQuoteUpdated={handleQuoteUpdated}
        data-quotes="edit-quote-modal"
      />
    </div>
  );
};

export default Quotes;
