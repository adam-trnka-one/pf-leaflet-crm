import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { AppFont, FONT_STORAGE_KEY, normalizeFont } from '@/lib/font-preference';

const FontContext = createContext<{ font: AppFont; setFont: (value: string) => void } | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, updateFont] = useState<AppFont>(() => {
    try {
      return normalizeFont(localStorage.getItem(FONT_STORAGE_KEY));
    } catch {
      return 'system';
    }
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.font = font;
  }, [font]);

  useEffect(() => {
    const syncFont = (event: StorageEvent) => {
      if (event.storageArea === localStorage && (event.key === FONT_STORAGE_KEY || event.key === null)) {
        updateFont(normalizeFont(event.newValue));
      }
    };
    window.addEventListener('storage', syncFont);
    return () => window.removeEventListener('storage', syncFont);
  }, []);

  const setFont = (value: string) => {
    const selected = normalizeFont(value);
    updateFont(selected);
    try {
      localStorage.setItem(FONT_STORAGE_KEY, selected);
    } catch {
      // Keep the choice usable for this session if browser storage is unavailable.
    }
  };

  return <FontContext.Provider value={{ font, setFont }}>{children}</FontContext.Provider>;
}

export function useFont() {
  const context = useContext(FontContext);
  if (!context) throw new Error('useFont must be used within FontProvider');
  return context;
}