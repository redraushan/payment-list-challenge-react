export function formattedCurrency(number: number) {
  const formatter = Intl.NumberFormat('en-US', {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return formatter.format(number);
}
