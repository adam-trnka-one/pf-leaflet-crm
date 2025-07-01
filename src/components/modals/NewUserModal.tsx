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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="user-name">Full Name</Label>
            <Input
              id="user-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john.doe@company.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Sales Rep">Sales Rep</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-[#4AB831] hover:bg-[#3da127]">
            Create User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewUserModal;
