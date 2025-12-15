import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bug, CheckCircle2, Loader2, AlertCircle, Clock, RefreshCw } from "lucide-react";
import { ProductFruitsState } from "@/contexts/ProductFruitsContext";
import { useState } from "react";

interface ProductFruitsDebugPanelProps {
  state: ProductFruitsState;
  onReinitialize?: () => Promise<void>;
}

const getTroubleshootingSuggestions = (error: string | null): string[] => {
  if (!error) return [];
  
  const suggestions: string[] = [];
  
  if (error.includes('already initialized')) {
    suggestions.push('ProductFruits was initialized multiple times. Try refreshing the page.');
    suggestions.push('Check if there are duplicate initialization scripts.');
  }
  if (error.includes('language')) {
    suggestions.push('Language code may be invalid. Verify it matches your workspace settings.');
  }
  if (error.includes('Failed to load')) {
    suggestions.push('Check your network connection.');
    suggestions.push('Verify the workspace code is correct.');
    suggestions.push('Ensure the script URL is accessible.');
  }
  if (error.includes('Missing workspace code')) {
    suggestions.push('Enter a valid workspace code in the settings above.');
  }
  if (error.includes('Missing') && error.includes('username')) {
    suggestions.push('Enter a username/email in the settings above.');
  }
  
  if (suggestions.length === 0) {
    suggestions.push('Try refreshing the page.');
    suggestions.push('Check the browser console for more details.');
  }
  
  return suggestions;
};

export const ProductFruitsDebugPanel = ({ state, onReinitialize }: ProductFruitsDebugPanelProps) => {
  const [isReinitializing, setIsReinitializing] = useState(false);

  const handleReinitialize = async () => {
    if (!onReinitialize || isReinitializing) return;
    setIsReinitializing(true);
    try {
      await onReinitialize();
    } finally {
      setIsReinitializing(false);
    }
  };

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

  const troubleshootingSuggestions = getTroubleshootingSuggestions(state.error);

  return (
    <Card className="bg-slate-50 border-dashed border-slate-300">
      <CardHeader className="py-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Bug className="h-4 w-4 text-slate-500" />
            <span className="text-slate-600">ProductFruits Debug</span>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge()}
            {onReinitialize && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReinitialize}
                disabled={isReinitializing || state.status === 'loading'}
                className="h-6 px-2 text-xs"
              >
                {isReinitializing ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <RefreshCw className="h-3 w-3" />
                )}
                <span className="ml-1">Reinit</span>
              </Button>
            )}
          </div>
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
        </div>

        {state.error && (
          <div className="space-y-2 border-t border-slate-200 pt-2">
            <div>
              <span className="text-red-500 text-xs font-medium block">Error</span>
              <span className="text-red-600 text-xs">{state.error}</span>
            </div>
            {troubleshootingSuggestions.length > 0 && (
              <div>
                <span className="text-slate-500 text-xs font-medium block mb-1">Troubleshooting</span>
                <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                  {troubleshootingSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {state.userData && (
          <div className="border-t border-slate-200 pt-2">
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
