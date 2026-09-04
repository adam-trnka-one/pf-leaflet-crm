import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, DollarSign, Edit, Trash2 } from "lucide-react";
import NewProductModal from "@/components/modals/NewProductModal";
import EditProductModal from "@/components/modals/EditProductModal";
import { toast } from "@/hooks/use-toast";
import { getProducts, saveProducts, Product } from "@/utils/productData";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation(['products', 'common']);
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
      title: t('common:created'),
      description: t('products:messages.created')
    });
  };

  const handleDelete = (productId: number) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
    toast({
      title: t('common:deleted'),
      description: t('products:messages.deleted')
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Software': return 'bg-info-muted text-info-muted-foreground';
      case 'Service': return 'bg-success-muted text-success-muted-foreground';
      case 'Training': return 'bg-purple-muted text-purple-muted-foreground';
      default: return 'bg-muted text-foreground';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-muted min-h-screen" data-testid="products-main-container">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8" data-testid="products-header-section">
        <div data-testid="products-header-content">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="products-page-title">{t('products:title')}</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base" data-testid="products-page-subtitle">{t('products:subtitle')}</p>
        </div>
        <Button 
          className="bg-brand hover:bg-brand/90 text-brand-foreground w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
          data-testid="products-new-button"
        >
          <Plus className="h-4 w-4 mr-2" data-testid="products-new-icon" />
          <span data-testid="products-new-text">{t('products:newProduct')}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="products-grid">
        {products.map((product) => (
          <Card key={product.id} className="bg-card shadow-sm" data-testid={`product-card-${product.id}`}>
            <CardHeader data-testid={`product-card-header-${product.id}`}>
              <div className="flex items-center justify-between" data-testid={`product-header-content-${product.id}`}>
                <div className="flex items-center space-x-3" data-testid={`product-info-${product.id}`}>
                  <div className="w-10 h-10 bg-success-muted rounded-lg flex items-center justify-center" data-testid={`product-icon-container-${product.id}`}>
                    <Package className="h-5 w-5 text-success-muted-foreground" data-testid={`product-icon-${product.id}`} />
                  </div>
                  <div data-testid={`product-details-${product.id}`}>
                    <CardTitle className="text-lg" data-testid={`product-name-${product.id}`}>{product.name}</CardTitle>
                    <Badge className={getCategoryColor(product.category)} variant="secondary" data-testid={`product-category-badge-${product.id}`}>
                      <span data-testid={`product-category-text-${product.id}`}>{product.category}</span>
                    </Badge>
                  </div>
                </div>
                <div className="flex space-x-1" data-testid={`product-actions-${product.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                    data-testid={`product-edit-button-${product.id}`}
                  >
                    <Edit className="h-4 w-4" data-testid={`product-edit-icon-${product.id}`} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="text-destructive-muted-foreground hover:text-destructive-muted-foreground"
                    data-testid={`product-delete-button-${product.id}`}
                  >
                    <Trash2 className="h-4 w-4" data-testid={`product-delete-icon-${product.id}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent data-testid={`product-card-content-${product.id}`}>
              <p className="text-muted-foreground mb-4" data-testid={`product-description-${product.id}`}>{product.description}</p>
              <div className="flex justify-between items-center" data-testid={`product-footer-${product.id}`}>
                <div className="flex items-center space-x-1 text-success-muted-foreground font-semibold" data-testid={`product-price-section-${product.id}`}>
                  <DollarSign className="h-4 w-4" data-testid={`product-price-icon-${product.id}`} />
                  <span data-testid={`product-price-text-${product.id}`}>{product.price}{t('products:perMonth')}</span>
                </div>
                <Badge variant="outline" className="text-success-muted-foreground" data-testid={`product-status-badge-${product.id}`}>
                  <span data-testid={`product-status-text-${product.id}`}>{product.status}</span>
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
        data-testid="new-product-modal"
      />

      <EditProductModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        product={selectedProduct}
        onProductUpdated={handleProductUpdated}
        data-testid="edit-product-modal"
      />
    </div>
  );
};

export default Products;
