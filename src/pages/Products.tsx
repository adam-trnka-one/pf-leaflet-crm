
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, DollarSign, Edit, Trash2 } from "lucide-react";
import NewProductModal from "@/components/modals/NewProductModal";
import EditProductModal from "@/components/modals/EditProductModal";
import { toast } from "@/hooks/use-toast";
import { getProducts, saveProducts, Product } from "@/utils/productData";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    setSelectedProduct(null);
  };

  const handleProductCreated = (newProduct: Product) => {
    const updatedProducts = [newProduct, ...products];
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    toast({
      title: "Product created",
      description: "The product has been successfully created."
    });
  };

  const handleDelete = (productId: number) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
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
    <div className="p-8 bg-slate-50 min-h-screen" data-products="main-container">
      <div className="flex justify-between items-start mb-8" data-products="header-section">
        <div data-products="header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-products="page-title">Products</h1>
          <p className="text-slate-600 mt-2" data-products="page-subtitle">Manage your product catalog</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127]"
          onClick={() => setIsModalOpen(true)}
          data-products="new-product-button"
        >
          <Plus className="h-4 w-4 mr-2" data-products="new-product-icon" />
          <span data-products="new-product-text">New Product</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-products="products-grid">
        {products.map((product) => (
          <Card key={product.id} className="bg-white shadow-sm" data-products="product-card">
            <CardHeader data-products="card-header">
              <div className="flex items-center justify-between" data-products="header-content">
                <div className="flex items-center space-x-3" data-products="product-info">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center" data-products="product-icon-container">
                    <Package className="h-5 w-5 text-emerald-600" data-products="product-icon" />
                  </div>
                  <div data-products="product-details">
                    <CardTitle className="text-lg" data-products="product-name">{product.name}</CardTitle>
                    <Badge className={getCategoryColor(product.category)} variant="secondary" data-products="category-badge">
                      <span data-products="category-text">{product.category}</span>
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1" data-products="product-actions">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    data-products="edit-button"
                  >
                    <Edit className="h-4 w-4" data-products="edit-icon" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-700"
                    data-products="delete-button"
                  >
                    <Trash2 className="h-4 w-4" data-products="delete-icon" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent data-products="card-content">
              <p className="text-slate-600 mb-4" data-products="product-description">{product.description}</p>
              <div className="flex justify-between items-center" data-products="product-footer">
                <div className="flex items-center space-x-1 text-emerald-600 font-semibold" data-products="price-section">
                  <DollarSign className="h-4 w-4" data-products="price-icon" />
                  <span data-products="price-text">{product.price}/month</span>
                </div>
                <Badge variant="outline" className="text-emerald-600" data-products="status-badge">
                  <span data-products="status-text">{product.status}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewProductModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onProductCreated={handleProductCreated}
        data-products="new-product-modal"
      />

      <EditProductModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        product={selectedProduct}
        onProductUpdated={handleProductUpdated}
        data-products="edit-product-modal"
      />
    </div>
  );
};

export default Products;
