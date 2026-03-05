import { I18N } from '../constants/i18n';
import { FetchPaymentsResponse } from '../services/api/payments.types';
import { formattedCurrency } from '../utils/formattedCurrency';
import { formattedDate } from '../utils/formattedDate';
import { TableRow, TableCell, StatusBadge } from './components';

interface PaymentRowsProps {
  payments: FetchPaymentsResponse['payments'] | undefined;
}

export const PaymentRows = ({ payments }: PaymentRowsProps) => {
  return payments?.length && payments?.length > 0 ? (
    payments.map((payment) => (
      <TableRow key={payment.id}>
        <TableCell>{payment.id}</TableCell>
        <TableCell>{formattedDate(payment.date)}</TableCell>
        <TableCell>{formattedCurrency(payment.amount)}</TableCell>
        <TableCell>{payment.customerName || I18N.EMPTY_CUSTOMER}</TableCell>
        <TableCell>{payment.currency || I18N.EMPTY_CURRENCY}</TableCell>
        <TableCell>
          <StatusBadge status={payment.status}>{payment.status}</StatusBadge>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={6} style={{ textAlign: 'center' }}>
        {I18N.NO_PAYMENTS_FOUND}
      </TableCell>
    </TableRow>
  );
};
