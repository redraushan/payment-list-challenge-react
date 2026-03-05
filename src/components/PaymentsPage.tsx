import {
  Container,
  FlexRow,
  SearchButton,
  SearchInput,
  Spinner,
  Table,
  TableBodyWrapper,
  TableHeader,
  TableHeaderWrapper,
  TableRow,
  TableWrapper,
  Title,
} from './components';
import { I18N } from '../constants/i18n';
import { usePayment } from '../hooks/usePayment';
import { useState, useDeferredValue } from 'react';
import { FetchPaymentsParams } from '../services/api/payments.types';
import { PaymentRows } from './PaymentRows';

export const PaymentsPage = () => {
  const [filters, setFilters] = useState<FetchPaymentsParams>({
    page: 1,
    pageSize: 5,
    search: '',
  });

  const [search, setSearch] = useState('');

  // If the network/rendering is slow, this lags behind the raw filters
  const deferredFilters = useDeferredValue(filters);

  // 3. Fetch data using the DEFERRED filters
  const { data, isLoading } = usePayment(deferredFilters);

  const payments = data?.payments;

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <FlexRow>
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

        <SearchButton onClick={() => setFilters({ ...filters, search })}>
          {I18N.SEARCH_BUTTON}
        </SearchButton>
      </FlexRow>

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
            {isLoading ? <Spinner /> : <PaymentRows payments={payments} />}
          </TableBodyWrapper>
        </Table>
      </TableWrapper>
    </Container>
  );
};
