
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
      <div className="p-8 flex items-center justify-center" data-contacts="loading-container">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500" data-contacts="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen" data-contacts="main-container">
      {/* Header */}
      <div className="flex justify-between items-start mb-8" data-contacts="header-section">
        <div data-contacts="header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-contacts="page-title">Contacts</h1>
          <p className="text-slate-600 mt-2" data-contacts="page-subtitle">Manage your contact relationships</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127]"
          onClick={() => setIsModalOpen(true)}
          data-contacts="new-contact-button"
        >
          <Plus className="h-4 w-4 mr-2" data-contacts="new-contact-icon" />
          <span data-contacts="new-contact-text">New Contact</span>
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6" data-contacts="search-section">
        <div className="relative" data-contacts="search-container">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" data-contacts="search-icon" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md bg-white"
            data-contacts="search-input"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-contacts="contacts-grid">
        {filteredContacts.map((contact) => (
          <Link key={contact.id} to={`/dashboard/contacts/${contact.id}`} data-contacts="contact-link">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer" data-contacts="contact-card">
              <CardHeader className="pb-2" data-contacts="card-header">
                <div className="flex items-center space-x-3" data-contacts="contact-info-row">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center" data-contacts="contact-avatar">
                    <User className="h-6 w-6 text-emerald-600" data-contacts="contact-avatar-icon" />
                  </div>
                  <div data-contacts="contact-name-section">
                    <CardTitle className="text-lg font-semibold text-slate-800" data-contacts="contact-name">
                      {contact.firstName} {contact.lastName}
                    </CardTitle>
                    <p className="text-sm text-slate-600" data-contacts="contact-title">{contact.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3" data-contacts="card-content">
                <div className="text-sm text-slate-600" data-contacts="account-row">
                  <span className="font-medium" data-contacts="account-label">Account:</span> 
                  <span data-contacts="account-value">{contact.accountName}</span>
                </div>
                
                <div className="flex items-center text-sm text-slate-600" data-contacts="email-row">
                  <Mail className="h-4 w-4 mr-2" data-contacts="email-icon" />
                  <span data-contacts="email-value">{contact.email}</span>
                </div>

                <div className="flex items-center text-sm text-slate-600" data-contacts="phone-row">
                  <Phone className="h-4 w-4 mr-2" data-contacts="phone-icon" />
                  <span data-contacts="phone-value">{contact.phone}</span>
                </div>

                <div className="pt-2 border-t border-slate-100" data-contacts="metadata-section">
                  <div className="text-xs text-slate-500" data-contacts="owner-row">
                    <span data-contacts="owner-label">Owner: </span>
                    <span data-contacts="owner-value">{contact.owner}</span>
                  </div>
                  <div className="text-xs text-slate-500" data-contacts="created-row">
                    <span data-contacts="created-label">Created: </span>
                    <span data-contacts="created-value">{contact.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12" data-contacts="empty-state">
          <p className="text-slate-500" data-contacts="empty-message">No contacts found matching your search.</p>
        </div>
      )}

      <NewContactModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onContactCreated={handleContactCreated}
        data-contacts="new-contact-modal"
      />
    </div>
  );
};

export default Contacts;
