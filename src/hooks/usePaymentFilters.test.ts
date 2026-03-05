import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePaymentFilters, defaultPaymentFilters } from './usePaymentFilters';
import { usePayment } from './usePayment';

vi.mock('./usePayment', () => ({
  usePayment: vi.fn(),
}));

describe('usePaymentFilters', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (usePayment as any).mockReturnValue({
      data: { total: 20 },
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePaymentFilters());

    expect(result.current.filters).toEqual(defaultPaymentFilters);
    expect(result.current.isFilterApplied).toBe(false);
    expect(result.current.totalPages).toBe(4);
    expect(result.current.isFirstPage).toBe(true);
  });

  it('should update filters when handleSearch is submitted', () => {
    const { result } = renderHook(() => usePaymentFilters());
    const mockEvent = { preventDefault: vi.fn() } as any;

    act(() => {
      result.current.setSearch('pay_134_1');
    });

    act(() => {
      result.current.handleSearch(mockEvent);
    });

    expect(result.current.filters.search).toBe('pay_134_1');
    expect(result.current.isFilterApplied).toBe(true);
  });

  it('should increment and decrement pages correctly', () => {
    const { result } = renderHook(() => usePaymentFilters());

    act(() => {
      result.current.handlePageChange(1);
    });
    expect(result.current.filters.page).toBe(2);
    expect(result.current.isFirstPage).toBe(false);

    act(() => {
      result.current.handlePageChange(-1);
    });
    expect(result.current.filters.page).toBe(1);
  });

  it('should identify when on the last page', () => {
    (usePayment as any).mockReturnValue({
      data: { total: 12 },
    });

    const { result } = renderHook(() => usePaymentFilters());

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.totalPages).toBe(3);
    expect(result.current.isLastPage).toBe(true);
  });

  it('should reset all filters to default', () => {
    const { result } = renderHook(() => usePaymentFilters());

    act(() => {
      result.current.handleCurrency('EUR');
      result.current.setSearch('pay_134_1');
    });

    expect(result.current.isFilterApplied).toBe(true);

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters).toEqual(defaultPaymentFilters);
    expect(result.current.search).toBe('');
    expect(result.current.isFilterApplied).toBe(false);
  });
});
