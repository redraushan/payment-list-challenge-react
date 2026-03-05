import { I18N } from '../constants/i18n';
import { FetchPaymentError } from '../services/api/payments.types';
import { ErrorBox } from './components';

interface PaymentErrorProps {
  error: FetchPaymentError;
}

const errorMessage = new Map([[404, I18N.PAYMENT_NOT_FOUND]]);

export const PaymentErrors = ({ error }: PaymentErrorProps) => {
  const status = error?.response?.status;

  if (status) {
    return <ErrorBox>{errorMessage.get(status)}</ErrorBox>;
  }
};
