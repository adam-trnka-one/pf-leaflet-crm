import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useWorkspace } from '@/contexts/WorkspaceContext';

export const useLanguageSync = () => {
  const { i18n } = useTranslation();
  const { workspaceData } = useWorkspace();

  useEffect(() => {
    const languageCode = workspaceData.languageCode || 'en';
    
    if (i18n.language !== languageCode) {
      i18n.changeLanguage(languageCode);
      console.log('Language synced to:', languageCode);
    }
  }, [workspaceData.languageCode, i18n]);

  return { currentLanguage: i18n.language };
};
