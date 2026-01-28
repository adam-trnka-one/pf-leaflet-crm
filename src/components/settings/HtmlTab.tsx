import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Save } from 'lucide-react';
import { toast } from 'sonner';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';
import { getCustomHeadHtml, setCustomHeadHtml, resetCustomHeadHtml } from '@/hooks/useCustomHeadHtml';

const highlightCode = (code: string) => {
  return Prism.highlight(code, Prism.languages.markup, 'markup');
};

export const HtmlTab = () => {
  const { t } = useTranslation('settings');
  const [headHtml, setHeadHtml] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setHeadHtml(getCustomHeadHtml());
  }, []);

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
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            {t('html.headSection', 'HEAD Section')}
          </label>
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
                minHeight: '400px',
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
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2"
            data-testid="settings-html-save-button"
          >
            <Save className="h-4 w-4" />
            {t('html.saveButton', 'Save Changes')}
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
