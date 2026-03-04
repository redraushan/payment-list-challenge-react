import { FetchPaymentsParams } from './payments.types';

export const paymentsKeys = {
  all: ['payments'] as const,

  lists: () => [...paymentsKeys.all, 'list'] as const,

  list: (params: FetchPaymentsParams) =>
    [...paymentsKeys.lists(), params] as const,
};
