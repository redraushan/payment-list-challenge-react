import { useQuery } from '@tanstack/react-query';
import { fetchPayment } from '../services/api/payments.api';
import {
  FetchPaymentError,
  FetchPaymentsParams,
  FetchPaymentsResponse,
} from '../services/api/payments.types';
import { paymentsKeys } from '../services/api/payments.keys';

export const usePayment = (params: FetchPaymentsParams) => {
  return useQuery<FetchPaymentsResponse, FetchPaymentError>({
    queryKey: paymentsKeys.list(params),
    queryFn: () => fetchPayment(params),
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: true,
  });
};
