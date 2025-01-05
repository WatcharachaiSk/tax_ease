import React, { FC } from 'react';

const TaxCard: FC = () => {
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <h1 className="text-2xl font-bold mb-4 text-center">คำนวณภาษี</h1>
            
            <div className="mb-4">
                <p className="text-lg ">สูตรการคำนวณ:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm">
                        <span className="font-mono">รายได้สุทธิ = รายได้ - ค่าใช้จ่าย - ค่าลดหย่อน</span>
                    </p>
                </div>
            </div>
            
            <div className="mb-4">
                <p className="text-lg ">ตัวอย่างการคำนวณ:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-mono">รายได้ = 480,000</p>
                    <p className="text-sm font-mono">ค่าใช้จ่าย = min(50% ของรายได้, 100,000) = 100,000</p>
                    <p className="text-sm font-mono">ค่าลดหย่อน = 60,000</p>
                    <p className="text-sm font-mono">รายได้สุทธิ = 480,000 - 100,000 - 60,000</p>
                    <p className="text-sm font-mono">= 320,000</p>
                </div>
            </div>
            
            <div className="mb-4">
                <p className="text-lg ">การคำนวณภาษี:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-mono">150,000 {'->'} ยกเว้นภาษี</p>
                    <p className="text-sm font-mono">150,001 - 300,000 {'->'} 5% = 7,500</p>
                    <p className="text-sm font-mono">300,001 - 320,000 {'->'} 10% = 2,000</p>
                    <p className="text-sm font-mono font-bold">รวมภาษี = 7,500 + 2,000 = 9,500</p>
                </div>
            </div>
            
            <div className="text-center mt-4">
                <p className="text-xl font-bold text-green-600">ภาษีที่ต้องชำระ: 9,500 บาท</p>
            </div>
        </div>
    </div>
    );
}

export default TaxCard;
