import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp } from "lucide-react";

interface ChartsSectionProps {
  pipelineData: Array<{ stage: string; count: number; value: number }>;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
}

const ChartsSection = ({ pipelineData, monthlyRevenue }: ChartsSectionProps) => {
  const { t } = useTranslation('dashboard');
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="charts-section-grid">
      {/* Pipeline Chart */}
      <Card className="bg-card shadow-sm" data-testid="charts-pipeline-card">
        <CardHeader data-testid="charts-pipeline-header">
          <CardTitle className="flex items-center space-x-2" data-testid="charts-pipeline-title">
            <TrendingUp className="h-5 w-5 text-chart-1" data-testid="charts-pipeline-icon" />
            <span data-testid="charts-pipeline-text">{t('charts.salesPipeline')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-testid="charts-pipeline-content">
          <ResponsiveContainer width="100%" height={300} data-testid="charts-pipeline-chart">
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                stroke="hsl(var(--muted-foreground))"
                dataKey="stage" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ background: "hsl(var(--popover))", borderColor: "hsl(var(--border))", color: "hsl(var(--popover-foreground))" }}
                formatter={(value, name) => [
                  name === 'count' ? `${value} opportunities` : `$${Number(value).toLocaleString()}`,
                  name === 'count' ? 'Count' : 'Value'
                ]}
              />
              <Bar dataKey="count" fill="hsl(var(--chart-1))" name="count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Trend */}
      <Card className="bg-card shadow-sm" data-testid="charts-revenue-card">
        <CardHeader data-testid="charts-revenue-header">
          <CardTitle className="flex items-center space-x-2" data-testid="charts-revenue-title">
            <TrendingUp className="h-5 w-5 text-chart-2" data-testid="charts-revenue-icon" />
            <span data-testid="charts-revenue-text">{t('charts.monthlyRevenue')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-testid="charts-revenue-content">
          <ResponsiveContainer width="100%" height={300} data-testid="charts-revenue-chart">
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ background: "hsl(var(--popover))", borderColor: "hsl(var(--border))", color: "hsl(var(--popover-foreground))" }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
              />
              <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-2))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
