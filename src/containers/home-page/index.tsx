import LineWithCustomBullets from "@/components/amcharts/LineWithCustomBullets";
// import TaxCard from "@/components/Cards/TaxCardEx";
// import TestMotion from "@/components/Motions/testMotion";
import TableTax from "@/components/Table/tax";
import React, { FC } from "react";

// interface HomePageProps {}

const HomePage: FC = async ({}) => {
  return (
    <div className="text-2xl w-full flex flex-col justify-center items-center gap-y-5">
      <div>
        <a
          type="button"
          className="text-3xl py-1 px-6 me-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
        >
          TEX Ease
        </a>
      </div>
      <div>
        <p></p>
      </div>
      <div className="text-center">
        <p>
          เบื่อกับตัวเลข? มาลองคำนวณภาษีแบบ{" "}
          <span className="text-blue-600">“เข้าใจง่าย”</span>
          ด้วยภาพและกราฟกันเถอะ!
        </p>
      </div>

      <div className="flex md:flex-row xl:flex-row flex-col gap-2">
        <TableTax />
        <div className="flex max-w-sm p-6 text-center items-center">
          <p className="">
            เคยเห็นตาราง
            <span className="text-red-700"> อัตราภาษีเงินได้บุคคลธรรมดา </span>
            แล้วงงไหม? เห็นตัวเลขเยอะๆ แต่ไม่แน่ใจว่าคำนวณยังไง? 😵‍💫 ไม่ต้องห่วง!
            เราจะทำให้ตารางนี้ <span className="text-green-600">
              “มีชีวิต”
            </span>{" "}
            และเข้าใจง่ายขึ้น มาแปลงตัวเลขให้กลายเป็นภาพ
            ช่วยให้เห็นภาพและคำนวณได้แบบชัดเจน! 📊
          </p>
        </div>
      </div>
      <div>{/* <TestMotion /> */}</div>
      <div></div>
      <div className="w-full flex md:flex-row xl:flex-row flex-col gap-x-3">
        <LineWithCustomBullets />
        <div className="flex text-center flex-col justify-center">
          <p>
            รายได้สุทธิก็คือรายได้ของเรา
            หลังจากหักค่าใช้จ่ายและค่าลดหย่อนแล้วนั่นเอง 🎯 ง่ายๆ แบบนี้เลย!
            <br />
            <span className="text-3xl">
              <span className="text-[#F39C12]">รายได้สุทธิ</span> =
              <span className="text-[#2E86C1]"> รายได้ </span> -
              <span className="text-[#E74C3C]"> ค่าใช้จ่าย </span> −
              <span className="text-[#27AE60]"> ค่าลดหย่อน </span>
            </span>
            <br />
          </p>
          <div className="text-start">
            <p className="text-start text-sm font-mono">
              ยกตัวอย่าง เงินได้ทั้งปี{" "}
              <span className="text-[#2E86C1]">480,000</span>{" "}
            </p>
            <div className="mb-4">
              {/* <p className="text-lg ">ตัวอย่างการคำนวณ:</p> */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-mono">
                  รายได้ทั้งปี = <span className="text-[#2E86C1]">480,000</span>
                </p>
                <p className="text-sm font-mono">
                  ค่าใช้จ่าย = min(50% ของรายได้, 100,000) ={" "}
                  <span className="text-[#E74C3C]"> 100,000 </span>
                </p>
                <p className="text-sm font-mono">
                  ค่าลดหย่อน = <span className="text-[#27AE60]"> 60,000 </span>
                </p>
                <p className="text-sm font-mono">
                  รายได้สุทธิ = <span className="text-[#2E86C1]">480,000</span>{" "}
                  - <span className="text-[#E74C3C]"> 100,000 </span> -{" "}
                  <span className="text-[#27AE60]"> 60,000 </span>
                </p>
                <p className="text-sm font-mono">
                  รายได้สุทธิ = <span className="text-[#F39C12]">320,000</span>
                </p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-mono">การคำนวณภาษี:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-mono">150,000 {"->"} ยกเว้นภาษี</p>
                <p className="text-sm font-mono">
                  150,001 - 300,000 {"->"} 5% = 7,500
                </p>
                <p className="text-sm font-mono">
                  300,001 - 320,000 {"->"} 10% = 2,000
                </p>
                <p className="text-sm font-mono font-bold">
                  รวมภาษี = 7,500 + 2,000 ={" "}
                  <span className="text-[#C0392B]"> 9,500 </span>{" "}
                </p>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-2xl font-bold text-[#C0392B]">
                ภาษีที่ต้องชำระ: 9,500 บาท
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <TaxCard /> */}
      <a
        type="button"
        className="text-3xl py-1 px-6 me-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
      >
        ✨ เริ่มต้นคำนวณภาษีของคุณกันเถอะ!
      </a>
      <p>
        มาแปลงรายได้ให้ “เห็นภาพ” 🚀 แค่กรอกข้อมูล
        แล้วปล่อยให้ระบบจัดการส่วนที่เหลือ! 💼
      </p>
    </div>
  );
};

export default HomePage;
