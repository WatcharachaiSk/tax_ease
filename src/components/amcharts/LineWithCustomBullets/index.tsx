"use client";
import { useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// interface ChartProps {}

const LineWithCustomBullets: React.FC = () => {
  const chartDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create root element
    const root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1,
      })
    );

    // Add cursor
    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true,
    });

    xRenderer.labels.template.setAll({
      //   text: "หน่วย: เวลา (นาที)",
      rotation: -20, // ไม่เอียง
      centerX: am5.p50, // จัดให้อยู่ตรงกลางตามแกน X
      textAlign: "center", // จัดข้อความให้อยู่ตรงกลาง
      paddingRight: 0, // ปรับระยะขอบ
      fontSize: "10px", // ขนาดตัวอักษร
    });

    xRenderer.grid.template.setAll({
      location: 1,
    });

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "range",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );
    // Add X axis title
    chart.plotContainer.children.push(
      am5.Label.new(root, {
        text: "เงินได้สุทธิ", // ข้อความสำหรับแกน X
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
        x: am5.p50, // จัดตรงกลางตามแกน X
        centerX: am5.p50,
        y: am5.percent(100), // ตำแหน่งด้านล่างกราฟ
        dy: 40, // ขยับลงอีกเล็กน้อย
      })
    );

    const yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: yRenderer,
      })
    );
    // Add Y axis title
    chart.plotContainer.children.push(
      am5.Label.new(root, {
        rotation: -90, // หมุนแกน Y
        text: "อัตราภาษี % ", // ข้อความสำหรับแกน Y
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
        y: am5.p50, // จัดตรงกลางตามแกน Y
        centerY: am5.p50,
        x: 20, // ตำแหน่งซ้ายมือของกราฟ
      })
    );

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "rate",
        sequencedInterpolation: true,
        categoryXField: "range",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });

    series.columns.template.adapters.add("fill", (fill, target) => {
      const colors = chart.get("colors");
      const index = colors
        ? colors.getIndex(series.columns.indexOf(target))
        : undefined;
      return index;
    });

    series.columns.template.adapters.add("stroke", (stroke, target) => {
      const colors = chart.get("colors");
      const index = colors
        ? colors.getIndex(series.columns.indexOf(target))
        : undefined;
      return index;
    });

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        sprite: am5.Label.new(root, {
          text: "{valueYWorking.formatNumber('#.')}",
          fill: root.interfaceColors.get("alternativeText"),
          centerY: 0,
          centerX: am5.p50,
          populateText: true,
        }),
      });
    });
    const data = [
      { range: "0 - 150,000", rate: 0 },
      { range: "150,001 - 300,000", rate: 5 },
      { range: "300,001 - 500,000", rate: 10 },
      { range: "500,001 - 750,000", rate: 15 },
      { range: "750,001 - 1,000,000", rate: 20 },
      { range: "1,000,001 - 2,000,000", rate: 25 },
      { range: "2,000,001 - 5,000,000", rate: 30 },
      { range: "5,000,001 ขึ้นไป", rate: 35 },
    ];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    // Cleanup on component unmount
    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div
      id="chartdiv"
      ref={chartDivRef}
      className="text-lg w-full md:w-1/2 xl:w-1/2 h-96"
      //   style={{ width: "50%", height: "500px" }}
    ></div>
  );
};

export default LineWithCustomBullets;
