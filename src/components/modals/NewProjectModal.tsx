import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSampleData, type Account, type Project } from "@/utils/sampleData";
import { useTranslation } from "react-i18next";
import { toast } from "@/hooks/use-toast";

interface NewProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProjectCreated: () => void;
}

const NewProjectModal = ({ open, onOpenChange, onProjectCreated }: NewProjectModalProps) => {
  const { t } = useTranslation(["projects", "common"]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    accountId: "",
    status: "Active",
    priority: "Medium",
    startDate: "",
    endDate: "",
    budget: "",
    description: "",
    owner: "",
  });

  useEffect(() => {
    const data = getSampleData();
    if (data) setAccounts(data.accounts);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const account = accounts.find((a) => a.id === formData.accountId);

    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name: formData.name,
      accountId: formData.accountId,
      accountName: account?.name || "",
      status: formData.status,
      priority: formData.priority,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      budget: parseFloat(formData.budget) || 0,
      description: formData.description,
      owner: formData.owner,
      createdAt: new Date(),
    };

    const data = getSampleData();
    if (data) {
      const projects = data.projects || [];
      projects.push(newProject);
      data.projects = projects;
      localStorage.setItem("leafletCrmData", JSON.stringify(data));
    }

    toast({ title: t("projects:newProject"), description: formData.name });
    onProjectCreated();
    onOpenChange(false);
    setFormData({ name: "", accountId: "", status: "Active", priority: "Medium", startDate: "", endDate: "", budget: "", description: "", owner: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="new-project-modal sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("projects:newProject")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="new-project-form space-y-4">
          <div className="space-y-2">
            <Label>{t("projects:columns.name")}</Label>
            <Input required value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} className="new-project-name" />
          </div>

          <div className="space-y-2">
            <Label>{t("projects:columns.account")}</Label>
            <Select value={formData.accountId} onValueChange={(v) => setFormData((p) => ({ ...p, accountId: v }))}>
              <SelectTrigger className="new-project-account"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white z-50">
                {accounts.slice(0, 20).map((a) => (
                  <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("projects:columns.status")}</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData((p) => ({ ...p, status: v }))}>
                <SelectTrigger className="new-project-status"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="Active">{t("projects:status.active")}</SelectItem>
                  <SelectItem value="On Hold">{t("projects:status.onHold")}</SelectItem>
                  <SelectItem value="Completed">{t("projects:status.completed")}</SelectItem>
                  <SelectItem value="Cancelled">{t("projects:status.cancelled")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("projects:columns.priority")}</Label>
              <Select value={formData.priority} onValueChange={(v) => setFormData((p) => ({ ...p, priority: v }))}>
                <SelectTrigger className="new-project-priority"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="Low">{t("projects:priority.low")}</SelectItem>
                  <SelectItem value="Medium">{t("projects:priority.medium")}</SelectItem>
                  <SelectItem value="High">{t("projects:priority.high")}</SelectItem>
                  <SelectItem value="Critical">{t("projects:priority.critical")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("projects:columns.startDate")}</Label>
              <Input type="date" required value={formData.startDate} onChange={(e) => setFormData((p) => ({ ...p, startDate: e.target.value }))} className="new-project-start" />
            </div>
            <div className="space-y-2">
              <Label>{t("projects:columns.endDate")}</Label>
              <Input type="date" required value={formData.endDate} onChange={(e) => setFormData((p) => ({ ...p, endDate: e.target.value }))} className="new-project-end" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("projects:columns.budget")}</Label>
              <Input type="number" value={formData.budget} onChange={(e) => setFormData((p) => ({ ...p, budget: e.target.value }))} className="new-project-budget" />
            </div>
            <div className="space-y-2">
              <Label>{t("projects:columns.owner")}</Label>
              <Input value={formData.owner} onChange={(e) => setFormData((p) => ({ ...p, owner: e.target.value }))} className="new-project-owner" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("projects:dashboard.description")}</Label>
            <Textarea value={formData.description} onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))} className="new-project-description" rows={3} />
          </div>

          <Button type="submit" className="new-project-submit w-full bg-[#4AB831] hover:bg-[#3da127]">{t("projects:newProject")}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
