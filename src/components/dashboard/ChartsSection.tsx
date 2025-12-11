import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ChartsSectionProps {
  pipelineData: Array<{ stage: string; count: number; value: number }>;
  monthlyRevenue: Array<{ month: string; revenue: number }>;
}

const ChartsSection = ({ pipelineData, monthlyRevenue }: ChartsSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="charts-section-grid">
      {/* Pipeline Chart */}
      <Card className="bg-white shadow-sm" data-testid="charts-pipeline-card">
        <CardHeader data-testid="charts-pipeline-header">
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse" data-testid="charts-pipeline-title">
            <TrendingUp className="h-5 w-5 text-emerald-600" data-testid="charts-pipeline-icon" />
            <span data-testid="charts-pipeline-text">{t('charts.salesPipeline')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-testid="charts-pipeline-content">
          <ResponsiveContainer width="100%" height={300} data-testid="charts-pipeline-chart">
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
                  name === 'count' ? t('charts.count') : t('charts.revenue')
                ]}
              />
              <Bar dataKey="count" fill="#10b981" name="count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Revenue Trend */}
      <Card className="bg-white shadow-sm" data-testid="charts-revenue-card">
        <CardHeader data-testid="charts-revenue-header">
          <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse" data-testid="charts-revenue-title">
            <TrendingUp className="h-5 w-5 text-blue-600" data-testid="charts-revenue-icon" />
            <span data-testid="charts-revenue-text">{t('charts.monthlyRevenue')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent data-testid="charts-revenue-content">
          <ResponsiveContainer width="100%" height={300} data-testid="charts-revenue-chart">
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, t('charts.revenue')]}
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
