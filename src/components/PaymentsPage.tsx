import {
  Container,
  Spinner,
  StatusBadge,
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
import { formattedDate } from '../utils/formattedDate';
import { formattedCurrency } from '../utils/formattedCurrency';

export const PaymentsPage = () => {
  const { data, isLoading } = usePayment({ page: 1, pageSize: 5 });

  if (isLoading) return <Spinner />;

  const payments = data?.payments;

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>
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
            {payments && payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{formattedDate(payment.date)}</TableCell>
                  <TableCell>{formattedCurrency(payment.amount)}</TableCell>
                  <TableCell>{payment.customerName || '—'}</TableCell>
                  <TableCell>{payment.currency}</TableCell>
                  <TableCell>
                    <StatusBadge status={payment.status}>
                      {payment.status}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                  {I18N.NO_PAYMENTS_FOUND}
                </TableCell>
              </TableRow>
            )}
          </TableBodyWrapper>
        </Table>
      </TableWrapper>
    </Container>
  );
};
