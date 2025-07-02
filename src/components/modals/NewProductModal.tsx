
import { useState } from "react";
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

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
}

interface NewProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProductCreated?: (product: Product) => void;
}

const NewProductModal = ({ open, onOpenChange, onProductCreated }: NewProductModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Software",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price) {
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      status: "Active",
    };

    console.log("Creating new product:", newProduct);
    
    // Notify parent component
    if (onProductCreated) {
      onProductCreated(newProduct);
    }
    
    onOpenChange(false);
    setFormData({ name: "", description: "", price: "", category: "Software" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="new-product-modal-content">
        <DialogHeader data-testid="new-product-modal-header">
          <DialogTitle data-testid="new-product-modal-title">Create New Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="new-product-modal-form">
          <div className="grid gap-2" data-testid="new-product-name-field">
            <Label htmlFor="product-name" data-testid="new-product-name-label">Product Name</Label>
            <Input
              id="product-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="CRM Professional"
              data-testid="new-product-name-input"
            />
          </div>
          <div className="grid gap-2" data-testid="new-product-description-field">
            <Label htmlFor="description" data-testid="new-product-description-label">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Advanced CRM features"
              data-testid="new-product-description-input"
            />
          </div>
          <div className="grid gap-2" data-testid="new-product-price-field">
            <Label htmlFor="price" data-testid="new-product-price-label">Price (monthly)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="99"
              data-testid="new-product-price-input"
            />
          </div>
          <div className="grid gap-2" data-testid="new-product-category-field">
            <Label htmlFor="category" data-testid="new-product-category-label">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger data-testid="new-product-category-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="new-product-category-content">
                <SelectItem value="Software" data-testid="new-product-category-software">Software</SelectItem>
                <SelectItem value="Service" data-testid="new-product-category-service">Service</SelectItem>
                <SelectItem value="Training" data-testid="new-product-category-training">Training</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="new-product-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="new-product-cancel-button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-[#4AB831] hover:bg-[#3da127]" data-testid="new-product-create-button">
            Create Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProductModal;
