import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getSampleData, type Project } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, DollarSign, Clock, User, Building2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import styles from "./ProjectDashboard.module.css";

const statusColors: Record<string, string> = {
  Active: "bg-success-muted text-success-muted-foreground border-success/40",
  "On Hold": "bg-warning-muted text-warning-muted-foreground border-warning/40",
  Completed: "bg-info-muted text-info-muted-foreground border-info/40",
  Cancelled: "bg-destructive-muted text-destructive-muted-foreground border-destructive/40",
};

const priorityColors: Record<string, string> = {
  Low: "bg-muted text-muted-foreground border-border",
  Medium: "bg-info-muted text-info-muted-foreground border-info/40",
  High: "bg-warning-muted text-warning-muted-foreground border-warning/40",
  Critical: "bg-destructive-muted text-destructive-muted-foreground border-destructive/40",
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
      <div className={styles.emptyState}>
        Project not found.
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link to="/dashboard/projects">
        <Button variant="ghost" size="sm" className={styles.backBtn}>
          <ArrowLeft className="h-4 w-4" />
          {t("projects:dashboard.backToProjects")}
        </Button>
      </Link>

      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>{project.name}</h1>
        </div>
        <div className={styles.badgesWrap}>
          <Badge variant="outline" className={`${styles.badgeText} ${statusColors[project.status] || ""}`}>{project.status}</Badge>
          <Badge variant="outline" className={`${styles.badgeText} ${priorityColors[project.priority] || ""}`}>{project.priority}</Badge>
        </div>
      </div>

      <div className={styles.summaryGrid}>
        <Card className={styles.summaryCard}>
          <CardContent className={styles.summaryCardContent}>
            <div className={styles.summaryIconWrapGreen}>
              <DollarSign className={styles.summaryIconGreen} />
            </div>
            <div>
              <p className={styles.summaryLabel}>{t("projects:dashboard.budget")}</p>
              <p className={styles.summaryValue}>${project.budget.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className={styles.summaryCard}>
          <CardContent className={styles.summaryCardContent}>
            <div className={styles.summaryIconWrapBlue}>
              <Clock className={styles.summaryIconBlue} />
            </div>
            <div>
              <p className={styles.summaryLabel}>{t("projects:dashboard.daysRemaining")}</p>
              <p className={styles.summaryValue}>
                {daysRemaining < 0
                  ? t("projects:dashboard.overdue")
                  : project.status === "Completed"
                  ? t("projects:dashboard.completed")
                  : daysRemaining}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className={styles.summaryCard}>
          <CardContent className={styles.summaryCardContent}>
            <div className={styles.summaryIconWrapViolet}>
              <User className={styles.summaryIconViolet} />
            </div>
            <div>
              <p className={styles.summaryLabel}>{t("projects:dashboard.owner")}</p>
              <p className={styles.summaryValueTruncate}>{project.owner}</p>
            </div>
          </CardContent>
        </Card>

        <Card className={styles.summaryCard}>
          <CardContent className={styles.summaryCardContent}>
            <div className={styles.summaryIconWrapAmber}>
              <Building2 className={styles.summaryIconAmber} />
            </div>
            <div>
              <p className={styles.summaryLabel}>{t("projects:dashboard.account")}</p>
              <p className={styles.summaryValueTruncate}>{project.accountName}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className={styles.progressSection}>
        <CardHeader>
          <CardTitle className={styles.progressTitle}>{t("projects:dashboard.progress")}</CardTitle>
        </CardHeader>
        <CardContent className={styles.progressContent}>
          <Progress value={progressPercent} className={styles.progressBar} />
          <div className={styles.progressDates}>
            <span>{project.startDate.toLocaleDateString()}</span>
            <span className={styles.progressPercent}>{progressPercent}%</span>
            <span>{project.endDate.toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>

      <Card className={styles.descriptionSection}>
        <CardHeader>
          <CardTitle className={styles.descriptionTitle}>{t("projects:dashboard.description")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={styles.descriptionText}>{project.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDashboard;
