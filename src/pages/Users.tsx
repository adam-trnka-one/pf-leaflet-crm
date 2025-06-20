
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, User, Mail, Shield, Edit, Trash2 } from "lucide-react";
import NewUserModal from "@/components/modals/NewUserModal";
import EditUserModal from "@/components/modals/EditUserModal";
import { toast } from "@/hooks/use-toast";

interface UserType {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const Users = () => {
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
      title: "User deleted",
      description: "The user has been successfully deleted."
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
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Users</h1>
          <p className="text-slate-600 mt-2">Manage system users and permissions</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127]"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{user.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Mail className="h-3 w-3" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <Badge className={getRoleColor(user.role)} variant="secondary">
                  <Shield className="h-3 w-3 mr-1" />
                  {user.role}
                </Badge>
                <Badge variant="outline" className="text-emerald-600">
                  {user.status}
                </Badge>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(user)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
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
      />

      <EditUserModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        user={selectedUser}
        onUserUpdated={handleUserUpdated}
      />
    </div>
  );
};

export default Users;
