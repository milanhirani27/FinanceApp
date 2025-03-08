import axios from 'axios';

const APP_ID = 'be15e9411a3a487dbe4962c1fa64c1c4';

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`,
    );

    const rates = response.data.rates;

    const inrRate = rates.INR;

    const baseCurrency = {
      code: 'INR',
      symbol: '₹',
      rate: 1,
    };

    const targetCurrencies = ['USD', 'EUR', 'AUD', 'CAD'];

    const currencies = targetCurrencies.map(code => ({
      code,
      symbol: getCurrencySymbol(code),
      rate: inrRate / rates[code],
    }));

    currencies.unshift(baseCurrency);

    return currencies;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};

const getCurrencySymbol = code => {
  switch (code) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'AUD':
      return 'A$';
    case 'CAD':
      return 'C$';
    case 'INR':
      return '₹';
    default:
      return code;
  }
};
