export const formattedNumber = (number: number) => {
  return number.toLocaleString();
};

const percentage50 = 50;
const percentage60 = 60;
export const calculatePercentage = (
  amount: number,
  typeincome: 1 | 2 | 8
): string | undefined => {
  if (typeincome == 1 || typeincome == 2) {
    const calculate = (amount * percentage50) / 100;
    const res = calculate <= 100000 ? amount - calculate : amount - 100000;
    return formattedNumber(res);
  } else if (typeincome == 8) {
    const calculate = amount - (amount * percentage60) / 100;
    return formattedNumber(calculate);
  }
  //   return (amount * percentage) / 100;
};

export const calculatePercentageNumber = (
  amount: number,
  typeincome: 1 | 2 | 8
): number => {
  if (typeincome == 1 || typeincome == 2) {
    const calculate = (amount * percentage50) / 100;
    const res = calculate <= 100000 ? amount - calculate : amount - 100000;
    return res;
  } else if (typeincome == 8) {
    const calculate = amount - (amount * percentage60) / 100;
    return calculate;
  } else return 0;
  //   return (amount * percentage) / 100;
};
