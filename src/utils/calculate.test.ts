import { calculatePercentage, calculatePercentageNumber, calculateTaxDetails } from './calculate';

describe('calculatePercentage', () => {
  it('should calculate 50% for type 1 (Salary) capped at 100,000', () => {
    expect(calculatePercentage(100000, 1)).toBe(50000);
    expect(calculatePercentage(300000, 1)).toBe(100000); // capped
  });

  it('should calculate 60% for type 8 (Selling) without cap', () => {
    expect(calculatePercentage(100000, 8)).toBe(60000);
    expect(calculatePercentage(1000000, 8)).toBe(600000);
  });

  it('should return 0 for unknown income types', () => {
    // @ts-ignore - testing runtime safety for unknown types
    expect(calculatePercentage(100000, 4)).toBe(0);
  });
});

describe('calculatePercentageNumber', () => {
  it('should return the remaining amount after 50% deduction (capped at 100k) for type 1', () => {
    expect(calculatePercentageNumber(100000, 1)).toBe(50000);
    expect(calculatePercentageNumber(300000, 1)).toBe(200000); // 300k - 100k cap
  });

  it('should return the remaining amount after 60% deduction for type 8', () => {
    expect(calculatePercentageNumber(100000, 8)).toBe(40000);
  });
});

describe('calculateTaxDetails', () => {
  it('should return 0 tax for income up to 150,000', () => {
    const result = calculateTaxDetails(150000);
    expect(result.sum).toBe(0);
    expect(result.details.length).toBe(1);
  });

  it('should calculate 5% for income between 150,001 and 300,000', () => {
    // 300,000 income: first 150,000 is 0. Next 150,000 at 5% = 7,500
    const result = calculateTaxDetails(300000);
    expect(result.sum).toBe(7500);
  });

  it('should calculate progressive tax for higher brackets', () => {
    // 600,000 income:
    // 0-150k: 0
    // 150k-300k: 7,500 (150k * 5%)
    // 300k-500k: 20,000 (200k * 10%)
    // 500k-600k: 15,000 (100k * 15%)
    // Total = 42,500
    const result = calculateTaxDetails(600000);
    expect(result.sum).toBe(42500);
  });

  it('should handle zero income', () => {
    const result = calculateTaxDetails(0);
    expect(result.sum).toBe(0);
  });

  it('should handle negative income by treating it as zero', () => {
    const result = calculateTaxDetails(-5000);
    expect(result.sum).toBe(0);
  });
});
