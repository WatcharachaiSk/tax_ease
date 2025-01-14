"use client";

import { useEffect, useState } from "react";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5xy from "@amcharts/amcharts5/xy";
// import * as am5radar from "@amcharts/amcharts5/radar";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import React, { FC } from "react";
import { formattedNumber } from "@/utils/formattedNumber";
import { DEDUCTION } from "@/constants/tax";
import {
  calculatePercentage,
  calculatePercentageNumber,
  calculateTaxDetails,
} from "@/utils/calculate";
import { TaxCalculationResult } from "@/types/tex";

const ChartInput: FC = ({}) => {
  const [lastIncome, setLastIncome] = useState<number>(0);
  //
  const [income, setIncome] = useState<number>(350000);
  const [income1, setIncome1] = useState<number>(350000);
  const [income2, setIncome2] = useState<number>(0);
  const [income8, setIncome8] = useState<number>(0);
  //
  const [deduction, setDeduction] = useState<number>(DEDUCTION);
  //
  const [expenses, setExpenses] = useState<number>(0);
  const [expenses1, setExpenses1] = useState<number>(0);
  const [expenses2, setExpenses2] = useState<number>(0);
  const [expenses8, setExpenses8] = useState<number>(0);
  //
  const [taxDetails, setTaxDetails] = useState<
    TaxCalculationResult | undefined
  >();
  //
  // const [chartData, setChartData] = useState(data);

  //   useEffect(() => {
  //     const root = am5.Root.new("chartdiv1");

  //     root.setThemes([am5themes_Animated.new(root)]);

  //     const chart = root.container.children.push(
  //       am5radar.RadarChart.new(root, {
  //         panX: false,
  //         panY: false,
  //         wheelX: "panX",
  //         wheelY: "zoomX",
  //         innerRadius: am5.percent(30),
  //         startAngle: -180,
  //         endAngle: 0,
  //       })
  //     );

  //     const cursor = chart.set(
  //       "cursor",
  //       am5radar.RadarCursor.new(root, {
  //         behavior: "zoomX",
  //       })
  //     );

  //     cursor.lineY.set("visible", false);

  //     const xRenderer = am5radar.AxisRendererCircular.new(root, {});
  //     xRenderer.labels.template.setAll({ radius: 10 });
  //     xRenderer.grid.template.setAll({ forceHidden: true });

  //     const yRenderer = am5radar.AxisRendererRadial.new(root, {
  //       minGridDistance: 20,
  //     });
  //     yRenderer.labels.template.setAll({
  //       centerX: am5.p100,
  //       fontWeight: "500",
  //       fontSize: 12,
  //       templateField: "columnSettings",
  //       rotation: 10, // หมุนตัวหนังสือให้เป็นแนวนอน
  //       //   horizontalCenter: "right", // จัดตัวหนังสือไปที่ขวา
  //       //   verticalCenter: "middle", // จัดตำแหน่งในแนวตั้ง
  //     });
  //     yRenderer.grid.template.setAll({ forceHidden: true });

  //     const yAxis = chart.yAxes.push(
  //       am5xy.CategoryAxis.new(root, {
  //         categoryField: "category",
  //         renderer: yRenderer,
  //       })
  //     );
  //     yAxis.data.setAll(chartData);

  //     // สร้าง series สำหรับแต่ละ item โดยใช้ max จาก `full` ของแต่ละ item
  //     chartData.forEach((item) => {
  //       const maxFull = item.full; // กำหนด max ตามค่าจาก `full` ของแต่ละ item

  //       const xAxis = chart.xAxes.push(
  //         am5xy.ValueAxis.new(root, {
  //           renderer: xRenderer,
  //           strictMinMax: false,
  //           max: maxFull, // กำหนด max ตามค่าของแต่ละ item
  //           tooltip: am5.Tooltip.new(root, {}),
  //         })
  //       );

  //       // สร้าง series สำหรับแต่ละ item
  //       const series = chart.series.push(
  //         am5radar.RadarColumnSeries.new(root, {
  //           xAxis,
  //           yAxis,
  //           clustered: false,
  //           valueXField: "full",
  //           categoryYField: "category",
  //           fill: item.columnSettings.fill, // ใช้ fill จากแต่ละ item
  //         })
  //       );

  //       series.columns.template.setAll({
  //         width: am5.p100,
  //         fillOpacity: 0.08,
  //         strokeOpacity: 0,
  //         cornerRadius: 20,
  //       });

  //       series.data.setAll([item]);

  //       // สามารถเพิ่ม series สำหรับ value ได้ตามต้องการ
  //       const seriesValue = chart.series.push(
  //         am5radar.RadarColumnSeries.new(root, {
  //           xAxis,
  //           yAxis,
  //           clustered: false,
  //           valueXField: "value",
  //           categoryYField: "category",
  //         })
  //       );

  //       seriesValue.columns.template.setAll({
  //         width: am5.p100,
  //         strokeOpacity: 0,
  //         tooltipText: "{category}: {valueX}",
  //         cornerRadius: 20,
  //         templateField: "columnSettings",
  //       });

  //       seriesValue.data.setAll([item]);
  //     });

  //     chart.appear(1000, 100);

  //     return () => {
  //       root.dispose();
  //     };
  //   }, [chartData]);

  useEffect(() => {
    setIncome(income1 + income2 + income8);
    setLastIncome(
      calculatePercentageNumber(income1, 1) +
        calculatePercentageNumber(income2, 2) +
        calculatePercentageNumber(income8, 8)
    );
    setExpenses(
      calculatePercentage(income1, 1) +
        calculatePercentage(income2, 2) +
        calculatePercentage(income8, 8)
    );
    setExpenses1(calculatePercentage(income1, 1));
    setExpenses2(calculatePercentage(income2, 2));
    setExpenses8(calculatePercentage(income8, 8));
  }, [income1, income2, income8]);
  useEffect(() => {
    // console.log(
    //   "calculateTaxDetails(lastIncome) is ",
    //   calculateTaxDetails(lastIncome - deduction)
    // );
    setTaxDetails(calculateTaxDetails(lastIncome - deduction));
  }, [lastIncome, deduction]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isInput: 1 | 2 | 8 | "d"
  ) => {
    const inputValue = parseInt(e.target.value) || 0;
    if (isInput == 1) {
      setIncome1(inputValue);
    } else if (isInput == 2) {
      setIncome2(inputValue);
    } else if (isInput == 8) {
      setIncome8(inputValue);
    } else if (isInput == "d") {
      setDeduction(inputValue <= DEDUCTION ? DEDUCTION : inputValue);
    }
    // const updatedData = data.map((item) => {
    //   return {
    //     ...item,
    //     value: item.category.includes("ขึ้นไป")
    //       ? item.value
    //       : inputIncome / 10000,
    //   };
    // });
    // setChartData(updatedData);
  };

  return (
    <div className="w-full text-2xl">
      <form className=" bg-gray-50 p-4 rounded-lg">
        <div className="flex md:flex-row xl:flex-row flex-col-reverse w-full gap-2 mb-6">
          <div className="flex-1">กำลังพัฒนา</div>
          <div className="flex-1 flex flex-col gap-y-2">
            <p className="text-end mb-2 text-gray-900 ">
              รายได้ทั้งปี{" "}
              <span className="text-3xl text-[#2E86C1] font-bold bg-blue-50 rounded-md">
                {formattedNumber(income)}
              </span>{" "}
              บาท
            </p>
            {/*  */}
            <div className="flex flex-row items-center gap-x-1">
              {/*  */}
              <div className="basis-3/4 flex flex-col ">
                <label className="">เงินเดือนทั้งปี (รวมโบนัส)</label>
                <input
                  id="income-range-1"
                  type="range"
                  value={income1}
                  onChange={(e) => {
                    handleInputChange(e, 1);
                  }}
                  max={6000000}
                  min={0}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                ></input>
              </div>
              {/*  */}
              <div className="basis-1/4">
                <input
                  id="income-number-1"
                  type="number"
                  value={income1}
                  onChange={(e) => {
                    handleInputChange(e, 1);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  placeholder="รายได้รวมทั้งปี"
                  required
                />
              </div>
            </div>
            {/*  */}
            <div className="flex flex-row items-center gap-x-1">
              {/*  */}
              <div className="basis-3/4 flex flex-col ">
                <label className="">
                  ฟรีแลนซ์/<span className="text-lg text-gray-500">ทั้งปี</span>
                </label>
                <input
                  id="income-range-2"
                  type="range"
                  value={income2}
                  onChange={(e) => {
                    handleInputChange(e, 2);
                  }}
                  max={6000000}
                  min={0}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                ></input>
              </div>
              {/*  */}
              <div className="basis-1/4">
                <input
                  id="income-number-2"
                  type="number"
                  value={income2}
                  onChange={(e) => {
                    handleInputChange(e, 2);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  placeholder="ฟรีแลนซ์"
                  required
                />
              </div>
            </div>
            {/*  */}
            <div className="flex flex-row items-center gap-x-1">
              {/*  */}
              <div className="basis-3/4 flex flex-col ">
                <label className="">
                  ขายของ/<span className="text-lg text-gray-500">ทั้งปี</span>
                </label>
                <input
                  id="income-range-8"
                  type="range"
                  value={income8}
                  onChange={(e) => {
                    handleInputChange(e, 8);
                  }}
                  max={6000000}
                  min={0}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                />
              </div>
              {/*  */}
              <div className="basis-1/4">
                <input
                  id="income-number-8"
                  type="number"
                  value={income8}
                  onChange={(e) => {
                    handleInputChange(e, 8);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  placeholder="ขายของ"
                  required
                />
              </div>
            </div>
            {/*  */}
            <div>
              <p className="text-center">
                เมื่อคำนวณ
                <span className="text-[#2E86C1] bg-blue-50 rounded-md">
                  เงินได้
                </span>
                แล้ว ต้องหัก
                <span className="text-[#E74C3C] bg-red-50 rounded-md">
                  ค่าใช้จ่าย
                </span>
                ตามอัตราที่ต่างกันในแต่ละประเภท:
              </p>
              {/*  */}
              <div>
                <div className="flex justify-between">
                  <p>
                    <span className="text-[#2E86C1] bg-blue-50 rounded-md">
                      เงินเดือน
                    </span>{" "}
                    จัดอยู่ใน
                    <span className="font-bold ">“เงินได้ประเภทที่ 1”</span>
                  </p>
                  <p className="text-end">
                    หักได้:{" "}
                    <span className="text-3xl font-bold bg-sky-50 text-[#C0392B] rounded-md">
                      {formattedNumber(expenses1)}
                    </span>{" "}
                    บาท
                  </p>
                </div>
                <p className="indent-3 text-xl">
                  หักเหมาจ่าย{" "}
                  <span className="text-[#E74C3C] bg-red-50 rounded-md">
                    50%
                  </span>{" "}
                  ของเงินเดือน
                </p>
                <p className=" text-xl text-gray-500">
                  (สูงสุดไม่เกิน{" "}
                  <span className="text-[#E74C3C] bg-red-50 rounded-md">
                    100,000
                  </span>{" "}
                  บาท)
                </p>
              </div>
              {/*  */}
              <div>
                <div className="flex justify-between">
                  <p>
                    <span className="text-[#2E86C1] bg-blue-50 rounded-md">
                      ฟรีแลนซ์
                    </span>{" "}
                    จัดอยู่ใน
                    <span className="font-bold ">“เงินได้ประเภทที่ 2”</span>
                  </p>
                  <p className="text-end">
                    หักได้:{" "}
                    <span className="text-3xl font-bold bg-sky-50 text-[#C0392B] rounded-md">
                      {formattedNumber(expenses2)}
                    </span>{" "}
                    บาท
                  </p>
                </div>
                <p className="indent-3 text-xl">
                  หักเหมาจ่าย{" "}
                  <span className="text-[#E74C3C] bg-red-50 rounded-md">
                    50%
                  </span>{" "}
                  ของเงินฟรีแลนซ์
                </p>
                <p className=" text-xl text-gray-500">
                  (สูงสุดไม่เกิน{" "}
                  <span className="text-[#E74C3C] bg-red-50 rounded-md">
                    100,000
                  </span>{" "}
                  บาท)
                </p>
              </div>
              {/*  */}
              <div>
                <div className="flex justify-between">
                  <p>
                    <span className="text-[#2E86C1] bg-blue-50 rounded-md">
                      การขายสินค้า
                    </span>{" "}
                    จัดอยู่ใน
                    <span className="font-bold">“เงินได้ประเภทที่ 8”</span>
                  </p>
                  <p className="text-end">
                    หักได้:{" "}
                    <span className="text-3xl font-bold bg-sky-50 text-[#C0392B] rounded-md">
                      {formattedNumber(expenses8)}
                    </span>{" "}
                    บาท
                  </p>
                </div>
                <p className="indent-3 text-xl">
                  หัก{" "}
                  <span className="text-[#E74C3C] bg-red-50 rounded-md">
                    60%
                  </span>{" "}
                  ของเงินการขายสินค้า
                </p>
                <p className=" text-xl text-gray-500">
                  ( หรือตามจริง{" "}
                  <span className="text-[#E74C3C] bg-red-50 rounded-md">
                    ต้องมีหลักฐาน
                  </span>{" "}
                  )
                </p>
              </div>
              {/*  */}
              <div>
                <div className="flex justify-end">
                  <p className="text-end">
                    <span className="font-bold ">รายได้หลังหักค่าใช้จ่าย</span>{" "}
                    ={" "}
                    <span className="text-3xl  font-bold bg-sky-50 rounded-md">
                      {formattedNumber(lastIncome)}
                    </span>{" "}
                    บาท
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="mt-3">
              <p>
                นอกจาก
                <span className="text-[#2E86C1] bg-sky-50 rounded-md">
                  ค่าใช้จ่าย
                </span>
                แล้ว ยังหัก
                <span className="text-[#27AE60] bg-green-50 rounded-md">
                  ค่าลดหย่อน
                </span>
                ได้ เช่น ค่าลดหย่อนส่วนตัว{" "}
                <span className="text-[#27AE60] bg-green-50 rounded-md">
                  60,000
                </span>
                บาท หรือ การบริจาค ประกันสังคม เบี้ยประกัน และอื่นๆ.
              </p>
            </div>
            {/*  */}
            <div className="flex flex-row items-center gap-x-1">
              {/*  */}
              <div className="basis-3/4 flex flex-col ">
                <label className="">ค่าลดหย่อน </label>
                <input
                  id="income-range-1"
                  type="range"
                  value={deduction}
                  onChange={(e) => {
                    handleInputChange(e, "d");
                  }}
                  max={6000000}
                  min={0}
                  className="w-full accent-[#27AE60] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                ></input>
              </div>
              {/*  */}
              <div className="basis-1/4">
                <input
                  id="income-number-1"
                  type="number"
                  value={deduction}
                  onChange={(e) => {
                    handleInputChange(e, "d");
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2"
                  placeholder="รายได้รวมทั้งปี"
                  required
                />
              </div>
            </div>
            {/*  */}
            <div className="flex justify-end">
              <p className="text-end">
                <span className="font-bold ">ลดหย่อน</span> ={" "}
                <span className="text-3xl text-[#27AE60] font-bold bg-green-50 rounded-md">
                  {formattedNumber(deduction)}
                </span>{" "}
                บาท
              </p>
            </div>
            {/*  */}
            <div className="mt-3">
              <p className="text-center">
                จากสูตรนี้
                <br />
                <span className="text-3xl">
                  <span className="text-[#F39C12]">รายได้สุทธิ</span> =
                  <span className="text-[#2E86C1]"> รายได้ </span> -
                  <span className="text-[#E74C3C]"> ค่าใช้จ่าย </span> −
                  <span className="text-[#27AE60]"> ค่าลดหย่อน </span>
                </span>
                <br />
                <span className="text-3xl">
                  <span className="text-[#F39C12]">
                    {formattedNumber(lastIncome - deduction)}
                  </span>{" "}
                  =
                  <span className="text-[#2E86C1]">
                    {" "}
                    {formattedNumber(income)}{" "}
                  </span>{" "}
                  -
                  <span className="text-[#E74C3C]">
                    {" "}
                    {formattedNumber(expenses)}{" "}
                  </span>{" "}
                  −
                  <span className="text-[#27AE60]">
                    {" "}
                    {formattedNumber(deduction)}{" "}
                  </span>
                </span>
              </p>
            </div>
            {taxDetails != undefined && (
              <div className="mb-4">
                <p className="text-sm font-mono">การคำนวณภาษี:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {taxDetails.details.map((item, idx) => {
                    return (
                      <div key={idx}>
                        <p className="text-sm font-mono">
                          {item.range}{" "}
                          {item.paid == 0
                            ? "ยกเว้นภาษี"
                            : formattedNumber(item.paid)}
                        </p>
                        {/* {taxDetails.details.length - 1 == idx && (
                          <p className="text-sm font-mono font-bold">
                            รวมภาษี ={" "}
                            {taxDetails.details.map((itemP, idxP) => {
                              return (
                                <span key={idxP}>
                                  {itemP.paid != 0 && itemP.paid} +
                                </span>
                              );
                            })}{" "}
                            =<span className="text-[#C0392B]"> 9,500 </span>
                          </p>
                        )} */}
                      </div>
                    );
                  })}
                </div>
                <div className="text-center mt-4">
                  <p className="text-3xl font-bold text-[#C0392B]">
                    ภาษีที่ต้องชำระ: {formattedNumber(taxDetails.sum)} บาท
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/*  */}

        <div className="flex justify-end">
          {/* <button
            // type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center "
          >
            ต่อไป
          </button> */}
        </div>
      </form>

      {/* <div id="chartdiv1" className="w-full h-[500px]"></div> */}
    </div>
  );
};

export default ChartInput;
