// Sample data generator for CRM
export interface Account {
  id: string;
  name: string;
  industry: string;
  type: string;
  revenue: number;
  employees: number;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  owner: string;
  createdAt: Date;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  accountId: string;
  accountName: string;
  owner: string;
  createdAt: Date;
}

export interface Opportunity {
  id: string;
  name: string;
  accountId: string;
  accountName: string;
  stage: string;
  amount: number;
  probability: number;
  closeDate: Date;
  owner: string;
  createdAt: Date;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  source: string;
  status: string;
  rating: string;
  owner: string;
  createdAt: Date;
}

export interface Case {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  accountId: string;
  accountName: string;
  contactId: string;
  contactName: string;
  owner: string;
  createdAt: Date;
}

const industries = ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Retail', 'Education', 'Real Estate', 'Consulting'];
const accountTypes = ['Customer', 'Prospect', 'Partner', 'Competitor'];
const stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost', 'Follow-up', 'Demo'];
const leadSources = ['Website', 'Referral', 'Cold Call', 'Email Campaign', 'Social Media', 'Trade Show', 'Advertisement'];
const leadStatuses = ['New', 'Working', 'Qualified', 'Unqualified', 'Converted'];
const caseStatuses = ['New', 'In Progress', 'Pending', 'Resolved', 'Closed'];
const priorities = ['Low', 'Medium', 'High', 'Critical'];
const caseTypes = ['Bug', 'Feature Request', 'Question', 'Complaint', 'Consultation'];

const usStates = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
const euCountries = ['United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Poland'];
const usCities = ['San Francisco', 'New York', 'Austin', 'Miami', 'Chicago', 'Philadelphia', 'Columbus', 'Atlanta', 'Charlotte', 'Detroit'];
const euCities = ['London', 'Berlin', 'Paris', 'Madrid', 'Rome', 'Amsterdam', 'Stockholm', 'Warsaw'];

const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Lisa', 'Robert', 'Emily', 'James', 'Maria', 'William', 'Jennifer', 'Richard', 'Jessica', 'Thomas'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson'];

const companyNames = ['TechCorp', 'InnovateLabs', 'GlobalSolutions', 'DataDynamics', 'FutureTech', 'SmartSystems', 'NextGen', 'CloudFirst', 'DigitalEdge', 'ProActive'];
const companySuffixes = ['Inc', 'LLC', 'Corp', 'Ltd', 'Solutions', 'Technologies', 'Systems', 'Group', 'Enterprises', 'Services'];

const owners = ['Alice Johnson', 'Bob Smith', 'Carol Davis', 'Dan Wilson', 'Eva Brown', 'Frank Miller', 'Grace Lee', 'Henry Taylor'];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(daysBack: number): Date {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date;
}

function generateFutureDate(daysForward: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * daysForward));
  return date;
}

export function generateAccounts(count: number = 50): Account[] {
  const accounts: Account[] = [];
  
  for (let i = 0; i < count; i++) {
    const isUS = Math.random() > 0.4;
    const companyName = getRandomItem(companyNames);
    const suffix = getRandomItem(companySuffixes);
    
    accounts.push({
      id: `acc_${i + 1}`,
      name: `${companyName} ${suffix}`,
      industry: getRandomItem(industries),
      type: getRandomItem(accountTypes),
      revenue: Math.floor(Math.random() * 10000000) + 100000,
      employees: Math.floor(Math.random() * 1000) + 10,
      phone: isUS ? `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}` 
                 : `+44 20 ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
      website: `www.${companyName.toLowerCase()}.com`,
      address: {
        street: `${Math.floor(Math.random() * 9999) + 1} ${getRandomItem(['Main', 'Oak', 'Pine', 'Maple', 'Cedar'])} ${getRandomItem(['St', 'Ave', 'Blvd', 'Dr'])}`,
        city: isUS ? getRandomItem(usCities) : getRandomItem(euCities),
        state: isUS ? getRandomItem(usStates) : '',
        country: isUS ? 'United States' : getRandomItem(euCountries),
        zipCode: isUS ? `${Math.floor(Math.random() * 90000) + 10000}` : `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 10)}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`
      },
      owner: getRandomItem(owners),
      createdAt: generateRandomDate(365)
    });
  }
  
  return accounts;
}

export function generateContacts(accounts: Account[], count: number = 80): Contact[] {
  const contacts: Contact[] = [];
  
  for (let i = 0; i < count; i++) {
    const account = getRandomItem(accounts);
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    
    contacts.push({
      id: `con_${i + 1}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${account.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`,
      phone: account.phone.replace(/\d{4}$/, String(Math.floor(Math.random() * 9000) + 1000)),
      title: getRandomItem(['CEO', 'CTO', 'VP Sales', 'Director', 'Manager', 'Senior Developer', 'Marketing Manager', 'Operations Manager']),
      accountId: account.id,
      accountName: account.name,
      owner: getRandomItem(owners),
      createdAt: generateRandomDate(365)
    });
  }
  
  return contacts;
}

export function generateOpportunities(accounts: Account[], count: number = 600): Opportunity[] {
  const opportunities: Opportunity[] = [];
  
  for (let i = 0; i < count; i++) {
    const account = getRandomItem(accounts);
    const products = ['Software License', 'Consulting Services', 'Training Program', 'Support Package', 'Custom Development'];
    
    opportunities.push({
      id: `opp_${i + 1}`,
      name: `${getRandomItem(products)} - ${account.name}`,
      accountId: account.id,
      accountName: account.name,
      stage: getRandomItem(stages),
      amount: Math.floor(Math.random() * 500000) + 5000,
      probability: Math.floor(Math.random() * 100),
      closeDate: generateFutureDate(180),
      owner: getRandomItem(owners),
      createdAt: generateRandomDate(90)
    });
  }
  
  return opportunities;
}

export function generateLeads(count: number = 200): Lead[] {
  const leads: Lead[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = getRandomItem(firstNames);
    const lastName = getRandomItem(lastNames);
    const company = `${getRandomItem(companyNames)} ${getRandomItem(companySuffixes)}`;
    
    leads.push({
      id: `lead_${i + 1}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '')}.com`,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      company,
      title: getRandomItem(['CEO', 'CTO', 'VP Sales', 'Director', 'Manager', 'Senior Developer', 'Marketing Manager']),
      source: getRandomItem(leadSources),
      status: getRandomItem(leadStatuses),
      rating: getRandomItem(['Hot', 'Warm', 'Cold']),
      owner: getRandomItem(owners),
      createdAt: generateRandomDate(60)
    });
  }
  
  return leads;
}

export function generateCases(accounts: Account[], contacts: Contact[], count: number = 150): Case[] {
  const cases: Case[] = [];
  
  for (let i = 0; i < count; i++) {
    const account = getRandomItem(accounts);
    const accountContacts = contacts.filter(c => c.accountId === account.id);
    const contact = accountContacts.length > 0 ? getRandomItem(accountContacts) : contacts[0];
    
    const subjects = [
      'Login Issues', 'Performance Problems', 'Feature Request', 'Bug Report', 
      'Integration Help', 'Training Request', 'Account Setup', 'Billing Question'
    ];
    
    cases.push({
      id: `case_${i + 1}`,
      subject: getRandomItem(subjects),
      description: 'Customer reported an issue that needs attention and resolution.',
      status: getRandomItem(caseStatuses),
      priority: getRandomItem(priorities),
      type: getRandomItem(caseTypes),
      accountId: account.id,
      accountName: account.name,
      contactId: contact.id,
      contactName: `${contact.firstName} ${contact.lastName}`,
      owner: getRandomItem(owners),
      createdAt: generateRandomDate(30)
    });
  }
  
  return cases;
}

// Storage functions
export function getSampleData() {
  const stored = localStorage.getItem('leafletCrmData');
  if (stored) {
    const data = JSON.parse(stored);
    // Convert date strings back to Date objects
    data.accounts.forEach((acc: any) => acc.createdAt = new Date(acc.createdAt));
    data.contacts.forEach((con: any) => con.createdAt = new Date(con.createdAt));
    data.opportunities.forEach((opp: any) => {
      opp.createdAt = new Date(opp.createdAt);
      opp.closeDate = new Date(opp.closeDate);
    });
    data.leads.forEach((lead: any) => lead.createdAt = new Date(lead.createdAt));
    data.cases.forEach((caseItem: any) => caseItem.createdAt = new Date(caseItem.createdAt));
    return data;
  }
  return null;
}

export function generateAndStoreSampleData() {
  const accounts = generateAccounts(50);
  const contacts = generateContacts(accounts, 80);
  const opportunities = generateOpportunities(accounts, 600);
  const leads = generateLeads(200);
  const cases = generateCases(accounts, contacts, 150);
  
  const data = { accounts, contacts, opportunities, leads, cases };
  localStorage.setItem('leafletCrmData', JSON.stringify(data));
  return data;
}

export function resetDatabase() {
  localStorage.removeItem('leafletCrmData');
  return generateAndStoreSampleData();
}
