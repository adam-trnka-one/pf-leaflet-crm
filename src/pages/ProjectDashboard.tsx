import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getSampleData, type Project } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, DollarSign, Clock, User, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "On Hold": "bg-amber-100 text-amber-700 border-amber-200",
  Completed: "bg-blue-100 text-blue-700 border-blue-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
};

const priorityColors: Record<string, string> = {
  Low: "bg-slate-100 text-slate-600 border-slate-200",
  Medium: "bg-sky-100 text-sky-700 border-sky-200",
  High: "bg-orange-100 text-orange-700 border-orange-200",
  Critical: "bg-red-100 text-red-700 border-red-200",
};

const ProjectDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation(["projects", "common"]);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const data = getSampleData();
    if (data?.projects) {
      const found = data.projects.find((p: Project) => p.id === id);
      setProject(found || null);
    }
  }, [id]);

  const { progressPercent, daysRemaining } = useMemo(() => {
    if (!project) return { progressPercent: 0, daysRemaining: 0 };
    const now = new Date();
    const total = project.endDate.getTime() - project.startDate.getTime();
    const elapsed = now.getTime() - project.startDate.getTime();
    const percent = Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
    const remaining = Math.ceil((project.endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return { progressPercent: project.status === "Completed" ? 100 : percent, daysRemaining: remaining };
  }, [project]);

  if (!project) {
    return (
      <div className="project-dashboard-empty p-8 text-center text-slate-500">
        Project not found.
      </div>
    );
  }

  return (
    <div className="project-dashboard p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen space-y-6">
      {/* Back link */}
      <Link to="/dashboard/projects">
        <Button variant="ghost" size="sm" className="project-dashboard-back gap-2">
          <ArrowLeft className="h-4 w-4" />
          {t("projects:dashboard.backToProjects")}
        </Button>
      </Link>

      {/* Header */}
      <div className="project-dashboard-header flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 truncate">{project.name}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={`text-sm ${statusColors[project.status] || ""}`}>{project.status}</Badge>
          <Badge variant="outline" className={`text-sm ${priorityColors[project.priority] || ""}`}>{project.priority}</Badge>
        </div>
      </div>

      {/* Summary cards */}
      <div className="project-summary-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{t("projects:dashboard.budget")}</p>
              <p className="text-lg font-semibold text-slate-800">${project.budget.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-sky-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{t("projects:dashboard.daysRemaining")}</p>
              <p className="text-lg font-semibold text-slate-800">
                {daysRemaining < 0
                  ? t("projects:dashboard.overdue")
                  : project.status === "Completed"
                  ? t("projects:dashboard.completed")
                  : daysRemaining}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
              <User className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{t("projects:dashboard.owner")}</p>
              <p className="text-lg font-semibold text-slate-800 truncate">{project.owner}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Building2 className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">{t("projects:dashboard.account")}</p>
              <p className="text-lg font-semibold text-slate-800 truncate">{project.accountName}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <Card className="project-progress-section bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-medium text-slate-700">{t("projects:dashboard.progress")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={progressPercent} className="h-3" />
          <div className="flex justify-between text-sm text-slate-500">
            <span>{project.startDate.toLocaleDateString()}</span>
            <span className="font-medium text-slate-700">{progressPercent}%</span>
            <span>{project.endDate.toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="project-description-section bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-medium text-slate-700">{t("projects:dashboard.description")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 leading-relaxed">{project.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDashboard;
