import { describe, it, expect } from 'vitest';
import { formattedCurrency } from './formattedCurrency';

describe('formattedCurrency', () => {
  it('should format an integer with two decimal places', () => {
    expect(formattedCurrency(100)).toBe('100.00');
  });

  it('should format a float to exactly two decimal places', () => {
    expect(formattedCurrency(123.456)).toBe('123.46');
    expect(formattedCurrency(123.4)).toBe('123.40');
  });
});
