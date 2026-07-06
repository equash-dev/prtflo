import { CURRENCIES } from '@/config/currencies';
import type { CurrencyCode } from '@/types/currency';

export function convertFromGBP(amountGBP: number, code: CurrencyCode): number {
  return amountGBP * CURRENCIES[code].rateFromGBP;
}

export function formatPrice(
  amountGBP: number,
  code: CurrencyCode,
  options: { decimals?: number } = {},
): string {
  const decimals = options.decimals ?? 0;
  const value = convertFromGBP(amountGBP, code);
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: code,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return formatter.format(value);
}

export function formatMoneyShort(
  amountGBP: number,
  code: CurrencyCode,
): string {
  const value = convertFromGBP(amountGBP, code);
  if (value >= 1_000_000) {
    return `${CURRENCIES[code].symbol}${(value / 1_000_000).toFixed(1)}m`;
  }
  if (value >= 1_000) {
    return `${CURRENCIES[code].symbol}${(value / 1_000).toFixed(1)}k`;
  }
  return `${CURRENCIES[code].symbol}${Math.round(value).toLocaleString('en-GB')}`;
}
