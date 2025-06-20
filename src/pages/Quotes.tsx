import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, DollarSign, Calendar } from "lucide-react";
import NewQuoteModal from "@/components/modals/NewQuoteModal";

const Quotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quotes = [
    { id: 1, name: 'Q-2024-001', account: 'Acme Corp', amount: 25000, status: 'Draft', date: new Date() },
    { id: 2, name: 'Q-2024-002', account: 'TechStart Inc', amount: 15000, status: 'Sent', date: new Date() },
    { id: 3, name: 'Q-2024-003', account: 'GlobalSoft', amount: 35000, status: 'Accepted', date: new Date() },
  ];

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
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quotes</h1>
          <p className="text-slate-600 mt-2">Manage sales quotes and proposals</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Quote
        </Button>
      </div>

      <div className="space-y-4">
        {quotes.map((quote) => (
          <Card key={quote.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{quote.name}</h3>
                    <p className="text-sm text-slate-600">{quote.account}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-emerald-600 font-semibold">
                      <DollarSign className="h-4 w-4" />
                      <span>{quote.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      <span>{quote.date.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Badge className={getStatusColor(quote.status)} variant="secondary">
                    {quote.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewQuoteModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default Quotes;
