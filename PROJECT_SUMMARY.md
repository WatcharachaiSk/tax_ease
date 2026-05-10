# TaxEase (TEX Ease) - Project Summary

TaxEase is a modern web application designed to simplify the complexity of Thai personal income tax calculation. It transforms numerical tax data into interactive visualizations and easy-to-understand charts, helping users better grasp how their taxes are calculated.

## 🚀 Key Features

- **Interactive Tax Calculation**: Real-time tax estimation based on user input.
- **Data Visualization**: Uses amCharts 5 to visualize tax brackets and calculation steps.
- **Thai Tax Logic**: Implementation of Thai Personal Income Tax brackets and standard deductions (Type 1, 2, and 8 income).
- **Responsive Design**: Modern UI built with Tailwind CSS, optimized for both desktop and mobile.
- **Educational Content**: Explains concepts like "Net Income" (รายได้สุทธิ) through clear examples and visual aids.

## 🛠 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Visualizations**: [amCharts 5](https://www.amcharts.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 📂 Project Structure

```text
src/
├── app/               # Next.js App Router (Layouts & Pages)
├── components/        # Reusable UI components
│   ├── amcharts/      # Specialized chart components
│   ├── Table/         # Tax rate tables
│   └── Cards/         # Informational cards
├── constants/         # Static data (Tax brackets, Deduction rates)
├── containers/        # Page-level logic and layout containers
├── libs/              # Library configurations (e.g., fonts)
├── types/             # TypeScript type definitions
└── utils/             # Business logic (Tax calculation engine)
```

## 🧮 Core Logic

The project's heart lies in `src/utils/calculate.ts`, which implements the progressive tax system:
1. **Income Categorization**: Handles different income types with specific expense deduction rules.
2. **Net Income Calculation**: Subtracts expenses and personal deductions from gross income.
3. **Progressive Brackets**: Applies the tiered tax rates (0% to 35%) to the net income.

## 🎨 Visual Assets

- **Fonts**: Includes `TH Sarabun New` in `public/fonts/`, ensuring a familiar look for Thai users accustomed to official documents.
- **Images**: Local assets for branding and UI enhancement in the `public/` directory.

---
*Created on May 10, 2026*
