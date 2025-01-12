"use client";

import { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5radar from "@amcharts/amcharts5/radar";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import React, { FC } from "react";

const data = [
  {
    category: "0 - 150,000",
    value: 0,
    full: 500,
    columnSettings: { fill: am5.color(0x84c1ff) },
  },
  {
    category: "150,001 - 300,000",
    value: 5,
    full: 7500,
    columnSettings: { fill: am5.color(0x66bb6a) },
  },
  {
    category: "300,001 - 500,000",
    value: 10,
    full: 20000,
    columnSettings: { fill: am5.color(0xffa726) },
  },
  {
    category: "500,001 - 750,000",
    value: 15,
    full: 37500,
    columnSettings: { fill: am5.color(0xef5350) },
  },
  {
    category: "750,001 - 1,000,000",
    value: 20,
    full: 50000,
    columnSettings: { fill: am5.color(0xab47bc) },
  },
  {
    category: "1,000,001 - 2,000,000",
    value: 25,
    full: 250000,
    columnSettings: { fill: am5.color(0x29b6f6) },
  },
  {
    category: "2,000,001 - 5,000,000",
    value: 30,
    full: 900000,
    columnSettings: { fill: am5.color(0x18909c) },
  },
  {
    category: "5,000,001 ขึ้นไป",
    value: 35,
    full: 10000000,
    columnSettings: { fill: am5.color(0xff7743) },
  },
];

const SVGPictorialChart: FC = ({}) => {
  const [income, setIncome] = useState<number>(350000);
  const [income1, setIncome1] = useState<number>(350000);
  const [income2, setIncome2] = useState<number>(10000);
  const [income8, setIncome8] = useState<number>(10000);
  //
  const [chartData, setChartData] = useState(data);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isIncome: 1 | 2 | 8
  ) => {
    const inputIncome = parseInt(e.target.value) || 0;
    if (isIncome == 1) {
      setIncome1(inputIncome);
    } else if (isIncome == 2) {
      setIncome2(inputIncome);
    } else if (isIncome == 8) {
      setIncome8(inputIncome);
    }
    setIncome(income1 + income2 + income8);

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
        <div className="flex flex-row w-full gap-2 mb-6">
          <div className="flex-1">Chart</div>
          <div className="flex-1 flex flex-col gap-y-2">
            <p className="text-end mb-2 text-gray-900 ">
              รายได้ทั้งปี{" "}
              <span className="text-3xl font-bold text-[#2E86C1] bg-blue-50 rounded-md">
                {income}
              </span>{" "}
              บาท
            </p>
            {/*  */}
            <div className="flex flex-row items-center gap-x-1">
              {/*  */}
              <div className="basis-3/4 flex flex-col ">
                <label className="">เงินเดือนทั้งปี (รวมโบนัส)</label>
                <input
                  id="default-range"
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
                  id="income"
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
                <label className="">ฟรีแลนซ์/ทั้งปี</label>
                <input
                  id="default-range"
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
                  id="income"
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
                <label className="">ขายของ/ทั้งปี</label>
                <input
                  id="default-range"
                  type="range"
                  value={income8}
                  onChange={(e) => {
                    handleInputChange(e, 8);
                  }}
                  max={6000000}
                  min={0}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
                ></input>
              </div>
              {/*  */}
              <div className="basis-1/4">
                <input
                  id="income"
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
          </div>
        </div>

        <div className="flex  justify-end">
          <button
            // type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center "
          >
            ต่อไป
          </button>
        </div>
      </form>

      {/* <div id="chartdiv1" className="w-full h-[500px]"></div> */}
    </div>
  );
};

export default SVGPictorialChart;
