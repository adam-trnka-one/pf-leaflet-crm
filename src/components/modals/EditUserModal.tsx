
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

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface EditUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onUserUpdated?: () => void;
}

const EditUserModal = ({ open, onOpenChange, user, onUserUpdated }: EditUserModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Sales Rep",
    status: "Active",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !user) {
      return;
    }

    const updatedUser: User = {
      ...user,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
    };

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('crmUsers') || '[]');
    const updatedUsers = existingUsers.map((u: User) => 
      u.id === user.id ? updatedUser : u
    );
    
    // Store back to localStorage
    localStorage.setItem('crmUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "User updated",
      description: "The user has been successfully updated."
    });
    
    // Reset form and close modal
    onOpenChange(false);
    
    // Notify parent component
    if (onUserUpdated) {
      onUserUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="edit-user-modal-content">
        <DialogHeader data-testid="edit-user-modal-header">
          <DialogTitle data-testid="edit-user-modal-title">Edit User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="edit-user-modal-form">
          <div className="grid gap-2" data-testid="edit-user-name-field">
            <Label htmlFor="user-name" data-testid="edit-user-name-label">Full Name</Label>
            <Input
              id="user-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              data-testid="edit-user-name-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-user-email-field">
            <Label htmlFor="email" data-testid="edit-user-email-label">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@company.com"
              data-testid="edit-user-email-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-user-role-field">
            <Label htmlFor="role" data-testid="edit-user-role-label">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger data-testid="edit-user-role-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-user-role-content">
                <SelectItem value="Admin" data-testid="edit-user-role-admin">Admin</SelectItem>
                <SelectItem value="Manager" data-testid="edit-user-role-manager">Manager</SelectItem>
                <SelectItem value="Sales Rep" data-testid="edit-user-role-sales">Sales Rep</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2" data-testid="edit-user-status-field">
            <Label htmlFor="status" data-testid="edit-user-status-label">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger data-testid="edit-user-status-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-user-status-content">
                <SelectItem value="Active" data-testid="edit-user-status-active">Active</SelectItem>
                <SelectItem value="Inactive" data-testid="edit-user-status-inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="edit-user-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-user-cancel-button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-[#4AB831] hover:bg-[#3da127]" data-testid="edit-user-update-button">
            Update User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
