import { I18N } from '../constants/i18n';
import { FetchPaymentError } from '../services/api/payments.types';
import { ErrorBox } from './components';

interface PaymentErrorProps {
  error: FetchPaymentError;
}

const errorMessage = new Map([
  [404, I18N.PAYMENT_NOT_FOUND],
  [500, I18N.INTERNAL_SERVER_ERROR],
]);

export const PaymentErrors = ({ error }: PaymentErrorProps) => {
  const status = error?.response?.status;

  if (status) {
    return (
      <ErrorBox id='payment-errors' tabIndex={0}>
        {errorMessage.get(status) || I18N.SOMETHING_WENT_WRONG}
      </ErrorBox>
    );
  }
};
