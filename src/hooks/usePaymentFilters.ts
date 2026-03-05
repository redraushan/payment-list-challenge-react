import { FormEvent, useMemo, useState, useTransition } from 'react';
import { Currency, FetchPaymentsParams } from '../services/api/payments.types';
import { usePayment } from './usePayment';

export const defaultPaymentFilters = {
  page: 1,
  pageSize: 5,
  search: '',
  currency: '',
} as const satisfies FetchPaymentsParams;

export const usePaymentFilters = () => {
  const [, startTransition] = useTransition();
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState<Currency | ''>('');

  const [filters, setFilters] = useState<FetchPaymentsParams>(
    defaultPaymentFilters,
  );

  const { data: cachedData } = usePayment(filters);

  const { totalPages, isLastPage, isFirstPage } = useMemo(() => {
    const total = cachedData?.total ?? 0;
    const size = filters.pageSize ?? defaultPaymentFilters.pageSize;
    const pages = Math.ceil(total / size) || defaultPaymentFilters.page;
    const current = filters.page ?? defaultPaymentFilters.page;

    return {
      totalPages: pages,
      isLastPage: current >= pages,
      isFirstPage: current === defaultPaymentFilters.page,
    };
  }, [cachedData?.total, filters.pageSize, filters.page]);

  const isFilterApplied = useMemo(() => {
    return Object.keys(filters).some((key) => {
      const k = key as keyof FetchPaymentsParams;

      return filters[k] !== defaultPaymentFilters[k];
    });
  }, [filters]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    startTransition(() => {
      setFilters((previousFilters) => ({
        ...previousFilters,
        search,
        currency,
        page: defaultPaymentFilters.page,
      }));
    });
  };

  const handleCurrency = (currency: Currency) => {
    startTransition(() => {
      setCurrency(currency);
    });
  };

  const handlePageChange = (delta: number) => {
    startTransition(() => {
      setFilters((prev) => {
        const currentPage = prev.page ?? defaultPaymentFilters.page;
        const newPage = currentPage + delta;

        if (newPage < 1) return prev;

        return {
          ...prev,
          page: newPage,
        };
      });
    });
  };

  const resetFilters = () => {
    setSearch('');
    setCurrency('');
    startTransition(() => {
      setFilters(defaultPaymentFilters);
    });
  };
  return {
    filters,
    search,
    currency,
    isFilterApplied,
    isFirstPage,
    isLastPage,
    totalPages,
    setSearch,
    handleSearch,
    handleCurrency,
    handlePageChange,
    resetFilters,
  };
};
