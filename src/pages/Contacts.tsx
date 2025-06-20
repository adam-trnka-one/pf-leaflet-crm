
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSampleData, type Contact } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Phone, User } from "lucide-react";
import NewContactModal from "@/components/modals/NewContactModal";

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadContacts = () => {
    // Try to load from localStorage first
    const storedContacts = localStorage.getItem('crmContacts');
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts).map((contact: any) => ({
        ...contact,
        createdAt: new Date(contact.createdAt)
      }));
      setContacts(parsedContacts);
      setFilteredContacts(parsedContacts);
    } else {
      // Fall back to sample data
      const data = getSampleData();
      if (data) {
        setContacts(data.contacts);
        setFilteredContacts(data.contacts);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.accountName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const handleContactCreated = () => {
    loadContacts(); // Refresh the list when a new contact is created
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Contacts</h1>
          <p className="text-slate-600 mt-2">Manage your contact relationships</p>
        </div>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Contact
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md bg-white"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Link key={contact.id} to={`/contacts/${contact.id}`}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-slate-800">
                      {contact.firstName} {contact.lastName}
                    </CardTitle>
                    <p className="text-sm text-slate-600">{contact.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-slate-600">
                  <span className="font-medium">Account:</span> {contact.accountName}
                </div>
                
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {contact.email}
                </div>

                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {contact.phone}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
                    Owner: {contact.owner}
                  </div>
                  <div className="text-xs text-slate-500">
                    Created: {contact.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">No contacts found matching your search.</p>
        </div>
      )}

      <NewContactModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onContactCreated={handleContactCreated}
      />
    </div>
  );
};

export default Contacts;
