import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export const THEME_COLOR_LIGHT = '#ffffff';
export const THEME_COLOR_DARK = '#0a0f1a';

/**
 * Keeps the browser UI (mobile address bar, native controls) in sync with the
 * resolved app theme by updating the active <meta name="theme-color"> tag.
 */
export const useThemeColorMeta = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const dark = resolvedTheme === 'dark';
    const color = dark ? THEME_COLOR_DARK : THEME_COLOR_LIGHT;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'theme-color');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', color);

    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  }, [resolvedTheme]);
};
