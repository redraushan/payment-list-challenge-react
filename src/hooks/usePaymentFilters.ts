import { FormEvent, FormEventHandler, useDeferredValue, useState } from 'react';
import { FetchPaymentsParams } from '../services/api/payments.types';

export const defaultPaymentFilters: FetchPaymentsParams = {
  page: 1,
  pageSize: 5,
  search: '',
};

// 1. Check if ANY filter is different from its default
const isAnyFilterApplied = (filters: FetchPaymentsParams) =>
  Object.keys(filters).some((key) => {
    if (key === 'page') return filters.page !== defaultPaymentFilters.page;
    if (key === 'pageSize')
      return filters.page !== defaultPaymentFilters.pageSize;
    if (key === 'search')
      return filters.search !== defaultPaymentFilters.search;

    return false;
  });

export const usePaymentFilters = () => {
  const [filters, setFilters] = useState<FetchPaymentsParams>({
    page: 1,
    pageSize: 5,
    search: '',
  });

  const [search, setSearch] = useState('');

  // If the network/rendering is slow, this lags behind the raw filters
  const deferredFilters = useDeferredValue(filters);

  const isFilterApplied = isAnyFilterApplied(filters);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    setFilters((previousFilters) => ({ ...previousFilters, search }));
  };

  const resetFilters = () => {
    setSearch('');
    setFilters(defaultPaymentFilters);
  };
  return {
    filters: deferredFilters,
    search,
    isFilterApplied,
    setSearch,
    handleSearch,
    resetFilters,
  };
};
