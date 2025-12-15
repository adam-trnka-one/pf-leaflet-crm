import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bug, CheckCircle2, Loader2, AlertCircle, Clock } from "lucide-react";
import { ProductFruitsState } from "@/hooks/useProductFruits";

interface ProductFruitsDebugPanelProps {
  state: ProductFruitsState;
}

export const ProductFruitsDebugPanel = ({ state }: ProductFruitsDebugPanelProps) => {
  const getStatusBadge = () => {
    switch (state.status) {
      case 'idle':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> Idle</Badge>;
      case 'loading':
        return <Badge variant="outline" className="gap-1 border-amber-500 text-amber-600"><Loader2 className="h-3 w-3 animate-spin" /> Loading</Badge>;
      case 'initialized':
        return <Badge variant="outline" className="gap-1 border-emerald-500 text-emerald-600"><CheckCircle2 className="h-3 w-3" /> Initialized</Badge>;
      case 'error':
        return <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" /> Error</Badge>;
    }
  };

  return (
    <Card className="bg-slate-50 border-dashed border-slate-300">
      <CardHeader className="py-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Bug className="h-4 w-4 text-slate-500" />
            <span className="text-slate-600">ProductFruits Debug</span>
          </div>
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2 space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block">Workspace Code</span>
            <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
              {state.workspaceCode || '—'}
            </code>
          </div>
          <div>
            <span className="text-slate-500 block">Language</span>
            <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">
              {state.language || '—'}
            </code>
          </div>
          <div className="col-span-2">
            <span className="text-slate-500 block">Script URL</span>
            <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-700 text-[10px] break-all block">
              {state.scriptUrl || '—'}
            </code>
          </div>
          {state.lastInitialized && (
            <div className="col-span-2">
              <span className="text-slate-500 block">Last Initialized</span>
              <span className="text-slate-700">
                {state.lastInitialized.toLocaleTimeString()}
              </span>
            </div>
          )}
          {state.error && (
            <div className="col-span-2">
              <span className="text-red-500 block">Error</span>
              <span className="text-red-600">{state.error}</span>
            </div>
          )}
        </div>
        
        {state.userData && (
          <div>
            <span className="text-slate-500 text-xs block mb-1">User Data</span>
            <pre className="bg-slate-200 p-2 rounded text-[10px] text-slate-700 overflow-auto max-h-32">
              {JSON.stringify(state.userData, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
