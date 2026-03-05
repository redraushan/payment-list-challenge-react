import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { formattedDate } from './formattedDate';

describe('formattedDate', () => {
  beforeAll(() => {
    vi.stubEnv('TZ', 'UTC');
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  describe('formattedDate', () => {
    it('should format a valid ISO string', () => {
      expect(formattedDate('2026-03-05T20:00:00Z')).toBe(
        '05/03/2026, 20:00:00',
      );
    });

    it('should handle dates without time component', () => {
      expect(formattedDate('2026-01-01')).toContain('01/01/2026');
    });

    it('should return a dash for null or undefined values', () => {
      expect(formattedDate('')).toBe('-');
      // @ts-expect-error - testing runtime null safety
      expect(formattedDate(null)).toBe('-');
      // @ts-expect-error - testing runtime null safety
      expect(formattedDate(undefined)).toBe('-');
    });

    it('should return "Invalid Date" for invalid strings', () => {
      expect(formattedDate('not-a-date')).toBe('Invalid Date');
      expect(formattedDate('2026-13-45')).toBe('Invalid Date');
    });
  });
});
