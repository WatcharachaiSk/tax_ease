import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { thsarabun } from "@/libs/fonts";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "TaxEase - คำนวณภาษีเงินได้บุคคลธรรมดา ง่ายและแม่นยำ",
  description: "เครื่องมือคำนวณภาษีเงินได้บุคคลธรรมดา ช่วยวางแผนภาษี คำนวณค่าลดหย่อน และสรุปยอดภาษีที่ต้องจ่ายอย่างมืออาชีพ",
  keywords: ["คำนวณภาษี", "ภาษีเงินได้", "วางแผนภาษี", "ลดหย่อนภาษี", "Tax Calculator Thailand"],
  authors: [{ name: "TaxEase Team" }],
  verification: {
    google: "cj3Q48HyW78r_hEFLNNcldXrtr_4Qf1WF9io9W_Wnlc",
  },
  openGraph: {
    title: "TaxEase - คำนวณภาษีเงินได้บุคคลธรรมดา",
    description: "คำนวณภาษีง่ายๆ พร้อมตัวช่วยวางแผนค่าลดหย่อน",
    url: "https://tax-ease.vercel.app", // ควรเปลี่ยนเป็น domain จริงถ้ามี
    siteName: "TaxEase",
    images: [
      {
        url: "/TaxEase.webp",
        width: 1200,
        height: 630,
        alt: "TaxEase Logo",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${thsarabun.className} min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
