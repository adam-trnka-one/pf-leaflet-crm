import { useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { RTL_LANGUAGES } from '@/i18n';

interface RTLProviderProps {
  children: ReactNode;
}

const RTLProvider = ({ children }: RTLProviderProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = RTL_LANGUAGES.includes(i18n.language);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    
    // Add RTL class for additional styling if needed
    if (isRTL) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }

    return () => {
      document.documentElement.classList.remove('rtl');
    };
  }, [i18n.language]);

  return <>{children}</>;
};

export default RTLProvider;
