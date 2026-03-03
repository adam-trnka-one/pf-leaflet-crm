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
      <div className="projects-loading p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="projects-page p-4 sm:p-6 lg:p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="projects-header flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
        <div className="projects-header-text">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{t("projects:title")}</h1>
          <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base">{t("projects:subtitle")}</p>
        </div>
        <Button className="projects-new-btn bg-[#4AB831] hover:bg-[#3da127] w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          <span>{t("projects:newProject")}</span>
        </Button>
      </div>

      {/* Search */}
      <div className="projects-search mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder={t("projects:searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="projects-search-input pl-10 max-w-md bg-white"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Link key={project.id} to={`/dashboard/projects/${project.id}`} className="projects-card-link">
            <Card className="projects-card bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg font-semibold text-slate-800 truncate">{project.name}</CardTitle>
                    <p className="text-sm text-slate-600 truncate">{project.accountName}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="projects-badges flex flex-wrap gap-2">
                  <Badge variant="outline" className={statusColors[project.status] || ""}>{project.status}</Badge>
                  <Badge variant="outline" className={priorityColors[project.priority] || ""}>{project.priority}</Badge>
                </div>

                <div className="projects-dates flex items-center text-sm text-slate-600">
                  <Calendar className="h-4 w-4 mr-2 shrink-0" />
                  <span>{project.startDate.toLocaleDateString()} – {project.endDate.toLocaleDateString()}</span>
                </div>

                <div className="projects-budget flex items-center text-sm text-slate-600">
                  <DollarSign className="h-4 w-4 mr-2 shrink-0" />
                  <span>${project.budget.toLocaleString()}</span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
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
        <div className="projects-empty text-center py-12">
          <p className="text-slate-500">{t("projects:noResults")}</p>
        </div>
      )}

      <NewProjectModal open={isModalOpen} onOpenChange={setIsModalOpen} onProjectCreated={handleProjectCreated} />
    </div>
  );
};

export default Projects;
