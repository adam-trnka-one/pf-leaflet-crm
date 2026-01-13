import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, User, Mail, Shield, Edit, Trash2 } from "lucide-react";
import NewUserModal from "@/components/modals/NewUserModal";
import EditUserModal from "@/components/modals/EditUserModal";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const Users = () => {
  const { t } = useTranslation(['users', 'common']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);

  // Load users from localStorage
  const loadUsers = () => {
    const storedUsers = localStorage.getItem('crmUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Set default users if none exist
      const defaultUsers = [
        { id: '1', name: 'Alice Johnson', email: 'alice@company.com', role: 'Admin', status: 'Active' },
        { id: '2', name: 'Bob Smith', email: 'bob@company.com', role: 'Sales Rep', status: 'Active' },
        { id: '3', name: 'Carol Davis', email: 'carol@company.com', role: 'Manager', status: 'Active' },
      ];
      setUsers(defaultUsers);
      localStorage.setItem('crmUsers', JSON.stringify(defaultUsers));
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleUserCreated = () => {
    loadUsers(); // Refresh the list when a new user is created
  };

  const handleEdit = (user: UserType) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (userId: string) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('crmUsers', JSON.stringify(updatedUsers));
    toast({
      title: t('common:deleted'),
      description: t('users:messages.deleted')
    });
  };

  const handleUserUpdated = () => {
    loadUsers();
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-700';
      case 'Manager': return 'bg-purple-100 text-purple-700';
      case 'Sales Rep': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen" data-testid="users-main-container">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8" data-testid="users-header-section">
        <div data-testid="users-header-content">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800" data-testid="users-page-title">{t('users:title')}</h1>
          <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base" data-testid="users-page-subtitle">{t('users:subtitle')}</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127] w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
          data-testid="users-new-user-button"
        >
          <Plus className="h-4 w-4 mr-2" data-testid="users-new-user-icon" />
          <span data-testid="users-new-user-text">{t('users:newUser')}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="users-grid">
        {users.map((user) => (
          <Card key={user.id} className="bg-white shadow-sm" data-testid={`user-card-${user.id}`}>
            <CardContent className="p-6" data-testid={`user-card-content-${user.id}`}>
              <div className="flex items-center space-x-4 mb-4" data-testid={`user-header-${user.id}`}>
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center" data-testid={`user-avatar-${user.id}`}>
                  <User className="h-6 w-6 text-slate-600" data-testid={`user-avatar-icon-${user.id}`} />
                </div>
                <div data-testid={`user-basic-info-${user.id}`}>
                  <h3 className="font-semibold text-slate-800" data-testid={`user-name-${user.id}`}>{user.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-600" data-testid={`user-email-section-${user.id}`}>
                    <Mail className="h-3 w-3" data-testid={`user-email-icon-${user.id}`} />
                    <span data-testid={`user-email-${user.id}`}>{user.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4" data-testid={`user-badges-section-${user.id}`}>
                <Badge className={getRoleColor(user.role)} variant="secondary" data-testid={`user-role-badge-${user.id}`}>
                  <Shield className="h-3 w-3 mr-1" data-testid={`user-role-icon-${user.id}`} />
                  <span data-testid={`user-role-text-${user.id}`}>{user.role}</span>
                </Badge>
                <Badge variant="outline" className="text-emerald-600" data-testid={`user-status-badge-${user.id}`}>
                  <span data-testid={`user-status-text-${user.id}`}>{user.status}</span>
                </Badge>
              </div>

              <div className="flex space-x-2" data-testid={`user-actions-${user.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(user)}
                  className="flex-1"
                  data-testid={`user-edit-button-${user.id}`}
                >
                  <Edit className="h-4 w-4 mr-1" data-testid={`user-edit-icon-${user.id}`} />
                  <span data-testid={`user-edit-text-${user.id}`}>{t('common:edit')}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:text-red-700"
                  data-testid={`user-delete-button-${user.id}`}
                >
                  <Trash2 className="h-4 w-4" data-testid={`user-delete-icon-${user.id}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <NewUserModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onUserCreated={handleUserCreated}
        data-testid="new-user-modal"
      />

      <EditUserModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        user={selectedUser}
        onUserUpdated={handleUserUpdated}
        data-testid="edit-user-modal"
      />
    </div>
  );
};

export default Users;
