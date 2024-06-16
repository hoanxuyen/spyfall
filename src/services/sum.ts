export const sum = (a: number, b: number): number => {
  return a + b;
};

type Currency = {
  amount: number;
  currencyName: string;
};
export const sumCurrency = (a: Currency, b: Currency) => {
  if (a.amount < 0 || b.amount < 0) {
    throw new Error("Invalid Amount");
  }

  if (a.currencyName !== b.currencyName) {
    throw new Error("Can not sum two different currencies");
  }
  return a.amount + b.amount;
};
