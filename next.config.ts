import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,  // ปิดการตรวจสอบ ESLint ระหว่างการ build
  },
  /* config options อื่น ๆ ที่คุณต้องการเพิ่ม */
};

export default nextConfig;
