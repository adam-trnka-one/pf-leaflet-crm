
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
        title: "Error",
        description: "Please fill in all required fields.",
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
      title: "Product updated",
      description: "The product has been successfully updated."
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="edit-product-modal-content">
        <DialogHeader data-testid="edit-product-modal-header">
          <DialogTitle data-testid="edit-product-modal-title">Edit Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="edit-product-modal-form">
          <div className="grid gap-2" data-testid="edit-product-name-field">
            <Label htmlFor="product-name" data-testid="edit-product-name-label">Product Name</Label>
            <Input
              id="product-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="CRM Professional"
              data-testid="edit-product-name-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-product-description-field">
            <Label htmlFor="description" data-testid="edit-product-description-label">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Advanced CRM features"
              data-testid="edit-product-description-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-product-price-field">
            <Label htmlFor="price" data-testid="edit-product-price-label">Price (monthly)</Label>
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
            <Label htmlFor="category" data-testid="edit-product-category-label">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger data-testid="edit-product-category-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-product-category-content">
                <SelectItem value="Software" data-testid="edit-product-category-software">Software</SelectItem>
                <SelectItem value="Service" data-testid="edit-product-category-service">Service</SelectItem>
                <SelectItem value="Training" data-testid="edit-product-category-training">Training</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="edit-product-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-product-cancel-button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-[#4AB831] hover:bg-[#3da127]" data-testid="edit-product-update-button">
            Update Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
