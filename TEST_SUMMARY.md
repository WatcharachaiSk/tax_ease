# TaxEase Test Summary

This document provides an overview of the testing suite implemented for the TaxEase application.

## Testing Framework
- **Framework:** Jest
- **Environment:** JSDOM (for component testing)
- **Library:** React Testing Library (RTL)

## Test Suites

### 1. Core Logic Unit Tests
**File:** `src/utils/calculate.test.ts`
**Goal:** Verify the accuracy of Thai personal income tax calculations.

| Test Case | Description |
|-----------|-------------|
| `calculatePercentage` | Verified 50% deduction for Salary (capped at 100k) and 60% for Selling (uncapped). |
| `calculatePercentageNumber` | Verified remaining amount after expenses for different income types. |
| `calculateTaxDetails` | Verified progressive tax brackets: 0%, 5%, 10%, 15%, 20%, 25%, 30%, 35%. |
| Zero/Negative Handling | Ensured calculations handle $0$ or negative inputs gracefully (treating them as 0). |

### 2. Component Integration Tests
**File:** `src/components/Cards/TaxCardEx/index.test.tsx`
**Goal:** Verify user interactions, state management, and UI responsiveness.

| Test Case | Description |
|-----------|-------------|
| Default Rendering | Verified that Salary, Personal Deduction, and Social Security appear by default. |
| Dynamic Updates | Verified that changing salary input immediately updates Gross Income, Net Income, and Tax Payable displays. |
| Modal Interaction | Verified opening, closing, and adding new items from "Income Selector" and "Deduction Selector" modals. |
| Item Removal | Verified that removable deductions can be successfully deleted from the list. |
| Formatted Input | Verified that input fields handle and display numbers with commas correctly. |

## Technical Implementation Details

### Mocking Strategy
- **amCharts 5:** Since amCharts relies on SVG and Canvas APIs not fully supported in JSDOM, the entire library is mocked. We verify that the component initializes the chart root without testing the visual rendering of the pyramid.
- **Framer Motion:** `motion` components are mocked to render as simple `div`s to avoid animation timing issues during tests. `AnimatePresence` is mocked to render children directly.

### Thai Locale Formatting
The tests use regex matchers (e.g., `/1,000,000/`) to be resilient against varying text node splits and to match the Thai locale's comma separators.

## How to Run Tests

### Single Run
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Coverage Report (Optional)
```bash
npx jest --coverage
```
