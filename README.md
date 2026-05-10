# 📊 TaxEase (TEX Ease)

**TaxEase** เป็นเว็บแอปพลิเคชันสมัยใหม่ที่ออกแบบมาเพื่อลดความซับซ้อนของการคำนวณภาษีเงินได้บุคคลธรรมดาของไทย โดยการเปลี่ยนข้อมูลตัวเลขที่เข้าใจยากให้เป็นภาพกราฟิก (Visualizations) และแผนภูมิที่โต้ตอบได้ ช่วยให้ผู้ใช้เข้าใจขั้นตอนการคำนวณภาษีของตนเองได้อย่างชัดเจน

![TaxEase Logo](/public/TaxEase.png)

## 🚀 ฟีเจอร์หลัก (Key Features)

- **Interactive Tax Calculation**: คำนวณภาษีแบบเรียลไทม์ตามการกรอกข้อมูลของผู้ใช้
- **Data Visualization**: ใช้ amCharts 5 ในการแสดงภาพขั้นบันไดภาษีและสัดส่วนการจ่ายภาษี
- **Thai Tax Logic**: รองรับการคำนวณตามโครงสร้างภาษีเงินได้บุคคลธรรมดาของไทย (เงินได้ประเภทที่ 1, 2 และ 8) พร้อมหักค่าใช้จ่ายตามจริงหรือตามอัตราเหมา
- **Responsive Design**: ส่วนต่อประสานกับผู้ใช้ (UI) ทันสมัยด้วย Tailwind CSS รองรับการใช้งานทั้งบนเดสก์ท็อปและมือถือ
- **Educational Content**: อธิบายแนวคิดเรื่อง "รายได้สุทธิ" ผ่านตัวอย่างและเครื่องมือช่วยสอนที่เข้าใจง่าย

## 🛠 เทคโนโลยีที่ใช้ (Technology Stack)

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Visualizations**: [amCharts 5](https://www.amcharts.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## 📂 โครงสร้างโปรเจค (Project Structure)

```text
src/
├── app/               # Next.js App Router (Layouts & Pages)
├── components/        # UI Components ที่นำกลับมาใช้ใหม่ได้
│   ├── amcharts/      # คอมโพเนนต์กราฟและแผนภูมิ
│   ├── Table/         # ตารางแสดงอัตราภาษี
│   └── Cards/         # การ์ดแสดงข้อมูลและอินพุต
├── constants/         # ข้อมูลคงที่ (อัตราภาษี, อัตราการหักลดหย่อน)
├── containers/        # ตรรกะระดับหน้า (Page-level logic)
├── libs/              # การตั้งค่าไลบรารีภายนอก (เช่น ฟอนต์)
├── types/             # การกำหนดประเภทข้อมูล (TypeScript Types)
└── utils/             # กลไกการคำนวณภาษี (Tax calculation engine)
```

## 🧮 ตรรกะการคำนวณ (Core Logic)

หัวใจสำคัญของโปรเจคอยู่ที่ `src/utils/calculate.ts` ซึ่งใช้ระบบภาษีแบบก้าวหน้า (Progressive Tax System):
1. **Income Categorization**: แยกประเภทรายได้เพื่อหักค่าใช้จ่ายที่แตกต่างกัน
2. **Net Income Calculation**: คำนวณรายได้สุทธิหลังหักค่าใช้จ่ายและค่าลดหย่อน
3. **Progressive Brackets**: คำนวณภาษีตามขั้นบันได (0% ถึง 35%)

## 🏁 เริ่มต้นใช้งาน (Getting Started)

### การติดตั้ง (Installation)

1. Clone โปรเจค:
   ```bash
   git clone https://github.com/your-username/tax_ease.git
   cd tax_ease
   ```

2. ติดตั้ง dependencies:
   ```bash
   npm install
   ```

### การรันโปรเจค (Development)

รัน development server:
```bash
npm run dev
```
เปิด [http://localhost:3000](http://localhost:3000) บนเบราว์เซอร์ของคุณ

### การรันเทส (Testing)

รัน unit tests ทั้งหมด:
```bash
npm test
```

## 📄 ใบอนุญาต (License)

โปรเจคนี้เป็นส่วนตัว (Private) ตามที่ระบุไว้ใน `package.json`

---
*จัดทำโดยทีมพัฒนา TaxEase - พฤษภาคม 2026*
