export const TAX = {
  TAX_BRACKETS: [
    {
      min: 0,
      max: 150000,
      rate: 0,
    },
    {
      min: 150001,
      max: 300000,
      rate: 5,
    },
    {
      min: 300001,
      max: 500000,
      rate: 10,
    },
    {
      min: 500001,
      max: 750000,
      rate: 15,
    },
    {
      min: 750001,
      max: 1000000,
      rate: 20,
    },
    {
      min: 1000001,
      max: 2000000,
      rate: 25,
    },
    {
      min: 2000001,
      max: 5000000,
      rate: 30,
    },
    {
      min: 5000001,
      max: null,
      rate: 35,
    },
  ],
  TAX_BRACKETS_TABLE: [
    {
      range: "0 - 150,000",
      rate: "ยกเว้น",
    },
    {
      range: "150,001 - 300,000",
      rate: "5%",
    },
    {
      range: "300,001 - 500,000",
      rate: "10%",
    },
    {
      range: "500,001 - 750,000",
      rate: "15%",
    },
    {
      range: "750,001 - 1,000,000",
      rate: "20%",
    },
    {
      range: "1,000,001 - 2,000,000",
      rate: "25%",
    },
    {
      range: "2,000,001 - 5,000,000",
      rate: "30%",
    },
    {
      range: "5,000,001 ขึ้นไป",
      rate: "35%",
    },
  ],
};
