import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export const THEME_STORAGE_KEY = "leaflet-theme";

const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    storageKey={THEME_STORAGE_KEY}
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
