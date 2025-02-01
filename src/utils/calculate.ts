import {
  ChartData,
  TaxBracket,
  TaxCalculationResult,
  TaxDetail,
} from "@/types/tex";
// import { formattedNumber } from "./formattedNumber";

const brackets: TaxBracket[] = [
  { range: "0 - 150,000", rate: 0 },
  { range: "150,001 - 300,000 ", rate: 0.05 },
  { range: "300,001 - 500,000", rate: 0.1 },
  { range: "500,001 - 750,000", rate: 0.15 },
  { range: "750,001 - 1,000,000", rate: 0.2 },
  { range: "1,000,001 - 2,000,000", rate: 0.25 },
  { range: "2,000,001 - 5,000,000", rate: 0.3 },
  { range: "5,000,001 ขึ้นไป", rate: 0.35 },
];

const percentage50 = 50;
const percentage60 = 60;
export const calculatePercentage = (
  amount: number,
  typeincome: 1 | 2 | 8
): number => {
  if (typeincome == 1 || typeincome == 2) {
    const calculate = (amount * percentage50) / 100;
    const res = calculate <= 100000 ? calculate : 100000;
    return res;
  } else if (typeincome == 8) {
    const calculate = (amount * percentage60) / 100;
    return calculate;
  } else return 0;
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

export const calculateTaxDetails = (income: number): TaxCalculationResult => {
  const taxDetails: TaxDetail[] = [];
  const chartData: ChartData[] = [];
  let previousMax = 0;
  let sum = 0;

  for (let i = 0; i < brackets.length; i++) {
    const currentBracket = brackets[i];
    const max =
      i < brackets.length - 1 ? parseRange(currentBracket.range)[1] : Infinity;

    if (income > max) {
      const paid = (max - previousMax) * currentBracket.rate;
      const rangeWithRate = `${currentBracket.range} -> ${(
        currentBracket.rate * 100
      ).toFixed(0)}% = `;
      taxDetails.push({ range: rangeWithRate, paid });
      chartData.push({
        category: `${rangeWithRate} = ${paid.toLocaleString()}`,
        value: paid,
      });
      sum += paid;
      previousMax = max;
    } else {
      const paid = (income - previousMax) * currentBracket.rate;
      const rangeWithRate = `${previousMax + 1} - ${income} -> ${(
        currentBracket.rate * 100
      ).toFixed(0)}% = `;
      taxDetails.push({ range: rangeWithRate, paid });
      chartData.push({
        category: `${rangeWithRate} = ${paid.toLocaleString()}`,
        value: paid,
      });
      sum += paid;
      break;
    }
  }

  return { details: taxDetails, sum, chartData };
};

function parseRange(range: string): [number, number] {
  const [min, max] = range
    .split(" - ")
    .map((value) =>
      value.includes("ขึ้นไป") ? Infinity : parseInt(value.replace(/,/g, ""))
    );
  return [min || 0, max || Infinity];
}
