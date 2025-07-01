
import { type Opportunity } from "@/utils/sampleData";

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

export const calculatePipelineData = (opportunities: Opportunity[]) => {
  return opportunities.reduce((acc: any, opp: Opportunity) => {
    const existing = acc.find((item: any) => item.stage === opp.stage);
    if (existing) {
      existing.count += 1;
      existing.value += opp.amount;
    } else {
      acc.push({ stage: opp.stage, count: 1, value: opp.amount });
    }
    return acc;
  }, []);
};

export const calculateTotalRevenue = (opportunities: Opportunity[]) => {
  return opportunities
    .filter((opp: Opportunity) => opp.stage === 'Closed Won')
    .reduce((sum: number, opp: Opportunity) => sum + opp.amount, 0);
};

export const calculateOpenOpportunities = (opportunities: Opportunity[]) => {
  return opportunities.filter((opp: Opportunity) => 
    !['Closed Won', 'Closed Lost'].includes(opp.stage)
  ).length;
};

export const calculateTaskMetrics = (activities: Activity[]) => {
  const completedTasks = activities.filter(activity => activity.completed).length;
  const overdueTasks = activities.filter(activity => {
    const dueDate = new Date(activity.dueDate);
    return dueDate < new Date() && !activity.completed;
  }).length;

  return { completedTasks, overdueTasks };
};

export const getMonthlyRevenueData = () => {
  return [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ];
};
