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
          content: `Getting started with Leaflet CRM is simple and straightforward. Follow these steps to access your CRM dashboard:

• **Access the Login Page**: Navigate to the login page from the main website or directly visit the login URL
• **Demo Credentials**: This is a demonstration system, so you can use any email address and password combination to log in
• **Login Process**: 
  - Enter any valid email format in the email field
  - Enter any password in the password field
  - Click the green "Sign in" button to proceed
• **Automatic Redirect**: After successful authentication, you'll be automatically redirected to the main CRM dashboard
• **Security Note**: In a production environment, you would use your actual credentials provided by your system administrator

The login interface features a clean, professional design with the Leaflet CRM logo and welcoming messaging to ensure a smooth user experience.`
        },
        {
          title: "Dashboard Overview",
          content: `The Leaflet CRM dashboard serves as your central command center, providing comprehensive insights into your business operations:

• **Key Metrics Display**: View important performance indicators including:
  - Total number of accounts, contacts, and opportunities
  - Revenue figures and sales performance
  - Task completion rates and productivity metrics
• **Visual Charts**: Interactive charts showing:
  - Sales trends over time
  - Lead conversion rates
  - Revenue forecasting
  - Activity completion statistics
• **Recent Activities**: Quick access to:
  - Latest customer interactions
  - Recent opportunities created or updated
  - Upcoming tasks and appointments
  - New leads and contacts added
• **Quick Actions**: One-click access to frequently used functions like creating new records
• **Navigation Hub**: Easy access to all CRM modules through the sidebar navigation

The dashboard is designed to give you a complete overview of your business health at a glance, enabling data-driven decision making.`
        },
        {
          title: "Navigation and Layout",
          content: `Understanding the Leaflet CRM interface layout will help you navigate efficiently and maximize your productivity:

• **Sidebar Navigation**: Located on the left side, featuring:
  - All main CRM modules (Accounts, Contacts, Leads, etc.)
  - Collapsible design to maximize screen space
  - Visual icons for quick module identification
  - Active state highlighting for current location
• **Top Header Bar**: Contains essential tools:
  - Global search functionality for finding records quickly
  - User profile and settings access
  - Notifications and alerts
  - Workspace switching options
• **Main Content Area**: Displays:
  - Module-specific content and data tables
  - Detail views for individual records
  - Form interfaces for creating and editing records
• **Responsive Design**: The interface adapts to different screen sizes for optimal viewing on desktop, tablet, and mobile devices
• **Menu Trigger**: Use the hamburger menu button to collapse or expand the sidebar as needed

This layout provides a consistent, intuitive experience across all CRM modules.`
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
          content: `Account creation is the foundation of your CRM data structure. Here's how to effectively create and manage company accounts:

• **Access Account Creation**:
  - Navigate to the Accounts module from the sidebar
  - Click the "New Account" button in the top-right corner
  - Use the quick-create option from the dashboard
• **Required Information**:
  - **Company Name**: The official business name
  - **Industry**: Select from predefined categories (Technology, Healthcare, Finance, Manufacturing, etc.)
  - **Account Type**: Choose Customer, Prospect, Partner, or Vendor
• **Contact Details**:
  - Primary phone number and email address
  - Website URL for additional company information
  - Complete mailing address including street, city, state, and ZIP code
• **Additional Fields**:
  - Annual revenue estimates
  - Number of employees
  - Company description and notes
• **Best Practices**:
  - Use consistent naming conventions
  - Verify company information before saving
  - Add relevant tags for easy filtering and organization

Properly structured account records serve as the central hub for all related contacts, opportunities, and activities.`
        },
        {
          title: "Account Details and Management",
          content: `The account detail view provides comprehensive information and management capabilities for each company in your database:

• **Account Overview Section**:
  - Complete company profile with all basic information
  - Industry classification and account type
  - Key financial indicators and company size
  - Primary contact information and website links
• **Related Records Management**:
  - **Associated Contacts**: View all individuals within the company
  - **Opportunities**: Track active and historical sales opportunities
  - **Activities**: Monitor all interactions, meetings, and communications
  - **Cases**: Access customer support tickets and service requests
• **Interaction History**:
  - Chronological timeline of all customer touchpoints
  - Email communications and call logs
  - Meeting notes and follow-up actions
  - Document attachments and file sharing
• **Account Health Indicators**:
  - Engagement scores and activity levels
  - Revenue contribution and growth trends
  - Relationship strength assessment
• **Action Items**:
  - Schedule follow-up activities
  - Create new opportunities or quotes
  - Add notes and update account status

This centralized view enables comprehensive account relationship management and strategic decision-making.`
        },
        {
          title: "Account Types and Industries",
          content: `Proper categorization of accounts enables better organization, reporting, and strategic analysis of your business relationships:

• **Account Types Classification**:
  - **Customers**: Companies that have purchased your products or services
  - **Prospects**: Potential customers in various stages of the sales process
  - **Partners**: Strategic business partners, resellers, or channel partners
  - **Vendors**: Suppliers or service providers to your organization
• **Industry Categorization**:
  - **Technology**: Software, hardware, IT services, and tech startups
  - **Healthcare**: Hospitals, clinics, pharmaceutical, and medical device companies
  - **Finance**: Banks, insurance companies, investment firms, and financial services
  - **Manufacturing**: Production companies, industrial equipment, and supply chain
  - **Retail**: E-commerce, brick-and-mortar stores, and consumer goods
  - **Education**: Schools, universities, training organizations, and educational technology
• **Benefits of Proper Classification**:
  - Targeted marketing campaigns and messaging
  - Industry-specific sales strategies and approaches
  - Accurate market segmentation and analysis
  - Customized product offerings and pricing strategies
• **Reporting and Analytics**:
  - Revenue breakdown by industry and account type
  - Performance metrics across different segments
  - Market penetration analysis and opportunity identification

Strategic account categorization supports data-driven business development and market expansion efforts.`
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
          content: `Effective contact management is crucial for building and maintaining strong business relationships. Here's how to optimize your contact management process:

• **Creating New Contacts**:
  - Access the Contacts module from the main navigation
  - Click "New Contact" to open the creation form
  - Link contacts to existing accounts or create new accounts simultaneously
• **Essential Contact Information**:
  - **Personal Details**: First name, last name, job title, and department
  - **Communication Preferences**: Email address, phone numbers (office, mobile, direct line)
  - **Professional Information**: Company association, reporting structure, and role
  - **Additional Details**: LinkedIn profile, assistant information, and preferred communication methods
• **Contact Roles and Responsibilities**:
  - **Decision Makers**: Individuals with purchasing authority
  - **Influencers**: People who impact buying decisions
  - **Users**: End-users of your products or services
  - **Champions**: Internal advocates for your solutions
• **Data Quality Management**:
  - Regular contact information updates and verification
  - Duplicate contact detection and merging
  - Data enrichment from external sources
• **Privacy and Compliance**:
  - GDPR and data protection compliance
  - Communication consent tracking
  - Opt-out and preference management

Maintaining accurate, up-to-date contact information ensures effective communication and relationship building.`
        },
        {
          title: "Contact Communication History",
          content: `Tracking and analyzing communication history provides valuable insights for relationship management and sales effectiveness:

• **Communication Tracking Features**:
  - **Email Integration**: Automatic logging of email conversations and attachments
  - **Call Logging**: Manual and automatic call recording with duration and outcomes
  - **Meeting Notes**: Detailed records of face-to-face and virtual meetings
  - **Social Media Interactions**: LinkedIn messages and social selling activities
• **Activity Timeline View**:
  - Chronological display of all interactions
  - Filter by activity type, date range, and team member
  - Visual indicators for different communication channels
  - Priority marking for important conversations
• **Communication Analytics**:
  - Response rates and engagement metrics
  - Preferred communication channels by contact
  - Frequency of interactions and relationship strength
  - Conversion rates from communications to opportunities
• **Follow-up Management**:
  - Automated reminders for pending responses
  - Scheduled follow-up activities and tasks
  - Escalation procedures for unresponsive contacts
• **Team Collaboration**:
  - Shared communication history across team members
  - Handoff procedures and contact ownership transfers
  - Communication strategy coordination

Comprehensive communication tracking enables personalized relationship management and improved customer experience.`
        },
        {
          title: "Contact Roles and Relationships",
          content: `Understanding and mapping contact relationships within organizations is essential for complex B2B sales processes and account management:

• **Role Identification and Classification**:
  - **Economic Buyer**: Final decision-maker with budget authority
  - **Technical Evaluator**: Assesses technical requirements and specifications
  - **Business User**: Day-to-day users of your solution
  - **Coach**: Internal ally who provides guidance and insight
  - **Gatekeeper**: Controls access to key decision-makers
• **Relationship Mapping**:
  - Organizational charts and reporting structures
  - Influence networks and informal relationships
  - Cross-departmental connections and collaborations
  - External advisor and consultant relationships
• **Multi-Account Relationships**:
  - Contacts working across multiple companies
  - Vendor-client relationships between accounts
  - Partnership and alliance connections
  - Industry network and professional associations
• **Stakeholder Analysis**:
  - Influence level assessment (High, Medium, Low)
  - Support level for your solutions (Champion, Supporter, Neutral, Skeptic)
  - Involvement in decision-making process
  - Personal and professional motivations
• **Relationship Strategy Development**:
  - Targeted engagement plans for each stakeholder
  - Influence mapping and coalition building
  - Risk mitigation for key relationship dependencies
  - Succession planning for role changes

Strategic relationship mapping enables more effective sales strategies and account penetration.`
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
          content: `Effective lead qualification ensures your sales team focuses on the most promising prospects and maximizes conversion rates:

• **Lead Source Tracking**:
  - **Inbound Sources**: Website forms, content downloads, webinar registrations
  - **Outbound Sources**: Cold calling, email campaigns, trade shows, networking events
  - **Referral Sources**: Customer referrals, partner recommendations, employee referrals
  - **Digital Marketing**: Social media, search engine marketing, online advertising
• **BANT Qualification Framework**:
  - **Budget**: Does the prospect have financial resources for your solution?
  - **Authority**: Are you speaking with decision-makers or influencers?
  - **Need**: Is there a clear business problem your solution addresses?
  - **Timeline**: What is the urgency and timeframe for implementation?
• **Lead Scoring System**:
  - Demographic scoring based on company size, industry, and role
  - Behavioral scoring from website visits, email engagement, and content consumption
  - Engagement scoring from responses to outreach and meeting participation
  - Progressive scoring updates based on new interactions and information
• **Qualification Questions**:
  - Current challenges and pain points
  - Existing solutions and satisfaction levels
  - Decision-making process and stakeholders
  - Implementation requirements and constraints
• **Disqualification Criteria**:
  - Budget constraints that cannot be overcome
  - Lack of decision-making authority or influence
  - No clear timeline or urgency for change
  - Poor fit with your solution capabilities

Systematic lead qualification improves sales efficiency and forecasting accuracy.`
        },
        {
          title: "Converting Leads to Opportunities",
          content: `The lead conversion process transforms qualified prospects into active sales opportunities with proper account and contact association:

• **Conversion Criteria Assessment**:
  - Lead has been properly qualified using BANT or similar framework
  - Budget availability confirmed or strongly indicated
  - Decision-making process and timeline established
  - Technical and business requirements understood
• **Account Creation or Association**:
  - **New Account Creation**: For leads from companies not in your database
  - **Existing Account Association**: Linking leads to current customer or prospect accounts
  - **Account Verification**: Ensuring accurate company information and avoiding duplicates
  - **Account Type Assignment**: Classifying as prospect, customer, or partner
• **Contact Record Management**:
  - Creating detailed contact profiles with complete information
  - Establishing role and influence within the organization
  - Linking to appropriate account and organizational structure
  - Setting communication preferences and contact methods
• **Opportunity Creation Process**:
  - Defining opportunity scope, value, and timeline
  - Setting appropriate sales stage and probability
  - Assigning sales team members and ownership
  - Establishing next steps and milestone activities
• **Data Transfer and Enrichment**:
  - Transferring all lead interaction history to the new opportunity
  - Adding additional research and competitive intelligence
  - Documenting qualification notes and key requirements
  - Setting up tracking for opportunity progression

Proper conversion ensures no information is lost and sales momentum is maintained.`
        },
        {
          title: "Lead Sources and Tracking",
          content: `Comprehensive lead source tracking provides valuable insights for marketing optimization and ROI measurement across all channels:

• **Digital Marketing Channels**:
  - **Website Traffic**: Organic search, direct visits, and referral traffic conversion
  - **Content Marketing**: Blog posts, whitepapers, case studies, and educational resources
  - **Social Media**: LinkedIn, Twitter, Facebook, and industry-specific platforms
  - **Email Marketing**: Newsletter campaigns, nurture sequences, and promotional emails
  - **Paid Advertising**: Google Ads, social media advertising, and display advertising
• **Traditional Marketing Channels**:
  - **Trade Shows and Events**: Industry conferences, networking events, and exhibitions
  - **Print Advertising**: Industry publications, magazines, and trade journals
  - **Direct Mail**: Targeted mailings and promotional materials
  - **Cold Outreach**: Phone calls, emails, and in-person visits
• **Channel Performance Analytics**:
  - **Conversion Rates**: Lead to opportunity and opportunity to customer conversion
  - **Cost Per Lead**: Marketing investment divided by leads generated
  - **Customer Acquisition Cost**: Total cost to acquire new customers by channel
  - **Lifetime Value**: Revenue generated from customers acquired through each source
• **Attribution Modeling**:
  - First-touch attribution for initial awareness creation
  - Last-touch attribution for final conversion drivers
  - Multi-touch attribution for comprehensive journey analysis
  - Time-decay attribution for recency-weighted influence
• **ROI Optimization Strategies**:
  - Budget reallocation based on performance metrics
  - Channel-specific messaging and campaign optimization
  - Lead nurturing strategies for lower-performing sources
  - Integration of high-performing channels for maximum impact

Data-driven lead source analysis enables strategic marketing investment and improved lead generation efficiency.`
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
          content: `A well-structured sales pipeline with clearly defined stages provides predictable revenue forecasting and effective sales management:

• **Standard Sales Stages**:
  - **Prospecting (10% probability)**: Initial contact and interest identification
  - **Qualification (25% probability)**: BANT qualification and needs assessment
  - **Proposal (50% probability)**: Solution presentation and formal proposal submission
  - **Negotiation (75% probability)**: Contract terms discussion and objection handling
  - **Closed Won (100% probability)**: Deal successfully completed and contract signed
  - **Closed Lost (0% probability)**: Opportunity lost with documented reasons
• **Stage Progression Criteria**:
  - Clear exit criteria for advancing to next stage
  - Required activities and deliverables for each stage
  - Stakeholder engagement and approval checkpoints
  - Technical and business validation milestones
• **Pipeline Management Best Practices**:
  - Regular pipeline reviews and stage validation
  - Opportunity aging and stagnation monitoring
  - Forecast accuracy tracking and improvement
  - Resource allocation based on pipeline health
• **Activity Tracking by Stage**:
  - Discovery calls and needs assessment meetings
  - Demonstration and proof-of-concept activities
  - Proposal development and presentation
  - Contract negotiation and legal review
• **Pipeline Analytics and Reporting**:
  - Stage conversion rates and velocity metrics
  - Average deal size and sales cycle length
  - Win/loss analysis and competitive intelligence
  - Individual and team performance comparisons

Consistent pipeline management drives predictable revenue growth and sales team effectiveness.`
        },
        {
          title: "Forecasting and Probability",
          content: `Accurate sales forecasting relies on realistic probability assessment and systematic opportunity evaluation for reliable revenue planning:

• **Probability Assignment Guidelines**:
  - **Stage-Based Probability**: Default percentages based on sales stage progression
  - **Activity-Based Probability**: Adjustments based on completed milestone activities
  - **Stakeholder-Based Probability**: Increases with decision-maker engagement and support
  - **Competitive-Based Probability**: Adjustments based on competitive landscape and positioning
• **Forecasting Methodologies**:
  - **Pipeline Forecasting**: Opportunity value multiplied by probability percentage
  - **Historical Forecasting**: Trend analysis based on past performance data
  - **Bottom-Up Forecasting**: Individual opportunity assessment aggregated to team level
  - **Top-Down Forecasting**: Market-based projections allocated to individual contributors
• **Forecast Accuracy Factors**:
  - Sales cycle length and seasonality patterns
  - Deal size and complexity considerations
  - Customer decision-making process and timeline
  - Economic conditions and market dynamics
• **Probability Adjustment Triggers**:
  - Stakeholder changes or organizational restructuring
  - Budget approval or constraint developments
  - Competitive wins or losses in the account
  - Technical evaluation results and feedback
• **Forecast Review and Management**:
  - Weekly pipeline reviews with individual salespeople
  - Monthly forecast submissions and variance analysis
  - Quarterly business reviews and plan adjustments
  - Annual strategic planning and target setting

Disciplined forecasting processes enable accurate business planning and resource allocation.`
        },
        {
          title: "Opportunity Management Best Practices",
          content: `Systematic opportunity management ensures consistent sales execution and maximizes win rates through disciplined processes and activities:

• **Opportunity Planning and Strategy**:
  - **Account Research**: Comprehensive company and industry analysis
  - **Stakeholder Mapping**: Identification of all decision-makers and influencers
  - **Competitive Analysis**: Understanding of competitive landscape and positioning
  - **Value Proposition Development**: Customized messaging and business case creation
• **Activity Management and Execution**:
  - **Meeting Preparation**: Agenda development and objective setting for all interactions
  - **Follow-up Discipline**: Timely responses and commitment fulfillment
  - **Documentation Standards**: Detailed activity logging and outcome recording
  - **Milestone Tracking**: Progress monitoring against sales methodology checkpoints
• **Risk Assessment and Mitigation**:
  - **Technical Risks**: Solution fit and implementation challenges
  - **Commercial Risks**: Pricing, terms, and competitive pressure
  - **Relationship Risks**: Stakeholder support and internal champion strength
  - **Timeline Risks**: Decision process delays and external factors
• **Collaboration and Team Selling**:
  - **Internal Resource Coordination**: Sales engineering, product management, and executive involvement
  - **Customer Team Engagement**: Multi-level relationship building and meeting facilitation
  - **Partner Collaboration**: Channel partner and strategic alliance leverage
  - **Cross-functional Support**: Marketing, legal, and implementation team coordination
• **Performance Optimization**:
  - Regular opportunity reviews and coaching sessions
  - Win/loss analysis and lesson learned documentation
  - Sales methodology adherence and skill development
  - Technology utilization and process improvement

Consistent application of best practices drives higher win rates and shorter sales cycles.`
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
          content: `Effective activity management ensures no important interactions or tasks fall through the cracks while maintaining comprehensive relationship history:

• **Activity Types and Purposes**:
  - **Meetings**: Face-to-face, virtual, and conference calls with customers and prospects
  - **Phone Calls**: Inbound and outbound calls with duration and outcome tracking
  - **Emails**: Important email communications requiring follow-up or documentation
  - **Tasks**: To-do items, internal activities, and personal reminders
• **Activity Creation Methods**:
  - Direct creation from any record (account, contact, opportunity, or case)
  - Quick-add from the global activity center
  - Automatic creation from email integration and calendar synchronization
  - Bulk activity creation for campaign follow-ups and mass communications
• **Essential Activity Information**:
  - **Subject and Description**: Clear, descriptive titles and detailed notes
  - **Date and Time**: Scheduled or completed activity timestamps
  - **Participants**: Primary contact and additional attendees
  - **Priority Level**: High, medium, or low priority classification
  - **Status Tracking**: Not started, in progress, completed, or deferred
• **Assignment and Ownership**:
  - Individual assignment to team members
  - Shared ownership for collaborative activities
  - Automatic assignment based on account or territory ownership
  - Delegation capabilities with notification systems
• **Activity Outcomes and Follow-up**:
  - Result documentation and next step identification
  - Automatic creation of follow-up activities
  - Integration with opportunity progression and sales stages

Systematic activity management drives consistent customer engagement and relationship development.`
        },
        {
          title: "Activity Types and Scheduling",
          content: `Strategic activity planning and scheduling optimizes customer interactions and ensures productive use of sales and service resources:

• **Inbound Activity Management**:
  - **Customer Inquiries**: Response time tracking and resolution documentation
  - **Support Requests**: Technical questions and service issue routing
  - **Information Requests**: Product questions and sales inquiry handling
  - **Referral Contacts**: Warm introductions and partner-generated leads
• **Outbound Activity Planning**:
  - **Prospecting Calls**: Cold outreach and lead generation activities
  - **Follow-up Communications**: Post-meeting and post-proposal follow-ups
  - **Relationship Building**: Regular check-ins and relationship maintenance
  - **Renewal Discussions**: Contract renewal and expansion conversations
• **Scheduling Best Practices**:
  - **Time Blocking**: Dedicated periods for different activity types
  - **Calendar Integration**: Two-way sync with Outlook, Google Calendar, and other systems
  - **Buffer Time**: Adequate preparation and travel time between activities
  - **Priority Sequencing**: High-value activities scheduled during peak productivity hours
• **Activity Preparation Standards**:
  - Research and background preparation before customer interactions
  - Agenda development and objective setting for meetings
  - Resource preparation including presentations and demonstrations
  - Team coordination for multi-person customer meetings
• **Efficiency Optimization**:
  - Geographic clustering of field visits and meetings
  - Virtual meeting utilization for routine check-ins
  - Batch processing of similar activity types
  - Automated scheduling for routine activities and follow-ups

Well-planned activity scheduling maximizes customer face time and relationship building opportunities.`
        },
        {
          title: "Activity Reporting and Follow-up",
          content: `Comprehensive activity tracking and analysis provides insights for performance improvement and ensures consistent customer relationship management:

• **Activity Completion Documentation**:
  - **Outcome Recording**: Detailed results and key discussion points
  - **Next Steps Identification**: Clear action items for both parties
  - **Follow-up Scheduling**: Automatic creation of subsequent activities
  - **File Attachments**: Meeting notes, presentations, and relevant documents
• **Performance Metrics and KPIs**:
  - **Activity Volume**: Total activities completed by type and time period
  - **Response Rates**: Customer engagement and interaction success rates
  - **Conversion Metrics**: Activities leading to opportunities and closed deals
  - **Efficiency Ratios**: Activities per account and time utilization analysis
• **Team Performance Analysis**:
  - Individual contributor activity levels and outcomes
  - Team benchmarking and best practice identification
  - Coaching opportunities based on activity patterns
  - Resource allocation optimization across team members
• **Customer Engagement Insights**:
  - Preferred communication channels and timing
  - Response patterns and engagement frequency
  - Relationship strength indicators and interaction quality
  - Account penetration levels and stakeholder coverage
• **Follow-up Management Systems**:
  - Automated reminder notifications for pending follow-ups
  - Escalation procedures for overdue activities
  - Priority-based task management and queue organization
  - Integration with calendar and email systems for seamless workflow

Data-driven activity management drives continuous improvement in customer engagement effectiveness.`
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
          content: `Efficient case creation ensures customer issues are properly documented, routed, and resolved in a timely manner:

• **Case Origination Channels**:
  - **Customer Portal**: Self-service case submission with automated ticket generation
  - **Email Integration**: Automatic case creation from support email addresses
  - **Phone Calls**: Manual case creation during support conversations
  - **Internal Escalation**: Cases created by sales or account management teams
• **Essential Case Information**:
  - **Customer Details**: Account and contact association with complete customer profile
  - **Issue Description**: Detailed problem description with steps to reproduce
  - **Product Information**: Affected products, versions, and configuration details
  - **Business Impact**: Severity assessment and operational impact description
• **Case Classification System**:
  - **Category**: Technical, billing, general inquiry, or feature request
  - **Type**: Bug report, how-to question, configuration issue, or enhancement request
  - **Priority Matrix**: Based on impact (high, medium, low) and urgency (critical, high, medium, low)
  - **Complexity Level**: Simple, moderate, or complex based on resolution requirements
• **Automatic Routing and Assignment**:
  - Skill-based routing to appropriate support agents
  - Geographic routing for regional support requirements
  - Escalation triggers for high-priority or complex issues
  - Load balancing across available support resources
• **Customer Communication**:
  - Automatic case confirmation and reference number generation
  - Regular status updates and progress communications
  - Resolution notification and customer satisfaction surveys

Systematic case creation provides the foundation for effective customer support delivery.`
        },
        {
          title: "Case Priority and Status",
          content: `Strategic case prioritization and status management ensures critical issues receive appropriate attention while maintaining overall service quality:

• **Priority Level Framework**:
  - **Critical (P1)**: System down, business-stopping issues requiring immediate response
  - **High (P2)**: Major functionality impaired with significant business impact
  - **Medium (P3)**: Minor functionality issues with moderate business impact
  - **Low (P4)**: General questions, requests, and non-urgent issues
• **Status Progression Workflow**:
  - **New**: Recently created cases awaiting initial triage and assignment
  - **Assigned**: Cases allocated to specific support agents for resolution
  - **In Progress**: Active investigation and resolution work in progress
  - **Pending Customer**: Awaiting customer response or additional information
  - **Resolved**: Issue addressed with solution provided to customer
  - **Closed**: Customer confirmed resolution and case officially closed
• **Service Level Agreements (SLAs)**:
  - **Response Time SLAs**: Initial response commitments by priority level
  - **Resolution Time SLAs**: Target resolution timeframes for different issue types
  - **Communication SLAs**: Update frequency requirements for ongoing cases
  - **Escalation Triggers**: Automatic escalation when SLAs are approaching breach
• **Case Management Best Practices**:
  - Regular case review and priority reassessment
  - Clear handoff procedures for shift changes and team transfers
  - Escalation path documentation and management approval processes
  - Customer notification protocols for priority and status changes
• **Performance Monitoring**:
  - SLA compliance tracking and reporting
  - Agent workload management and capacity planning
  - Customer satisfaction scores and feedback analysis
  - Case volume trends and pattern identification

Effective priority and status management ensures optimal resource utilization and customer satisfaction.`
        },
        {
          title: "Case Resolution and Knowledge Base",
          content: `Systematic case resolution and knowledge management drives continuous improvement in support efficiency and customer satisfaction:

• **Resolution Process Framework**:
  - **Problem Analysis**: Root cause identification and impact assessment
  - **Solution Development**: Resolution approach planning and resource coordination
  - **Implementation**: Solution deployment and customer communication
  - **Verification**: Customer confirmation of resolution effectiveness
• **Knowledge Base Development**:
  - **Solution Documentation**: Step-by-step resolution procedures for common issues
  - **Troubleshooting Guides**: Diagnostic workflows and problem isolation techniques
  - **FAQ Creation**: Frequently asked questions with detailed answers
  - **Best Practices**: Recommended approaches and configuration guidelines
• **Knowledge Article Management**:
  - **Article Creation**: Structured templates for consistent knowledge capture
  - **Peer Review**: Quality assurance and accuracy validation processes
  - **Version Control**: Update tracking and historical version management
  - **Access Control**: Role-based permissions for viewing and editing
• **Self-Service Enablement**:
  - Customer portal integration with searchable knowledge base
  - Community forums and user-generated content
  - Video tutorials and interactive guides
  - Mobile-friendly access and responsive design
• **Continuous Improvement**:
  - **Case Trend Analysis**: Pattern identification for systemic issues
  - **Knowledge Gap Identification**: Areas requiring additional documentation
  - **Customer Feedback Integration**: User experience and content effectiveness
  - **Search Analytics**: Content utilization and optimization opportunities

Strategic knowledge management transforms support cases into valuable organizational assets for improved customer service.`
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
          content: `Comprehensive product information management provides the foundation for effective sales, marketing, and customer service operations:

• **Core Product Data**:
  - **Product Names and Descriptions**: Clear, descriptive titles and detailed feature descriptions
  - **Product Codes and SKUs**: Unique identifiers for inventory and order management
  - **Category Classification**: Hierarchical organization for easy browsing and filtering
  - **Product Images and Documentation**: Visual assets and technical specifications
• **Pricing and Cost Management**:
  - **List Prices**: Standard pricing across different market segments
  - **Cost Information**: Product costs for margin analysis and profitability tracking
  - **Discount Structures**: Volume discounts, promotional pricing, and special offers
  - **Currency Support**: Multi-currency pricing for global market operations
• **Product Lifecycle Management**:
  - **Launch Dates**: Product introduction and market availability timing
  - **Status Tracking**: Active, discontinued, or end-of-life product status
  - **Version Control**: Product updates, revisions, and compatibility information
  - **Replacement Products**: Upgrade paths and successor product identification
• **Technical Specifications**:
  - **Feature Lists**: Detailed capability descriptions and technical requirements
  - **Compatibility Information**: System requirements and integration specifications
  - **Service Terms**: Warranty, support, and maintenance agreement details
  - **Regulatory Compliance**: Certifications, standards, and legal requirements
• **Sales Enablement**:
  - **Competitive Analysis**: Positioning against competitor products
  - **Sales Collateral**: Datasheets, presentations, and proposal templates
  - **Training Materials**: Product knowledge and sales technique resources

Well-organized product information enables effective sales conversations and accurate quoting.`
        },
        {
          title: "Product Categories and Pricing",
          content: `Strategic product organization and pricing management supports sales effectiveness and profitability optimization across your entire product portfolio:

• **Category Hierarchy Structure**:
  - **Primary Categories**: Major product lines and business divisions
  - **Subcategories**: Specific product families and solution areas
  - **Product Groups**: Related products often sold together
  - **Cross-Category Relationships**: Complementary and dependent product connections
• **Pricing Strategy Framework**:
  - **Value-Based Pricing**: Pricing based on customer value and ROI
  - **Competitive Pricing**: Market positioning relative to competitor offerings
  - **Cost-Plus Pricing**: Margin-based pricing with consistent profitability targets
  - **Dynamic Pricing**: Market-responsive pricing with regular adjustments
• **Price List Management**:
  - **Standard Price Lists**: Default pricing for different customer segments
  - **Regional Pricing**: Geographic variations based on local market conditions
  - **Volume Pricing**: Quantity-based discounts and tier structures
  - **Customer-Specific Pricing**: Negotiated pricing for key accounts and partners
• **Promotion and Discount Management**:
  - **Time-Limited Offers**: Seasonal promotions and limited-time discounts
  - **Bundle Pricing**: Package deals and solution-based pricing
  - **Loyalty Discounts**: Repeat customer and long-term contract incentives
  - **Channel Pricing**: Partner and reseller pricing structures
• **Pricing Analytics and Optimization**:
  - **Price Performance Analysis**: Revenue and margin impact of pricing decisions
  - **Competitive Price Monitoring**: Market positioning and adjustment opportunities
  - **Customer Price Sensitivity**: Demand elasticity and optimization opportunities
  - **Profitability Analysis**: Product-level and customer-level margin assessment

Strategic pricing management maximizes revenue while maintaining competitive market position.`
        },
        {
          title: "Product Performance Tracking",
          content: `Comprehensive product performance analysis provides insights for strategic product management and market development decisions:

• **Sales Performance Metrics**:
  - **Revenue Analysis**: Total revenue by product, time period, and market segment
  - **Unit Sales Tracking**: Volume sales and market penetration analysis
  - **Growth Trends**: Year-over-year and quarter-over-quarter performance comparison
  - **Market Share Analysis**: Competitive position and market penetration assessment
• **Profitability Analysis**:
  - **Gross Margin Tracking**: Product-level profitability and contribution analysis
  - **Cost Analysis**: Direct costs, overhead allocation, and total cost assessment
  - **Price Realization**: Actual selling prices versus list prices and discount impact
  - **Customer Profitability**: Profit contribution by customer segment and account
• **Product Adoption Metrics**:
  - **Customer Penetration**: Percentage of customers using each product
  - **Cross-Selling Success**: Products sold together and bundle performance
  - **Customer Retention**: Repeat purchase rates and customer lifetime value
  - **Market Segment Performance**: Product success across different market segments
• **Competitive Intelligence**:
  - **Win/Loss Analysis**: Product performance in competitive situations
  - **Feature Comparison**: Product capability assessment against competitors
  - **Market Positioning**: Brand perception and competitive advantage analysis
  - **Pricing Competitiveness**: Price positioning and value proposition effectiveness
• **Product Optimization Opportunities**:
  - **Portfolio Rationalization**: Underperforming product identification and strategy
  - **Feature Enhancement**: Customer feedback and improvement prioritization
  - **Market Expansion**: Geographic and segment growth opportunities
  - **New Product Development**: Gap analysis and innovation opportunities

Data-driven product performance tracking enables strategic product portfolio management and market optimization.`
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
          content: `Professional quote creation combines accurate pricing with compelling presentation to maximize conversion rates and customer satisfaction:

• **Quote Creation Process**:
  - **Opportunity Association**: Link quotes to specific sales opportunities for tracking
  - **Customer Information**: Complete billing and shipping address details
  - **Product Selection**: Add products from catalog with quantities and configurations
  - **Pricing Application**: Apply standard pricing, discounts, and special terms
• **Quote Components and Structure**:
  - **Header Information**: Quote number, date, validity period, and customer details
  - **Line Items**: Detailed product descriptions, quantities, unit prices, and extensions
  - **Pricing Summary**: Subtotals, taxes, shipping costs, and total quote value
  - **Terms and Conditions**: Payment terms, delivery schedules, and legal provisions
• **Customization and Branding**:
  - **Company Branding**: Logo placement, color schemes, and brand consistency
  - **Custom Messaging**: Personalized cover letters and value proposition statements
  - **Product Information**: Technical specifications, benefits, and supporting documentation
  - **Visual Elements**: Product images, charts, and professional formatting
• **Pricing Management**:
  - **Discount Authorization**: Approval workflows for special pricing and terms
  - **Margin Protection**: Minimum margin enforcement and profitability alerts
  - **Currency Handling**: Multi-currency support and exchange rate management
  - **Tax Calculation**: Automatic tax computation based on customer location
• **Delivery and Distribution**:
  - **Electronic Delivery**: PDF generation and secure email distribution
  - **Customer Portal**: Online quote access and review capabilities
  - **Revision Management**: Version control and change tracking for quote updates

Professional quote presentation reflects company credibility and attention to customer needs.`
        },
        {
          title: "Quote Approval Process",
          content: `Systematic quote approval processes ensure pricing consistency, margin protection, and risk management while maintaining sales velocity:

• **Approval Workflow Design**:
  - **Authority Levels**: Tiered approval based on quote value and discount percentage
  - **Role-Based Permissions**: Sales managers, directors, and executive approval requirements
  - **Exception Handling**: Special circumstances and escalation procedures
  - **Parallel Approvals**: Multiple approvers for complex deals and enterprise sales
• **Approval Triggers and Criteria**:
  - **Discount Thresholds**: Automatic routing for discounts exceeding standard levels
  - **Deal Size**: Large opportunity approvals and enterprise deal scrutiny
  - **Special Terms**: Non-standard payment terms, conditions, and contract modifications
  - **Customer Risk**: Credit check requirements and payment history considerations
• **Status Tracking and Management**:
  - **Draft Status**: Initial quote creation and internal review phase
  - **Pending Approval**: Submitted for management review and authorization
  - **Approved**: Authorized for customer presentation and negotiation
  - **Rejected**: Declined with feedback for revision and resubmission
• **Approval Process Efficiency**:
  - **Mobile Approvals**: Smartphone and tablet access for remote approval capability
  - **Automated Notifications**: Email alerts and dashboard notifications for pending approvals
  - **Time Limits**: Approval deadlines and automatic escalation for delayed responses
  - **Delegation**: Temporary authority assignment for vacation coverage and absences
• **Audit Trail and Compliance**:
  - **Approval History**: Complete record of authorization and decision-making
  - **Reason Codes**: Documentation of approval rationale and special circumstances
  - **Compliance Reporting**: Regular analysis of approval patterns and policy adherence

Efficient approval processes balance control requirements with sales responsiveness.`
        },
        {
          title: "Quote Analytics and Conversion",
          content: `Comprehensive quote analysis provides insights for sales process optimization and pricing strategy refinement to improve conversion rates:

• **Conversion Rate Analysis**:
  - **Overall Conversion**: Percentage of quotes resulting in closed deals
  - **Conversion by Product**: Product-specific quote-to-order success rates
  - **Conversion by Salesperson**: Individual performance and coaching opportunities
  - **Conversion by Market Segment**: Success rates across different customer types
• **Quote Performance Metrics**:
  - **Time to Quote**: Speed of quote generation and customer responsiveness
  - **Quote Validity Utilization**: Customer decision-making within validity periods
  - **Revision Frequency**: Number of quote revisions before final acceptance
  - **Competitive Win Rate**: Success against specific competitors and market conditions
• **Pricing Analysis and Optimization**:
  - **Discount Impact**: Relationship between discount levels and conversion rates
  - **Price Sensitivity**: Customer response to different pricing strategies
  - **Margin Analysis**: Profitability of accepted quotes and pricing optimization
  - **Competitive Pricing**: Market positioning and price competitiveness assessment
• **Customer Behavior Insights**:
  - **Decision Timeline**: Customer evaluation and decision-making timeframes
  - **Influencing Factors**: Features, pricing, and terms most important to customers
  - **Objection Patterns**: Common concerns and resistance points in quote discussions
  - **Buying Process**: Customer procurement procedures and approval requirements
• **Process Improvement Opportunities**:
  - **Template Optimization**: Quote format and content effectiveness analysis
  - **Approval Streamlining**: Workflow efficiency and speed improvement opportunities
  - **Sales Training**: Skill development based on quote performance patterns
  - **Product Strategy**: Portfolio optimization based on quote and conversion data

Strategic quote analytics drive continuous improvement in sales effectiveness and customer satisfaction.`
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
          content: `Effective user management ensures appropriate system access while maintaining security and operational efficiency across your organization:

• **User Account Creation Process**:
  - **Basic Information**: Full name, email address, job title, and department
  - **Login Credentials**: Username assignment and initial password setup
  - **Contact Details**: Phone numbers, office location, and reporting manager
  - **System Preferences**: Time zone, language, and interface customization options
• **Role Assignment Framework**:
  - **Sales Representatives**: Individual contributor access with territory and account assignments
  - **Sales Managers**: Team management capabilities with broader data visibility
  - **Support Agents**: Case management and customer service functionality
  - **System Administrators**: Full system configuration and user management capabilities
• **Access Control and Security**:
  - **Data Visibility**: Record-level access based on role and territory assignments
  - **Feature Permissions**: Module access and functional capability restrictions
  - **IP Restrictions**: Network-based access controls for enhanced security
  - **Multi-Factor Authentication**: Additional security layers for sensitive data protection
• **Onboarding and Training**:
  - **System Introduction**: Basic navigation and core functionality overview
  - **Role-Specific Training**: Customized training based on job responsibilities
  - **Documentation Access**: User guides, video tutorials, and help resources
  - **Mentorship Programs**: Experienced user pairing for knowledge transfer
• **User Lifecycle Management**:
  - **Regular Access Reviews**: Periodic validation of user permissions and activity
  - **Role Changes**: Job function updates and permission adjustments
  - **Deactivation Procedures**: Secure account closure and data transfer processes

Systematic user management ensures productive system utilization while maintaining data security.`
        },
        {
          title: "Roles and Permissions",
          content: `Strategic role design and permission management balances operational efficiency with data security and compliance requirements:

• **Hierarchical Role Structure**:
  - **Executive Level**: CEO, VP Sales, and senior leadership with comprehensive system access
  - **Management Level**: Directors and managers with team oversight and reporting capabilities
  - **Individual Contributor**: Sales reps, support agents, and specialists with role-specific access
  - **Administrative Roles**: System admins, data managers, and technical support personnel
• **Functional Permission Categories**:
  - **Data Access**: Read, write, edit, and delete permissions for different record types
  - **Module Access**: Availability of specific CRM modules and functionality areas
  - **Administrative Functions**: User management, system configuration, and security settings
  - **Reporting and Analytics**: Dashboard access and report generation capabilities
• **Territory and Data Ownership**:
  - **Geographic Territories**: Regional access restrictions and data visibility
  - **Account Assignments**: Specific account ownership and relationship management
  - **Team Hierarchies**: Manager visibility into subordinate team member data
  - **Shared Records**: Collaborative access and team-based record management
• **Security and Compliance Controls**:
  - **Sensitive Data Protection**: Financial information and confidential data access
  - **Audit Logging**: User activity tracking and compliance reporting
  - **Data Export Restrictions**: Controls on data download and external sharing
  - **Field-Level Security**: Granular access control for specific data elements
• **Permission Management Best Practices**:
  - **Principle of Least Privilege**: Minimum necessary access for job function performance
  - **Regular Permission Reviews**: Quarterly access audits and adjustment processes
  - **Role-Based Design**: Standardized roles rather than individual custom permissions
  - **Exception Documentation**: Clear justification for non-standard access requirements

Well-designed permission structures support business processes while protecting sensitive information.`
        },
        {
          title: "User Activity and Performance",
          content: `Comprehensive user activity monitoring provides insights for performance management, system optimization, and security oversight:

• **Activity Tracking and Analytics**:
  - **Login Patterns**: Frequency, timing, and location of system access
  - **Feature Utilization**: Module usage and functionality adoption rates
  - **Data Creation**: Record creation volume and quality metrics
  - **Performance Metrics**: Individual and team productivity measurements
• **Sales Performance Monitoring**:
  - **Activity Levels**: Calls, meetings, and customer interactions by user
  - **Pipeline Management**: Opportunity creation, progression, and closure rates
  - **Revenue Contribution**: Individual and team revenue generation and goal achievement
  - **Goal Tracking**: Quota attainment and performance against targets
• **System Utilization Analysis**:
  - **Feature Adoption**: Identification of underutilized functionality and training needs
  - **Efficiency Metrics**: Time spent in system and task completion rates
  - **Mobile Usage**: Access patterns from mobile devices and remote locations
  - **Integration Usage**: Adoption of email, calendar, and third-party integrations
• **Quality and Compliance Monitoring**:
  - **Data Quality**: Completeness and accuracy of user-generated data
  - **Process Compliance**: Adherence to established sales and service methodologies
  - **Security Compliance**: Password management and access policy adherence
  - **Training Effectiveness**: Skill development and knowledge retention assessment
• **Performance Improvement Initiatives**:
  - **Coaching Opportunities**: Individual development based on activity patterns
  - **Best Practice Sharing**: Top performer analysis and knowledge transfer
  - **Training Programs**: Targeted skill development based on performance gaps
  - **System Optimization**: Interface and workflow improvements based on usage data

Data-driven user performance analysis enables targeted development and system optimization initiatives.`
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
          content: `Comprehensive system configuration establishes the foundation for effective CRM operations and ensures consistency across your organization:

• **Company Information Setup**:
  - **Organization Details**: Company name, address, and primary contact information
  - **Branding Elements**: Logo upload, color schemes, and visual identity configuration
  - **Legal Information**: Terms of service, privacy policies, and compliance requirements
  - **Industry Classification**: Business type and market segment identification
• **Regional and Localization Settings**:
  - **Time Zone Configuration**: Primary and multi-location time zone management
  - **Currency Setup**: Base currency and multi-currency exchange rate management
  - **Language Preferences**: Default language and multi-language support options
  - **Date and Number Formats**: Regional formatting standards and user preferences
• **System Defaults and Standards**:
  - **Record Ownership**: Default assignment rules and territory management
  - **Data Entry Defaults**: Standard values for frequently used fields
  - **Automation Settings**: Workflow triggers and notification preferences
  - **Security Policies**: Password requirements and session management rules
• **Communication and Notification Settings**:
  - **Email Configuration**: SMTP settings and email integration setup
  - **Notification Rules**: Alert triggers and recipient configuration
  - **System Messages**: Custom messages and user communication templates
  - **Mobile Settings**: Push notification preferences and mobile app configuration
• **Performance and Capacity Management**:
  - **Data Retention Policies**: Archive schedules and storage management
  - **System Monitoring**: Performance metrics and health check configuration
  - **Backup Procedures**: Data protection and disaster recovery settings
  - **Maintenance Windows**: Scheduled maintenance and system update procedures

Proper system configuration ensures optimal performance and user experience across all CRM operations.`
        },
        {
          title: "Integration Management",
          content: `Strategic integration management connects your CRM with essential business systems to create a unified operational environment:

• **Email System Integration**:
  - **Microsoft Outlook**: Bidirectional sync for emails, calendar, and contacts
  - **Google Workspace**: Gmail integration with calendar and contact synchronization
  - **Email Tracking**: Open rates, click tracking, and engagement analytics
  - **Template Management**: Email templates and merge field configuration
• **Marketing Platform Connections**:
  - **Customer.io**: Advanced email marketing automation and customer journey management
  - **Mixpanel**: Product analytics and user behavior tracking integration
  - **Social Media**: LinkedIn Sales Navigator and social selling tools
  - **Website Integration**: Lead capture forms and website visitor tracking
• **Business Process Automation**:
  - **Zapier**: Workflow automation and app connectivity platform
  - **Make.com**: Advanced automation scenarios and business process integration
  - **Custom Webhooks**: Real-time data synchronization and trigger-based actions
  - **API Management**: Third-party application connections and data exchange
• **Analytics and Monitoring Tools**:
  - **Smartlook**: User session recording and website behavior analysis
  - **Google Analytics**: Website performance and marketing attribution
  - **Business Intelligence**: Data warehouse connections and reporting platforms
  - **Performance Monitoring**: System health and user experience tracking
• **Enterprise System Integration**:
  - **ERP Systems**: Financial data sync and order management integration
  - **Accounting Software**: Invoice generation and payment tracking
  - **Inventory Management**: Product availability and fulfillment coordination
  - **Customer Support**: Ticketing system integration and case management

Comprehensive integration strategy eliminates data silos and improves operational efficiency.`
        },
        {
          title: "Data Import and Export",
          content: `Efficient data management capabilities ensure smooth migration, backup procedures, and system interoperability for your CRM operations:

• **Data Import Capabilities**:
  - **CSV File Import**: Structured data upload with field mapping and validation
  - **Excel Integration**: Direct spreadsheet import with format preservation
  - **API-Based Import**: Programmatic data transfer from external systems
  - **Migration Tools**: Legacy system data transfer and conversion utilities
• **Import Process Management**:
  - **Data Mapping**: Field alignment between source and destination systems
  - **Validation Rules**: Data quality checks and error detection before import
  - **Duplicate Detection**: Automatic identification and merge recommendations
  - **Batch Processing**: Large dataset handling with progress tracking and error reporting
• **Export Functionality**:
  - **Selective Export**: Custom field selection and filtering capabilities
  - **Format Options**: CSV, Excel, PDF, and JSON export formats
  - **Scheduled Exports**: Automated data backup and reporting procedures
  - **Security Controls**: Permission-based export access and audit logging
• **Data Quality Management**:
  - **Cleansing Tools**: Data standardization and normalization utilities
  - **Validation Rules**: Field format enforcement and required field validation
  - **Enrichment Services**: Third-party data enhancement and verification
  - **Regular Audits**: Data quality monitoring and improvement recommendations
• **Backup and Recovery**:
  - **Automated Backups**: Regular data backup scheduling and retention policies
  - **Point-in-Time Recovery**: Historical data restoration capabilities
  - **Disaster Recovery**: Business continuity planning and emergency procedures
  - **Data Archiving**: Long-term storage and compliance requirements management

Robust data management ensures business continuity and regulatory compliance while supporting growth.`
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
                              <div className="text-slate-600 leading-relaxed whitespace-pre-line">{article.content}</div>
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
