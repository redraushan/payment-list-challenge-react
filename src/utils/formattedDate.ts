import { format } from 'date-fns';

export const formattedDate = (date: string) => {
  return format(new Date(date), 'dd/MM/yyyy, HH:mm:ss');
};
