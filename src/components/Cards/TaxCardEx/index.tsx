"use client";

import React, { FC, useState, useMemo, useEffect, useRef } from "react";
import { TbPlus, TbX, TbExternalLink, TbBriefcase, TbDeviceLaptop, TbShoppingCart, TbHome, TbChartPie, TbPercentage, TbUser, TbBuildingBank, TbHeart, TbStethoscope, TbShieldCheck, TbCoins, TbChartBar, TbBuildingCommunity, TbHeartHandshake, TbSchool, TbUsers, TbBabyCarriage, TbInfoCircle, TbHomeHeart } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { IncomeType, DeductionType, UserIncome, UserDeduction } from "./types";
import IncomeSelectorModal from "./IncomeSelectorModal";
import DeductionSelectorModal from "./DeductionSelectorModal";

// --- Constants ---
const BRACKETS = [
  { max: 150000, rate: 0, label: "ยกเว้น", color: "#b4b2a9" },
  { max: 300000, rate: 0.05, label: "5%", color: "#9fe1cb" },
  { max: 500000, rate: 0.1, label: "10%", color: "#1d9e75" },
  { max: 750000, rate: 0.15, label: "15%", color: "#0f6e56" },
  { max: 1000000, rate: 0.2, label: "20%", color: "#f5c4b3" },
  { max: 2000000, rate: 0.25, label: "25%", color: "#d85a30" },
  { max: 5000000, rate: 0.3, label: "30%", color: "#993c1d" },
  { max: Infinity, rate: 0.35, label: "35%", color: "#4a1b0c" },
];

const BRACKET_RANGES = ["0–150k", "150–300k", "300–500k", "500–750k", "750k–1M", "1–2M", "2–5M", "5M+"];

const ALL_INCOME_DEFS: IncomeType[] = [
  { id: "salary", icon: <TbBriefcase />, title: "เงินเดือน", sub: "เงินได้ประเภทที่ 1", deductPct: 0.5, deductMax: 100000, desc: "รายได้จากการจ้างงาน เงินเดือน โบนัส ค่าล่วงเวลา", tag: "หักเหมา 50%", tagColor: "green", maxLabel: "สูงสุด 100,000 บาท", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", core: true },
  { id: "freelance", icon: <TbDeviceLaptop />, title: "ฟรีแลนซ์", sub: "เงินได้ประเภทที่ 2", deductPct: 0.5, deductMax: 100000, desc: "ค่าจ้าง ค่าคอมมิชชัน ค่าบริการวิชาชีพ", tag: "หักเหมา 50%", tagColor: "green", maxLabel: "สูงสุด 100,000 บาท", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", core: true },
  { id: "selling", icon: <TbShoppingCart />, title: "ขายของ", sub: "เงินได้ประเภทที่ 8", deductPct: 0.6, deductMax: Infinity, desc: "รายได้จากการขายสินค้า พาณิชย์ อุตสาหกรรม", tag: "หักเหมา 60%", tagColor: "amber", maxLabel: "ไม่จำกัดวงเงิน", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", core: true },
  { id: "rental", icon: <TbHome />, title: "ค่าเช่า", sub: "เงินได้ประเภทที่ 5", deductPct: 0.3, deductMax: Infinity, desc: "รายได้จากการให้เช่าทรัพย์สิน บ้าน ที่ดิน รถยนต์", tag: "หักเหมา 30%", tagColor: "amber", maxLabel: "ไม่จำกัดวงเงิน", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", core: false },
  { id: "dividend", icon: <TbChartPie />, title: "เงินปันผล", sub: "เงินได้ประเภทที่ 4", deductPct: 0, deductMax: 0, desc: "เงินปันผลจากหุ้น กองทุน หรือส่วนแบ่งกำไร ถูกหัก ณ ที่จ่าย 10%", tag: "ไม่หักเพิ่ม", tagColor: "gray", maxLabel: "ถูกหัก ณ ที่จ่าย 10%", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", core: false },
  { id: "commission", icon: <TbPercentage />, title: "ค่านายหน้า", sub: "เงินได้ประเภทที่ 2", deductPct: 0.5, deductMax: 100000, desc: "ค่านายหน้า ค่าแนะนำ ค่าบริการทางธุรกิจ", tag: "หักเหมา 50%", tagColor: "green", maxLabel: "สูงสุด 100,000 บาท", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", core: false },
];

const ALL_DEDUCTION_DEFS: DeductionType[] = [
  { id: "personal", icon: <TbUser />, name: "ลดหย่อนส่วนตัว", desc: "ทุกคนได้รับสิทธิ์โดยอัตโนมัติ ไม่ต้องยื่นหลักฐานเพิ่มเติม", fixed: 60000, maxLabel: "60,000 บาท (คงที่)", tag: "ทุกคนได้รับ", tagColor: "green", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", removable: false, hasInput: false },
  { id: "social", icon: <TbBuildingBank />, name: "ประกันสังคม", desc: "เงินสมทบกองทุนประกันสังคม หักจากเงินเดือนอัตราโนมัติ 5% สูงสุด 750 หรือ 875 บาท/เดือน", maxAmt: 10500, maxLabel: "สูงสุด 10,500 บาท/ปี", tag: "หัก ณ ที่จ่าย", tagColor: "gray", ref: "https://www.sso.go.th", refLabel: "ประกันสังคม", removable: true, hasInput: true },
  { id: "insurance", icon: <TbHeart />, name: "เบี้ยประกันชีวิต", desc: "เบี้ยประกันชีวิตทั่วไป อายุกรมธรรม์ไม่น้อยกว่า 10 ปี ลดหย่อนได้ตามจริง", maxAmt: 100000, maxLabel: "สูงสุด 100,000 บาท/ปี", tag: "ตามจริง", tagColor: "amber", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", removable: true, hasInput: true },
  { id: "health", icon: <TbStethoscope />, name: "เบี้ยประกันสุขภาพ", desc: "ประกันสุขภาพตนเอง และประกันสุขภาพบิดามารดา (บิดา/มารดา คนละ 15,000)", maxAmt: 25000, maxLabel: "สูงสุด 25,000 บาท/ปี", tag: "ตามจริง", tagColor: "amber", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", removable: true, hasInput: true },
  { id: "ssf", icon: <TbShieldCheck />, name: "กองทุน SSF", desc: "กองทุนรวมเพื่อการออม ไม่มีกำหนดซื้อขั้นต่ำ ถือขั้นต่ำ 10 ปี นับจากวันซื้อ", pctOfIncome: 30, maxAmt: 200000, maxLabel: "30% ของรายได้ สูงสุด 200,000 บาท", tag: "30% ของรายได้", tagColor: "green", ref: "https://www.sec.or.th", refLabel: "ก.ล.ต.", removable: true, hasInput: true },
  { id: "rmf", icon: <TbCoins />, name: "กองทุน RMF", desc: "กองทุนรวมเพื่อการเลี้ยงชีพ ต้องซื้อต่อเนื่องทุกปี ถอนได้เมื่ออายุ 55 ปีขึ้นไป", pctOfIncome: 30, maxAmt: 500000, maxLabel: "30% ของรายได้ สูงสุด 500,000 บาท", tag: "30% ของรายได้", tagColor: "green", ref: "https://www.sec.or.th", refLabel: "ก.ล.ต.", removable: true, hasInput: true },
  { id: "ltf", icon: <TbChartBar />, name: "กองทุน LTF", desc: "กองทุนรวมหุ้นระยะยาว (ยกเลิกสิทธิ์ปี 2563 แล้ว) สำหรับผู้ถือกองทุนก่อนหน้า", pctOfIncome: 15, maxAmt: 500000, maxLabel: "15% ของรายได้ สูงสุด 500,000 บาท", tag: "15% ของรายได้", tagColor: "gray", ref: "https://www.sec.or.th", refLabel: "ก.ล.ต.", removable: true, hasInput: true },
  { id: "pension", icon: <TbBuildingCommunity />, name: "เบี้ยประกันบำนาญ", desc: "ประกันชีวิตแบบบำนาญ อายุกรมธรรม์ไม่น้อยกว่า 10 ปี รับบำนาญเมื่ออายุ 55–85 ปี", pctOfIncome: 15, maxAmt: 200000, maxLabel: "15% ของรายได้ สูงสุด 200,000 บาท", tag: "15% ของรายได้", tagColor: "green", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", removable: true, hasInput: true },
  { id: "govpension", icon: <TbBuildingBank />, name: "กบข./กองทุนสำรองเลี้ยงชีพ", desc: "กองทุนบำเน็จบำนาญข้าราชการ หรือกองทุนสำรองเลี้ยงชีพของนายจ้าง", pctOfIncome: 30, maxAmt: 500000, maxLabel: "30% ของรายได้ สูงสุด 500,000 บาท", tag: "30% ของรายได้", tagColor: "green", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", removable: true, hasInput: true },
  { id: "donation", icon: <TbHeartHandshake />, name: "เงินบริจาคทั่วไป", desc: "บริจาคแก่วัด มูลนิธิ โรงพยาบาลรัฐ ลดหย่อนได้ตามจริง แต่ไม่เกิน 10% ของรายได้หลังหักลดหย่อนอื่น", pctOfIncome: 10, maxAmt: Infinity, maxLabel: "สูงสุด 10% ของรายได้สุทธิ", tag: "สูงสุด 10%", tagColor: "amber", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", removable: true, hasInput: true },
  { id: "donateEdu", icon: <TbSchool />, name: "บริจาคเพื่อการศึกษา", desc: "บริจาคให้สถานศึกษา สาธารณประโยชน์ หรือกีฬา ลดหย่อนได้ 2 เท่าของจำนวนที่จ่ายจริง", pctOfIncome: 10, maxAmt: Infinity, maxLabel: "2 เท่าของจำนวนจริง สูงสุด 10%", tag: "2 เท่า", tagColor: "amber", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", removable: true, hasInput: true },
  { id: "spouse", icon: <TbUsers />, name: "ลดหย่อนคู่สมรส", desc: "คู่สมรสที่ไม่มีรายได้หรือรายได้น้อย สามารถหักลดหย่อนได้", fixed: 60000, maxLabel: "60,000 บาท (คงที่)", tag: "คู่สมรสไม่มีรายได้", tagColor: "gray", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", removable: true, hasInput: false },
  { id: "child", icon: <TbBabyCarriage />, name: "ลดหย่อนบุตร", desc: "บุตรที่ชอบด้วยกฎหมาย คนที่ 1-2 ลดหย่อน 30,000 บาท/คน บุตรคนที่ 3 เป็นต้นไป 60,000 บาท/คน", fixed: 30000, maxLabel: "30,000 บาท/คน (หรือ 60,000 บาทตั้งแต่คนที่ 3)", tag: "ต่อบุตร 1 คน", tagColor: "gray", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", removable: true, hasInput: false },
  { id: "houseInterest", icon: <TbHomeHeart />, name: "ดอกเบี้ยเงินกู้ยืมเพื่อที่อยู่อาศัย", desc: "ดอกเบี้ยเงินกู้ยืมเพื่อซื้อหรือสร้างที่อยู่อาศัย (บ้าน, คอนโด) หักลดหย่อนได้ตามที่จ่ายจริง", maxAmt: 100000, maxLabel: "สูงสุด 100,000 บาท", tag: "ตามจริง", tagColor: "amber", ref: "https://www.rd.go.th/272.html", refLabel: "กรมสรรพากร", removable: true, hasInput: true },
  // { id: "houseConstruction", icon: <TbHomePlus />, name: "ค่าสร้างบ้านใหม่ (2567-2568)", desc: "ลดหย่อนได้ 10,000 บาท ต่อค่าก่อสร้างทุก 1 ล้านบาท (สัญญาจ้างช่วง 9 เม.ย. 67 - 31 ธ.ค. 68)", maxAmt: 100000, maxLabel: "สูงสุด 100,000 บาท", tag: "10,000 ต่อ 1 ล้าน", tagColor: "blue", ref: "https://www.rd.go.th/71618.html", refLabel: "กรมสรรพากร", removable: true, hasInput: true },
];

// --- Helper Functions ---
const fmt = (n: number) => Math.round(n).toLocaleString("th-TH");

const calcExp = (t: UserIncome) => {
  if (t.deductMax === Infinity) return t.amount * t.deductPct;
  return Math.min(t.amount * t.deductPct, t.deductMax);
};

const calcTax = (net: number) => {
  let tax = 0,
    prev = 0;
  for (const b of BRACKETS) {
    if (net <= prev) break;
    const top = b.max === Infinity ? net : Math.min(net, b.max);
    tax += (top - prev) * b.rate;
    prev = b.max === Infinity ? net : b.max;
  }
  return tax;
};

// --- Components ---
const TaxCard: FC = () => {
  const [incomeCards, setIncomeCards] = useState<UserIncome[]>(
    ALL_INCOME_DEFS.filter((t) => t.core).map((t) => ({ ...t, on: t.id === "salary", amount: 0 }))
  );
  const [activeDeds, setActiveDeds] = useState<UserDeduction[]>([
    { ...ALL_DEDUCTION_DEFS[0], amount: 60000, userAmt: 0 },
    { ...ALL_DEDUCTION_DEFS[1], amount: 9000, userAmt: 9000 },
  ]);

  const [isIncModalOpen, setIsIncModalOpen] = useState(false);
  const [isDedModalOpen, setIsDedModalOpen] = useState(false);
  const [showInfoId, setShowInfoId] = useState<string | null>(null);

  const chartRef = useRef<HTMLDivElement>(null);

  // --- Logic ---
  const results = useMemo(() => {
    const onIncome = incomeCards.filter((t) => t.on);
    const gross = onIncome.reduce((s, t) => s + t.amount, 0);
    const exp = onIncome.reduce((s, t) => s + calcExp(t), 0);
    const afterExp = Math.max(0, gross - exp);

    const updatedDeds = activeDeds.map((d) => {
      let amount = 0;
      if (d.fixed) amount = d.fixed;
      else if (d.hasInput) {
        const ua = d.userAmt || 0;
        if (d.id === "houseConstruction") {
          // 10,000 THB per 1,000,000 THB of construction cost, max 100,000 THB
          const calculated = Math.floor(ua / 1000000) * 10000;
          amount = Math.min(calculated, d.maxAmt || 100000);
        } else if (d.pctOfIncome) {
          const cap = afterExp * (d.pctOfIncome / 100);
          amount = d.maxAmt === Infinity ? Math.min(ua, cap) : Math.min(ua, cap, d.maxAmt || 0);
        } else {
          amount = d.maxAmt === Infinity ? ua : Math.min(ua, d.maxAmt || 0);
        }
      }
      return { ...d, amount };
    });

    const totalDed = updatedDeds.reduce((s, d) => s + d.amount, 0);
    const net = Math.max(0, afterExp - totalDed);
    const tax = calcTax(net);
    const take = gross - tax;

    // Build Stacked Bar Data
    let prev = 0;
    const segs = [];
    for (const b of BRACKETS) {
      if (net <= prev) break;
      const top = b.max === Infinity ? net : Math.min(net, b.max);
      const amt = top - prev;
      segs.push({ amt, label: b.label, color: b.color });
      prev = b.max === Infinity ? net : b.max;
    }

    // Build Tax Rows
    prev = 0;
    const taxRows = [];
    let maxRowTax = 0;
    for (let i = 0; i < BRACKETS.length; i++) {
      const b = BRACKETS[i];
      if (net <= prev) break;
      const top = b.max === Infinity ? net : Math.min(net, b.max);
      const t = (top - prev) * b.rate;
      maxRowTax = Math.max(maxRowTax, t);
      taxRows.push({ label: `${BRACKET_RANGES[i]} (${b.label})`, tax: t, color: b.color });
      prev = b.max === Infinity ? net : b.max;
    }

    return { gross, exp, totalDed, net, tax, take, segs, taxRows, maxRowTax, updatedDeds };
  }, [incomeCards, activeDeds]);

  // Chart Effect
  useEffect(() => {
    if (!chartRef.current || results.gross <= 0) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout
      })
    );

    const series = chart.series.push(
      am5percent.PyramidSeries.new(root, {
        name: "Series",
        valueField: "value",
        categoryField: "category",
        alignLabels: true,
        orientation: "vertical"
      })
    );

    // Data matches the cards exactly: Gross = Tax + TakeHome
    series.data.setAll([
      { category: "ภาษีที่ต้องชำระ", value: results.tax, sliceSettings: { fill: am5.color(0xEF4444) } },
      { category: "เงินที่ได้รับจริง", value: results.take, sliceSettings: { fill: am5.color(0x10B981) } }
    ]);

    series.labels.template.setAll({
      text: "{category}: [bold]{value.formatNumber('#,###')}[/]",
      fontSize: 10,
      fill: am5.color(0x64748B)
    });

    series.slices.template.setAll({
      templateField: "sliceSettings",
      strokeOpacity: 0,
      tooltipText: "{category}: [bold]{value.formatNumber('#,###')} บาท[/]"
    });

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [results.tax, results.take, results.gross]);

  // --- Handlers ---
  const toggleInc = (id: string) => {
    setIncomeCards((prev) =>
      prev.map((t) => (t.id === id ? { ...t, on: !t.on, amount: !t.on ? t.amount : 0 } : t))
    );
  };

  const setIncAmt = (id: string, val: string) => {
    const cleanVal = val.replace(/,/g, "");
    const rawAmount = parseFloat(cleanVal) || 0;
    const amount = Math.max(0, rawAmount);
    setIncomeCards((prev) => prev.map((t) => (t.id === id ? { ...t, amount } : t)));
  };

  const setDedAmt = (id: string, val: string | number) => {
    const rawVal = typeof val === "string" ? val.replace(/,/g, "") : val.toString();
    const rawAmount = parseFloat(rawVal) || 0;
    const userAmt = Math.max(0, rawAmount);
    setActiveDeds((prev) => prev.map((d) => (d.id === id ? { ...d, userAmt } : d)));
  };

  const removeDed = (id: string) => {
    setActiveDeds((prev) => prev.filter((d) => d.id !== id));
  };

  const addIncome = (id: string) => {
    const def = ALL_INCOME_DEFS.find((o) => o.id === id);
    if (def) {
      setIncomeCards((prev) => [...prev, { ...def, on: true, amount: 0 }]);
    }
    setIsIncModalOpen(false);
  };

  const addDed = (id: string) => {
    const def = ALL_DEDUCTION_DEFS.find((o) => o.id === id);
    if (def) {
      const initialAmt = def.id === "social" ? 9000 : 0;
      setActiveDeds((prev) => [...prev, { ...def, amount: initialAmt, userAmt: initialAmt }]);
    }
    setIsDedModalOpen(false);
  };

  return (
    <div className="w-full max-w-5xl p-5 font-sans text-gray-900 bg-white shadow-sm rounded-3xl">
      <h2 className="sr-only">คำนวณภาษีรายได้หลายแหล่ง</h2>

      <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-2.5">รายได้ของคุณ</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3.5">
        {incomeCards.map((t) => (
          <div key={t.id} className={`bg-white border rounded-2xl p-3.5 transition-colors ${t.on ? "border-gray-900" : "border-gray-100"}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
                {t.icon}
              </div>
              <button
                className={`w-[34px] h-[19px] rounded-full relative transition-colors ${t.on ? "bg-gray-900" : "bg-gray-200"}`}
                onClick={() => toggleInc(t.id)}
              >
                <div className={`absolute top-[2.5px] left-[2.5px] w-3.5 h-3.5 bg-white rounded-full transition-transform ${t.on ? "translate-x-[15px]" : ""}`} />
              </button>
            </div>
            <div className="relative">
              <div className="flex items-center gap-1">
                <p className="text-xs font-medium mb-0.5">{t.title}</p>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowInfoId(showInfoId === t.id ? null : t.id)}
                >
                  <TbInfoCircle size={12} />
                </button>
              </div>
              <AnimatePresence>
                {showInfoId === t.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="text-[10px] leading-relaxed text-blue-600 bg-blue-50 p-2 rounded-md mt-1 mb-1 flex flex-col gap-1">
                      <p>{t.desc}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full font-medium">{t.tag}</span>
                        <span className="bg-white/50 text-gray-600 px-1.5 py-0.5 rounded-full border border-blue-100">{t.maxLabel}</span>
                      </div>
                      <a 
                        href={t.ref} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-800 font-medium hover:underline mt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <TbExternalLink size={10} /> {t.refLabel}
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="text-[10px] text-gray-400">{t.sub}</p>
            {t.on && (
              <div className="mt-2">
                <div className="flex items-center gap-1.5 bg-gray-50 rounded-lg p-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    className="flex-1 bg-transparent border-none outline-none text-sm font-medium"
                    placeholder="0"
                    value={t.amount ? fmt(t.amount) : ""}
                    onChange={(e) => setIncAmt(t.id, e.target.value)}
                  />
                  <span className="text-xs text-gray-400">บาท/ปี</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 text-right">
                  {t.deductMax === Infinity ? `หัก ${Math.round(t.deductPct * 100)}%` : `หัก ${Math.round(t.deductPct * 100)}% สูงสุด ${fmt(t.deductMax)}`}:{" "}
                  <b className="text-gray-600">{fmt(calcExp(t))}</b>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className="flex items-center justify-center gap-1.5 w-full p-2.5 border border-dashed border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition-colors mb-4.5"
        onClick={() => setIsIncModalOpen(true)}
      >
        <TbPlus size={14} /> เพิ่มรายได้ประเภทอื่น
      </button>

      <p className="text-[11px] font-medium tracking-widest uppercase text-gray-400 mb-2.5">ค่าลดหย่อน</p>
      <div className="bg-gray-50 rounded-2xl p-3.5 mb-4.5">
        <div className="divide-y divide-gray-100">
          {results.updatedDeds.map((d) => (
            <div key={d.id} className="flex flex-col py-2">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center text-gray-600 shrink-0">
                  {d.icon}
                </div>
                <div className="flex-1 flex items-center gap-1 overflow-hidden">
                  <span className="text-xs text-gray-600 truncate">{d.name}</span>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowInfoId(showInfoId === d.id ? null : d.id)}
                  >
                    <TbInfoCircle size={11} />
                  </button>
                </div>
                {d.id === "social" ? (
                  <div className="flex items-center gap-1 bg-gray-100/50 rounded-lg p-0.5">
                    <button
                      type="button"
                      className={`px-2 py-1 text-[10px] font-medium rounded-md transition-colors ${d.userAmt === 9000 ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}
                      onClick={() => setDedAmt(d.id, 9000)}
                    >
                      750/ด.
                    </button>
                    <button
                      type="button"
                      className={`px-2 py-1 text-[10px] font-medium rounded-md transition-colors ${d.userAmt === 10500 ? "bg-white shadow-sm text-gray-900" : "text-gray-400"}`}
                      onClick={() => setDedAmt(d.id, 10500)}
                    >
                      875/ด.
                    </button>
                  </div>
                ) : (
                  d.hasInput && (
                    <div className="flex items-center gap-1.5 bg-gray-100/50 rounded-lg px-2 py-1 w-[120px]">
                      <input
                        type="text"
                        inputMode="numeric"
                        className="flex-1 bg-transparent border-none outline-none text-xs font-medium"
                        placeholder="0"
                        value={d.userAmt ? fmt(d.userAmt) : ""}
                        onChange={(e) => setDedAmt(d.id, e.target.value)}
                      />
                      {/* <span className="text-[11px] text-gray-400">บาท</span> */}
                    </div>
                  )
                )}
                <span className="text-xs font-medium tabular-nums text-right min-w-[70px]">{fmt(d.amount)} บาท</span>
                {d.removable && (
                  <button className="p-1 text-gray-400 hover:text-red-500 transition-colors" onClick={() => removeDed(d.id)}>
                    <TbX size={13} />
                  </button>
                )}
              </div>
              <AnimatePresence>
                {showInfoId === d.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden px-7"
                  >
                    <div className="text-[10px] leading-relaxed text-emerald-700 bg-emerald-50 p-2 rounded-md mt-1 mb-2 flex flex-col gap-1">
                      <p>{d.desc}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-medium">{d.tag}</span>
                        <span className="bg-white/50 text-gray-600 px-1.5 py-0.5 rounded-full border border-emerald-100">{d.maxLabel}</span>
                      </div>
                      <a 
                        href={d.ref} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-emerald-800 font-medium hover:underline mt-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <TbExternalLink size={10} /> {d.refLabel}
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <button
          className="flex items-center justify-center gap-1.5 w-full mt-2 p-2.5 border border-dashed border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50 transition-colors"
          onClick={() => setIsDedModalOpen(true)}
        >
          <TbPlus size={14} /> เพิ่มค่าลดหย่อน
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
        <div className="flex justify-between items-center py-1">
          <span className="text-[13px] text-gray-600">รายได้รวมทั้งปี</span>
          <span className="text-[13px] font-medium tabular-nums">{fmt(results.gross)} บาท</span>
        </div>
        <div className="flex justify-between items-center py-1 text-orange-600">
          <span className="text-[13px]">− ค่าใช้จ่ายหักเหมา</span>
          <span className="text-[13px] font-medium tabular-nums">−{fmt(results.exp)} บาท</span>
        </div>
        <div className="flex justify-between items-center py-1 text-amber-700">
          <span className="text-[13px]">− ค่าลดหย่อนรวม</span>
          <span className="text-[13px] font-medium tabular-nums">−{fmt(results.totalDed)} บาท</span>
        </div>
        <div className="h-px bg-gray-100 my-1.5" />
        <div className="flex justify-between items-center py-1">
          <span className="text-[13px] font-medium">รายได้สุทธิ</span>
          <span className="text-[17px] font-medium text-emerald-600 tabular-nums">{fmt(results.net)} บาท</span>
        </div>
      </div>

      <div className="my-3.5">
        <p className="text-[11px] text-gray-400 tracking-wider uppercase mb-2">รายได้สุทธิในขั้นภาษี</p>
        <div className="h-[22px] flex rounded-lg overflow-hidden gap-0.5 bg-gray-50">
          {results.segs.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ width: 0 }}
              animate={{ width: `${Math.max(1, (s.amt / (results.net || 1)) * 100)}%` }}
              className="h-full min-w-[3px]"
              style={{ backgroundColor: s.color }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2">
          {results.segs.map((s, idx) => (
            <div key={idx} className="flex items-center gap-1 text-[11px] text-gray-600">
              <div className="w-[7px] h-[7px] rounded-[2px] shrink-0" style={{ backgroundColor: s.color }} />
              {s.label} ({fmt(s.amt)})
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1 my-2.5">
        {results.taxRows.map((r, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400 min-w-[115px]">{r.label}</span>
            <div className="flex-1 h-1 bg-gray-50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(r.tax / (results.maxRowTax || 1)) * 100}%` }}
                className="h-full rounded-full"
                style={{ backgroundColor: r.color }}
              />
            </div>
            <span className="text-[11px] font-medium min-w-[56px] text-right tabular-nums">{fmt(r.tax)}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-50 rounded-[13px] p-3.5">
          <p className="text-[11px] text-gray-400 mb-1">ภาษีที่ต้องชำระ</p>
          <p className="text-[17px] font-medium text-red-500 tabular-nums">{fmt(results.tax)} บาท</p>
          <p className="text-[10px] text-gray-400 mt-0.5">อัตราจริง {results.gross > 0 ? ((results.tax / results.gross) * 100).toFixed(1) : "0.0"}%</p>
        </div>
        <div className="bg-gray-50 rounded-[13px] p-3.5">
          <p className="text-[11px] text-gray-400 mb-1">เงินที่ได้รับจริง</p>
          <p className="text-[17px] font-medium text-emerald-600 tabular-nums">{fmt(results.take)} บาท</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{results.gross > 0 ? Math.round((results.take / results.gross) * 100) : 100}% ของรายได้</p>
        </div>
      </div>

      {results.gross > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-[11px] text-gray-400 tracking-wider uppercase mb-4 text-center">สัดส่วนการจัดสรรรายได้ (Income Pyramid)</p>
          <div ref={chartRef} className="w-full h-80" />
        </div>
      )}

      <AnimatePresence>
        {isIncModalOpen && (
          <IncomeSelectorModal
            isOpen={isIncModalOpen}
            onClose={() => setIsIncModalOpen(false)}
            allIncomes={ALL_INCOME_DEFS}
            userIncomes={incomeCards}
            onAdd={addIncome}
          />
        )}

        {isDedModalOpen && (
          <DeductionSelectorModal
            isOpen={isDedModalOpen}
            onClose={() => setIsDedModalOpen(false)}
            allDeductions={ALL_DEDUCTION_DEFS}
            activeDeductions={activeDeds}
            onAdd={addDed}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaxCard;
