
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSampleData, type Contact } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Mail, Phone, User, Building } from "lucide-react";
import EditContactModal from "@/components/modals/EditContactModal";
import { useTranslation } from "react-i18next";

const ContactDetail = () => {
  const { t } = useTranslation(['contacts', 'common']);
  const { id } = useParams();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadContact = () => {
    // First try to load from localStorage
    const storedContacts = localStorage.getItem('crmContacts');
    let foundContact = null;
    
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts).map((contact: any) => ({
        ...contact,
        createdAt: new Date(contact.createdAt)
      }));
      foundContact = parsedContacts.find((con: Contact) => con.id === id);
    }
    
    // If not found in localStorage, try sample data
    if (!foundContact) {
      const data = getSampleData();
      if (data && id) {
        foundContact = data.contacts.find((con: Contact) => con.id === id);
      }
    }
    
    setContact(foundContact || null);
    setLoading(false);
  };

  useEffect(() => {
    loadContact();
  }, [id]);

  const handleContactUpdated = () => {
    loadContact(); // Refresh the contact data when updated
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-success"></div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">{t('notFound')}</h1>
        <Link to="/dashboard/contacts">
          <Button className="mt-4">{t('backToList')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-muted min-h-screen">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/dashboard/contacts">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 flex items-center space-x-4">
          <div className="w-16 h-16 bg-success-muted rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-success-muted-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {contact.firstName} {contact.lastName}
            </h1>
            <p className="text-muted-foreground">{contact.title} at {contact.accountName}</p>
          </div>
        </div>
        <Button 
          className="bg-success text-success-foreground hover:bg-success/90"
          onClick={() => setIsEditModalOpen(true)}
        >
          <Edit className="h-4 w-4 mr-2" />
          {t('edit')}
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-card">
          <TabsTrigger value="details">{t('tabs.details')}</TabsTrigger>
          <TabsTrigger value="timeline">{t('tabs.timeline')}</TabsTrigger>
          <TabsTrigger value="files">{t('tabs.files')}</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="bg-card shadow-sm">
            <CardHeader>
              <CardTitle>{t('sections.contactInfo')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('columns.firstName')}</label>
                    <p className="font-medium text-foreground">{contact.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('columns.lastName')}</label>
                    <p className="font-medium text-foreground">{contact.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">{t('columns.title')}</label>
                    <p className="font-medium text-foreground">{contact.title}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t('columns.email')}</label>
                      <p className="font-medium text-foreground">{contact.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t('columns.phone')}</label>
                      <p className="font-medium text-foreground">{contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">{t('columns.account')}</label>
                      <p className="font-medium text-foreground">{contact.accountName}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-muted-foreground">{t('columns.owner')}</label>
                    <p className="font-medium text-foreground">{contact.owner}</p>
                  </div>
                  <div>
                    <label className="text-muted-foreground">{t('common:created')}</label>
                    <p className="font-medium text-foreground">{contact.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="bg-card shadow-sm">
            <CardHeader>
              <CardTitle>{t('sections.timeline')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">{t('placeholders.timeline')}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card className="bg-card shadow-sm">
            <CardHeader>
              <CardTitle>{t('sections.files')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">{t('placeholders.files')}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EditContactModal 
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        contact={contact}
        onContactUpdated={handleContactUpdated}
      />
    </div>
  );
};

export default ContactDetail;
