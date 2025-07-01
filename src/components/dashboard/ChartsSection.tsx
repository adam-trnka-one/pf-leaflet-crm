

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp } from "lucide-react";

interface ChartsSectionProps {
  pipelineData: Array<{ stage: string; count: number; value: number }>;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
}

const ChartsSection = ({ pipelineData, monthlyRevenue }: ChartsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-charts="section-grid">
      {/* Pipeline Chart */}
      <Card className="bg-white shadow-sm" data-charts="pipeline-card">
        <CardHeader data-charts="pipeline-header">
          <CardTitle className="flex items-center space-x-2" data-charts="pipeline-title">
            <TrendingUp className="h-5 w-5 text-emerald-600" data-charts="pipeline-icon" />
            <span data-charts="pipeline-text">Sales Pipeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-charts="pipeline-content">
          <ResponsiveContainer width="100%" height={300} data-charts="pipeline-chart">
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="stage" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'count' ? `${value} opportunities` : `$${Number(value).toLocaleString()}`,
                  name === 'count' ? 'Count' : 'Value'
                ]}
              />
              <Bar dataKey="count" fill="#10b981" name="count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Trend */}
      <Card className="bg-white shadow-sm" data-charts="revenue-card">
        <CardHeader data-charts="revenue-header">
          <CardTitle className="flex items-center space-x-2" data-charts="revenue-title">
            <TrendingUp className="h-5 w-5 text-blue-600" data-charts="revenue-icon" />
            <span data-charts="revenue-text">Revenue Trend</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-charts="revenue-content">
          <ResponsiveContainer width="100%" height={300} data-charts="revenue-chart">
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;

