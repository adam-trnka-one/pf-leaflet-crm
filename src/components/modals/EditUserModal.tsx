
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
  const { t } = useTranslation(['users', 'common']);
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

    const existingUsers = JSON.parse(localStorage.getItem('crmUsers') || '[]');
    const updatedUsers = existingUsers.map((u: User) => 
      u.id === user.id ? updatedUser : u
    );
    localStorage.setItem('crmUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: t('common:updated'),
      description: t('common:updated')
    });
    
    onOpenChange(false);
    
    if (onUserUpdated) {
      onUserUpdated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="edit-user-modal-content">
        <DialogHeader data-testid="edit-user-modal-header">
          <DialogTitle data-testid="edit-user-modal-title">{t('edit')}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4" data-testid="edit-user-modal-form">
          <div className="grid gap-2" data-testid="edit-user-name-field">
            <Label htmlFor="user-name" data-testid="edit-user-name-label">{t('columns.name')}</Label>
            <Input
              id="user-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              data-testid="edit-user-name-input"
            />
          </div>
          <div className="grid gap-2" data-testid="edit-user-email-field">
            <Label htmlFor="email" data-testid="edit-user-email-label">{t('columns.email')}</Label>
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
            <Label htmlFor="role" data-testid="edit-user-role-label">{t('columns.role')}</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger data-testid="edit-user-role-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-user-role-content">
                <SelectItem value="Admin" data-testid="edit-user-role-admin">{t('roles.admin')}</SelectItem>
                <SelectItem value="Manager" data-testid="edit-user-role-manager">{t('roles.manager')}</SelectItem>
                <SelectItem value="Sales Rep" data-testid="edit-user-role-sales">{t('roles.salesRep')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2" data-testid="edit-user-status-field">
            <Label htmlFor="status" data-testid="edit-user-status-label">{t('columns.status')}</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger data-testid="edit-user-status-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent data-testid="edit-user-status-content">
                <SelectItem value="Active" data-testid="edit-user-status-active">{t('status.active')}</SelectItem>
                <SelectItem value="Inactive" data-testid="edit-user-status-inactive">{t('status.inactive')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter data-testid="edit-user-modal-footer">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="edit-user-cancel-button">
            {t('common:cancel')}
          </Button>
          <Button onClick={handleSubmit} className="bg-[#4AB831] hover:bg-[#3da127]" data-testid="edit-user-update-button">
            {t('common:update')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
