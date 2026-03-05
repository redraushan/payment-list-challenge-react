import {
  ClearButton,
  Container,
  FilterRow,
  SearchButton,
  SearchInput,
  Spinner,
  Table,
  TableBodyWrapper,
  TableCell,
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

export const PaymentsPage = () => {
  const {
    filters,
    search,
    setSearch,
    resetFilters,
    handleSearch,
    isFilterApplied,
  } = usePaymentFilters();
  const { data, isLoading, isError, error } = usePayment(filters);

  console.log({ isError, error });
  const payments = data?.payments;

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

          <SearchButton type='submit'>{I18N.SEARCH_BUTTON}</SearchButton>

          {isFilterApplied && (
            <ClearButton onClick={resetFilters}>
              {I18N.CLEAR_FILTERS}
            </ClearButton>
          )}
        </FilterRow>
      </form>

      {isError ? (
        <PaymentErrors error={error} />
      ) : (
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
          </Table>
        </TableWrapper>
      )}
    </Container>
  );
};
