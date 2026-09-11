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

/* 創辦人照片（信任肌肉的自我示範：官網要有「人」）。
   about 頁 hero 照片位＋首頁「教的人是誰」照片位吃這裡，Person schema 也會帶 image。
   空字串＝照片位整塊不渲染，不會出現破圖或「照片準備中」。 */
export const FOUNDER_PHOTO = '/assets/founder.jpg';

/* 學員案例（信任肌肉：官網要看得到「人」——2026-09-11 老師點名的另一塊缺）。
   ⚠️ 引言絕不代擬：quote 一律逐字照抄原始截圖，shot 放 public/assets/cases/ 的截圖檔。
   真相與可引用段落＝productkit 產品kit/見證庫-共筆、FB學員貼文-標註。
   陣列空＝首頁案例區整段不渲染，補進第一筆就自動亮。 */
export type CaseItem = {
  name: string;   // 顯示名（公開貼文可全名；私訊截圖用姓＋稱謂）
  who: string;    // 身分一句：他是做什麼的
  quote: string;  // 逐字引言＝截圖原文，不可改寫、不可湊句
  shot: string;   // 原始截圖路徑，例 '/assets/cases/xxx.jpg'（見證規格：截圖為證）
  shotPos?: string; // 截圖視窗露出位置（object-position），長圖用來對準關鍵段，預設露頂部
  series: string; // 系列落款，例「超引力成交學・學員」
  stat?: { num: string; label: string }; // 大數字（§3.8 招4）：數字以截圖為準
};
export const CASES: CaseItem[] = [
  {
    name: '王偉翔',
    who: '到府按摩師・負債 100 萬轉行',
    quote: '說出有說服力的話，讓顧客更信賴我，然後快速的幫我拓展客源。',
    shot: '/assets/cases/weixiang.png',
    shotPos: '50% 62%',
    series: '超引力成交學・學員',
    stat: { num: '13.5萬', label: '轉行後單月總收入' },
  },
  {
    name: '林珈鉉',
    who: '企管顧問＋身心靈工作者',
    quote:
      '很感謝光頭教練的課程與協助，讓我在上完課後的第一次實體銷講，就有了很大的突破！',
    shot: '/assets/cases/linjiaxuan.png',
    shotPos: '50% 4%',
    series: '超引力成交學・學員',
    stat: { num: '15→9→8→3', label: '到場→有效聽眾→申請 1v1→全數成交' },
  },
  {
    name: '劉沐洋（艾斯）',
    who: '家族辦公室主理人・FB 公開發文',
    quote:
      '我一直記得光頭教練說過的一句話：「技巧是工具，真實才是地基。」',
    shot: '/assets/cases/liumuyang.png',
    shotPos: '50% 2%',
    series: '超引力成交學・學員',
  },
];

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
