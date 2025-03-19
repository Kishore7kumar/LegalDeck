import currency from 'currency.js';

const INR = (value: number) => currency(value, { symbol: '₹', precision: 2 });
const USD_TO_INR_RATE = 83; // This should be fetched from an API in production

export const convertUSDtoINR = (usdAmount: number) => {
  const inrAmount = usdAmount * USD_TO_INR_RATE;
  return INR(inrAmount);
};

export const formatINR = (amount: number) => INR(amount).format();