
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface NewUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserCreated?: () => void;
}

const NewUserModal = ({ open, onOpenChange, onUserCreated }: NewUserModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Sales Rep",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      return;
    }

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: "Active",
    };

    // Get existing users from localStorage
    const existingStoredUsers = JSON.parse(localStorage.getItem('crmUsers') || '[]');
    
    // If no stored users exist, we'll let the Users page handle loading defaults
    // This preserves any existing users whether they're from sample data or previously created
    const updatedUsers = [newUser, ...existingStoredUsers];
    
    // Store back to localStorage
    localStorage.setItem('crmUsers', JSON.stringify(updatedUsers));
    
    console.log("Creating new user:", newUser);
    
    // Reset form and close modal
    onOpenChange(false);
    setFormData({ name: "", email: "", role: "Sales Rep" });
    
    // Notify parent component
    if (onUserCreated) {
      onUserCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="new-user-modal-content">
        <DialogHeader data-testid="new-user-modal-header">
          <DialogTitle data-testid="new-user-modal-title">Create New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="new-user-modal-form">
          <div className="grid gap-2" data-testid="new-user-name-field">
            <Label htmlFor="user-name" data-testid="new-user-name-label">Full Name</Label>
            <Input
              id="user-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              data-testid="new-user-name-input"
            />
          </div>
          <div className="grid gap-2" data-testid="new-user-email-field">
            <Label htmlFor="email" data-testid="new-user-email-label">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@company.com"
              data-testid="new-user-email-input"
            />
          </div>
          <div className="grid gap-2" data-testid="new-user-role-field">
            <Label htmlFor="role" data-testid="new-user-role-label">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger data-testid="new-user-role-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="new-user-role-content">
                <SelectItem value="Admin" data-testid="new-user-role-admin">Admin</SelectItem>
                <SelectItem value="Manager" data-testid="new-user-role-manager">Manager</SelectItem>
                <SelectItem value="Sales Rep" data-testid="new-user-role-sales">Sales Rep</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="new-user-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="new-user-cancel-button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-[#4AB831] hover:bg-[#3da127]" data-testid="new-user-create-button">
            Create User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewUserModal;
