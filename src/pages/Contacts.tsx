import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSampleData, resetDatabase, type Contact } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Mail, Phone, User } from "lucide-react";
import NewContactModal from "@/components/modals/NewContactModal";
import { useTranslation } from "react-i18next";

const Contacts = () => {
  const { t } = useTranslation(['contacts', 'common']);
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
    // Reset database to apply new contact limit
    const data = resetDatabase();
    setContacts(data.contacts);
    setFilteredContacts(data.contacts);
    setLoading(false);
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
      <div className="p-8 flex items-center justify-center" data-testid="contacts-loading-container">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500" data-testid="contacts-loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen" data-testid="contacts-main-container">
      {/* Header */}
      <div className="flex justify-between items-start mb-8" data-testid="contacts-header-section">
        <div data-testid="contacts-header-content">
          <h1 className="text-3xl font-bold text-slate-800" data-testid="contacts-page-title">{t('contacts:title')}</h1>
          <p className="text-slate-600 mt-2" data-testid="contacts-page-subtitle">{t('contacts:subtitle')}</p>
        </div>
        <Button 
          className="bg-[#4AB831] hover:bg-[#3da127]"
          onClick={() => setIsModalOpen(true)}
          data-testid="contacts-new-contact-button"
        >
          <Plus className="h-4 w-4 mr-2" data-testid="contacts-new-contact-icon" />
          <span data-testid="contacts-new-contact-text">{t('contacts:newContact')}</span>
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6" data-testid="contacts-search-section">
        <div className="relative" data-testid="contacts-search-container">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" data-testid="contacts-search-icon" />
          <Input
            placeholder={t('contacts:searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md bg-white"
            data-testid="contacts-search-input"
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="contacts-grid">
        {filteredContacts.map((contact) => (
          <Link key={contact.id} to={`/dashboard/contacts/${contact.id}`} data-testid="contacts-contact-link">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer" data-testid="contacts-contact-card">
              <CardHeader className="pb-2" data-testid="contacts-card-header">
                <div className="flex items-center space-x-3" data-testid="contacts-contact-info-row">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center" data-testid="contacts-contact-avatar">
                    <User className="h-6 w-6 text-emerald-600" data-testid="contacts-contact-avatar-icon" />
                  </div>
                  <div data-testid="contacts-contact-name-section">
                    <CardTitle className="text-lg font-semibold text-slate-800" data-testid="contacts-contact-name">
                      {contact.firstName} {contact.lastName}
                    </CardTitle>
                    <p className="text-sm text-slate-600" data-testid="contacts-contact-title">{contact.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3" data-testid="contacts-card-content">
                <div className="text-sm text-slate-600" data-testid="contacts-account-row">
                  <span className="font-medium" data-testid="contacts-account-label">{t('contacts:columns.account')}:</span> 
                  <span data-testid="contacts-account-value">{contact.accountName}</span>
                </div>
                
                <div className="flex items-center text-sm text-slate-600" data-testid="contacts-email-row">
                  <Mail className="h-4 w-4 mr-2" data-testid="contacts-email-icon" />
                  <span data-testid="contacts-email-value">{contact.email}</span>
                </div>

                <div className="flex items-center text-sm text-slate-600" data-testid="contacts-phone-row">
                  <Phone className="h-4 w-4 mr-2" data-testid="contacts-phone-icon" />
                  <span data-testid="contacts-phone-value">{contact.phone}</span>
                </div>

                <div className="pt-2 border-t border-slate-100" data-testid="contacts-metadata-section">
                  <div className="text-xs text-slate-500" data-testid="contacts-owner-row">
                    <span data-testid="contacts-owner-label">{t('common:owner')}: </span>
                    <span data-testid="contacts-owner-value">{contact.owner}</span>
                  </div>
                  <div className="text-xs text-slate-500" data-testid="contacts-created-row">
                    <span data-testid="contacts-created-label">{t('common:created')}: </span>
                    <span data-testid="contacts-created-value">{contact.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12" data-testid="contacts-empty-state">
          <p className="text-slate-500" data-testid="contacts-empty-message">{t('contacts:noResults')}</p>
        </div>
      )}

      <NewContactModal 
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onContactCreated={handleContactCreated}
        data-testid="contacts-new-contact-modal"
      />
    </div>
  );
};

export default Contacts;
