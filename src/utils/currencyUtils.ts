
export type CurrencyType = 'fiat' | 'crypto';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  type: CurrencyType;
}

// Common fiat currencies
export const fiatCurrencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', type: 'fiat' },
  { code: 'EUR', name: 'Euro', symbol: '€', type: 'fiat' },
  { code: 'GBP', name: 'British Pound', symbol: '£', type: 'fiat' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', type: 'fiat' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', type: 'fiat' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', type: 'fiat' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', type: 'fiat' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', type: 'fiat' },
];

// Common cryptocurrencies
export const cryptoCurrencies: Currency[] = [
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', type: 'crypto' },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', type: 'crypto' },
  { code: 'USDT', name: 'Tether', symbol: '₮', type: 'crypto' },
  { code: 'BNB', name: 'Binance Coin', symbol: 'BNB', type: 'crypto' },
  { code: 'SOL', name: 'Solana', symbol: 'SOL', type: 'crypto' },
  { code: 'ADA', name: 'Cardano', symbol: 'ADA', type: 'crypto' },
  { code: 'XRP', name: 'XRP', symbol: 'XRP', type: 'crypto' },
  { code: 'DOGE', name: 'Dogecoin', symbol: 'Ð', type: 'crypto' },
];

// All available currencies
export const allCurrencies: Currency[] = [...fiatCurrencies, ...cryptoCurrencies];

// Get currency by code
export const getCurrencyByCode = (code: string): Currency | undefined => {
  return allCurrencies.find(currency => currency.code === code);
};

// Format currency value
export const formatCurrencyValue = (
  value: number, 
  currencyCode: string = 'USD', 
  options: Intl.NumberFormatOptions = {}
): string => {
  const currency = getCurrencyByCode(currencyCode);
  
  if (!currency) {
    return `${value}`;
  }
  
  if (currency.type === 'fiat') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.code,
      maximumFractionDigits: 2,
      ...options
    }).format(value);
  } else {
    // For cryptocurrencies, we use a custom format
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8,
      ...options
    });
    
    return `${currency.symbol}${formatter.format(value)}`;
  }
};
