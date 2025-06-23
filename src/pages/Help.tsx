import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, ArrowLeft, Users, Contact, Target, Activity, HelpCircle, Package, FileText, Settings, LayoutDashboard } from "lucide-react";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: LayoutDashboard,
      description: "Learn the basics of using Leaflet CRM",
      articles: [
        {
          title: "How to Login to Leaflet CRM",
          content: (
            <div>
              <p className="mb-4">Getting started with Leaflet CRM is simple and straightforward. Follow these steps to access your CRM dashboard:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Access the Login Page</strong>: Navigate to the login page from the main website or directly visit the login URL</li>
                <li><strong>Demo Credentials</strong>: This is a demonstration system, so you can use any email address and password combination to log in</li>
                <li><strong>Login Process</strong>: 
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Enter any valid email format in the email field</li>
                    <li>Enter any password in the password field</li>
                    <li>Click the green "Sign in" button to proceed</li>
                  </ul>
                </li>
                <li><strong>Automatic Redirect</strong>: After successful authentication, you'll be automatically redirected to the main CRM dashboard</li>
                <li><strong>Security Note</strong>: In a production environment, you would use your actual credentials provided by your system administrator</li>
              </ul>
              <p>The login interface features a clean, professional design with the Leaflet CRM logo and welcoming messaging to ensure a smooth user experience.</p>
            </div>
          )
        },
        {
          title: "Dashboard Overview",
          content: (
            <div>
              <p className="mb-4">The Leaflet CRM dashboard serves as your central command center, providing comprehensive insights into your business operations:</p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li><strong>Key Metrics Display</strong>: View important performance indicators including:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Total number of accounts, contacts, and opportunities</li>
                    <li>Revenue figures and sales performance</li>
                    <li>Task completion rates and productivity metrics</li>
                  </ul>
                </li>
                <li><strong>Visual Charts</strong>: Interactive charts showing:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Sales trends over time</li>
                    <li>Lead conversion rates</li>
                    <li>Revenue forecasting</li>
                    <li>Activity completion statistics</li>
                  </ul>
                </li>
                <li><strong>Recent Activities</strong>: Quick access to:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Latest customer interactions</li>
                    <li>Recent opportunities created or updated</li>
                    <li>Upcoming tasks and appointments</li>
                    <li>New leads and contacts added</li>
                  </ul>
                </li>
                <li><strong>Quick Actions</strong>: One-click access to frequently used functions like creating new records</li>
                <li><strong>Navigation Hub</strong>: Easy access to all CRM modules through the sidebar navigation</li>
              </ul>
              <p>The dashboard is designed to give you a complete overview of your business health at a glance, enabling data-driven decision making.</p>
            </div>
          )
        },
        {
          title: "Navigation and Layout",
          content: (
            <div>
              <p className="mb-4">Understanding the Leaflet CRM interface layout will help you navigate efficiently and maximize your productivity:</p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li><strong>Sidebar Navigation</strong>: Located on the left side, featuring:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>All main CRM modules (Accounts, Contacts, Leads, etc.)</li>
                    <li>Collapsible design to maximize screen space</li>
                    <li>Visual icons for quick module identification</li>
                    <li>Active state highlighting for current location</li>
                  </ul>
                </li>
                <li><strong>Top Header Bar</strong>: Contains essential tools:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Global search functionality for finding records quickly</li>
                    <li>User profile and settings access</li>
                    <li>Notifications and alerts</li>
                    <li>Workspace switching options</li>
                  </ul>
                </li>
                <li><strong>Main Content Area</strong>: Displays:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Module-specific content and data tables</li>
                    <li>Detail views for individual records</li>
                    <li>Form interfaces for creating and editing records</li>
                  </ul>
                </li>
                <li><strong>Responsive Design</strong>: The interface adapts to different screen sizes for optimal viewing on desktop, tablet, and mobile devices</li>
                <li><strong>Menu Trigger</strong>: Use the hamburger menu button to collapse or expand the sidebar as needed</li>
              </ul>
              <p>This layout provides a consistent, intuitive experience across all CRM modules.</p>
            </div>
          )
        }
      ]
    },
    {
      id: "accounts",
      title: "Account Management",
      icon: Users,
      description: "Managing company accounts and organizations",
      articles: [
        {
          title: "Creating New Accounts",
          content: (
            <div>
              <p className="mb-4">Account creation is the foundation of your CRM data structure. Here's how to effectively create and manage company accounts:</p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li><strong>Access Account Creation</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Navigate to the Accounts module from the sidebar</li>
                    <li>Click the "New Account" button in the top-right corner</li>
                    <li>Use the quick-create option from the dashboard</li>
                  </ul>
                </li>
                <li><strong>Required Information</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Company Name</strong>: The official business name</li>
                    <li><strong>Industry</strong>: Select from predefined categories (Technology, Healthcare, Finance, Manufacturing, etc.)</li>
                    <li><strong>Account Type</strong>: Choose Customer, Prospect, Partner, or Vendor</li>
                  </ul>
                </li>
                <li><strong>Contact Details</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Primary phone number and email address</li>
                    <li>Website URL for additional company information</li>
                    <li>Complete mailing address including street, city, state, and ZIP code</li>
                  </ul>
                </li>
                <li><strong>Additional Fields</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Annual revenue estimates</li>
                    <li>Number of employees</li>
                    <li>Company description and notes</li>
                  </ul>
                </li>
                <li><strong>Best Practices</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Use consistent naming conventions</li>
                    <li>Verify company information before saving</li>
                    <li>Add relevant tags for easy filtering and organization</li>
                  </ul>
                </li>
              </ul>
              <p>Properly structured account records serve as the central hub for all related contacts, opportunities, and activities.</p>
            </div>
          )
        },
        {
          title: "Account Detail Views",
          content: (
            <div>
              <p className="mb-4">The account detail view provides a comprehensive overview of all information related to a specific company account:</p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li><strong>Summary Section</strong>: Displays key account information at a glance:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Company name, industry, and account type</li>
                    <li>Primary contact information and website</li>
                    <li>Account owner and creation date</li>
                    <li>Revenue figures and employee count</li>
                  </ul>
                </li>
                <li><strong>Related Records Tabs</strong>: Organized sections for:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Contacts</strong>: All people associated with this account</li>
                    <li><strong>Opportunities</strong>: Active and closed sales opportunities</li>
                    <li><strong>Activities</strong>: Meetings, calls, emails, and tasks</li>
                    <li><strong>Cases</strong>: Support tickets and customer service issues</li>
                  </ul>
                </li>
                <li><strong>Activity Timeline</strong>: Chronological view of all interactions:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Recent communications and meetings</li>
                    <li>Opportunity stage changes and updates</li>
                    <li>Case creation and resolution</li>
                    <li>Contact additions and modifications</li>
                  </ul>
                </li>
                <li><strong>Quick Actions</strong>: Streamlined access to common tasks:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Create new contact for this account</li>
                    <li>Schedule meeting or call</li>
                    <li>Log activity or interaction</li>
                    <li>Create new opportunity</li>
                  </ul>
                </li>
              </ul>
              <p>This centralized view ensures you have all account-related information at your fingertips for effective relationship management.</p>
            </div>
          )
        }
      ]
    },
    {
      id: "contacts",
      title: "Contact Management",
      icon: Contact,
      description: "Managing individual contacts and relationships",
      articles: [
        {
          title: "Adding and Managing Contacts",
          content: (
            <div>
              <p className="mb-4">Effective contact management is crucial for building and maintaining strong business relationships. Here's how to optimize your contact management process:</p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li><strong>Creating New Contacts</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Access the Contacts module from the main navigation</li>
                    <li>Click "New Contact" to open the creation form</li>
                    <li>Link contacts to existing accounts or create new accounts simultaneously</li>
                  </ul>
                </li>
                <li><strong>Essential Contact Information</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Personal Details</strong>: First name, last name, job title, and department</li>
                    <li><strong>Communication Preferences</strong>: Email address, phone numbers (office, mobile, direct line)</li>
                    <li><strong>Professional Information</strong>: Company association, reporting structure, and role</li>
                    <li><strong>Additional Details</strong>: LinkedIn profile, assistant information, and preferred communication methods</li>
                  </ul>
                </li>
                <li><strong>Contact Roles and Responsibilities</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Decision Makers</strong>: Individuals with purchasing authority</li>
                    <li><strong>Influencers</strong>: People who impact buying decisions</li>
                    <li><strong>Users</strong>: End-users of your products or services</li>
                    <li><strong>Champions</strong>: Internal advocates for your solutions</li>
                  </ul>
                </li>
                <li><strong>Data Quality Management</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Regular contact information updates and verification</li>
                    <li>Duplicate contact detection and merging</li>
                    <li>Data enrichment from external sources</li>
                  </ul>
                </li>
                <li><strong>Privacy and Compliance</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>GDPR and data protection compliance</li>
                    <li>Communication consent tracking</li>
                    <li>Opt-out and preference management</li>
                  </ul>
                </li>
              </ul>
              <p>Maintaining accurate, up-to-date contact information ensures effective communication and relationship building.</p>
            </div>
          )
        }
      ]
    },
    {
      id: "leads",
      title: "Lead Management",
      icon: Target,
      description: "Converting prospects into opportunities",
      articles: [
        {
          title: "Lead Qualification Process",
          content: (
            <div>
              <p className="mb-4">Effective lead qualification ensures your sales team focuses on the most promising prospects and maximizes conversion rates:</p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li><strong>Lead Source Tracking</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Inbound Sources</strong>: Website forms, content downloads, webinar registrations</li>
                    <li><strong>Outbound Sources</strong>: Cold calling, email campaigns, trade shows, networking events</li>
                    <li><strong>Referral Sources</strong>: Customer referrals, partner recommendations, employee referrals</li>
                    <li><strong>Digital Marketing</strong>: Social media, search engine marketing, online advertising</li>
                  </ul>
                </li>
                <li><strong>BANT Qualification Framework</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Budget</strong>: Does the prospect have financial resources for your solution?</li>
                    <li><strong>Authority</strong>: Are you speaking with decision-makers or influencers?</li>
                    <li><strong>Need</strong>: Is there a clear business problem your solution addresses?</li>
                    <li><strong>Timeline</strong>: What is the urgency and timeframe for implementation?</li>
                  </ul>
                </li>
                <li><strong>Lead Scoring System</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Demographic scoring based on company size, industry, and role</li>
                    <li>Behavioral scoring from website visits, email engagement, and content consumption</li>
                    <li>Engagement scoring from responses to outreach and meeting participation</li>
                    <li>Progressive scoring updates based on new interactions and information</li>
                  </ul>
                </li>
                <li><strong>Qualification Questions</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Current challenges and pain points</li>
                    <li>Existing solutions and satisfaction levels</li>
                    <li>Decision-making process and stakeholders</li>
                    <li>Implementation requirements and constraints</li>
                  </ul>
                </li>
                <li><strong>Disqualification Criteria</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Budget constraints that cannot be overcome</li>
                    <li>Lack of decision-making authority or influence</li>
                    <li>No clear timeline or urgency for change</li>
                    <li>Poor fit with your solution capabilities</li>
                  </ul>
                </li>
              </ul>
              <p>Systematic lead qualification improves sales efficiency and forecasting accuracy.</p>
            </div>
          )
        }
      ]
    },
    {
      id: "opportunities",
      title: "Opportunity Management",
      icon: Target,
      description: "Managing sales opportunities and deals",
      articles: [
        {
          title: "Creating and Managing Opportunities",
          content: (
            <div>
              <p className="mb-4">Opportunities represent potential sales deals in your pipeline. Proper opportunity management is essential for accurate forecasting and sales success:</p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li><strong>Opportunity Creation</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Navigate to the Opportunities module from the sidebar</li>
                    <li>Click "New Opportunity" to create a new sales opportunity</li>
                    <li>Link opportunities to existing accounts and contacts</li>
                    <li>Convert qualified leads directly into opportunities</li>
                  </ul>
                </li>
                <li><strong>Essential Opportunity Fields</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Opportunity Name</strong>: Descriptive title for the deal</li>
                    <li><strong>Account Association</strong>: Link to the relevant company account</li>
                    <li><strong>Amount</strong>: Estimated deal value in your currency</li>
                    <li><strong>Close Date</strong>: Expected date for deal closure</li>
                    <li><strong>Stage</strong>: Current position in your sales process</li>
                    <li><strong>Probability</strong>: Likelihood of closing (percentage)</li>
                  </ul>
                </li>
                <li><strong>Sales Stage Management</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Prospecting</strong>: Initial contact and relationship building</li>
                    <li><strong>Qualification</strong>: Validating fit and opportunity potential</li>
                    <li><strong>Needs Analysis</strong>: Understanding requirements and pain points</li>
                    <li><strong>Proposal</strong>: Presenting solutions and pricing</li>
                    <li><strong>Negotiation</strong>: Finalizing terms and conditions</li>
                    <li><strong>Closed Won/Lost</strong>: Final outcome tracking</li>
                  </ul>
                </li>
                <li><strong>Opportunity Tracking</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Regular stage updates and probability adjustments</li>
                    <li>Activity logging for all opportunity-related interactions</li>
                    <li>Competitor analysis and positioning</li>
                    <li>Decision criteria and stakeholder mapping</li>
                  </ul>
                </li>
              </ul>
              <p>Consistent opportunity management provides visibility into your sales pipeline and enables accurate revenue forecasting.</p>
            </div>
          )
        }
      ]
    },
    {
      id: "activities",
      title: "Activity Management",
      icon: Activity,
      description: "Tracking tasks, meetings, and communications",
      articles: [
        {
          title: "Logging and Managing Activities",
          content: (
            <div>
              <p className="mb-4">Activities in Leaflet CRM help you track all interactions and tasks related to your customers and prospects:</p>
              <ul className="list-disc pl-6 space-y-3 mb-4">
                <li><strong>Activity Types</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Meetings</strong>: Face-to-face or virtual appointments</li>
                    <li><strong>Phone Calls</strong>: Inbound and outbound communications</li>
                    <li><strong>Emails</strong>: Email correspondence tracking</li>
                    <li><strong>Tasks</strong>: To-do items and follow-up actions</li>
                    <li><strong>Events</strong>: Conferences, trade shows, and networking events</li>
                  </ul>
                </li>
                <li><strong>Creating Activities</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Access the Activities module from the main navigation</li>
                    <li>Use "New Activity" button to create scheduled activities</li>
                    <li>Log completed activities from account or contact records</li>
                    <li>Set reminders and due dates for follow-up actions</li>
                  </ul>
                </li>
                <li><strong>Activity Details</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Subject</strong>: Brief description of the activity</li>
                    <li><strong>Related Records</strong>: Link to accounts, contacts, or opportunities</li>
                    <li><strong>Date and Time</strong>: When the activity occurred or is scheduled</li>
                    <li><strong>Duration</strong>: Length of meetings or calls</li>
                    <li><strong>Notes</strong>: Detailed information about the interaction</li>
                    <li><strong>Outcome</strong>: Results and next steps</li>
                  </ul>
                </li>
                <li><strong>Activity Management Best Practices</strong>:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Log activities immediately after completion</li>
                    <li>Include detailed notes for future reference</li>
                    <li>Set follow-up tasks during or immediately after meetings</li>
                    <li>Use consistent naming conventions for easy searching</li>
                    <li>Regular review of upcoming activities and overdue tasks</li>
                  </ul>
                </li>
              </ul>
              <p>Consistent activity logging provides a complete history of customer interactions and ensures nothing falls through the cracks.</p>
            </div>
          )
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof article.content === 'string' ? article.content : '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.length > 0
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 border-l border-slate-300"></div>
              <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
              <h1 className="text-xl font-semibold text-slate-900">Help Center</h1>
            </div>
            <Button asChild>
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-leaflet-green to-green-500 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Leaflet CRM Help Center</h1>
          <p className="text-xl opacity-90 mb-8">
            Everything you need to know about using Leaflet CRM effectively
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white text-slate-900 placeholder-slate-500 border-slate-300 focus:border-leaflet-green focus:ring-leaflet-green"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-leaflet-green/10 rounded-lg">
                      <Icon className="h-6 w-6 text-leaflet-green" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        {category.articles.length} articles
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Articles */}
        <div className="space-y-8">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id}>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-leaflet-green/10 rounded-lg">
                    <Icon className="h-6 w-6 text-leaflet-green" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{category.title}</h2>
                </div>
                
                <Card>
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      {category.articles.map((article, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`}>
                          <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-slate-50">
                            <span className="font-medium">{article.title}</span>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <div className="prose prose-slate max-w-none text-slate-600">
                              {article.content}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-600">Try adjusting your search terms or browse all categories above.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="px-8 py-10 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
          </div>
          <div className="flex justify-center space-x-8 mb-6">
            <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
              Help
            </Link>
          </div>
          <p className="text-gray-400 text-lg text-center">
            © 2025 Leaflet CRM. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Help;
