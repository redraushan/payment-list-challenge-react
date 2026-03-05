import { AxiosError } from 'axios';

export type PaymentStatus = 'completed' | 'pending' | 'failed';

export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  customerAddress: string;
  currency: Currency;
  status: PaymentStatus;
  date: string;
  description: string;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface FetchPaymentsParams extends PaginationParams {
  search?: string;
  currency?: Currency;
}

export interface FetchPaymentsResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
}

export type Currency =
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'AUD'
  | 'CAD'
  | 'ZAR'
  | 'JPY'
  | 'CZK';

export interface ApiError {
  message: string;
  code: string;
}

export type FetchPaymentError = AxiosError<ApiError>;
