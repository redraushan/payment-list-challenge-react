import { CURRENCIES } from '../constants';
import { I18N } from '../constants/i18n';
import { Currency } from '../services/api/payments.types';
import { Select } from './components';

interface CurrencyFilterProps {
  value: Currency | '';
  onChange: (value: Currency) => void;
}
export const CurrencyFilter = ({ value, onChange }: CurrencyFilterProps) => {
  return (
    <Select
      aria-label={I18N.CURRENCY_FILTER_LABEL}
      onChange={(e) => onChange(e.target.value as Currency)}
      value={value || I18N.EMPTY_CURRENCY}
    >
      <option key={I18N.CURRENCIES_OPTION} value=''>
        {I18N.CURRENCIES_OPTION}
      </option>
      {CURRENCIES.map((currency) => {
        return (
          <option key={currency} value={currency}>
            {currency}
          </option>
        );
      })}
    </Select>
  );
};
