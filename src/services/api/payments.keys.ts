import { defineQueryKeys, key } from 'react-query-key-manager';
import { FetchPaymentsParams } from './payments.types';

export const paymentsKeys = defineQueryKeys('payments', {
  list: key((params: FetchPaymentsParams) => ['payments', 'list', params]),
});
