
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, DollarSign, Edit, Trash2 } from "lucide-react";
import NewProductModal from "@/components/modals/NewProductModal";
import EditProductModal from "@/components/modals/EditProductModal";
import { toast } from "@/hooks/use-toast";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [products, setProducts] = useState([
    { id: 1, name: 'CRM Professional', description: 'Advanced CRM features', price: 99, category: 'Software', status: 'Active' },
    { id: 2, name: 'Consulting Services', description: 'Expert consulting', price: 150, category: 'Service', status: 'Active' },
    { id: 3, name: 'Training Package', description: 'Comprehensive training', price: 75, category: 'Training', status: 'Active' },
  ]);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleProductUpdated = (updatedProduct: any) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setSelectedProduct(null);
  };

  const handleDelete = (productId: number) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted."
    });
  };

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
          className="bg-[#4AB831] hover:bg-[#3da127]"
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
              <div className="flex items-center justify-between">
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
                <div className="flex space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
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

      <EditProductModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        product={selectedProduct}
        onProductUpdated={handleProductUpdated}
      />
    </div>
  );
};

export default Products;
