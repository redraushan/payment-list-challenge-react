import { format, parseISO, isValid } from 'date-fns';

export const formattedDate = (date: string) => {
  if (!date) return '-';

  const parsed = parseISO(date);
  if (!isValid(parsed)) return 'Invalid Date';

  return format(parsed, 'dd/MM/yyyy, HH:mm:ss');
};
