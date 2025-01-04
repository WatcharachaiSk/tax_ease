import localFont from "next/font/local";

export const thsarabun = localFont({
  src: [
    {
      path: "../../public/fonts/THSarabunNew/THSarabunNew.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/THSarabunNew/THSarabunNew-Bold.ttf",
      weight: "800",
      style: "bold",
    },
    {
      path: "../../public/fonts/THSarabunNew/THSarabunNew-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/THSarabunNew/THSarabunNew-BoldItalic.ttf",
      weight: "800",
      style: "bold-italic",
    },
  ],
  variable: "--thsarabun",
});
