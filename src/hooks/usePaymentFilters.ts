import { FormEvent, useState } from 'react';
import { Currency, FetchPaymentsParams } from '../services/api/payments.types';

export const defaultPaymentFilters: FetchPaymentsParams = {
  page: 1,
  pageSize: 5,
  search: '',
  currency: '',
};

// Check if ANY filter is different from its default
const isAnyFilterApplied = (filters: FetchPaymentsParams) =>
  Object.keys(filters).some((key) => {
    const k = key as keyof FetchPaymentsParams;

    if (k === 'page') return filters.page !== defaultPaymentFilters.page;
    if (k === 'pageSize')
      return filters.pageSize !== defaultPaymentFilters.pageSize;
    if (k === 'search') return filters.search !== defaultPaymentFilters.search;
    if (k === 'currency')
      return filters.currency !== defaultPaymentFilters.currency;

    return false;
  });

export const usePaymentFilters = () => {
  const [filters, setFilters] = useState<FetchPaymentsParams>({
    page: 1,
    pageSize: 5,
    search: '',
    currency: '',
  });

  const [search, setSearch] = useState('');

  const isFilterApplied = isAnyFilterApplied(filters);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    setFilters((previousFilters) => ({ ...previousFilters, search }));
  };

  const handleCurrency = (currency: Currency) => {
    setFilters((previousFilters) => ({ ...previousFilters, currency }));
  };

  const resetFilters = () => {
    setSearch('');
    setFilters(defaultPaymentFilters);
  };
  return {
    filters,
    search,
    isFilterApplied,
    setSearch,
    handleSearch,
    handleCurrency,
    resetFilters,
  };
};
