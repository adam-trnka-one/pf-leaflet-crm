import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RotateCcw, Save } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'leaflet-custom-head-html';

const DEFAULT_HEAD_HTML = `<!-- ProductFruits Script -->
<script>
  (function(w,d,u,c) {
    w.$productFruits = w.$productFruits || [];
    w.productFruitsUser = c;
    var a = d.getElementsByTagName('head')[0];
    var r = d.createElement('script');
    r.async = 1;
    r.src = u;
    a.appendChild(r);
  })(window, document, 'https://app.productfruits.com/static/script.js', { username: 'demo-user' });
</script>

<!-- Custom Meta Tags -->
<meta name="theme-color" content="#3b82f6">

<!-- Custom Styles -->
<style>
  /* Add your custom styles here */
</style>`;

export const HtmlTab = () => {
  const { t } = useTranslation('settings');
  const [headHtml, setHeadHtml] = useState(DEFAULT_HEAD_HTML);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedHtml = localStorage.getItem(STORAGE_KEY);
    if (savedHtml) {
      setHeadHtml(savedHtml);
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, headHtml);
      toast.success(t('html.saveSuccess', 'HEAD HTML saved successfully'));
    } catch (error) {
      console.error('Error saving HEAD HTML:', error);
      toast.error(t('html.saveError', 'Failed to save HEAD HTML'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setHeadHtml(DEFAULT_HEAD_HTML);
    localStorage.setItem(STORAGE_KEY, DEFAULT_HEAD_HTML);
    toast.success(t('html.resetSuccess', 'HEAD HTML reset to default'));
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
          <label className="text-sm font-medium text-slate-700">
            {t('html.headSection', 'HEAD Section')}
          </label>
          <Textarea
            value={headHtml}
            onChange={(e) => setHeadHtml(e.target.value)}
            className="font-mono text-sm min-h-[400px] bg-slate-900 text-green-400 border-slate-700"
            placeholder="Enter HEAD HTML content..."
            data-testid="settings-html-textarea"
          />
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
