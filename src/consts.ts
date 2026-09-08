/* 站台常數。網址真相＝記憶 atpifit-domain-status（apex 官網／app／quiz／lp 各自子網域）。 */

export const SITE = {
  url: 'https://atpifit.com',
  name: '影響力健身房',
  nameFull: '影響力健身房 ATPIFit',
  nameEn: 'ATPIFit',
  locale: 'zh_TW',
  lang: 'zh-Hant-TW',
} as const;

/* 對外入口。換工具改 Cloudflare 轉址，不要改這裡的 time/report。 */
export const LINKS = {
  quiz: 'https://quiz.atpifit.com/',
  gym: 'https://app.atpifit.com/',
  lp: 'https://lp.atpifit.com/',
  booking: 'https://time.atpifit.com/',
} as const;

/* 訂閱走跟影響力健檢同一支 Apps Script：後端一次寫 Google Sheet ＋ 推 LaunChill。
   ⚠️ 換後端網址要同步改 comconverttest/index.html 的 SHEET_API。 */
export const SHEET_API =
  'https://script.google.com/macros/s/AKfycbwEwlg4cFa7B_e76ULJM26C2B9fgjwjFTXPFb_yRMWt1wZs33iTGnEI1LZ9v8uZHvdz/exec';

export const NAV = [
  { href: '/method', label: '方法' },
  { href: '/articles', label: '文章' },
  { href: '/glossary', label: '名詞' },
  { href: '/courses', label: '課程' },
  { href: '/about', label: '關於光頭' },
] as const;
