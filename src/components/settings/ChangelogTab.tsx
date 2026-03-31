import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "1.1.0",
    date: "2026-03-31",
    changes: [
      "Added changelog section to settings",
      "Improved ProductFruits script loading with 10s timeout and graceful error handling",
      "Fixed PR environment script URL resolution",
      "App version now visible in sidebar footer and workspace settings",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-03-15",
    changes: [
      "Initial release of Leaflet CRM",
      "Dashboard with metrics, charts, and task summaries",
      "Contacts, accounts, leads, and opportunities management",
      "Multi-language support (EN, PT, ES, FR, DE, CS, AR)",
      "Settings page with workspace, API, permissions, and integrations tabs",
    ],
  },
];

export const ChangelogTab = () => {
  const { t } = useTranslation("settings");

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>{t("changelog.title", "Changelog")}</span>
        </CardTitle>
        <p className="text-sm text-slate-600">
          {t("changelog.subtitle", "Version history and recent changes")}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {changelog.map((entry) => (
          <div key={entry.version} className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-mono text-xs">
                v{entry.version}
              </Badge>
              <span className="text-sm text-muted-foreground">{entry.date}</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 pl-1">
              {entry.changes.map((change, i) => (
                <li key={i}>{change}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
