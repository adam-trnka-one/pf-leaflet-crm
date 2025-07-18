
import { useEffect, useState } from "react";
import { getSampleData, generateAndStoreSampleData, resetDatabase } from "@/utils/sampleData";
import { toast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  subject: string;
  type: string;
  status: string;
  priority: string;
  dueDate: string;
  assignedTo: string;
  relatedTo: string;
  createdAt: Date;
  completed: boolean;
  date: Date;
}

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  source: string;
  rating: string;
  owner: string;
  createdAt: Date;
}

export const useDashboardData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);

  const loadData = () => {
    let sampleData = getSampleData();
    if (!sampleData) {
      sampleData = generateAndStoreSampleData();
      toast({
        title: "Sample data generated",
        description: "50 accounts, 80 contacts, 100 opportunities, 60 leads, and 20 cases created"
      });
    }
    setData(sampleData);
    setLoading(false);
  };

  const loadTotalAccounts = () => {
    // Try to load from localStorage first (manually created accounts)
    const storedAccounts = localStorage.getItem('crmAccounts');
    if (storedAccounts) {
      const parsedAccounts = JSON.parse(storedAccounts);
      setTotalAccounts(parsedAccounts.length);
    } else {
      // Fall back to sample data
      const sampleData = getSampleData();
      if (sampleData) {
        setTotalAccounts(sampleData.accounts.length);
      }
    }
  };

  const loadTotalContacts = () => {
    // Try to load from localStorage first (manually created contacts)
    const storedContacts = localStorage.getItem('crmContacts');
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      setTotalContacts(parsedContacts.length);
    } else {
      // Fall back to sample data
      const sampleData = getSampleData();
      if (sampleData) {
        setTotalContacts(sampleData.contacts.length);
      }
    }
  };

  const loadRecentActivities = () => {
    const activities = JSON.parse(localStorage.getItem('crmActivities') || '[]');
    
    // Transform activities to match the expected format
    const transformedActivities = activities.map((activity: any) => ({
      id: activity.id,
      subject: activity.subject,
      type: activity.type,
      status: activity.completed ? 'Completed' : 'In Progress',
      priority: 'Medium', // Default priority since it's not stored
      dueDate: activity.date || new Date().toISOString(),
      assignedTo: 'Current User', // Default assignee
      relatedTo: '', // Default relation
      createdAt: new Date(activity.date || new Date()),
      completed: activity.completed || false,
      date: new Date(activity.date || new Date())
    }));
    
    // Get recent activities (last 5, sorted by date)
    const recent = transformedActivities
      .sort((a: Activity, b: Activity) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    setRecentActivities(recent);
  };

  const loadRecentLeads = () => {
    const leads = JSON.parse(localStorage.getItem('crmLeads') || '[]');
    // Get recent leads (last 3, sorted by creation date)
    const recent = leads
      .sort((a: Lead, b: Lead) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
    setRecentLeads(recent);
  };

  const handleResetDatabase = () => {
    setLoading(true);
    const newData = resetDatabase();
    setData(newData);
    setLoading(false);
    // Update total accounts and contacts after reset
    setTotalAccounts(newData.accounts.length);
    setTotalContacts(newData.contacts.length);
    // Reload recent activities and leads
    loadRecentActivities();
    loadRecentLeads();
    toast({
      title: "Database reset",
      description: "Sample data regenerated with new limits: 50 accounts, 80 contacts, 100 opportunities, 60 leads, 20 cases"
    });
  };

  useEffect(() => {
    loadData();
    loadRecentActivities();
    loadRecentLeads();
    loadTotalAccounts();
    loadTotalContacts();
  }, []);

  return {
    data,
    loading,
    recentActivities,
    recentLeads,
    totalAccounts,
    totalContacts,
    handleResetDatabase
  };
};
