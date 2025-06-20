import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, DollarSign } from "lucide-react";
import NewProductModal from "@/components/modals/NewProductModal";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    { id: 1, name: 'CRM Professional', description: 'Advanced CRM features', price: 99, category: 'Software', status: 'Active' },
    { id: 2, name: 'Consulting Services', description: 'Expert consulting', price: 150, category: 'Service', status: 'Active' },
    { id: 3, name: 'Training Package', description: 'Comprehensive training', price: 75, category: 'Training', status: 'Active' },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Software': return 'bg-blue-100 text-blue-700';
      case 'Service': return 'bg-emerald-100 text-emerald-700';
      case 'Training': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Products</h1>
          <p className="text-slate-600 mt-2">Manage your product catalog</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Package className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge className={getCategoryColor(product.category)} variant="secondary">
                    {product.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1 text-emerald-600 font-semibold">
                  <DollarSign className="h-4 w-4" />
                  <span>{product.price}/month</span>
                </div>
                <Badge variant="outline" className="text-emerald-600">
                  {product.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewProductModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
};

export default Products;
