export const FONT_STORAGE_KEY = 'leaflet-font';
export const FONT_OPTIONS = ['system', 'arial', 'georgia', 'verdana', 'trebuchet'] as const;
export type AppFont = typeof FONT_OPTIONS[number];

export function normalizeFont(value: unknown): AppFont {
  return FONT_OPTIONS.find(font => font === value) ?? 'system';
}