import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: 'https://tax-ease.vercel.app/sitemap.xml', // เปลี่ยนเป็น domain จริงภายหลัง
  }
}
