export type TaxBracket = {
  range: string;
  rate: number;
};

export type TaxDetail = {
  range: string;
  paid: number;
};

export type TaxCalculationResult = {
  details: TaxDetail[];
  sum: number;
};
