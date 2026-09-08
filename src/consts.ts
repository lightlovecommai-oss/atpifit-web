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
  line: 'https://lin.ee/pTzOrU9',
} as const;

/* 品牌實體識別：告訴 Google／AI 搜尋「這些帳號跟本站是同一個品牌」。
   一律填**公開個人檔案頁**而不是加好友短網址——短網址是轉址、不是可索引的檔案頁。 */
export const SAME_AS = [
  'https://page.line.me/993pajiy',
  'https://www.skool.com/influence-8679',
] as const;

/* 創辦人本人的帳號，掛在 about 頁的 Person 底下、不掛 Organization——
   這三個是「人」的檔案頁，混進品牌 sameAs 會讓實體判斷變模糊。 */
export const FOUNDER_SAME_AS = [
  'https://www.instagram.com/normalivor/',
  'https://www.youtube.com/@normalivor',
  'https://www.facebook.com/profile.php?id=1498193088',
] as const;

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
