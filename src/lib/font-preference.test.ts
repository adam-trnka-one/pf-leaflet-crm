import { describe, expect, test } from 'bun:test';
import { FONT_OPTIONS, normalizeFont } from './font-preference';

describe('font preference', () => {
  test('keeps supported font selections', () => {
    for (const font of FONT_OPTIONS) expect(normalizeFont(font)).toBe(font);
  });

  test('defaults missing or invalid saved preferences to system', () => {
    expect(normalizeFont(null)).toBe('system');
    expect(normalizeFont('unknown-font')).toBe('system');
  });
});