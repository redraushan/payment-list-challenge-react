import {
  ClearButton,
  Container,
  FilterRow,
  PaginationButton,
  PaginationRow,
  SearchButton,
  SearchInput,
  Spinner,
  Table,
  TableBodyWrapper,
  TableCell,
  TableFooterWrapper,
  TableHeader,
  TableHeaderWrapper,
  TableRow,
  TableWrapper,
  Title,
} from './components';
import { I18N } from '../constants/i18n';
import { usePayment } from '../hooks/usePayment';
import { PaymentRows } from './PaymentRows';
import { usePaymentFilters } from '../hooks/usePaymentFilters';
import { PaymentErrors } from './PaymentErrors';
import { CurrencyFilter } from './CurrencyFilter';

export const PaymentsPage = () => {
  const {
    filters,
    search,
    setSearch,
    resetFilters,
    handleSearch,
    handleCurrency,
    handlePageChange,
    isFilterApplied,
    isFirstPage,
    isLastPage,
    totalPages,
  } = usePaymentFilters();

  const { data, isLoading, isFetched, isError, error } = usePayment(filters);

  const payments = data?.payments;

  if (!isFetched) return null;
  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <form onSubmit={handleSearch}>
        <FilterRow>
          <label htmlFor='payment-search' className='sr-only'>
            {I18N.SEARCH_LABEL}
          </label>
          <SearchInput
            type='text'
            id='payment-search'
            name='payment-search'
            role='searchbox'
            aria-describedby='search-hint'
            placeholder={I18N.SEARCH_PLACEHOLDER}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span id='search-hint' className='sr-only'>
            {I18N.SEARCH_PLACEHOLDER}
          </span>

          <CurrencyFilter value={filters.currency} onChange={handleCurrency} />

          <SearchButton type='submit'>{I18N.SEARCH_BUTTON}</SearchButton>

          {isFilterApplied && (
            <ClearButton onClick={resetFilters}>
              {I18N.CLEAR_FILTERS}
            </ClearButton>
          )}
        </FilterRow>
      </form>

      {/* For a11y live updates */}
      <div role='alert' aria-live='assertive'>
        {isError && <PaymentErrors error={error} />}
      </div>

      {!isError && (
        <TableWrapper>
          <Table>
            <TableHeaderWrapper>
              <TableRow>
                <TableHeader>{I18N.TABLE_HEADER_PAYMENT_ID}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_DATE}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_AMOUNT}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_CUSTOMER}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_CURRENCY}</TableHeader>
                <TableHeader>{I18N.TABLE_HEADER_STATUS}</TableHeader>
              </TableRow>
            </TableHeaderWrapper>

            <TableBodyWrapper>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className='text-center'>
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : (
                <PaymentRows payments={payments} />
              )}
            </TableBodyWrapper>
            <TableFooterWrapper>
              <TableRow role='navigation'>
                <TableCell colSpan={6} style={{ padding: 0 }}>
                  <PaginationRow>
                    <PaginationButton
                      disabled={isFirstPage}
                      onClick={() => handlePageChange(-1)}
                    >
                      {I18N.PREVIOUS_BUTTON}
                    </PaginationButton>

                    {/* For a11y live updates */}
                    <p
                      aria-live='polite'
                      aria-atomic='true'
                      className='sr-only'
                    >
                      {`Page ${filters.page} of ${totalPages}`}
                    </p>
                    <p>{`${I18N.PAGE_LABEL} ${filters.page}`} </p>
                    <PaginationButton
                      disabled={isLastPage}
                      onClick={() => handlePageChange(1)}
                    >
                      {I18N.NEXT_BUTTON}
                    </PaginationButton>
                  </PaginationRow>
                </TableCell>
              </TableRow>
            </TableFooterWrapper>
          </Table>
        </TableWrapper>
      )}
    </Container>
  );
};
