
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSampleData, type Contact } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Mail, Phone, User, Building } from "lucide-react";

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Contact not found</h1>
        <Link to="/dashboard/contacts">
          <Button className="mt-4">Back to Contacts</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/dashboard/contacts">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 flex items-center space-x-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {contact.firstName} {contact.lastName}
            </h1>
            <p className="text-slate-600">{contact.title} at {contact.accountName}</p>
          </div>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Edit className="h-4 w-4 mr-2" />
          Edit Contact
        </Button>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-white">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">First Name</label>
                    <p className="font-medium text-slate-800">{contact.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Last Name</label>
                    <p className="font-medium text-slate-800">{contact.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Title</label>
                    <p className="font-medium text-slate-800">{contact.title}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <div>
                      <label className="text-sm font-medium text-slate-600">Email</label>
                      <p className="font-medium text-slate-800">{contact.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <div>
                      <label className="text-sm font-medium text-slate-600">Phone</label>
                      <p className="font-medium text-slate-800">{contact.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Building className="h-4 w-4 text-slate-500" />
                    <div>
                      <label className="text-sm font-medium text-slate-600">Account</label>
                      <p className="font-medium text-slate-800">{contact.accountName}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-slate-600">Owner</label>
                    <p className="font-medium text-slate-800">{contact.owner}</p>
                  </div>
                  <div>
                    <label className="text-slate-600">Created</label>
                    <p className="font-medium text-slate-800">{contact.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 text-center py-8">Activity timeline will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle>Files & Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-500 text-center py-8">File management will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactDetail;
