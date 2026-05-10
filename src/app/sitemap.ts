import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tax-ease.vercel.app' // เปลี่ยนเป็น domain จริงภายหลัง
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // เพิ่ม URL อื่นๆ ที่นี่ถ้ามี เช่น /about, /contact
  ]
}
