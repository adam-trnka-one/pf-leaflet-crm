import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RotateCcw, Save, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';
import { getCustomHeadHtml, setCustomHeadHtml, resetCustomHeadHtml } from '@/hooks/useCustomHeadHtml';

const highlightCode = (code: string) => {
  return Prism.highlight(code, Prism.languages.markup, 'markup');
};

interface SecurityWarning {
  type: 'danger' | 'warning';
  message: string;
}

const validateHtml = (html: string): SecurityWarning[] => {
  const warnings: SecurityWarning[] = [];
  
  // Check for external scripts
  const externalScriptPattern = /<script[^>]+src\s*=\s*["']https?:\/\/[^"']+["'][^>]*>/gi;
  if (externalScriptPattern.test(html)) {
    warnings.push({
      type: 'danger',
      message: 'External scripts detected. Loading scripts from external URLs can be a security risk.'
    });
  }
  
  // Check for inline event handlers
  const eventHandlerPattern = /\s(on\w+)\s*=\s*["'][^"']*["']/gi;
  if (eventHandlerPattern.test(html)) {
    warnings.push({
      type: 'warning',
      message: 'Inline event handlers detected (onclick, onerror, etc.). These can execute arbitrary JavaScript.'
    });
  }
  
  // Check for javascript: URLs
  const jsUrlPattern = /javascript\s*:/gi;
  if (jsUrlPattern.test(html)) {
    warnings.push({
      type: 'danger',
      message: 'JavaScript URLs detected. These can execute arbitrary code.'
    });
  }
  
  // Check for data: URLs in scripts
  const dataUrlPattern = /src\s*=\s*["']data:/gi;
  if (dataUrlPattern.test(html)) {
    warnings.push({
      type: 'warning',
      message: 'Data URLs detected. These can potentially embed executable content.'
    });
  }
  
  // Check for eval or Function constructor
  const evalPattern = /\beval\s*\(|new\s+Function\s*\(/gi;
  if (evalPattern.test(html)) {
    warnings.push({
      type: 'danger',
      message: 'eval() or Function constructor detected. These can execute arbitrary code.'
    });
  }
  
  return warnings;
};

interface ParsedElement {
  tag: string;
  attributes: { name: string; value: string }[];
  content?: string;
}

const parseHtmlForPreview = (html: string): ParsedElement[] => {
  if (!html.trim()) return [];
  
  const elements: ParsedElement[] = [];
  const tempContainer = document.createElement('div');
  
  try {
    tempContainer.innerHTML = html;
    
    Array.from(tempContainer.children).forEach(child => {
      const attributes: { name: string; value: string }[] = [];
      Array.from(child.attributes).forEach(attr => {
        attributes.push({ name: attr.name, value: attr.value });
      });
      
      elements.push({
        tag: child.tagName.toLowerCase(),
        attributes,
        content: child.textContent?.slice(0, 100) || undefined
      });
    });
  } catch (error) {
    console.error('Error parsing HTML:', error);
  }
  
  return elements;
};

export const HtmlTab = () => {
  const { t } = useTranslation('settings');
  const [headHtml, setHeadHtml] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    setHeadHtml(getCustomHeadHtml());
  }, []);

  const warnings = useMemo(() => validateHtml(headHtml), [headHtml]);
  const parsedElements = useMemo(() => parseHtmlForPreview(headHtml), [headHtml]);
  
  const hasDangerWarnings = warnings.some(w => w.type === 'danger');

  const handleSave = () => {
    setIsSaving(true);
    try {
      setCustomHeadHtml(headHtml);
      toast.success(t('html.saveSuccess', 'HEAD HTML saved successfully. Reload the page to apply changes.'));
    } catch (error) {
      console.error('Error saving HEAD HTML:', error);
      toast.error(t('html.saveError', 'Failed to save HEAD HTML'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setHeadHtml('');
    resetCustomHeadHtml();
    toast.success(t('html.resetSuccess', 'HEAD HTML reset to empty'));
  };

  return (
    <Card data-testid="settings-html-card">
      <CardHeader>
        <CardTitle data-testid="settings-html-title">
          {t('html.title', 'HTML Head Editor')}
        </CardTitle>
        <CardDescription data-testid="settings-html-subtitle">
          {t('html.subtitle', 'Edit the HEAD section of the Leaflet CRM app. Changes will be applied after page reload.')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Security Warnings */}
        {warnings.length > 0 && (
          <div className="space-y-2" data-testid="settings-html-warnings">
            {warnings.map((warning, index) => (
              <Alert 
                key={index} 
                variant={warning.type === 'danger' ? 'destructive' : 'default'}
                className={warning.type === 'warning' ? 'border-yellow-500 bg-yellow-500/10' : ''}
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="ml-2">
                  {warning.message}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              {t('html.headSection', 'HEAD Section')}
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2"
            >
              {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showPreview ? t('html.hidePreview', 'Hide Preview') : t('html.showPreview', 'Show Preview')}
            </Button>
          </div>
          
          <div 
            className="rounded-md border border-border overflow-hidden"
            data-testid="settings-html-editor-container"
          >
            <Editor
              value={headHtml}
              onValueChange={setHeadHtml}
              highlight={highlightCode}
              padding={16}
              placeholder="<!-- Enter custom HEAD HTML here -->"
              style={{
                fontFamily: '"Fira Code", "Fira Mono", Consolas, Monaco, "Andale Mono", monospace',
                fontSize: 14,
                backgroundColor: '#1d1f21',
                color: '#c5c8c6',
                minHeight: '300px',
                lineHeight: 1.5,
              }}
              textareaClassName="focus:outline-none"
              data-testid="settings-html-editor"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {t('html.warning', 'Warning: Incorrect HTML may break the application. Use with caution.')}
          </p>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="space-y-2" data-testid="settings-html-preview">
            <label className="text-sm font-medium text-foreground">
              {t('html.previewTitle', 'Preview - Elements to be injected')}
            </label>
            <div className="rounded-md border border-border bg-muted/50 p-4 max-h-64 overflow-auto">
              {parsedElements.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">
                  {t('html.noElements', 'No valid HTML elements to preview')}
                </p>
              ) : (
                <div className="space-y-3">
                  {parsedElements.map((element, index) => (
                    <div key={index} className="text-sm border-b border-border pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-primary">
                          &lt;{element.tag}&gt;
                        </span>
                      </div>
                      {element.attributes.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1">
                          {element.attributes.map((attr, attrIndex) => (
                            <div key={attrIndex} className="text-xs">
                              <span className="text-muted-foreground">{attr.name}:</span>{' '}
                              <span className="font-mono text-foreground truncate">
                                {attr.value.length > 60 ? `${attr.value.slice(0, 60)}...` : attr.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {element.content && (
                        <div className="ml-4 mt-1 text-xs text-muted-foreground italic">
                          {element.content.length > 100 ? `${element.content.slice(0, 100)}...` : element.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2"
            data-testid="settings-html-save-button"
          >
            <Save className="h-4 w-4" />
            {t('html.saveButton', 'Save Changes')}
            {hasDangerWarnings && (
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="flex items-center gap-2"
            data-testid="settings-html-reset-button"
          >
            <RotateCcw className="h-4 w-4" />
            {t('html.resetButton', 'Reset to Default')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};