import React from "react";

export interface IncomeType {
  id: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  deductPct: number;
  deductMax: number;
  desc: string;
  tag: string;
  tagColor: "green" | "amber" | "gray";
  maxLabel: string;
  ref: string;
  refLabel: string;
  core: boolean;
}

export interface DeductionType {
  id: string;
  icon: React.ReactNode;
  name: string;
  desc: string;
  fixed?: number;
  maxAmt?: number;
  pctOfIncome?: number;
  maxLabel: string;
  tag: string;
  tagColor: "green" | "amber" | "gray";
  ref: string;
  refLabel: string;
  removable: boolean;
  hasInput: boolean;
}

export interface UserIncome extends IncomeType {
  on: boolean;
  amount: number;
}

export interface UserDeduction extends DeductionType {
  amount: number;
  userAmt: number;
}
