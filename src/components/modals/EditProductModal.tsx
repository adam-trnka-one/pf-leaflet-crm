
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
}

interface EditProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onProductUpdated: (updatedProduct: Product) => void;
}

const EditProductModal = ({ open, onOpenChange, product, onProductUpdated }: EditProductModalProps) => {
  const { t } = useTranslation(['products', 'common']);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Software",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
      });
    }
  }, [product]);

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price) {
      toast({
        title: t('common:error'),
        description: t('common:fillRequired'),
        variant: "destructive"
      });
      return;
    }

    if (!product) {
      console.error("No product to update");
      return;
    }

    const updatedProduct = {
      ...product,
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
    };

    onProductUpdated(updatedProduct);

    toast({
      title: t('common:updated'),
      description: t('common:updated')
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="edit-product-modal-content">
        <DialogHeader data-testid="edit-product-modal-header">
          <DialogTitle data-testid="edit-product-modal-title">{t('edit')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="edit-product-modal-form">
          <div className="grid gap-2" data-testid="edit-product-name-field">
            <Label htmlFor="product-name" data-testid="edit-product-name-label">{t('columns.name')}</Label>
            <Input
              id="product-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="CRM Professional"
              data-testid="edit-product-name-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-product-description-field">
            <Label htmlFor="description" data-testid="edit-product-description-label">{t('columns.description')}</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Advanced CRM features"
              data-testid="edit-product-description-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-product-price-field">
            <Label htmlFor="price" data-testid="edit-product-price-label">{t('columns.price')}</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="99"
              data-testid="edit-product-price-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-product-category-field">
            <Label htmlFor="category" data-testid="edit-product-category-label">{t('columns.category')}</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger data-testid="edit-product-category-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-product-category-content">
                <SelectItem value="Software" data-testid="edit-product-category-software">{t('categories.software')}</SelectItem>
                <SelectItem value="Service" data-testid="edit-product-category-service">{t('categories.service')}</SelectItem>
                <SelectItem value="Training" data-testid="edit-product-category-training">{t('categories.training')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="edit-product-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-product-cancel-button">
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-[#4AB831] hover:bg-[#3da127]" data-testid="edit-product-update-button">
            {t('common:update')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
