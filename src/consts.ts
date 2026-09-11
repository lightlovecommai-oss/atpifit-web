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

/* 創辦人照片（信任肌肉的自我示範：官網要有「人」——2026-09-11 老師點名的缺）。
   照片還沒給：拿到後把檔案放 public/assets/founder.jpg、這裡改成 '/assets/founder.jpg'，
   about 頁 hero 照片位＋首頁「教的人是誰」照片位會自動亮起來，Person schema 也會帶 image。
   空字串＝照片位整塊不渲染，不會出現破圖或「照片準備中」。 */
export const FOUNDER_PHOTO = '';

/* 學員案例（信任肌肉：官網要看得到「人」——2026-09-11 老師點名的另一塊缺）。
   ⚠️ 引言絕不代擬：quote 一律逐字照抄原始截圖，shot 放 public/assets/cases/ 的截圖檔。
   真相與可引用段落＝productkit 產品kit/見證庫-共筆、FB學員貼文-標註。
   陣列空＝首頁案例區整段不渲染，補進第一筆就自動亮。 */
export type CaseItem = {
  name: string;   // 顯示名（公開貼文可全名；私訊截圖用姓＋稱謂）
  who: string;    // 身分一句：他是做什麼的
  quote: string;  // 逐字引言＝截圖原文，不可改寫、不可湊句
  shot: string;   // 原始截圖路徑，例 '/assets/cases/xxx.jpg'（見證規格：截圖為證）
  series: string; // 系列落款，例「超引力成交學・學員」
};
export const CASES: CaseItem[] = [];

/* 訂閱走跟影響力健檢同一支 Apps Script：後端一次寫 Google Sheet ＋ 推 LaunChill。
   ⚠️ 換後端網址要同步改 comconverttest/index.html 的 SHEET_API。 */
export const SHEET_API =
  'https://script.google.com/macros/s/AKfycbz7VxeV8ZmjSiGNO-G3ZwRLPg-H1H2NjXHy6brCU5yVaVoYOXB-LItU750j81Q3eno/exec';

/* 關於光頭排第二（2026-09-10 拍板）：官網訪客多是「來查證的人」，
   對他們第二重要的頁就是「教的人是誰」，不藏在最後。 */
export const NAV = [
  { href: '/method', label: '方法' },
  { href: '/about', label: '關於光頭' },
  { href: '/courses', label: '課程' },
  { href: '/articles', label: '文章' },
  { href: '/glossary', label: '名詞' },
] as const;
