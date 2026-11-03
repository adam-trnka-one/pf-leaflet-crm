import { describe, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { FONT_OPTIONS, normalizeFont } from './font-preference';

describe('font preference', () => {
  test('keeps supported font selections', () => {
    for (const font of FONT_OPTIONS) assert.equal(normalizeFont(font), font);
  });

  test('defaults missing or invalid saved preferences to system', () => {
    assert.equal(normalizeFont(null), 'system');
    assert.equal(normalizeFont('unknown-font'), 'system');
  });
});