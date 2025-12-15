
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
import { toast } from "@/hooks/use-toast";

interface Account {
  id: string;
  name: string;
  type: string;
  industry: string;
  phone: string;
  website: string;
  revenue: number;
  employees: number;
  owner: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
}

interface EditAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
  onAccountUpdated?: () => void;
}

const EditAccountModal = ({ open, onOpenChange, account, onAccountUpdated }: EditAccountModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    industry: "",
    phone: "",
    website: "",
    revenue: 0,
    employees: 0,
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name,
        type: account.type,
        industry: account.industry,
        phone: account.phone,
        website: account.website,
        revenue: account.revenue,
        employees: account.employees,
        street: account.address.street,
        city: account.address.city,
        state: account.address.state,
        zipCode: account.address.zipCode,
        country: account.address.country,
      });
    }
  }, [account]);

  const handleSubmit = () => {
    if (!formData.name || !account) {
      return;
    }

    const updatedAccount: Account = {
      ...account,
      name: formData.name,
      type: formData.type,
      industry: formData.industry,
      phone: formData.phone,
      website: formData.website,
      revenue: formData.revenue,
      employees: formData.employees,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
    };

    // Get existing accounts from localStorage
    const existingAccounts = JSON.parse(localStorage.getItem('crmAccounts') || '[]');
    const updatedAccounts = existingAccounts.map((a: Account) => 
      a.id === account.id ? updatedAccount : a
    );
    
    // Store back to localStorage
    localStorage.setItem('crmAccounts', JSON.stringify(updatedAccounts));
    
    toast({
      title: "Account updated",
      description: "The account has been successfully updated."
    });
    
    // Reset form and close modal
    onOpenChange(false);
    
    // Notify parent component
    if (onAccountUpdated) {
      onAccountUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Account</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Account Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Acme Corporation"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="Customer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="Technology"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://www.example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="revenue">Annual Revenue</Label>
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })}
                placeholder="1000000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="employees">Employees</Label>
              <Input
                id="employees"
                type="number"
                value={formData.employees}
                onChange={(e) => setFormData({ ...formData, employees: Number(e.target.value) })}
                placeholder="50"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Address Information</h4>
            <div className="grid gap-2">
              <Label htmlFor="street">Street</Label>
              <Input
                id="street"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                placeholder="123 Main Street"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="New York"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="NY"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  placeholder="10001"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  placeholder="United States"
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">
            Update Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountModal;
