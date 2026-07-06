import type { CurrencyCode, CurrencyConfig } from '@/types/currency';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  GBP: { code: 'GBP', symbol: '£', label: 'Pound sterling', rateFromGBP: 1 },
  USD: { code: 'USD', symbol: '$', label: 'US dollar', rateFromGBP: 1.28 },
  EUR: { code: 'EUR', symbol: '€', label: 'Euro', rateFromGBP: 1.17 },
};

export const DEFAULT_CURRENCY: CurrencyCode = 'GBP';

export const CURRENCY_ORDER: CurrencyCode[] = ['GBP', 'USD', 'EUR'];
