
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
          content: "To access Leaflet CRM, visit the login page and enter any email address and password (this is a demo system). The login form includes email and password fields with a green 'Sign in' button. After successful login, you'll be redirected to the main dashboard."
        },
        {
          title: "Dashboard Overview",
          content: "The dashboard is your central hub showing key metrics, recent activities, and quick access to all CRM modules. It displays task summary cards, charts for sales performance, and recent items across different modules."
        },
        {
          title: "Navigation and Layout",
          content: "The CRM uses a sidebar navigation on the left with all main modules. The top header includes a search bar for finding accounts, contacts, and opportunities. You can collapse the sidebar using the menu trigger button."
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
          content: "Click the 'New Account' button to create a new company account. Fill in the company name, industry, phone, email, and address details. Accounts represent the companies you do business with."
        },
        {
          title: "Account Details and Management",
          content: "Each account has a detailed view showing company information, associated contacts, opportunities, and activities. You can edit account information, add notes, and track all interactions with the company."
        },
        {
          title: "Account Types and Industries",
          content: "Accounts can be categorized by industry (Technology, Healthcare, Finance, etc.) and type (Customer, Prospect, Partner). This helps in organizing and filtering your account database."
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
          content: "Contacts represent individual people within accounts. Create new contacts by clicking 'New Contact' and filling in personal details, job title, company association, and contact information."
        },
        {
          title: "Contact Communication History",
          content: "Track all communications with contacts including emails, calls, and meetings. The contact detail page shows a complete history of interactions and upcoming scheduled activities."
        },
        {
          title: "Contact Roles and Relationships",
          content: "Contacts can have different roles (Decision Maker, Influencer, User) and can be associated with multiple accounts. Understanding these relationships helps in managing complex sales processes."
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
          content: "Leads are potential customers who have shown interest in your products or services. Qualify leads by gathering information about their needs, budget, timeline, and decision-making process."
        },
        {
          title: "Converting Leads to Opportunities",
          content: "Once a lead is qualified, convert it to an opportunity. This process creates or associates the lead with an account and contact, and starts tracking the sales process."
        },
        {
          title: "Lead Sources and Tracking",
          content: "Track where leads come from (website, referral, trade show, etc.) to understand your most effective marketing channels and optimize your lead generation efforts."
        }
      ]
    },
    {
      id: "opportunities",
      title: "Sales Opportunities",
      icon: Target,
      description: "Managing your sales pipeline",
      articles: [
        {
          title: "Opportunity Stages and Pipeline",
          content: "Opportunities move through stages: Prospecting, Qualification, Proposal, Negotiation, and Closed Won/Lost. Each stage represents progress in the sales process and helps forecast revenue."
        },
        {
          title: "Forecasting and Probability",
          content: "Assign probability percentages to opportunities based on their stage and likelihood to close. This helps in accurate sales forecasting and resource planning."
        },
        {
          title: "Opportunity Management Best Practices",
          content: "Regularly update opportunity stages, maintain accurate close dates and amounts, and document all interactions. Use the activity tracking to ensure consistent follow-up."
        }
      ]
    },
    {
      id: "activities",
      title: "Activities & Tasks",
      icon: Activity,
      description: "Tracking meetings, calls, and tasks",
      articles: [
        {
          title: "Creating and Managing Activities",
          content: "Activities include meetings, calls, emails, and tasks. Create activities from any record (account, contact, opportunity) or from the main activities page. Set due dates, priorities, and assign to team members."
        },
        {
          title: "Activity Types and Scheduling",
          content: "Different activity types serve different purposes: calls for phone conversations, meetings for face-to-face interactions, emails for written communication, and tasks for to-do items."
        },
        {
          title: "Activity Reporting and Follow-up",
          content: "Track completed activities and their outcomes. Use activity reports to measure team productivity and ensure no important follow-ups are missed."
        }
      ]
    },
    {
      id: "cases",
      title: "Case Management",
      icon: HelpCircle,
      description: "Customer support and issue tracking",
      articles: [
        {
          title: "Creating Support Cases",
          content: "Cases track customer issues, support requests, and service tickets. Create cases for customer problems, assign them to support agents, and track resolution progress."
        },
        {
          title: "Case Priority and Status",
          content: "Set case priorities (High, Medium, Low) based on impact and urgency. Track status from New to In Progress to Resolved. Use this to manage support workload effectively."
        },
        {
          title: "Case Resolution and Knowledge Base",
          content: "Document case resolutions to build a knowledge base for future reference. This helps support agents resolve similar issues faster and improves customer service quality."
        }
      ]
    },
    {
      id: "products",
      title: "Product Catalog",
      icon: Package,
      description: "Managing your product and service offerings",
      articles: [
        {
          title: "Product Information Management",
          content: "Maintain a catalog of your products and services with details like name, description, price, and category. This information is used when creating quotes and opportunities."
        },
        {
          title: "Product Categories and Pricing",
          content: "Organize products into categories for easier management. Set standard prices that can be used as defaults in quotes, but allow for custom pricing when needed."
        },
        {
          title: "Product Performance Tracking",
          content: "Track which products are most popular, profitable, and frequently quoted. Use this data to optimize your product offering and focus sales efforts."
        }
      ]
    },
    {
      id: "quotes",
      title: "Quote Management",
      icon: FileText,
      description: "Creating and managing sales quotes",
      articles: [
        {
          title: "Creating Professional Quotes",
          content: "Generate quotes for opportunities including product details, quantities, prices, and terms. Quotes can be customized with your branding and sent directly to prospects."
        },
        {
          title: "Quote Approval Process",
          content: "Set up approval workflows for quotes above certain amounts or with special terms. Track quote status from Draft to Sent to Approved to Accepted."
        },
        {
          title: "Quote Analytics and Conversion",
          content: "Monitor quote conversion rates and identify patterns in accepted vs. rejected quotes. Use this data to improve quote quality and pricing strategies."
        }
      ]
    },
    {
      id: "users",
      title: "User Management",
      icon: Users,
      description: "Managing team members and permissions",
      articles: [
        {
          title: "Adding Team Members",
          content: "Add users to your CRM system by creating user accounts with appropriate roles and permissions. Each user can have different access levels to various modules and data."
        },
        {
          title: "Roles and Permissions",
          content: "Assign roles like Sales Rep, Sales Manager, Support Agent, or Admin. Each role has different permissions for viewing, editing, and deleting records across the system."
        },
        {
          title: "User Activity and Performance",
          content: "Track user activity, login history, and performance metrics. Monitor how team members are using the system and identify training needs or process improvements."
        }
      ]
    },
    {
      id: "settings",
      title: "System Settings",
      icon: Settings,
      description: "Configuring your CRM system",
      articles: [
        {
          title: "General System Configuration",
          content: "Configure basic system settings including company information, time zones, and default values. These settings affect how the system behaves for all users."
        },
        {
          title: "Integration Management",
          content: "Set up integrations with external systems like email platforms, marketing tools, and accounting software. The system supports various integrations to streamline your workflow."
        },
        {
          title: "Data Import and Export",
          content: "Import existing data from other systems using CSV files or direct integrations. Export data for reporting or backup purposes. Maintain data quality through validation rules."
        }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.length > 0
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-slate-600 hover:text-slate-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 border-l border-slate-300"></div>
              <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
              <h1 className="text-xl font-semibold text-slate-900">Help Center</h1>
            </div>
            <Link to="/login" className="text-leaflet-green hover:text-leaflet-green-hover font-medium">
              Login to CRM
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-leaflet-green to-green-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Leaflet CRM Help Center</h1>
          <p className="text-xl opacity-90 mb-8">
            Everything you need to know about using Leaflet CRM effectively
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-200" />
            <Input
              type="text"
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-green-200 focus:bg-white/20"
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
                            <div className="prose prose-slate max-w-none">
                              <p className="text-slate-600 leading-relaxed">{article.content}</p>
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
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-slate-600">
              Need more help? <Link to="/login" className="text-leaflet-green hover:text-leaflet-green-hover">Login to your CRM</Link> or contact our support team.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Help;
