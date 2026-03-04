import { API_URL } from '../../constants';
import { apiClient } from './client';
import { FetchPaymentsParams, FetchPaymentsResponse } from './payments.types';

export const fetchPayment = async (
  params: FetchPaymentsParams,
): Promise<FetchPaymentsResponse> => {
  const { data } = await apiClient.get<FetchPaymentsResponse>(`${API_URL}`, {
    params,
  });
  return data;
};
