import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSampleData, resetDatabase, type Project } from "@/utils/sampleData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Briefcase, Calendar, DollarSign } from "lucide-react";
import NewProjectModal from "@/components/modals/NewProjectModal";
import { useTranslation } from "react-i18next";
import styles from "./Projects.module.css";

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

const Projects = () => {
  const { t } = useTranslation(["projects", "common"]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadProjects = () => {
    const data = getSampleData();
    if (data?.projects) {
      setProjects(data.projects);
      setFilteredProjects(data.projects);
    }
    setLoading(false);
  };

  useEffect(() => {
    const data = resetDatabase();
    if (data.projects) {
      setProjects(data.projects);
      setFilteredProjects(data.projects);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const filtered = projects.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  const handleProjectCreated = () => loadProjects();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>{t("projects:title")}</h1>
          <p className={styles.subtitle}>{t("projects:subtitle")}</p>
        </div>
        <Button className={styles.newBtn} onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          <span>{t("projects:newProject")}</span>
        </Button>
      </div>

      <div className={styles.searchWrap}>
        <div className={styles.searchRelative}>
          <Search className={styles.searchIcon} />
          <Input
            placeholder={t("projects:searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <Link key={project.id} to={`/dashboard/projects/${project.id}`} className={styles.cardLink}>
            <Card className={styles.card}>
              <CardHeader className="pb-2">
                <div className={styles.cardHeaderInner}>
                  <div className={styles.cardIconWrap}>
                    <Briefcase className={styles.cardIcon} />
                  </div>
                  <div className={styles.cardTitleWrap}>
                    <CardTitle className={styles.cardTitle}>{project.name}</CardTitle>
                    <p className={styles.cardSubtitle}>{project.accountName}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className={styles.cardContent}>
                <div className={styles.badges}>
                  <Badge variant="outline" className={statusColors[project.status] || ""}>{project.status}</Badge>
                  <Badge variant="outline" className={priorityColors[project.priority] || ""}>{project.priority}</Badge>
                </div>

                <div className={styles.dates}>
                  <Calendar className={styles.datesIcon} />
                  <span>{project.startDate.toLocaleDateString()} – {project.endDate.toLocaleDateString()}</span>
                </div>

                <div className={styles.budget}>
                  <DollarSign className={styles.budgetIcon} />
                  <span>${project.budget.toLocaleString()}</span>
                </div>

                <div className={styles.ownerRow}>
                  <div className={styles.ownerText}>
                    <span>{t("common:owner")}: </span>
                    <span>{project.owner}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyText}>{t("projects:noResults")}</p>
        </div>
      )}

      <NewProjectModal open={isModalOpen} onOpenChange={setIsModalOpen} onProjectCreated={handleProjectCreated} />
    </div>
  );
};

export default Projects;
